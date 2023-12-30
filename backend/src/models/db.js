const MongoClient = require('mongodb').MongoClient;
const { ObjectId, Long } = require('mongodb');

const logger = require('../utils/logger.js');

const dbName = process.env.DB_NAME; // 資料庫名稱
let client = null;

let url = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}`;

if (process.env.DEV_MODE === 'true') {
    client = new MongoClient(url);
} else {
    client = new MongoClient(url, {
        tlsCAFile: `${process.env.CERTIFICATE_FILE}`,
    });
}
logger.info(`Connecting to ${url}\n`);

const connect = () => {
    client.connect();
};

const close = () => {
    client.close();
};

const isConnected = async () => {
    return await client.topology.isConnected();
};

const transferIDtoObj = (query) => {
    // transfer _id key to object for mongodb
    if ('_id' in query && typeof query._id === 'string') {
        query._id = new ObjectId(query._id);
    }
};

const LongFromNumber = (value) => {
    return Long.fromNumber(value);
};

const insertOne = async (collectionName, data) => {
    try {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const insertResult = await collection.insertOne(data);

        logger.info(
            `Inserted [${collectionName}] documents => ${insertResult.insertedId}`
        );

        return insertResult.insertedId.toString();
    } catch (error) {
        logger.error(error.stack);
    }
};

const findOne = async (collectionName, query = {}) => {
    try {
        transferIDtoObj(query);

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const result = await collection.findOne(query);

        if (result === null) {
            logger.info(
                `Found [${collectionName}] documents => null query: ${JSON.stringify(
                    query
                )}`
            );
        } else {
            logger.info(
                `Found [${collectionName}] documents => ${
                    result._id
                } query: ${JSON.stringify(query)}`
            );
        }

        return result || {};
    } catch (error) {
        logger.error(error.stack);

        return {};
    }
};

const find = async (
    collectionName,
    query = {},
    skip = 0,
    limit = 0,
    sort = {}
) => {
    try {
        transferIDtoObj(query);

        const db = client.db(dbName);

        const collection = db.collection(collectionName);

        let cursor = collection.find(query);

        if (skip > 0) cursor = cursor.skip(skip);
        if (limit > 0) cursor = cursor.limit(limit);
        if (Object.keys(sort).length > 0) {
            cursor = cursor.sort(sort);
        }

        const result = await cursor.toArray();

        if (result.length === 0) {
            logger.info(
                `Found [${collectionName}] documents => [] query: ${JSON.stringify(
                    query
                )}`
            );
        } else {
            logger.info(
                `Found [${collectionName}] documents => ${
                    result.length
                } query: ${JSON.stringify(query)}`
            );
        }

        return result || [];
    } catch (error) {
        logger.error(error.stack);

        return [];
    }
};

const updateOne = async (collectionName, query, update) => {
    try {
        transferIDtoObj(query);

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const result = await collection.updateOne(query, { $set: update });

        console.log(
            `[${collectionName}] ${
                result.matchedCount
            } document matched the filter criteria ${JSON.stringify(query)}`
        );
        console.log(
            `[${collectionName}] ${result.modifiedCount} document(s) was/were updated.`
        );

        return result.matchedCount === result.modifiedCount &&
            result.matchedCount !== 0
            ? 'success'
            : 'failure';
    } catch (error) {
        console.error(error.stack);

        return 'failure';
    }
};

const updateMany = async (collectionName, update, query = {}) => {
    try {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const result = await collection.updateMany(query, { $set: update });

        console.log(
            `[${collectionName}] ${
                result.matchedCount
            } document matched the filter criteria ${JSON.stringify(query)}`
        );
        console.log(
            `[${collectionName}] ${result.modifiedCount} document(s) was/were updated.`
        );

        return result.matchedCount === result.modifiedCount &&
            result.matchedCount !== 0
            ? 'success'
            : 'failure';
    } catch (error) {
        console.error(error.stack);

        return 'failure';
    }
};

const renameKey = async (collectionName, oldField, newField) => {
    try {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const data = {};
        data[oldField] = newField;

        const result = await collection.updateMany(
            {},
            {
                $rename: data,
            }
        );

        console.log(
            `[${collectionName}] ${result.modifiedCount} document(s) was/were rename key.`
        );

        return result.matchedCount === result.modifiedCount &&
            result.matchedCount !== 0
            ? 'success'
            : 'failure';
    } catch (error) {
        console.error(error.stack);

        return 'failure';
    }
};

const deleteOne = async (collectionName, query) => {
    try {
        transferIDtoObj(query);

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const result = await collection.deleteOne(query);

        console.log(
            `[${collectionName}] ${
                result.deletedCount
            } document deleted using the filter criteria ${JSON.stringify(
                query
            )}`
        );

        return result.deletedCount > 0 ? 'success' : 'failure';
    } catch (error) {
        console.error(error.stack);

        return 'failure';
    }
};

module.exports = {
    insertOne,

    findOne,
    find,

    updateOne,
    updateMany,

    renameKey,
    deleteOne,

    connect,
    close,
    isConnected,

    LongFromNumber,
};
