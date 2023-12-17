const { StatusCodes } = require('http-status-codes');

const util = require('../utils/util.js');
const { LeaveAPIError } = require('../configs/error.js');

const logger = require('../utils/logger.js');

const createAccount = async (req, res, next) => {
    let result = {};
    let statusCode = StatusCodes.OK;
    try {
        const data = {
            user_name: req.body.user_name,
            password: req.body.password,
            email: req.body.email,
        };
        const checkData = Object.values(data);

        if (util.hasUndefinedData(checkData)) {
            throw new LeaveAPIError(
                'please send user_name, password and email.'
            );
        } else {
            const emailExists = await util.isEmailExist(data.email);

            if (emailExists) {
                throw new LeaveAPIError('email already exist.');
            }
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

module.exports = {
    createAccount,
};
