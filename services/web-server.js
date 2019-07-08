const http = require('http');
const express = require('express');
const webServerConfig = require('../config/web-server.js');
const morgan = require('morgan');
const router = require('./router.js');

let httpServer;

module.exports.initialize = function initialize() {
    return new Promise((resolve, reject) => {
        const app = express();
        httpServer = http.createServer(app);

        app.use(morgan('combined'));

        app.use('/api', router);

        httpServer.listen(webServerConfig.port)
            .on('listening', () => {
                console.log(`Web server listening on localhost:${webServerConfig.port}`);

                resolve();
            })
            .on('error', err => {
                reject(err);
            });
    });
}

module.exports.close = function close() {
    return new Promise((resolve, reject) => {
        httpServer.close((err) => {
            if (err) {
                reject(err);
                return;
            }

            resolve();
        });
    });
}
