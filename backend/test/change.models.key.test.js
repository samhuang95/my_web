require('dotenv').config(); // 最一開始的時候就要讀 .env

const db = require('../src/models/db.js');
const { modelsDB } = require('../src/models/model.js');

/**
 * 1. change the key name "category" to "source" for all documents in the "models" collection.
 * 2. change the key name "tags" to "category" for all documents in the "models" collection.
 * 3. add the values of the "tags" key for all documents in the "models" collection to an empty array.
 */
(async () => {
    await db.connect();

    await db.renameKey('models', 'category', 'source');

    await new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });

    await db.renameKey('models', 'tags', 'category');
    await new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });

    await db.updateMany('models', { tags: [] });
    await db.close();
})();
