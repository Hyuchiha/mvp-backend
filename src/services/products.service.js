const httpStatus = require('http-status');
const Parse = require('parse/node');
const ApiError = require('../utils/ApiError');

const Product = Parse.Object.extend('Product');
const Category = Parse.Object.extend('Category');

const importProducts = async (products) => {
  await Promise.all(
    products.map(async (product) => {
      const { name, description, price, categoryId } = product;

      const category = await new Parse.Query(new Category()).equalTo('identifier', categoryId).first();

      if (!category) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
      }

      const newProduct = new Product();
      newProduct.set('name', name);
      newProduct.set('description', description);
      newProduct.set('price', price);
      newProduct.set('category', category);

      await newProduct.save(null, { useMasterKey: true });
    })
  );
};

const getProducts = async (query) => {
  const { page, limit } = query;

  const skip = (page - 1) * limit;

  const response = await new Parse.Query(new Product())
    .includeAll()
    .descending('name')
    .limit(+limit || 10)
    .skip(skip)
    .withCount(true)
    .find();

  const { results, count } = response;

  const totalPages = Math.ceil(count / (+limit || 10));

  return {
    data: results,
    pagination: {
      documentCount: count,
      totalPages,
      limit: Number(limit),
      prev: +page > 1 ? +page - 1 : null,
      current: Number(page),
      next: totalPages >= +page + 1 ? +page + 1 : null,
    },
  };
};

const getProduct = async (productId) => {
  const product = await new Parse.Query(new Product()).equalTo('objectId', productId).includeAll().first();

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  return product;
};

const createProduct = async (data) => {
  const { name, description, price, category } = data;

  const categoryFound = await new Parse.Query(new Category()).equalTo('objectId', category).first();

  if (!categoryFound) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }

  const newProduct = new Product();
  newProduct.set('name', name);
  newProduct.set('description', description);
  newProduct.set('price', price);
  newProduct.set('category', categoryFound);

  await newProduct.save(null, { useMasterKey: true });

  return getProduct(newProduct.id);
};

const updateProduct = async (productId, updateBody) => {
  const product = await getProduct(productId);

  const updateKeys = Object.keys(updateBody);

  await Promise.all(
    updateKeys.map(async (property) => {
      const propertyValue = updateBody[property];

      if (property === 'category') {
        const categoryFound = await new Parse.Query(new Category()).equalTo('objectId', propertyValue).first();

        if (!categoryFound) {
          throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
        }

        product.set('category', categoryFound);
      } else if (propertyValue) {
        product.set(property, propertyValue);
      }
    })
  );

  await product.save(null, { useMasterKey: true });

  return getProduct(product.id);
};

const deleteProduct = async (productId) => {
  const product = await getProduct(productId);
  await product.destroy();
};

module.exports = {
  importProducts,
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
