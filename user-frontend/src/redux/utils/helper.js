/**
 * Recursive method, which takes categories having children , insert all the parent categories and children categories
 * into an array and return back.
 */
exports.createCategoriesToArray = (categories, options = []) => {
  for (let cat of categories) {
    options.push({ value: cat._id, name: cat.name });
    if (cat.children.length > 0) {
      this.createCategoriesToArray(cat.children, options);
    }
  }
  return options;
};
