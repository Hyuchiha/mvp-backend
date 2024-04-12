const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const productsService = require('../services/products.service');

const getProducts = catchAsync(async (req, res) => {
  const response = await productsService.getProducts(req.query);
  res.status(httpStatus.OK).send(response);
});

const getProduct = catchAsync(async (req, res) => {
  const product = await productsService.getProduct(req.params.productId);
  res.status(httpStatus.OK).send(product);
});

const createProduct = catchAsync(async (req, res) => {
  const product = await productsService.createProduct(req.body);
  res.status(httpStatus.OK).send(product);
});

const updateProduct = catchAsync(async (req, res) => {
  const product = await productsService.updateProduct(req.params.productId, req.body);
  res.status(httpStatus.OK).send(product);
});

const deleteProduct = catchAsync(async (req, res) => {
  await productsService.deleteProduct(req.params.productId);
  res.status(httpStatus.OK).send('Delete success');
});

const importProducts = catchAsync(async (req, res) => {
  await productsService.importProducts(req.body);
  res.status(httpStatus.OK).send('import success');
});

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,

  importProducts,
};
