require('dotenv').config(); // 最易開始的時候就要讀 .env

const fs = require('fs');
const https = require('https');

const db = require('./src/models/db');
const app = require('./app.js');
const logger = require('./src/utils/logger');

db.connect();

// 避免 Error handler middleware 接收不到錯誤訊息導致 crash
process.on('uncaughtException', (error, origin) => {
    logger.error('----- Uncaught exception -----');
    logger.error(error.stack);
    logger.error('----- Exception origin -----');
    logger.error(origin);

    db.close();

    try {
        var killTimer = setTimeout(() => {
            process.exit(1);
        }, 3000);
        killTimer.unref();
        notification.sendSlackNotifications('API Server shutdown...');
    } catch (e) {
        logger.error('error when exit', e.stack);
    }
});

process.on('unhandledRejection', (error) => {
    logger.error('Uncaughted Exception happens!');
    // 記錄錯誤下來，等到所有其他服務處理完成，然後停掉當前進程。
    logger.error(error.stack);

    db.close();
});

if (process.env.PRODUCTION_ENV === 'true') {
    https
        .createServer(
            {
                key: fs.readFileSync('./src/ssl/private.key'),
                cert: fs.readFileSync('./src/ssl/certificate.crt'),
            },
            app
        )
        .listen(4000, function () {
            notification.sendSlackNotifications('API Server start...');
            logger.info(`listening on https://localhost:4000/`);
        });
} else {
    app.listen(4000, function () {
        // notification.sendSlackNotifications('API Server start...');
        logger.info(`listening on http://localhost:4000/`);
    });
}
