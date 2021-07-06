var fs = require('fs');

module.exports = (directory, destination) => {
    return new Promise((resolve, reject) => {
        fs.readdir(directory, (err, files) => {
            if (err) {
                return reject(err);
            }

            (function next() {
                var file = files.shift();
                if (!file) {
                    return resolve();
                }

                fs.readFile(directory + '/' + file, (err, content) => {
                    if (err) {
                        return reject(err);
                    }

                    fs.appendFile(destination, '\n' + content, (err) => {
                        if (err) {
                            return reject(err);
                        }

                        return next();
                    });
                });
            })();
        });
    });
};