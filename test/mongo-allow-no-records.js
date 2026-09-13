const assert = require('assert');
const db = require('../db/mongo');

function withCollection(impl) {
    const previous = global.__database;
    global.__database = {
        collection() {
            return impl;
        }
    };
    return () => {
        global.__database = previous;
    };
}

function findCollection(toArray) {
    return {
        find() {
            return {
                project() {
                    return {
                        skip() {
                            return {
                                sort() {
                                    return {
                                        limit() {
                                            return { toArray };
                                        }
                                    };
                                }
                            };
                        }
                    };
                }
            };
        }
    };
}

function aggregateCollection(toArray) {
    return {
        aggregate() {
            return { toArray };
        }
    };
}

describe('allowNoRecordsFound does not mask DAL failures', function () {
    it('aggregate empty + flag resolves []', function () {
        const restore = withCollection(aggregateCollection((cb) => cb(null, [])));
        return db.call({
            params: [],
            operation: 'aggregate',
            collection: 'tblGroups',
            allowNoRecordsFound: true
        }).then(result => {
            assert.deepStrictEqual(result, []);
        }).finally(restore);
    });

    it('aggregate query error still rejects when the flag is set', function () {
        const restore = withCollection(aggregateCollection((cb) => cb(new Error('bad pipeline'), null)));
        return db.call({
            params: [],
            operation: 'aggregate',
            collection: 'tblGroups',
            allowNoRecordsFound: true
        }).then(() => {
            throw new Error('expected reject');
        }, err => {
            assert.strictEqual(err.message, 'bad pipeline');
        }).finally(restore);
    });

    it('aggregate missing collection still rejects when the flag is set', function () {
        const restore = withCollection(aggregateCollection((cb) => cb(new Error('ns not found: tblGroups'), null)));
        return db.call({
            params: [],
            operation: 'aggregate',
            collection: 'tblGroups',
            allowNoRecordsFound: true
        }).then(() => {
            throw new Error('expected reject');
        }, err => {
            assert.ok(/ns not found/.test(err.message));
        }).finally(restore);
    });

    it('find undefined result still rejects code 71 when the flag is set', function () {
        const restore = withCollection(findCollection((cb) => cb(null, undefined)));
        return db.call({
            params: {},
            operation: 'find',
            collection: 'tblGroups',
            allowNoRecordsFound: true
        }).then(() => {
            throw new Error('expected reject');
        }, err => {
            assert.strictEqual(err.code, 71);
            assert.strictEqual(err.message, 'result undefined');
        }).finally(restore);
    });

    it('find query error still rejects code 72 when the flag is set', function () {
        const restore = withCollection(findCollection((cb) => cb(new Error('broken query'), undefined)));
        return db.call({
            params: {},
            operation: 'find',
            collection: 'tblGroups',
            allowNoRecordsFound: true
        }).then(() => {
            throw new Error('expected reject');
        }, err => {
            assert.strictEqual(err.code, 72);
            assert.strictEqual(err.message, 'find error');
        }).finally(restore);
    });

    it('find empty without the flag still rejects code 69', function () {
        const restore = withCollection(findCollection((cb) => cb(null, [])));
        return db.call({
            params: {},
            operation: 'find',
            collection: 'tblGroups'
        }).then(() => {
            throw new Error('expected reject');
        }, err => {
            assert.strictEqual(err.code, 69);
            assert.strictEqual(err.message, 'no records found');
        }).finally(restore);
    });

    it('find with matches still returns documents when the flag is set', function () {
        const docs = [{ _id: 'g1' }];
        const restore = withCollection(findCollection((cb) => cb(null, docs)));
        return db.call({
            params: {},
            operation: 'find',
            collection: 'tblGroups',
            allowNoRecordsFound: true
        }).then(result => {
            assert.deepStrictEqual(result, docs);
        }).finally(restore);
    });

    it('synchronous missing collection throws instead of returning []', function () {
        const previous = global.__database;
        global.__database = {
            collection() {
                throw new Error('ns not found');
            }
        };
        try {
            assert.throws(() => db.call({
                params: [],
                operation: 'aggregate',
                collection: 'tblMissing',
                allowNoRecordsFound: true
            }), /ns not found/);
        } finally {
            global.__database = previous;
        }
    });
});
