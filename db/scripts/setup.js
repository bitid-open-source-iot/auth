const fs = require('fs');
const path = require('path');
const filejoin = require('../../lib/file-join');

(async () => {
    fs.unlink(path.join(__dirname, 'setup/tables.sql'), (err) => {})
    const tables = path.join(__dirname, '../tables');
    await filejoin(tables, path.join(__dirname, 'setup/tables.sql'));
    fs.unlink(path.join(__dirname, 'setup/procedures.sql'), (err) => {})
    const procedures = path.join(__dirname, '../procedures');
    await filejoin(procedures, path.join(__dirname, 'setup/procedures.sql'));
    fs.unlink(path.join(__dirname, 'setup.sql'), (err) => {})
    const setup = path.join(__dirname, 'setup');
    await filejoin(setup, path.join(__dirname, 'setup.sql'))
    process.exit(1);
})();