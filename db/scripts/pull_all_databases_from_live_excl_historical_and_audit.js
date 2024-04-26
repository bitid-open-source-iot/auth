//-------------------START ALERTING---------------------------------//

const BATCH_SIZE = 2000;

let srcConnection = "41.162.30.245_ADMIN";
let srcDb = "alerting";
let dstConnection = "localhost_shane";
let dstDb = "alerting";

use(dstDb);

//idPolicy: overwrite_with_same_id|always_insert_with_new_id|insert_with_new_id_if_id_exists|skip_documents_with_existing_id|abort_if_id_already_exists|drop_collection_first|log_errors
let toCopyCollections = [
    { srcCollection: "tblHistorical", query: {}, projection: {}, dstCollection: "tblHistorical", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblTokens", query: {}, projection: {}, dstCollection: "tblTokens", idPolicy: "overwrite_with_same_id" }
];

let toRecreateViews = []

// if have more indexes than default index (_id), create index after copy data.
let shouldCreateIndex = true;

let totalCopyResult = {
    result: {},
    fails: [],
}

function copyCollection(params) {
    let { srcCollection, dstCollection, query, projection, idPolicy } = params;

    if (srcCollection.includes('Historical') == false && srcCollection != 'tblUsage' && srcCollection.includes('Audit') == false) {
        console.log(`Copy docs from "${srcConnection}:${srcDb}:${srcCollection}" to "${dstConnection}:${dstDb}:${dstCollection}" start...`);

        let isSameCollection = srcConnection === dstConnection && srcDb === dstDb && srcCollection === dstCollection;

        if (isSameCollection) {
            if (toCopyCollections.length === 1)
                shouldCreateIndex = false;
            else
                params.shouldCreateIndex = false;
        }

        if (idPolicy === "drop_collection_first") {
            // srcCollection is same to dstCollection, can not drop dstCollection (equal to drop srcCollection)
            // drop dst collection and copy from same collection, means nothing to do.
            if (isSameCollection) return;

            mb.dropCollection({ connection: dstConnection, db: dstDb, collection: dstCollection });
            console.log(`drop collection "${dstDb}.${dstCollection}"`);
        }

        totalCopyResult.result[dstCollection] = {
            nInserted: 0,
            nModified: 0,
            nSkipped: 0,
            failed: 0,
        };
        let collectionRst = totalCopyResult.result[dstCollection];

        let limitReadCount = Number.MAX_SAFE_INTEGER;
        if (isSameCollection) {
            limitReadCount = mb.runScript({ connection: srcConnection, db: srcDb, script: `db.getCollection(${tojson(srcCollection)}).find(${tojson(query)}).count()` })
        }

        const batchSize = limitReadCount > BATCH_SIZE ? BATCH_SIZE : limitReadCount;

        let cursor = await(mb.getCursorFromCollection({ connection: srcConnection, db: srcDb, collection: srcCollection, query, projection }));
        if (isSameCollection) {
            cursor = cursor.limit(limitReadCount);
        }

        const totalCount = cursor.size ? cursor.size() : cursor.count();

        await(mb.batchReadFromCursor(cursor, batchSize, (docs) => {
            return async(() => {
                // let readLength = docs.length;
                // if (!readLength) return;

                let copyResult = mb.writeToDb({ connection: dstConnection, db: dstDb, collection: dstCollection, docs, idPolicy });
                let failed = copyResult.errors.length;
                let success = copyResult.nInserted + copyResult.nModified;

                collectionRst.nInserted += copyResult.nInserted;
                collectionRst.nModified += copyResult.nModified;
                collectionRst.nSkipped += copyResult.nSkipped;
                collectionRst.failed += failed;
                const processedCount = collectionRst.nInserted + collectionRst.nModified + collectionRst.nSkipped + collectionRst.failed;

                const percent = (processedCount / totalCount * 100).toFixed(1);

                console.log(`${dstCollection}: ${percent}%	 ${processedCount}/${totalCount}	 ${collectionRst.nInserted + collectionRst.nModified} docs successfully imported, ${collectionRst.failed} docs failed.`);

                if (failed) {
                    console.log("Failed objects", copyResult.errors);
                }

                totalCopyResult.fails = [...totalCopyResult.fails, ...copyResult.errors];
            })();
        }));

        sleep(100);
        console.log(`copy docs from "${srcConnection}:${srcDb}:${srcCollection}" to "${dstConnection}:${dstDb}:${dstCollection}" finished.
`);
    }


}

//Copy collections
for (let collection of toCopyCollections) {
    await(copyCollection(collection));
}

//Recreate database readonly views
for (let view of toRecreateViews) {
    const viewOn = tojson(view.viewOn);
    const viewName = tojson(view.name);
    const script = `var dropIfExists=true;
    if (dropIfExists){
        db.getCollection(${viewName}).drop();
    }
    db.getCollection(${viewOn}).aggregate(${tojson(view.pipeline)}).saveAsView(${viewName}, ${tojson(view.options)})`;
    const rst = await(mb.runScript({ connection: dstConnection, db: dstDb, script }));
    if (!(rst && rst.ok)) {
        console.error(rst.message);
    } else {
        console.log(`re-created readonly view ${viewName} `);
    }
}


if (shouldCreateIndex) {
    let indexCreationPrompted = false;
    function indexCreationPrompt() {
        if (indexCreationPrompted) return;

        const waitTime = 3;
        console.log(`Index creating will start in ${waitTime} seconds...`)
        sleep(1000 * waitTime);
        indexCreationPrompted = true;
    }

    let srcCollections = toCopyCollections.filter(it => it["shouldCreateIndex"] !== false).map(it => it.srcCollection)
    srcCollections.forEach(it => {
        let indexes = mb.runScript({ connection: srcConnection, db: srcDb, script: `db.getCollection(${tojson(it)}).getIndexes();` });
        if (indexes.length > 1) {
            let toCopyCollection = _.find(toCopyCollections, { srcCollection: it });
            if (!toCopyCollection) return;

            let dstCollection = toCopyCollection.dstCollection;

            indexes.forEach(index => {
                if (index.name === "_id_") return;

                indexCreationPrompt();

                let newIndex = _.cloneDeep(index);

                // remove index version and engine info, these info may fail createIndexes operator.
                delete newIndex.v;
                delete newIndex.textIndexVersion;
                delete newIndex["2dsphereIndexVersion"];
                delete newIndex.storageEngine;

                newIndex.ns = `${dstDb}.${dstCollection}`;

                console.log(`create index ${newIndex.name} for "${dstDb}.${dstCollection}"`);
                db.runCommand({
                    createIndexes: dstCollection,
                    indexes: [newIndex]
                });
            })
        }
    });

    if (indexCreationPrompted)
        console.log("create index complete.")
}

if (totalCopyResult.result) {
    let success = 0;
    let failed = 0;
    let collections = _.keys(totalCopyResult.result);
    collections.forEach((key) => {
        let obj = totalCopyResult.result[key];
        success += obj.nInserted + obj.nModified;
        failed += obj.failed;
    });

    console.log(`
${success} document(s) of ${collections.length} collection(s) have been copied.\n`, totalCopyResult.result);

    if (failed) {
        console.log(`${failed} document(s) haven't been copied, please check failed list below.`);
    } else {
        console.log("All documents copied successfully.");
    }
}

if (totalCopyResult.fails.length) {
    console.log("All failed objects\n", totalCopyResult.fails);
}


//-------------------END ALERTING---------------------------------//


//-------------------START AUTH---------------------------------//

srcDb = "auth";
dstDb = "auth";

use(dstDb);

//idPolicy: overwrite_with_same_id|always_insert_with_new_id|insert_with_new_id_if_id_exists|skip_documents_with_existing_id|abort_if_id_already_exists|drop_collection_first|log_errors
toCopyCollections = [
    { srcCollection: "tblApps", query: {}, projection: {}, dstCollection: "tblApps", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblFeatures", query: {}, projection: {}, dstCollection: "tblFeatures", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblGroups", query: {}, projection: {}, dstCollection: "tblGroups", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblScopes", query: {}, projection: {}, dstCollection: "tblScopes", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblTipsAndUpdates", query: {}, projection: {}, dstCollection: "tblTipsAndUpdates", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblTokens", query: {}, projection: {}, dstCollection: "tblTokens", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblUsage", query: {}, projection: {}, dstCollection: "tblUsage", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblUsers", query: {}, projection: {}, dstCollection: "tblUsers", idPolicy: "overwrite_with_same_id" }
];

toRecreateViews = []

totalCopyResult = {
    result: {},
    fails: [],
}

for (let collection of toCopyCollections) {
    await(copyCollection(collection));
}

//Recreate database readonly views
for (let view of toRecreateViews) {
    const viewOn = tojson(view.viewOn);
    const viewName = tojson(view.name);
    const script = `var dropIfExists=true;
    if (dropIfExists){
        db.getCollection(${viewName}).drop();
    }
    db.getCollection(${viewOn}).aggregate(${tojson(view.pipeline)}).saveAsView(${viewName}, ${tojson(view.options)})`;
    const rst = await(mb.runScript({ connection: dstConnection, db: dstDb, script }));
    if (!(rst && rst.ok)) {
        console.error(rst.message);
    } else {
        console.log(`re-created readonly view ${viewName} `);
    }
}


if (shouldCreateIndex) {
    let indexCreationPrompted = false;
    let srcCollections = toCopyCollections.filter(it => it["shouldCreateIndex"] !== false).map(it => it.srcCollection)
    srcCollections.forEach(it => {
        let indexes = mb.runScript({ connection: srcConnection, db: srcDb, script: `db.getCollection(${tojson(it)}).getIndexes();` });
        if (indexes.length > 1) {
            let toCopyCollection = _.find(toCopyCollections, { srcCollection: it });
            if (!toCopyCollection) return;

            let dstCollection = toCopyCollection.dstCollection;

            indexes.forEach(index => {
                if (index.name === "_id_") return;

                indexCreationPrompt();

                let newIndex = _.cloneDeep(index);

                // remove index version and engine info, these info may fail createIndexes operator.
                delete newIndex.v;
                delete newIndex.textIndexVersion;
                delete newIndex["2dsphereIndexVersion"];
                delete newIndex.storageEngine;

                newIndex.ns = `${dstDb}.${dstCollection}`;

                console.log(`create index ${newIndex.name} for "${dstDb}.${dstCollection}"`);
                db.runCommand({
                    createIndexes: dstCollection,
                    indexes: [newIndex]
                });
            })
        }
    });

    if (indexCreationPrompted)
        console.log("create index complete.")
}

if (totalCopyResult.result) {
    let success = 0;
    let failed = 0;
    let collections = _.keys(totalCopyResult.result);
    collections.forEach((key) => {
        let obj = totalCopyResult.result[key];
        success += obj.nInserted + obj.nModified;
        failed += obj.failed;
    });

    console.log(`
${success} document(s) of ${collections.length} collection(s) have been copied.\n`, totalCopyResult.result);

    if (failed) {
        console.log(`${failed} document(s) haven't been copied, please check failed list below.`);
    } else {
        console.log("All documents copied successfully.");
    }
}

if (totalCopyResult.fails.length) {
    console.log("All failed objects\n", totalCopyResult.fails);
}


//-------------------END AUTH---------------------------------//


//-------------------START DOCS---------------------------------//
srcDb = "docs";
dstDb = "docs";

use(dstDb);

//idPolicy: overwrite_with_same_id|always_insert_with_new_id|insert_with_new_id_if_id_exists|skip_documents_with_existing_id|abort_if_id_already_exists|drop_collection_first|log_errors
toCopyCollections = [
    { srcCollection: "tblDocumentation", query: {}, projection: {}, dstCollection: "tblDocumentation", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblProjects", query: {}, projection: {}, dstCollection: "tblProjects", idPolicy: "overwrite_with_same_id" }
];

toRecreateViews = []

totalCopyResult = {
    result: {},
    fails: [],
}

//Copy collections
for (let collection of toCopyCollections) {
    await(copyCollection(collection));
}

//Recreate database readonly views
for (let view of toRecreateViews) {
    const viewOn = tojson(view.viewOn);
    const viewName = tojson(view.name);
    const script = `var dropIfExists=true;
    if (dropIfExists){
        db.getCollection(${viewName}).drop();
    }
    db.getCollection(${viewOn}).aggregate(${tojson(view.pipeline)}).saveAsView(${viewName}, ${tojson(view.options)})`;
    const rst = await(mb.runScript({ connection: dstConnection, db: dstDb, script }));
    if (!(rst && rst.ok)) {
        console.error(rst.message);
    } else {
        console.log(`re-created readonly view ${viewName} `);
    }
}


if (shouldCreateIndex) {
    let indexCreationPrompted = false;
    let srcCollections = toCopyCollections.filter(it => it["shouldCreateIndex"] !== false).map(it => it.srcCollection)
    srcCollections.forEach(it => {
        let indexes = mb.runScript({ connection: srcConnection, db: srcDb, script: `db.getCollection(${tojson(it)}).getIndexes();` });
        if (indexes.length > 1) {
            let toCopyCollection = _.find(toCopyCollections, { srcCollection: it });
            if (!toCopyCollection) return;

            let dstCollection = toCopyCollection.dstCollection;

            indexes.forEach(index => {
                if (index.name === "_id_") return;

                indexCreationPrompt();

                let newIndex = _.cloneDeep(index);

                // remove index version and engine info, these info may fail createIndexes operator.
                delete newIndex.v;
                delete newIndex.textIndexVersion;
                delete newIndex["2dsphereIndexVersion"];
                delete newIndex.storageEngine;

                newIndex.ns = `${dstDb}.${dstCollection}`;

                console.log(`create index ${newIndex.name} for "${dstDb}.${dstCollection}"`);
                db.runCommand({
                    createIndexes: dstCollection,
                    indexes: [newIndex]
                });
            })
        }
    });

    if (indexCreationPrompted)
        console.log("create index complete.")
}

if (totalCopyResult.result) {
    let success = 0;
    let failed = 0;
    let collections = _.keys(totalCopyResult.result);
    collections.forEach((key) => {
        let obj = totalCopyResult.result[key];
        success += obj.nInserted + obj.nModified;
        failed += obj.failed;
    });

    console.log(`
${success} document(s) of ${collections.length} collection(s) have been copied.\n`, totalCopyResult.result);

    if (failed) {
        console.log(`${failed} document(s) haven't been copied, please check failed list below.`);
    } else {
        console.log("All documents copied successfully.");
    }
}

if (totalCopyResult.fails.length) {
    console.log("All failed objects\n", totalCopyResult.fails);
}

//-------------------END DOCS---------------------------------//

// //-------------------START DRIVE---------------------------------//
// srcDb = "drive";
// dstDb = "drive";

// use(dstDb);

// //idPolicy: overwrite_with_same_id|always_insert_with_new_id|insert_with_new_id_if_id_exists|skip_documents_with_existing_id|abort_if_id_already_exists|drop_collection_first|log_errors
// toCopyCollections = [
//     { srcCollection: "fs.chunks", query: {}, projection: {}, dstCollection: "fs.chunks", idPolicy: "log_errors" },
//     { srcCollection: "fs.files", query: {}, projection: {}, dstCollection: "fs.files", idPolicy: "log_errors" }
// ];

// toRecreateViews = []

// totalCopyResult = {
//     result: {},
//     fails: [],
// }

// //Copy collections
// for (let collection of toCopyCollections) {
//     await(copyCollection(collection));
// }

// //Recreate database readonly views
// for (let view of toRecreateViews) {
//     const viewOn = tojson(view.viewOn);
//     const viewName = tojson(view.name);
//     const script = `var dropIfExists=true;
//     if (dropIfExists){
//         db.getCollection(${viewName}).drop();
//     }
//     db.getCollection(${viewOn}).aggregate(${tojson(view.pipeline)}).saveAsView(${viewName}, ${tojson(view.options)})`;
//     const rst = await(mb.runScript({ connection: dstConnection, db: dstDb, script }));
//     if (!(rst && rst.ok)) {
//         console.error(rst.message);
//     } else {
//         console.log(`re-created readonly view ${viewName} `);
//     }
// }


// if (shouldCreateIndex) {
//     let indexCreationPrompted = false;
//     let srcCollections = toCopyCollections.filter(it => it["shouldCreateIndex"] !== false).map(it => it.srcCollection)
//     srcCollections.forEach(it => {
//         let indexes = mb.runScript({ connection: srcConnection, db: srcDb, script: `db.getCollection(${tojson(it)}).getIndexes();` });
//         if (indexes.length > 1) {
//             let toCopyCollection = _.find(toCopyCollections, { srcCollection: it });
//             if (!toCopyCollection) return;

//             let dstCollection = toCopyCollection.dstCollection;

//             indexes.forEach(index => {
//                 if (index.name === "_id_") return;

//                 indexCreationPrompt();

//                 let newIndex = _.cloneDeep(index);

//                 // remove index version and engine info, these info may fail createIndexes operator.
//                 delete newIndex.v;
//                 delete newIndex.textIndexVersion;
//                 delete newIndex["2dsphereIndexVersion"];
//                 delete newIndex.storageEngine;

//                 newIndex.ns = `${dstDb}.${dstCollection}`;

//                 console.log(`create index ${newIndex.name} for "${dstDb}.${dstCollection}"`);
//                 db.runCommand({
//                     createIndexes: dstCollection,
//                     indexes: [newIndex]
//                 });
//             })
//         }
//     });

//     if (indexCreationPrompted)
//         console.log("create index complete.")
// }

// if (totalCopyResult.result) {
//     let success = 0;
//     let failed = 0;
//     let collections = _.keys(totalCopyResult.result);
//     collections.forEach((key) => {
//         let obj = totalCopyResult.result[key];
//         success += obj.nInserted + obj.nModified;
//         failed += obj.failed;
//     });

//     console.log(`
// ${success} document(s) of ${collections.length} collection(s) have been copied.\n`, totalCopyResult.result);

//     if (failed) {
//         console.log(`${failed} document(s) haven't been copied, please check failed list below.`);
//     } else {
//         console.log("All documents copied successfully.");
//     }
// }

// if (totalCopyResult.fails.length) {
//     console.log("All failed objects\n", totalCopyResult.fails);
// }

// //-------------------END DRIVE---------------------------------//

//-------------------START INVOICES---------------------------------//
srcDb = "invoices";
dstDb = "invoices";

use(dstDb);

//idPolicy: overwrite_with_same_id|always_insert_with_new_id|insert_with_new_id_if_id_exists|skip_documents_with_existing_id|abort_if_id_already_exists|drop_collection_first|log_errors
toCopyCollections = [
    { srcCollection: "tblInvoices", query: {}, projection: {}, dstCollection: "tblInvoices", idPolicy: "log_errors" }
];

toRecreateViews = []

// if have more indexes than default index (_id), create index after copy data.

totalCopyResult = {
    result: {},
    fails: [],
}

//Copy collections
for (let collection of toCopyCollections) {
    await(copyCollection(collection));
}

//Recreate database readonly views
for (let view of toRecreateViews) {
    const viewOn = tojson(view.viewOn);
    const viewName = tojson(view.name);
    const script = `var dropIfExists=false;
    if (dropIfExists){
        db.getCollection(${viewName}).drop();
    }
    db.getCollection(${viewOn}).aggregate(${tojson(view.pipeline)}).saveAsView(${viewName}, ${tojson(view.options)})`;
    const rst = await(mb.runScript({ connection: dstConnection, db: dstDb, script }));
    if (!(rst && rst.ok)) {
        console.error(rst.message);
    } else {
        console.log(`re-created readonly view ${viewName} `);
    }
}


if (shouldCreateIndex) {
    let indexCreationPrompted = false;
    let srcCollections = toCopyCollections.filter(it => it["shouldCreateIndex"] !== false).map(it => it.srcCollection)
    srcCollections.forEach(it => {
        let indexes = mb.runScript({ connection: srcConnection, db: srcDb, script: `db.getCollection(${tojson(it)}).getIndexes();` });
        if (indexes.length > 1) {
            let toCopyCollection = _.find(toCopyCollections, { srcCollection: it });
            if (!toCopyCollection) return;

            let dstCollection = toCopyCollection.dstCollection;

            indexes.forEach(index => {
                if (index.name === "_id_") return;

                indexCreationPrompt();

                let newIndex = _.cloneDeep(index);

                // remove index version and engine info, these info may fail createIndexes operator.
                delete newIndex.v;
                delete newIndex.textIndexVersion;
                delete newIndex["2dsphereIndexVersion"];
                delete newIndex.storageEngine;

                newIndex.ns = `${dstDb}.${dstCollection}`;

                console.log(`create index ${newIndex.name} for "${dstDb}.${dstCollection}"`);
                db.runCommand({
                    createIndexes: dstCollection,
                    indexes: [newIndex]
                });
            })
        }
    });

    if (indexCreationPrompted)
        console.log("create index complete.")
}

if (totalCopyResult.result) {
    let success = 0;
    let failed = 0;
    let collections = _.keys(totalCopyResult.result);
    collections.forEach((key) => {
        let obj = totalCopyResult.result[key];
        success += obj.nInserted + obj.nModified;
        failed += obj.failed;
    });

    console.log(`
${success} document(s) of ${collections.length} collection(s) have been copied.\n`, totalCopyResult.result);

    if (failed) {
        console.log(`${failed} document(s) haven't been copied, please check failed list below.`);
    } else {
        console.log("All documents copied successfully.");
    }
}

if (totalCopyResult.fails.length) {
    console.log("All failed objects\n", totalCopyResult.fails);
}

//-------------------END INVOICES---------------------------------//

//-------------------START LOGGER---------------------------------//
srcDb = "logger";
dstDb = "logger";

use(dstDb);

//idPolicy: overwrite_with_same_id|always_insert_with_new_id|insert_with_new_id_if_id_exists|skip_documents_with_existing_id|abort_if_id_already_exists|drop_collection_first|log_errors
toCopyCollections = [
    { srcCollection: "tblHistorical", query: {}, projection: {}, dstCollection: "tblHistorical", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblLogger", query: {}, projection: {}, dstCollection: "tblLogger", idPolicy: "overwrite_with_same_id" }
];

toRecreateViews = []

totalCopyResult = {
    result: {},
    fails: [],
}

//Copy collections
for (let collection of toCopyCollections) {
    await(copyCollection(collection));
}

//Recreate database readonly views
for (let view of toRecreateViews) {
    const viewOn = tojson(view.viewOn);
    const viewName = tojson(view.name);
    const script = `var dropIfExists=true;
    if (dropIfExists){
        db.getCollection(${viewName}).drop();
    }
    db.getCollection(${viewOn}).aggregate(${tojson(view.pipeline)}).saveAsView(${viewName}, ${tojson(view.options)})`;
    const rst = await(mb.runScript({ connection: dstConnection, db: dstDb, script }));
    if (!(rst && rst.ok)) {
        console.error(rst.message);
    } else {
        console.log(`re-created readonly view ${viewName} `);
    }
}


if (shouldCreateIndex) {
    let indexCreationPrompted = false;
    let srcCollections = toCopyCollections.filter(it => it["shouldCreateIndex"] !== false).map(it => it.srcCollection)
    srcCollections.forEach(it => {
        let indexes = mb.runScript({ connection: srcConnection, db: srcDb, script: `db.getCollection(${tojson(it)}).getIndexes();` });
        if (indexes.length > 1) {
            let toCopyCollection = _.find(toCopyCollections, { srcCollection: it });
            if (!toCopyCollection) return;

            let dstCollection = toCopyCollection.dstCollection;

            indexes.forEach(index => {
                if (index.name === "_id_") return;

                indexCreationPrompt();

                let newIndex = _.cloneDeep(index);

                // remove index version and engine info, these info may fail createIndexes operator.
                delete newIndex.v;
                delete newIndex.textIndexVersion;
                delete newIndex["2dsphereIndexVersion"];
                delete newIndex.storageEngine;

                newIndex.ns = `${dstDb}.${dstCollection}`;

                console.log(`create index ${newIndex.name} for "${dstDb}.${dstCollection}"`);
                db.runCommand({
                    createIndexes: dstCollection,
                    indexes: [newIndex]
                });
            })
        }
    });

    if (indexCreationPrompted)
        console.log("create index complete.")
}

if (totalCopyResult.result) {
    let success = 0;
    let failed = 0;
    let collections = _.keys(totalCopyResult.result);
    collections.forEach((key) => {
        let obj = totalCopyResult.result[key];
        success += obj.nInserted + obj.nModified;
        failed += obj.failed;
    });

    console.log(`
${success} document(s) of ${collections.length} collection(s) have been copied.\n`, totalCopyResult.result);

    if (failed) {
        console.log(`${failed} document(s) haven't been copied, please check failed list below.`);
    } else {
        console.log("All documents copied successfully.");
    }
}

if (totalCopyResult.fails.length) {
    console.log("All failed objects\n", totalCopyResult.fails);
}

//-------------------END LOGGER---------------------------------//

//-------------------START MESSENGER---------------------------------//
srcDb = "messenger";
dstDb = "messenger";

use(dstDb);

//idPolicy: overwrite_with_same_id|always_insert_with_new_id|insert_with_new_id_if_id_exists|skip_documents_with_existing_id|abort_if_id_already_exists|drop_collection_first|log_errors
toCopyCollections = [
    { srcCollection: "tblChats", query: {}, projection: {}, dstCollection: "tblChats", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblMessages", query: {}, projection: {}, dstCollection: "tblMessages", idPolicy: "overwrite_with_same_id" }
];

toRecreateViews = []

totalCopyResult = {
    result: {},
    fails: [],
}

//Copy collections
for (let collection of toCopyCollections) {
    await(copyCollection(collection));
}

//Recreate database readonly views
for (let view of toRecreateViews) {
    const viewOn = tojson(view.viewOn);
    const viewName = tojson(view.name);
    const script = `var dropIfExists=true;
    if (dropIfExists){
        db.getCollection(${viewName}).drop();
    }
    db.getCollection(${viewOn}).aggregate(${tojson(view.pipeline)}).saveAsView(${viewName}, ${tojson(view.options)})`;
    const rst = await(mb.runScript({ connection: dstConnection, db: dstDb, script }));
    if (!(rst && rst.ok)) {
        console.error(rst.message);
    } else {
        console.log(`re-created readonly view ${viewName} `);
    }
}


if (shouldCreateIndex) {
    let indexCreationPrompted = false;
    let srcCollections = toCopyCollections.filter(it => it["shouldCreateIndex"] !== false).map(it => it.srcCollection)
    srcCollections.forEach(it => {
        let indexes = mb.runScript({ connection: srcConnection, db: srcDb, script: `db.getCollection(${tojson(it)}).getIndexes();` });
        if (indexes.length > 1) {
            let toCopyCollection = _.find(toCopyCollections, { srcCollection: it });
            if (!toCopyCollection) return;

            let dstCollection = toCopyCollection.dstCollection;

            indexes.forEach(index => {
                if (index.name === "_id_") return;

                indexCreationPrompt();

                let newIndex = _.cloneDeep(index);

                // remove index version and engine info, these info may fail createIndexes operator.
                delete newIndex.v;
                delete newIndex.textIndexVersion;
                delete newIndex["2dsphereIndexVersion"];
                delete newIndex.storageEngine;

                newIndex.ns = `${dstDb}.${dstCollection}`;

                console.log(`create index ${newIndex.name} for "${dstDb}.${dstCollection}"`);
                db.runCommand({
                    createIndexes: dstCollection,
                    indexes: [newIndex]
                });
            })
        }
    });

    if (indexCreationPrompted)
        console.log("create index complete.")
}

if (totalCopyResult.result) {
    let success = 0;
    let failed = 0;
    let collections = _.keys(totalCopyResult.result);
    collections.forEach((key) => {
        let obj = totalCopyResult.result[key];
        success += obj.nInserted + obj.nModified;
        failed += obj.failed;
    });

    console.log(`
${success} document(s) of ${collections.length} collection(s) have been copied.\n`, totalCopyResult.result);

    if (failed) {
        console.log(`${failed} document(s) haven't been copied, please check failed list below.`);
    } else {
        console.log("All documents copied successfully.");
    }
}

if (totalCopyResult.fails.length) {
    console.log("All failed objects\n", totalCopyResult.fails);
}

//-------------------END MESSENGER---------------------------------//

//-------------------START MONGOWATCH---------------------------------//
srcDb = "mongoWatch";
dstDb = "mongoWatch";

use(dstDb);

//idPolicy: overwrite_with_same_id|always_insert_with_new_id|insert_with_new_id_if_id_exists|skip_documents_with_existing_id|abort_if_id_already_exists|drop_collection_first|log_errors
toCopyCollections = [
    { srcCollection: "tblRsStatus", query: {}, projection: {}, dstCollection: "tblRsStatus", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblRsStatusHistorical", query: {}, projection: {}, dstCollection: "tblRsStatusHistorical", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblServerStatus", query: {}, projection: {}, dstCollection: "tblServerStatus", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblServerStatusHistorical", query: {}, projection: {}, dstCollection: "tblServerStatusHistorical", idPolicy: "overwrite_with_same_id" }
];

toRecreateViews = []

totalCopyResult = {
    result: {},
    fails: [],
}

//Copy collections
for (let collection of toCopyCollections) {
    await(copyCollection(collection));
}

//Recreate database readonly views
for (let view of toRecreateViews) {
    const viewOn = tojson(view.viewOn);
    const viewName = tojson(view.name);
    const script = `var dropIfExists=true;
    if (dropIfExists){
        db.getCollection(${viewName}).drop();
    }
    db.getCollection(${viewOn}).aggregate(${tojson(view.pipeline)}).saveAsView(${viewName}, ${tojson(view.options)})`;
    const rst = await(mb.runScript({ connection: dstConnection, db: dstDb, script }));
    if (!(rst && rst.ok)) {
        console.error(rst.message);
    } else {
        console.log(`re-created readonly view ${viewName} `);
    }
}


if (shouldCreateIndex) {
    let indexCreationPrompted = false;
    let srcCollections = toCopyCollections.filter(it => it["shouldCreateIndex"] !== false).map(it => it.srcCollection)
    srcCollections.forEach(it => {
        let indexes = mb.runScript({ connection: srcConnection, db: srcDb, script: `db.getCollection(${tojson(it)}).getIndexes();` });
        if (indexes.length > 1) {
            let toCopyCollection = _.find(toCopyCollections, { srcCollection: it });
            if (!toCopyCollection) return;

            let dstCollection = toCopyCollection.dstCollection;

            indexes.forEach(index => {
                if (index.name === "_id_") return;

                indexCreationPrompt();

                let newIndex = _.cloneDeep(index);

                // remove index version and engine info, these info may fail createIndexes operator.
                delete newIndex.v;
                delete newIndex.textIndexVersion;
                delete newIndex["2dsphereIndexVersion"];
                delete newIndex.storageEngine;

                newIndex.ns = `${dstDb}.${dstCollection}`;

                console.log(`create index ${newIndex.name} for "${dstDb}.${dstCollection}"`);
                db.runCommand({
                    createIndexes: dstCollection,
                    indexes: [newIndex]
                });
            })
        }
    });

    if (indexCreationPrompted)
        console.log("create index complete.")
}

if (totalCopyResult.result) {
    let success = 0;
    let failed = 0;
    let collections = _.keys(totalCopyResult.result);
    collections.forEach((key) => {
        let obj = totalCopyResult.result[key];
        success += obj.nInserted + obj.nModified;
        failed += obj.failed;
    });

    console.log(`
${success} document(s) of ${collections.length} collection(s) have been copied.\n`, totalCopyResult.result);

    if (failed) {
        console.log(`${failed} document(s) haven't been copied, please check failed list below.`);
    } else {
        console.log("All documents copied successfully.");
    }
}

if (totalCopyResult.fails.length) {
    console.log("All failed objects\n", totalCopyResult.fails);
}

//-------------------END MONGOWATCH---------------------------------//

//-------------------START REPORTING---------------------------------//
srcDb = "reporting";
dstDb = "reporting";

use(dstDb);

//idPolicy: overwrite_with_same_id|always_insert_with_new_id|insert_with_new_id_if_id_exists|skip_documents_with_existing_id|abort_if_id_already_exists|drop_collection_first|log_errors
toCopyCollections = [
    { srcCollection: "tblAuditDataConnectors", query: {}, projection: {}, dstCollection: "tblAuditDataConnectors", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblAuditFilterFields", query: {}, projection: {}, dstCollection: "tblAuditFilterFields", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblAuditReports", query: {}, projection: {}, dstCollection: "tblAuditReports", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblDataConnectors", query: {}, projection: {}, dstCollection: "tblDataConnectors", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblDataConnectors_new_20231209", query: {}, projection: {}, dstCollection: "tblDataConnectors_new_20231209", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblDataConnectors_new_20231212", query: {}, projection: {}, dstCollection: "tblDataConnectors_new_20231212", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblDataConnectors1", query: {}, projection: {}, dstCollection: "tblDataConnectors1", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblFilterFields", query: {}, projection: {}, dstCollection: "tblFilterFields", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblFilterFields_Old", query: {}, projection: {}, dstCollection: "tblFilterFields_Old", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblReports", query: {}, projection: {}, dstCollection: "tblReports", idPolicy: "overwrite_with_same_id" }
];

toRecreateViews = []

totalCopyResult = {
    result: {},
    fails: [],
}

//Copy collections
for (let collection of toCopyCollections) {
    await(copyCollection(collection));
}

//Recreate database readonly views
for (let view of toRecreateViews) {
    const viewOn = tojson(view.viewOn);
    const viewName = tojson(view.name);
    const script = `var dropIfExists=true;
    if (dropIfExists){
        db.getCollection(${viewName}).drop();
    }
    db.getCollection(${viewOn}).aggregate(${tojson(view.pipeline)}).saveAsView(${viewName}, ${tojson(view.options)})`;
    const rst = await(mb.runScript({ connection: dstConnection, db: dstDb, script }));
    if (!(rst && rst.ok)) {
        console.error(rst.message);
    } else {
        console.log(`re-created readonly view ${viewName} `);
    }
}


if (shouldCreateIndex) {
    let indexCreationPrompted = false;
    let srcCollections = toCopyCollections.filter(it => it["shouldCreateIndex"] !== false).map(it => it.srcCollection)
    srcCollections.forEach(it => {
        let indexes = mb.runScript({ connection: srcConnection, db: srcDb, script: `db.getCollection(${tojson(it)}).getIndexes();` });
        if (indexes.length > 1) {
            let toCopyCollection = _.find(toCopyCollections, { srcCollection: it });
            if (!toCopyCollection) return;

            let dstCollection = toCopyCollection.dstCollection;

            indexes.forEach(index => {
                if (index.name === "_id_") return;

                indexCreationPrompt();

                let newIndex = _.cloneDeep(index);

                // remove index version and engine info, these info may fail createIndexes operator.
                delete newIndex.v;
                delete newIndex.textIndexVersion;
                delete newIndex["2dsphereIndexVersion"];
                delete newIndex.storageEngine;

                newIndex.ns = `${dstDb}.${dstCollection}`;

                console.log(`create index ${newIndex.name} for "${dstDb}.${dstCollection}"`);
                db.runCommand({
                    createIndexes: dstCollection,
                    indexes: [newIndex]
                });
            })
        }
    });

    if (indexCreationPrompted)
        console.log("create index complete.")
}

if (totalCopyResult.result) {
    let success = 0;
    let failed = 0;
    let collections = _.keys(totalCopyResult.result);
    collections.forEach((key) => {
        let obj = totalCopyResult.result[key];
        success += obj.nInserted + obj.nModified;
        failed += obj.failed;
    });

    console.log(`
${success} document(s) of ${collections.length} collection(s) have been copied.\n`, totalCopyResult.result);

    if (failed) {
        console.log(`${failed} document(s) haven't been copied, please check failed list below.`);
    } else {
        console.log("All documents copied successfully.");
    }
}

if (totalCopyResult.fails.length) {
    console.log("All failed objects\n", totalCopyResult.fails);
}

//-------------------END REPORTING---------------------------------//

//-------------------START SCANIN---------------------------------//
srcDb = "scanin";
dstDb = "scanin";

use(dstDb);

//idPolicy: overwrite_with_same_id|always_insert_with_new_id|insert_with_new_id_if_id_exists|skip_documents_with_existing_id|abort_if_id_already_exists|drop_collection_first|log_errors
toCopyCollections = [
    { srcCollection: "tblAccess", query: {}, projection: {}, dstCollection: "tblAccess", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblCards", query: {}, projection: {}, dstCollection: "tblCards", idPolicy: "overwrite_with_same_id" }
];

toRecreateViews = []

totalCopyResult = {
    result: {},
    fails: [],
}

//Copy collections
for (let collection of toCopyCollections) {
    await(copyCollection(collection));
}

//Recreate database readonly views
for (let view of toRecreateViews) {
    const viewOn = tojson(view.viewOn);
    const viewName = tojson(view.name);
    const script = `var dropIfExists=true;
    if (dropIfExists){
        db.getCollection(${viewName}).drop();
    }
    db.getCollection(${viewOn}).aggregate(${tojson(view.pipeline)}).saveAsView(${viewName}, ${tojson(view.options)})`;
    const rst = await(mb.runScript({ connection: dstConnection, db: dstDb, script }));
    if (!(rst && rst.ok)) {
        console.error(rst.message);
    } else {
        console.log(`re-created readonly view ${viewName} `);
    }
}


if (shouldCreateIndex) {
    let indexCreationPrompted = false;
    let srcCollections = toCopyCollections.filter(it => it["shouldCreateIndex"] !== false).map(it => it.srcCollection)
    srcCollections.forEach(it => {
        let indexes = mb.runScript({ connection: srcConnection, db: srcDb, script: `db.getCollection(${tojson(it)}).getIndexes();` });
        if (indexes.length > 1) {
            let toCopyCollection = _.find(toCopyCollections, { srcCollection: it });
            if (!toCopyCollection) return;

            let dstCollection = toCopyCollection.dstCollection;

            indexes.forEach(index => {
                if (index.name === "_id_") return;

                indexCreationPrompt();

                let newIndex = _.cloneDeep(index);

                // remove index version and engine info, these info may fail createIndexes operator.
                delete newIndex.v;
                delete newIndex.textIndexVersion;
                delete newIndex["2dsphereIndexVersion"];
                delete newIndex.storageEngine;

                newIndex.ns = `${dstDb}.${dstCollection}`;

                console.log(`create index ${newIndex.name} for "${dstDb}.${dstCollection}"`);
                db.runCommand({
                    createIndexes: dstCollection,
                    indexes: [newIndex]
                });
            })
        }
    });

    if (indexCreationPrompted)
        console.log("create index complete.")
}

if (totalCopyResult.result) {
    let success = 0;
    let failed = 0;
    let collections = _.keys(totalCopyResult.result);
    collections.forEach((key) => {
        let obj = totalCopyResult.result[key];
        success += obj.nInserted + obj.nModified;
        failed += obj.failed;
    });

    console.log(`
${success} document(s) of ${collections.length} collection(s) have been copied.\n`, totalCopyResult.result);

    if (failed) {
        console.log(`${failed} document(s) haven't been copied, please check failed list below.`);
    } else {
        console.log("All documents copied successfully.");
    }
}

if (totalCopyResult.fails.length) {
    console.log("All failed objects\n", totalCopyResult.fails);
}

//-------------------END SCANIN---------------------------------//

//-------------------START SMS---------------------------------//
srcDb = "sms";
dstDb = "sms";

use(dstDb);

//idPolicy: overwrite_with_same_id|always_insert_with_new_id|insert_with_new_id_if_id_exists|skip_documents_with_existing_id|abort_if_id_already_exists|drop_collection_first|log_errors
toCopyCollections = [
    { srcCollection: "tblGateways", query: {}, projection: {}, dstCollection: "tblGateways", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblHistorical", query: {}, projection: {}, dstCollection: "tblHistorical", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblSenders", query: {}, projection: {}, dstCollection: "tblSenders", idPolicy: "overwrite_with_same_id" }
];

toRecreateViews = []

totalCopyResult = {
    result: {},
    fails: [],
}

//Copy collections
for (let collection of toCopyCollections) {
    await(copyCollection(collection));
}

//Recreate database readonly views
for (let view of toRecreateViews) {
    const viewOn = tojson(view.viewOn);
    const viewName = tojson(view.name);
    const script = `var dropIfExists=true;
    if (dropIfExists){
        db.getCollection(${viewName}).drop();
    }
    db.getCollection(${viewOn}).aggregate(${tojson(view.pipeline)}).saveAsView(${viewName}, ${tojson(view.options)})`;
    const rst = await(mb.runScript({ connection: dstConnection, db: dstDb, script }));
    if (!(rst && rst.ok)) {
        console.error(rst.message);
    } else {
        console.log(`re-created readonly view ${viewName} `);
    }
}


if (shouldCreateIndex) {
    let indexCreationPrompted = false;
    let srcCollections = toCopyCollections.filter(it => it["shouldCreateIndex"] !== false).map(it => it.srcCollection)
    srcCollections.forEach(it => {
        let indexes = mb.runScript({ connection: srcConnection, db: srcDb, script: `db.getCollection(${tojson(it)}).getIndexes();` });
        if (indexes.length > 1) {
            let toCopyCollection = _.find(toCopyCollections, { srcCollection: it });
            if (!toCopyCollection) return;

            let dstCollection = toCopyCollection.dstCollection;

            indexes.forEach(index => {
                if (index.name === "_id_") return;

                indexCreationPrompt();

                let newIndex = _.cloneDeep(index);

                // remove index version and engine info, these info may fail createIndexes operator.
                delete newIndex.v;
                delete newIndex.textIndexVersion;
                delete newIndex["2dsphereIndexVersion"];
                delete newIndex.storageEngine;

                newIndex.ns = `${dstDb}.${dstCollection}`;

                console.log(`create index ${newIndex.name} for "${dstDb}.${dstCollection}"`);
                db.runCommand({
                    createIndexes: dstCollection,
                    indexes: [newIndex]
                });
            })
        }
    });

    if (indexCreationPrompted)
        console.log("create index complete.")
}

if (totalCopyResult.result) {
    let success = 0;
    let failed = 0;
    let collections = _.keys(totalCopyResult.result);
    collections.forEach((key) => {
        let obj = totalCopyResult.result[key];
        success += obj.nInserted + obj.nModified;
        failed += obj.failed;
    });

    console.log(`
${success} document(s) of ${collections.length} collection(s) have been copied.\n`, totalCopyResult.result);

    if (failed) {
        console.log(`${failed} document(s) haven't been copied, please check failed list below.`);
    } else {
        console.log("All documents copied successfully.");
    }
}

if (totalCopyResult.fails.length) {
    console.log("All failed objects\n", totalCopyResult.fails);
}

//-------------------END SMS---------------------------------//

//-------------------START STORE---------------------------------//
srcDb = "store";
dstDb = "store";

use(dstDb);

//idPolicy: overwrite_with_same_id|always_insert_with_new_id|insert_with_new_id_if_id_exists|skip_documents_with_existing_id|abort_if_id_already_exists|drop_collection_first|log_errors
toCopyCollections = [
    { srcCollection: "tblCarts", query: {}, projection: {}, dstCollection: "tblCarts", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblCollectionPoints", query: {}, projection: {}, dstCollection: "tblCollectionPoints", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblCouriers", query: {}, projection: {}, dstCollection: "tblCouriers", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblCustomers", query: {}, projection: {}, dstCollection: "tblCustomers", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblDepartments", query: {}, projection: {}, dstCollection: "tblDepartments", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblOrders", query: {}, projection: {}, dstCollection: "tblOrders", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblProducts", query: {}, projection: {}, dstCollection: "tblProducts", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblReviews", query: {}, projection: {}, dstCollection: "tblReviews", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblStores", query: {}, projection: {}, dstCollection: "tblStores", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblSuppliers", query: {}, projection: {}, dstCollection: "tblSuppliers", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblVouchers", query: {}, projection: {}, dstCollection: "tblVouchers", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblWishlists", query: {}, projection: {}, dstCollection: "tblWishlists", idPolicy: "overwrite_with_same_id" }
];

toRecreateViews = []

totalCopyResult = {
    result: {},
    fails: [],
}

//Copy collections
for (let collection of toCopyCollections) {
    await(copyCollection(collection));
}

//Recreate database readonly views
for (let view of toRecreateViews) {
    const viewOn = tojson(view.viewOn);
    const viewName = tojson(view.name);
    const script = `var dropIfExists=true;
    if (dropIfExists){
        db.getCollection(${viewName}).drop();
    }
    db.getCollection(${viewOn}).aggregate(${tojson(view.pipeline)}).saveAsView(${viewName}, ${tojson(view.options)})`;
    const rst = await(mb.runScript({ connection: dstConnection, db: dstDb, script }));
    if (!(rst && rst.ok)) {
        console.error(rst.message);
    } else {
        console.log(`re-created readonly view ${viewName} `);
    }
}


if (shouldCreateIndex) {
    let indexCreationPrompted = false;
    let srcCollections = toCopyCollections.filter(it => it["shouldCreateIndex"] !== false).map(it => it.srcCollection)
    srcCollections.forEach(it => {
        let indexes = mb.runScript({ connection: srcConnection, db: srcDb, script: `db.getCollection(${tojson(it)}).getIndexes();` });
        if (indexes.length > 1) {
            let toCopyCollection = _.find(toCopyCollections, { srcCollection: it });
            if (!toCopyCollection) return;

            let dstCollection = toCopyCollection.dstCollection;

            indexes.forEach(index => {
                if (index.name === "_id_") return;

                indexCreationPrompt();

                let newIndex = _.cloneDeep(index);

                // remove index version and engine info, these info may fail createIndexes operator.
                delete newIndex.v;
                delete newIndex.textIndexVersion;
                delete newIndex["2dsphereIndexVersion"];
                delete newIndex.storageEngine;

                newIndex.ns = `${dstDb}.${dstCollection}`;

                console.log(`create index ${newIndex.name} for "${dstDb}.${dstCollection}"`);
                db.runCommand({
                    createIndexes: dstCollection,
                    indexes: [newIndex]
                });
            })
        }
    });

    if (indexCreationPrompted)
        console.log("create index complete.")
}

if (totalCopyResult.result) {
    let success = 0;
    let failed = 0;
    let collections = _.keys(totalCopyResult.result);
    collections.forEach((key) => {
        let obj = totalCopyResult.result[key];
        success += obj.nInserted + obj.nModified;
        failed += obj.failed;
    });

    console.log(`
${success} document(s) of ${collections.length} collection(s) have been copied.\n`, totalCopyResult.result);

    if (failed) {
        console.log(`${failed} document(s) haven't been copied, please check failed list below.`);
    } else {
        console.log("All documents copied successfully.");
    }
}

if (totalCopyResult.fails.length) {
    console.log("All failed objects\n", totalCopyResult.fails);
}

//-------------------END STORE---------------------------------//

//-------------------START SUBSCRIPTIONS---------------------------------//
srcDb = "subscriptions";
dstDb = "subscriptions";

use(dstDb);

//idPolicy: overwrite_with_same_id|always_insert_with_new_id|insert_with_new_id_if_id_exists|skip_documents_with_existing_id|abort_if_id_already_exists|drop_collection_first|log_errors
toCopyCollections = [
    { srcCollection: "tblHistorical", query: {}, projection: {}, dstCollection: "tblHistorical", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblNotify", query: {}, projection: {}, dstCollection: "tblNotify", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblPlans", query: {}, projection: {}, dstCollection: "tblPlans", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblSubscriptions", query: {}, projection: {}, dstCollection: "tblSubscriptions", idPolicy: "overwrite_with_same_id" }
];

toRecreateViews = []

totalCopyResult = {
    result: {},
    fails: [],
}

//Copy collections
for (let collection of toCopyCollections) {
    await(copyCollection(collection));
}

//Recreate database readonly views
for (let view of toRecreateViews) {
    const viewOn = tojson(view.viewOn);
    const viewName = tojson(view.name);
    const script = `var dropIfExists=true;
    if (dropIfExists){
        db.getCollection(${viewName}).drop();
    }
    db.getCollection(${viewOn}).aggregate(${tojson(view.pipeline)}).saveAsView(${viewName}, ${tojson(view.options)})`;
    const rst = await(mb.runScript({ connection: dstConnection, db: dstDb, script }));
    if (!(rst && rst.ok)) {
        console.error(rst.message);
    } else {
        console.log(`re-created readonly view ${viewName} `);
    }
}


if (shouldCreateIndex) {
    let indexCreationPrompted = false;
    let srcCollections = toCopyCollections.filter(it => it["shouldCreateIndex"] !== false).map(it => it.srcCollection)
    srcCollections.forEach(it => {
        let indexes = mb.runScript({ connection: srcConnection, db: srcDb, script: `db.getCollection(${tojson(it)}).getIndexes();` });
        if (indexes.length > 1) {
            let toCopyCollection = _.find(toCopyCollections, { srcCollection: it });
            if (!toCopyCollection) return;

            let dstCollection = toCopyCollection.dstCollection;

            indexes.forEach(index => {
                if (index.name === "_id_") return;

                indexCreationPrompt();

                let newIndex = _.cloneDeep(index);

                // remove index version and engine info, these info may fail createIndexes operator.
                delete newIndex.v;
                delete newIndex.textIndexVersion;
                delete newIndex["2dsphereIndexVersion"];
                delete newIndex.storageEngine;

                newIndex.ns = `${dstDb}.${dstCollection}`;

                console.log(`create index ${newIndex.name} for "${dstDb}.${dstCollection}"`);
                db.runCommand({
                    createIndexes: dstCollection,
                    indexes: [newIndex]
                });
            })
        }
    });

    if (indexCreationPrompted)
        console.log("create index complete.")
}

if (totalCopyResult.result) {
    let success = 0;
    let failed = 0;
    let collections = _.keys(totalCopyResult.result);
    collections.forEach((key) => {
        let obj = totalCopyResult.result[key];
        success += obj.nInserted + obj.nModified;
        failed += obj.failed;
    });

    console.log(`
${success} document(s) of ${collections.length} collection(s) have been copied.\n`, totalCopyResult.result);

    if (failed) {
        console.log(`${failed} document(s) haven't been copied, please check failed list below.`);
    } else {
        console.log("All documents copied successfully.");
    }
}

if (totalCopyResult.fails.length) {
    console.log("All failed objects\n", totalCopyResult.fails);
}

//-------------------END SUBSCRIPTIONS---------------------------------//

//-------------------END TELEMETRY---------------------------------//
srcDb = "telemetry";
dstDb = "telemetry";

use(dstDb);

//idPolicy: overwrite_with_same_id|always_insert_with_new_id|insert_with_new_id_if_id_exists|skip_documents_with_existing_id|abort_if_id_already_exists|drop_collection_first|log_errors
toCopyCollections = [
    { srcCollection: "tblAiPeople", query: {}, projection: {}, dstCollection: "tblAiPeople", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblAuditDevices", query: {}, projection: {}, dstCollection: "tblAuditDevices", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblAuditDeviceTypes", query: {}, projection: {}, dstCollection: "tblAuditDeviceTypes", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblAuditDrivers", query: {}, projection: {}, dstCollection: "tblAuditDrivers", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblAuditMimics", query: {}, projection: {}, dstCollection: "tblAuditMimics", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblComponents", query: {}, projection: {}, dstCollection: "tblComponents", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblDevices", query: {}, projection: {}, dstCollection: "tblDevices", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblDevices_20231103", query: {}, projection: {}, dstCollection: "tblDevices_20231103", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblDevices_20231128", query: {}, projection: {}, dstCollection: "tblDevices_20231128", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblDeviceTypes", query: {}, projection: {}, dstCollection: "tblDeviceTypes", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblDeviceTypes_20231107", query: {}, projection: {}, dstCollection: "tblDeviceTypes_20231107", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblDrivers", query: {}, projection: {}, dstCollection: "tblDrivers", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblGraphics", query: {}, projection: {}, dstCollection: "tblGraphics", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblHistorical", query: {}, projection: {}, dstCollection: "tblHistorical", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblMimics", query: {}, projection: {}, dstCollection: "tblMimics", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblMimicsAuditExact", query: {}, projection: {}, dstCollection: "tblMimicsAuditExact", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblRtuHistorical", query: {}, projection: {}, dstCollection: "tblRtuHistorical", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblZones", query: {}, projection: {}, dstCollection: "tblZones", idPolicy: "overwrite_with_same_id" }
];

toRecreateViews = []

totalCopyResult = {
    result: {},
    fails: [],
}

//Copy collections
for (let collection of toCopyCollections) {
    await(copyCollection(collection));
}

//Recreate database readonly views
for (let view of toRecreateViews) {
    const viewOn = tojson(view.viewOn);
    const viewName = tojson(view.name);
    const script = `var dropIfExists=true;
    if (dropIfExists){
        db.getCollection(${viewName}).drop();
    }
    db.getCollection(${viewOn}).aggregate(${tojson(view.pipeline)}).saveAsView(${viewName}, ${tojson(view.options)})`;
    const rst = await(mb.runScript({ connection: dstConnection, db: dstDb, script }));
    if (!(rst && rst.ok)) {
        console.error(rst.message);
    } else {
        console.log(`re-created readonly view ${viewName} `);
    }
}


if (shouldCreateIndex) {
    let indexCreationPrompted = false;
    let srcCollections = toCopyCollections.filter(it => it["shouldCreateIndex"] !== false).map(it => it.srcCollection)
    srcCollections.forEach(it => {
        let indexes = mb.runScript({ connection: srcConnection, db: srcDb, script: `db.getCollection(${tojson(it)}).getIndexes();` });
        if (indexes.length > 1) {
            let toCopyCollection = _.find(toCopyCollections, { srcCollection: it });
            if (!toCopyCollection) return;

            let dstCollection = toCopyCollection.dstCollection;

            indexes.forEach(index => {
                if (index.name === "_id_") return;

                indexCreationPrompt();

                let newIndex = _.cloneDeep(index);

                // remove index version and engine info, these info may fail createIndexes operator.
                delete newIndex.v;
                delete newIndex.textIndexVersion;
                delete newIndex["2dsphereIndexVersion"];
                delete newIndex.storageEngine;

                newIndex.ns = `${dstDb}.${dstCollection}`;

                console.log(`create index ${newIndex.name} for "${dstDb}.${dstCollection}"`);
                db.runCommand({
                    createIndexes: dstCollection,
                    indexes: [newIndex]
                });
            })
        }
    });

    if (indexCreationPrompted)
        console.log("create index complete.")
}

if (totalCopyResult.result) {
    let success = 0;
    let failed = 0;
    let collections = _.keys(totalCopyResult.result);
    collections.forEach((key) => {
        let obj = totalCopyResult.result[key];
        success += obj.nInserted + obj.nModified;
        failed += obj.failed;
    });

    console.log(`
${success} document(s) of ${collections.length} collection(s) have been copied.\n`, totalCopyResult.result);

    if (failed) {
        console.log(`${failed} document(s) haven't been copied, please check failed list below.`);
    } else {
        console.log("All documents copied successfully.");
    }
}

if (totalCopyResult.fails.length) {
    console.log("All failed objects\n", totalCopyResult.fails);
}


//-------------------END TELEMETRY---------------------------------//

//-------------------START TIKIT---------------------------------//
srcDb = "tikit";
dstDb = "tikit";

use(dstDb);

//idPolicy: overwrite_with_same_id|always_insert_with_new_id|insert_with_new_id_if_id_exists|skip_documents_with_existing_id|abort_if_id_already_exists|drop_collection_first|log_errors
toCopyCollections = [
    { srcCollection: "tblAddons", query: {}, projection: {}, dstCollection: "tblAddons", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblGroups", query: {}, projection: {}, dstCollection: "tblGroups", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblInputs", query: {}, projection: {}, dstCollection: "tblInputs", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblJobcards", query: {}, projection: {}, dstCollection: "tblJobcards", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblOrganizations", query: {}, projection: {}, dstCollection: "tblOrganizations", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblTasks", query: {}, projection: {}, dstCollection: "tblTasks", idPolicy: "overwrite_with_same_id" }
];

toRecreateViews = []

totalCopyResult = {
    result: {},
    fails: [],
}

//Copy collections
for (let collection of toCopyCollections) {
    await(copyCollection(collection));
}

//Recreate database readonly views
for (let view of toRecreateViews) {
    const viewOn = tojson(view.viewOn);
    const viewName = tojson(view.name);
    const script = `var dropIfExists=true;
    if (dropIfExists){
        db.getCollection(${viewName}).drop();
    }
    db.getCollection(${viewOn}).aggregate(${tojson(view.pipeline)}).saveAsView(${viewName}, ${tojson(view.options)})`;
    const rst = await(mb.runScript({ connection: dstConnection, db: dstDb, script }));
    if (!(rst && rst.ok)) {
        console.error(rst.message);
    } else {
        console.log(`re-created readonly view ${viewName} `);
    }
}


if (shouldCreateIndex) {
    let indexCreationPrompted = false;
    let srcCollections = toCopyCollections.filter(it => it["shouldCreateIndex"] !== false).map(it => it.srcCollection)
    srcCollections.forEach(it => {
        let indexes = mb.runScript({ connection: srcConnection, db: srcDb, script: `db.getCollection(${tojson(it)}).getIndexes();` });
        if (indexes.length > 1) {
            let toCopyCollection = _.find(toCopyCollections, { srcCollection: it });
            if (!toCopyCollection) return;

            let dstCollection = toCopyCollection.dstCollection;

            indexes.forEach(index => {
                if (index.name === "_id_") return;

                indexCreationPrompt();

                let newIndex = _.cloneDeep(index);

                // remove index version and engine info, these info may fail createIndexes operator.
                delete newIndex.v;
                delete newIndex.textIndexVersion;
                delete newIndex["2dsphereIndexVersion"];
                delete newIndex.storageEngine;

                newIndex.ns = `${dstDb}.${dstCollection}`;

                console.log(`create index ${newIndex.name} for "${dstDb}.${dstCollection}"`);
                db.runCommand({
                    createIndexes: dstCollection,
                    indexes: [newIndex]
                });
            })
        }
    });

    if (indexCreationPrompted)
        console.log("create index complete.")
}

if (totalCopyResult.result) {
    let success = 0;
    let failed = 0;
    let collections = _.keys(totalCopyResult.result);
    collections.forEach((key) => {
        let obj = totalCopyResult.result[key];
        success += obj.nInserted + obj.nModified;
        failed += obj.failed;
    });

    console.log(`
${success} document(s) of ${collections.length} collection(s) have been copied.\n`, totalCopyResult.result);

    if (failed) {
        console.log(`${failed} document(s) haven't been copied, please check failed list below.`);
    } else {
        console.log("All documents copied successfully.");
    }
}

if (totalCopyResult.fails.length) {
    console.log("All failed objects\n", totalCopyResult.fails);
}

//-------------------END TIKIT---------------------------------//

//-------------------START TIMESHEET---------------------------------//
srcDb = "timesheet";
dstDb = "timesheet";

use(dstDb);

//idPolicy: overwrite_with_same_id|always_insert_with_new_id|insert_with_new_id_if_id_exists|skip_documents_with_existing_id|abort_if_id_already_exists|drop_collection_first|log_errors
toCopyCollections = [
    { srcCollection: "tblAuditProjects", query: {}, projection: {}, dstCollection: "tblAuditProjects", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblAuditSheets", query: {}, projection: {}, dstCollection: "tblAuditSheets", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblAuditTasks", query: {}, projection: {}, dstCollection: "tblAuditTasks", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblProjects", query: {}, projection: {}, dstCollection: "tblProjects", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblSheets", query: {}, projection: {}, dstCollection: "tblSheets", idPolicy: "overwrite_with_same_id" },
    { srcCollection: "tblTasks", query: {}, projection: {}, dstCollection: "tblTasks", idPolicy: "overwrite_with_same_id" }
];

toRecreateViews = []

totalCopyResult = {
    result: {},
    fails: [],
}

//Copy collections
for (let collection of toCopyCollections) {
    await(copyCollection(collection));
}

//Recreate database readonly views
for (let view of toRecreateViews) {
    const viewOn = tojson(view.viewOn);
    const viewName = tojson(view.name);
    const script = `var dropIfExists=true;
    if (dropIfExists){
        db.getCollection(${viewName}).drop();
    }
    db.getCollection(${viewOn}).aggregate(${tojson(view.pipeline)}).saveAsView(${viewName}, ${tojson(view.options)})`;
    const rst = await(mb.runScript({ connection: dstConnection, db: dstDb, script }));
    if (!(rst && rst.ok)) {
        console.error(rst.message);
    } else {
        console.log(`re-created readonly view ${viewName} `);
    }
}


if (shouldCreateIndex) {
    let indexCreationPrompted = false;
    let srcCollections = toCopyCollections.filter(it => it["shouldCreateIndex"] !== false).map(it => it.srcCollection)
    srcCollections.forEach(it => {
        let indexes = mb.runScript({ connection: srcConnection, db: srcDb, script: `db.getCollection(${tojson(it)}).getIndexes();` });
        if (indexes.length > 1) {
            let toCopyCollection = _.find(toCopyCollections, { srcCollection: it });
            if (!toCopyCollection) return;

            let dstCollection = toCopyCollection.dstCollection;

            indexes.forEach(index => {
                if (index.name === "_id_") return;

                indexCreationPrompt();

                let newIndex = _.cloneDeep(index);

                // remove index version and engine info, these info may fail createIndexes operator.
                delete newIndex.v;
                delete newIndex.textIndexVersion;
                delete newIndex["2dsphereIndexVersion"];
                delete newIndex.storageEngine;

                newIndex.ns = `${dstDb}.${dstCollection}`;

                console.log(`create index ${newIndex.name} for "${dstDb}.${dstCollection}"`);
                db.runCommand({
                    createIndexes: dstCollection,
                    indexes: [newIndex]
                });
            })
        }
    });

    if (indexCreationPrompted)
        console.log("create index complete.")
}

if (totalCopyResult.result) {
    let success = 0;
    let failed = 0;
    let collections = _.keys(totalCopyResult.result);
    collections.forEach((key) => {
        let obj = totalCopyResult.result[key];
        success += obj.nInserted + obj.nModified;
        failed += obj.failed;
    });

    console.log(`
${success} document(s) of ${collections.length} collection(s) have been copied.\n`, totalCopyResult.result);

    if (failed) {
        console.log(`${failed} document(s) haven't been copied, please check failed list below.`);
    } else {
        console.log("All documents copied successfully.");
    }
}

if (totalCopyResult.fails.length) {
    console.log("All failed objects\n", totalCopyResult.fails);
}

//-------------------END TIMESHEET---------------------------------//
