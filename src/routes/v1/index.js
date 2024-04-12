const express = require('express');
const productsRoute = require('./products.route');
const categoriesRoute = require('./categories.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/products',
    route: productsRoute,
  },
  {
    path: '/categories',
    route: categoriesRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
