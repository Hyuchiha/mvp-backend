const Joi = require('joi');

const getProducts = {
  query: Joi.object().keys({
    page: Joi.number().integer().default(1),
    limit: Joi.number().integer().default(50),
  }),
};

const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().min(0),
    category: Joi.string().required(),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.string(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      description: Joi.string(),
      price: Joi.number().min(0),
      category: Joi.string(),
    })
    .min(1),
};

const getProduct = {
  params: Joi.object().keys({
    productId: Joi.string(),
  }),
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  getProduct,
};
