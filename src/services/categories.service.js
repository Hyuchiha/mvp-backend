const Parse = require('parse/node');

const Category = Parse.Object.extend('Category');

const addCategories = async (categories) => {
  await Promise.all(
    categories.map(async (category) => {
      const { id, name, description } = category;

      const newCategory = new Category();
      newCategory.set('identifier', id);
      newCategory.set('name', name);
      newCategory.set('description', description);

      await newCategory.save(null, { useMasterKey: true });
    })
  );
};

const getCategories = async () => {
  return new Parse.Query(new Category()).find();
};

const existCategory = async (categoryId) => {
  const categoryFound = await new Parse.Query(new Category()).equalTo('objectId', categoryId).first();
  return !!categoryFound;
};

module.exports = {
  addCategories,
  getCategories,
  existCategory,
};
