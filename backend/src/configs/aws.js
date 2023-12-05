const LAMBDA_ARN_LIST = {
    REPLICATE_QUERY: `${process.env.AWS_LAMBDA_ARN}:function:ReplicateQuery`,
    REPLICATE_PREDICT: `${process.env.AWS_LAMBDA_ARN}:function:ReplicatePredict`,
    DB_EXECUTE_FOR_DEV: `${process.env.AWS_LAMBDA_ARN}:function:hank_for_test`,
};

module.exports = {
    LAMBDA_ARN_LIST,
};
