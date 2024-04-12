const express = require('express');
const categoriesController = require('../../controllers/categories.controller');

const router = express.Router();

router.get('/', categoriesController.getCategories);
router.post('/add', categoriesController.importCategories);

module.exports = router;
