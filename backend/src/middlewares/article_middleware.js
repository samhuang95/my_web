const { StatusCodes } = require('http-status-codes');

const util = require('../utils/util.js');
const { LeaveAPIError } = require('../configs/error.js');
const { PRICING_MODE_LIST } = require('../configs/type.js');
const { usersDB } = require('../models/model.js');
const logger = require('../utils/logger.js');

const createArticle = async (req, res, next) => {
    let result = {};
    let statusCode = StatusCodes.OK;

    try {
        const data = {
            title: req.body.title,
            eng_title: req.body.eng_title,
            article_tag: req.body.article_tag,
            state: req.body.state,
            cover_url: req.body.cover_url,
            summary: req.body.summary,
            content: req.body.content,
        };
        const checkData = Object.values(data);

        if (util.hasUndefinedData(checkData)) {
            throw new LeaveAPIError(
                'please send title, eng_title, article_tag, state, cover_url, summary and content.'
            );
        }
    } catch (error) {
        if (error instanceof LeaveAPIError) {
            statusCode = StatusCodes.BAD_REQUEST;
            result.message = error.message;

            res.status(statusCode);
            res.json(result);
            return;
        }

        next(error);
    }

    next();
};

// TODO
const updatePricing = async (req, res, next) => {
    let results = {};
    let statusCode = StatusCodes.OK;

    try {
        const modelID = req.params.modelID;
        const data = req.body;

        const checkData = [modelID, data];

        if (
            util.hasUndefinedData(checkData) ||
            Object.keys(data).length === 0
        ) {
            throw new LeaveAPIError('please send modelID and update data.');
        }

        const keys = Object.keys(data);

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const value = data[key];

            if (!PRICING_MODE_LIST.includes(key)) {
                throw new LeaveAPIError(`please don\'t send ${key} filed.`);
            }

            if (!Number.isInteger(value)) {
                throw new LeaveAPIError(`${key} must be an integer.`);
            }
        }
    } catch (error) {
        if (error instanceof LeaveAPIError) {
            statusCode = StatusCodes.BAD_REQUEST;
            results.message = error.message;

            logger.error(error.message);

            res.status(statusCode);
            res.json(results);
            return;
        }

        next(error);
    }

    next();
};

module.exports = {
    createArticle,
    updatePricing,
};
