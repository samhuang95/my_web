const express = require('express');
const router = express.Router();

const c = require('../controllers/controller.js');
const m = require('../middlewares/middleware.js');

router.get('/article-list', c.getArticleList);

router.post('/article', c.createArticle, m.createArticle);

router.patch('/article', c.updateArticle);

router.delete('/article', c.deleteArticle);

router.get('/health-check', c.healthCheck);

module.exports = router;
