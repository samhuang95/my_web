const db = require('./db.js');
const collectionName = 'accounts';

const createAccount = async (data) => {
    const now = new Date();
    return await db.insertOne(collectionName, {
        user_name: data.user_name || data.given_name,
        password: data.password || null,
        google_token: data.google_token || null,
        email: data.email,
        role: 'user',
        created_at: now,
    });
};

const getAccountList = async (query) => {
    return await db.find(collectionName, query);
};

const getAccount = async (query) => {
    return await db.findOne(collectionName, query);
};

const updateAccount = async (query, data) => {
    return await db.updateOne(collectionName, query, data);
};

const deleteAccount = async (query) => {
    return await db.deleteOne(collectionName, query);
};

module.exports = {
    createAccount,
    getAccountList,
    getAccount,
    updateAccount,
    deleteAccount,
};
