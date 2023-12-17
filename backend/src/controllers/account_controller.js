const { StatusCodes } = require('http-status-codes');
const { LeaveAPIError } = require('../configs/error.js');
const logger = require('../utils/logger.js');
const { accountDB } = require('../models/model.js');

const getAccountList = async (req, res, next) => {
    let result = {
        message: 'success',
        data: {},
    };
    let statusCode = StatusCodes.OK;
    try {
        const email = req.query.email;
        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);

        let query = {};

        if (email !== undefined) query.email = email;

        const accountList = await accountDB.getAccountList(query, skip, limit);

        if (email !== undefined) {
            const account = accountList[0] || {};

            result.data = account;
        } else {
            result.data = accountList;
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

const createAccount = async (req, res, next) => {
    let result = {
        message: 'Success',
        data: {},
    };

    let statusCode = StatusCodes.OK;

    try {
        const data = req.body;

        const collectionID = await accountDB.createAccount(data);

        if (collectionID === undefined) {
            logger.error(
                `[account]Create failed. data: ${JSON.stringify(data)}`
            );
            throw new LeaveAPIError('[account]Create failed.');
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

const updateAccount = async (req, res, next) => {
    let result = {
        message: 'Success',
        data: {},
    };
    let statusCode = StatusCodes.OK;
    try {
        const email = req.query.email;
        const data = req.body;
        console.log('email:::::', email);
        console.log('data::::', data);

        const query = { email: email };
        const updateResult = await accountDB.updateAccount(query, data);
        if (updateResult !== 'success') {
            logger.error(
                `[account] Failed to update.` +
                    `email: ${email} ` +
                    JSON.stringify(data)
            );

            throw new LeaveAPIError('[account] Failed to update');
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

module.exports = {
    getAccountList,
    createAccount,
    updateAccount,
};
