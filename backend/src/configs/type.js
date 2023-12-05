const PRICING_MODE_LIST = [
    'api_call',
    'input_data_volume',
    'computing_time',
    'monthly_token',
    'annual_token',
    'monthly_edge',
    'annual_edge',
    'monthly_instance',
    'annual_instance',
    'perpetual_edge',
    'perpetual_instance',
];

const PRICING_REF = {
    api_call: {
        tag: 'api_call',
        implementation: 'cloud',
        pricingModel: 'on-demand',
        pricingPlan: 'By API Call',
        usageMetric: '/call',
        cloudService: ['dx_cloud_service'],
        description:
            'A token that charges based on API calls supports only one processing at a time. If you require concurrent processing, kindly consider purchasing multiple tokens.',
        placeOlderDescription:
            'Once you subscribe, the billing will start until you unsubscribe.',
    },
    input_data_volume: {
        tag: 'input_data_volume',
        implementation: 'cloud',
        pricingModel: 'on-demand',
        pricingPlan: 'By Input Data Volume',
        usageMetric: '/MB',
        cloudService: ['dx_cloud_service'],
        description:
            'A token that charge based on input data volume and supports only one processing at a time. If you require concurrent processing, kindly consider purchasing multiple tokens.',
        placeOlderDescription:
            'Once you subscribe, the billing will start until you unsubscribe.',
    },
    computing_time: {
        tag: 'computing_time',
        implementation: 'cloud',
        pricingModel: 'on-demand',
        pricingPlan: 'By Computing Time',
        usageMetric: '/second',
        cloudService: ['dx_cloud_service'],
        description:
            'A token that charge based on computing time and supports only one processing at a time. If you require concurrent processing, kindly consider purchasing multiple tokens.',
        placeOlderDescription:
            'Once you subscribe, the billing will start until you unsubscribe.',
    },
    monthly_token: {
        tag: 'monthly_token',
        implementation: 'cloud',
        pricingModel: 'subscription',
        pricingPlan: 'Monthly (per token)',
        usageMetric: '',
        cloudService: ['dx_cloud_service'],
        description:
            'A token that charge monthly and supports only one processing at a time. If you require concurrent processing, kindly consider purchasing multiple tokens.',
        placeOlderDescription:
            'Once you subscribe, the billing will start until you unsubscribe, and you will be charged immediately for the first subscription period.',
    },
    annual_token: {
        tag: 'annual_token',
        implementation: 'cloud',
        pricingModel: 'subscription',
        pricingPlan: 'Annual (per token)',
        usageMetric: '',
        cloudService: ['dx_cloud_service'],
        description:
            'A token that charge annual and supports only one processing at a time. If you require concurrent processing, kindly consider purchasing multiple tokens.',
        placeOlderDescription:
            'Once you subscribe, the billing will start until you unsubscribe, and you will be charged immediately for the first subscription period.',
    },

    monthly_edge: {
        tag: 'monthly_edge',
        implementation: 'on-premise',
        pricingModel: 'subscription',
        pricingPlan: 'Monthly (per edge)',
        usageMetric: '',
        cloudService: [],
        description:
            'Billed on a monthly/yearly basis for a license intended for on-premise use, with one license allocated per edge. Each edge requires a separate license for access.',
        placeOlderDescription:
            'Once you subscribe, the billing will start until you unsubscribe, and you will be charged immediately for the first subscription period.',
    },
    annual_edge: {
        tag: 'annual_edge',
        implementation: 'on-premise',
        pricingModel: 'subscription',
        pricingPlan: 'Annual (per edge)',
        usageMetric: '',
        cloudService: [],
        description:
            'Billed on a monthly/yearly basis for a license intended for on-premise use, with one license allocated per edge. Each edge requires a separate license for access.',
        placeOlderDescription:
            'Once you subscribe, the billing will start until you unsubscribe, and you will be charged immediately for the first subscription period.',
    },
    monthly_instance: {
        tag: 'monthly_instance',
        implementation: 'on-premise',
        pricingModel: 'subscription',
        pricingPlan: 'Monthly (per instance)',
        usageMetric: '',
        cloudService: [],
        description:
            'Monthly fee for an instance, which supports only one request at a time. If you require concurrent request, kindly consider purchasing multiple instances.',
        placeOlderDescription:
            'Once you subscribe, the billing will start until you unsubscribe, and you will be charged immediately for the first subscription period.',
    },
    annual_instance: {
        tag: 'annual_instance',
        implementation: 'on-premise',
        pricingModel: 'subscription',
        pricingPlan: 'Annual (per instance)',
        usageMetric: '',
        cloudService: [],
        description:
            'Annual fee for an instance, which supports only one processing at a time. If you require concurrent processing, kindly consider purchasing multiple instances.',
        placeOlderDescription:
            'Once you subscribe, the billing will start until you unsubscribe, and you will be charged immediately for the first subscription period.',
    },
    perpetual_edge: {
        tag: 'perpetual_edge',
        implementation: 'on-premise',
        pricingModel: 'perpetual',
        pricingPlan: 'Perpetual (per edge)',
        usageMetric: '',
        cloudService: [],
        description:
            'One-time fee for a edge, which supports only one request at a time. If you require concurrent request, kindly consider purchasing multiple edges.',
        placeOlderDescription: '',
    },
    perpetual_instance: {
        tag: 'perpetual_instance',
        implementation: 'on-premise',
        pricingModel: 'perpetual',
        pricingPlan: 'Perpetual (per instance)',
        usageMetric: '',
        cloudService: [],
        description:
            'One-time fee for an instance, which supports only one processing at a time. If you require concurrent processing, kindly consider purchasing multiple instances.',
        placeOlderDescription: '',
    },
};

module.exports = {
    PRICING_MODE_LIST,
    PRICING_REF,
};
