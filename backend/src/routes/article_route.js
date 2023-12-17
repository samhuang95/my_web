const express = require('express');
const router = express.Router();

const c = require('../controllers/article_controller.js');
const m = require('../middlewares/article_middleware.js');

router.get('/article-list', c.getArticleList);

router.post('/article', m.createArticle, c.createArticle);

router.patch('/article', c.updateArticle);

router.delete('/article', c.deleteArticle);

router.get('/health-check', c.healthCheck);

module.exports = router;
