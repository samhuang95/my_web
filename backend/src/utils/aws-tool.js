const AWS = require('aws-sdk');
const { StatusCodes } = require('http-status-codes');

const { LAMBDA_ARN_LIST } = require('../configs/aws.js');

const getLambdaObj = () => {
    AWS.config.update({ region: process.env.AWS_LAMBDA_REGION });

    const credentials = new AWS.Credentials({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    return new AWS.Lambda({ credentials });
};

/**
 *
 * @param {*} searchType 'find_model', 'find_model_list', 'find_model_result'
 * @param {*} modelVersion 在 searchType === 'find_model' || 'find_model_result' 選擇要查詢的模型
 * @returns
 */
const getReplicateQueryResult = (
    searchType,
    modelVersion = '',
    userID = ''
) => {
    const payload = {
        type: searchType,
    };

    if (modelVersion !== '') payload.model_version = modelVersion;
    if (userID !== '') payload.dx_user_id = userID;

    return new Promise((resolve, reject) => {
        const lambda = getLambdaObj();

        lambda.invoke(
            {
                FunctionName: LAMBDA_ARN_LIST.REPLICATE_QUERY,
                Payload: JSON.stringify(payload),
            },
            (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const r = JSON.parse(data.Payload);

                    if (r.status_code === StatusCodes.OK) resolve(r.data);
                    else resolve(r);
                }
            }
        );
    });
};

const getPredict = (predictID) => {
    const payload = {
        type: 'result',
        id: predictID,
    };

    return new Promise((resolve, reject) => {
        const lambda = getLambdaObj();

        lambda.invoke(
            {
                FunctionName: LAMBDA_ARN_LIST.REPLICATE_PREDICT,
                Payload: JSON.stringify(payload),
            },
            (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const r = JSON.parse(data.Payload);

                    if (r.status_code === StatusCodes.OK) resolve(r.data);
                    else if (r.status_code === StatusCodes.NOT_FOUND)
                        resolve({});
                    else resolve(r);
                }
            }
        );
    });
};

const predict = (modelVersion, userID, input) => {
    const payload = {
        type: 'predict',
        payload: {
            version: modelVersion,
            input: input,
            dx_user_id: userID,
        },
    };

    return new Promise((resolve, reject) => {
        const lambda = getLambdaObj();

        lambda.invoke(
            {
                FunctionName: LAMBDA_ARN_LIST.REPLICATE_PREDICT,
                Payload: JSON.stringify(payload),
            },
            (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const r = JSON.parse(data.Payload);

                    if (r.status_code === StatusCodes.OK) resolve(r.data);
                    else resolve(r);
                }
            }
        );
    });
};

const cancelPredict = (predictID) => {
    const payload = {
        type: 'cancel',
        id: predictID,
    };

    return new Promise((resolve, reject) => {
        const lambda = getLambdaObj();

        lambda.invoke(
            {
                FunctionName: LAMBDA_ARN_LIST.REPLICATE_PREDICT,
                Payload: JSON.stringify(payload),
            },
            (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const r = JSON.parse(data.Payload);

                    if (r.status_code === StatusCodes.OK) resolve(r.data);
                    else resolve(r);
                }
            }
        );
    });
};

const dbExecuteForDev = (payload) => {
    return new Promise((resolve, reject) => {
        const lambda = getLambdaObj();

        lambda.invoke(
            {
                FunctionName: LAMBDA_ARN_LIST.DB_EXECUTE_FOR_DEV,
                Payload: JSON.stringify(payload),
            },
            (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const r = JSON.parse(data.Payload);

                    if (r.status_code === StatusCodes.OK) resolve(r.data);
                    else resolve(r);
                }
            }
        );
    });
};

module.exports = {
    getReplicateQueryResult,
    getPredict,
    predict,
    cancelPredict,

    dbExecuteForDev,
};
