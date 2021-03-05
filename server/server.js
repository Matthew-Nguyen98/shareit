const config = require('./config/config');
const app = require('./config/express');
const db = require('./database/db.js');

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
    db.connect();
    db.initTables();
    // db.close();

    app.listen(config.port, () => {
        console.info(`server started on port ${config.port} (${config.env})`);
    });
}

module.exports = app;
