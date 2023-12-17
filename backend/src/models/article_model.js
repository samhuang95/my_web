const db = require('./db.js');
const { generateUUID } = require('../utils/util.js');

const collectionName = 'articles';

const getArticleList = async (query, skip = 0, limit = 0) => {
    return await db.find(collectionName, query, skip, limit);
};

const insertArticle = async (data) => {
    const now = new Date();
    return await db.insertOne(collectionName, {
        article_id: generateUUID(),
        title: data.title,
        eng_title: data.eng_title,
        article_tag: data.article_tag,
        statue: data.statue,
        cover_url: data.cover_url,
        summary: data.summary,
        content: data.content,
        created_at: now,
        updated_at: now,
    });
};

const updateArticle = async (query, data) => {
    return await db.updateOne(collectionName, query, data);
};

const deleteArticle = async (query) => {
    return await db.deleteOne(collectionName, query);
};

module.exports = {
    getArticleList,
    insertArticle,
    updateArticle,
    deleteArticle,
};
