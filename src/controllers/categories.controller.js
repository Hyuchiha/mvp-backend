const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const categoriesService = require('../services/categories.service');

const importCategories = catchAsync(async (req, res) => {
  await categoriesService.addCategories(req.body);
  res.status(httpStatus.OK).send('Import success');
});

const getCategories = catchAsync(async (req, res) => {
  const categories = await categoriesService.getCategories();
  res.status(httpStatus.OK).send(categories);
});

module.exports = {
  importCategories,
  getCategories,
};
