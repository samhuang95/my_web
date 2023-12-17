const express = require('express');
const router = express.Router();

const articleRoute = require('./article_route.js');
const accountRoute = require('./account_route.js');

router.use('/', articleRoute);
router.use('/', accountRoute);

module.exports = router;
