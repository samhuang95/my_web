const express = require('express');
const router = express.Router();

const c = require('../controllers/account_controller.js');
const m = require('../middlewares/account_middleware.js');

router.get('/account', c.getAccountList);
router.post('/account', m.createAccount, c.createAccount);
router.post('/google_account', c.authenticateGoogleAccount);
router.patch('/account', c.updateAccount);

module.exports = router;
