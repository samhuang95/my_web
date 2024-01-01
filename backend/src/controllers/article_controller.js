const { StatusCodes } = require('http-status-codes');

const logger = require('../utils/logger.js');

const { articleDB } = require('../models/model.js');

const { LeaveAPIError } = require('../configs/error.js');

const getArticleList = async (req, res, next) => {
    let result = {
        message: 'success',
        data: {},
    };
    let statusCode = StatusCodes.OK;
    try {
        const articleID = req.query.article_id;
        const state = req.query.state;
        const title = req.query.title;
        const articleTag = req.query.article_tag;
        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);

        let query = {};

        if (articleID !== undefined) query.article_id = articleID;
        if (state !== undefined) query.state = state;
        if (title !== undefined) query.title = title;
        if (articleTag !== undefined) query.article_tag = articleTag;

        const articleList = await articleDB.getArticleList(query, skip, limit);

        if (articleID !== undefined) {
            const article = articleList[0] || {};

            result.data = article;
        } else {
            result.data = articleList;
        }
    } catch (error) {
        if (error instanceof LeaveAPIError) {
            statusCode = StatusCodes.BAD_REQUEST;
            result.message = error.message;

            res.status(statusCode);
            res.json(result);
        } else {
            next(error);
        }

        return;
    }

    res.status(statusCode);
    res.json(result);
};

const createArticle = async (req, res, next) => {
    let results = {
        message: 'success',
        data: {},
    };
    let statusCode = StatusCodes.CREATED;

    try {
        const data = res.req.body;

        const collectionID = await articleDB.insertArticle(data);

        if (collectionID === undefined) {
            logger.error(
                `[article]Create failed. data: ${JSON.stringify(data)}`
            );
            throw new LeaveAPIError('[article]Create failed.');
        }
    } catch (error) {
        if (error instanceof LeaveAPIError) {
            statusCode = StatusCodes.BAD_REQUEST;
            results.message = error.message;

            res.status(statusCode);
            res.json(results);
        } else {
            next(error);
        }

        return;
    }

    res.status(statusCode);
    res.json(results);
};

const updateArticle = async (req, res, next) => {
    let result = {
        message: 'success',
        data: {},
    };
    let statusCode = StatusCodes.OK;

    try {
        const articleID = req.query.article_id;
        const data = req.body;
        const query = { article_id: articleID };

        data['updated_at'] = new Date();
        const updateResult = await articleDB.updateArticle(query, data);

        if (updateResult !== 'success') {
            logger.error(
                `[article] Failed to update.` +
                    `articleID: ${articleID} ` +
                    JSON.stringify(data)
            );

            throw new LeaveAPIError('[article] Failed to update');
        }
    } catch (error) {
        if (error instanceof LeaveAPIError) {
            statusCode = StatusCodes.BAD_REQUEST;
            result.message = error.message;

            res.status(statusCode);
            res.json(result);
        } else {
            next(error);
        }

        return;
    }

    res.status(statusCode);
    res.json(result);
};

const deleteArticle = async (req, res, next) => {
    let result = {
        message: 'success',
        data: {},
    };
    let statusCode = StatusCodes.OK;

    try {
        const query = {
            article_id: req.query.article_id,
        };

        const deleteResult = await articleDB.deleteArticle(query);
        if (deleteResult !== 'success') {
            throw new LeaveAPIError(
                `[article] Delete failed. data: ${JSON.stringify(query)}`
            );
        }
    } catch (error) {
        if (error instanceof LeaveAPIError) {
            statusCode = StatusCodes.BAD_REQUEST;
            result.message = error.message;

            logger.error(error.message);

            res.status(statusCode);
            res.json(result);
        } else {
            next(error);
        }

        return;
    }

    res.status(statusCode);
    res.json(result);
};

const healthCheck = async (req, res, next) => {
    let results = {
        message: 'success',
        data: {},
    };
    let statusCode = StatusCodes.OK;

    try {
    } catch (error) {
        if (error instanceof LeaveAPIError) {
            statusCode = StatusCodes.BAD_REQUEST;
            results.message = error.message;

            res.status(statusCode);
            res.json(results);
        } else {
            next(error);
        }

        return;
    }

    res.status(statusCode);
    res.json(results);
};

module.exports = {
    getArticleList,
    createArticle,
    updateArticle,
    deleteArticle,

    healthCheck,
};
