const MODEL_REQUEST = {
    UNFULFILLED: 'unfulfilled',
    DONE: 'done',
};

const MODEL_DRAFT_STATUS = {
    FAILED: 'failed',
    ONBOARDED: 'onboarded',
    DRAFT: 'draft',
    VALIDATING: 'validating',
};

const VISITOR = 'visitor';

const MODEL_ORDER_STATUS = {
    PENDING: 'pending',

    DELIVER_PENDING_PAYMENT: 'pending payment',
    DELIVER_PENDING_DELIVERY: 'pending delivery',
    DELIVERED_SUCCEEDED: 'delivered',

    PAYMENT_PENDING: 'pending',
    PAYMENT_SUCCEEDED: 'succeeded',
};

const MODEL_ACCESS_STATUS = {
    ON_PERM: 'on-premise',
    ON_DEMAND: 'on-demand',
    CLOUD: 'cloud',
    PERPETUAL: 'perpetual',
    ACTIVE: 'active',
    INVALID: 'invalid',
    PENDING: 'pending',
};

const BILL_STATUS = {
    PENDING: 'pending',
    ISSUED: 'issued',
};

module.exports = {
    MODEL_REQUEST,
    MODEL_DRAFT_STATUS,
    VISITOR,
    MODEL_ORDER_STATUS,
    MODEL_ACCESS_STATUS,
    BILL_STATUS,
};
