const Category = require("../../models/category.model");
const Product = require("../../models/product.model");

exports.getInitialData = async (req, res) => {
  const categories = await Category.find({}).exec();
  const products = await Product.find({})
    .select("_id name price quantity description slug pictures categoryId")
    .populate({path:"categoryId", select: {name: 1}})
    .exec();
  return res.json({
    categories: formatCategories(categories),
    products,
  });
};

//recursive method to format or arrange the categories in an order
function formatCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cat of category) {
    categoryList.push({
      _id: cat._id,
      parentId: cat.parentId,
      name: cat.name,
      slug: cat.slug,
      categoryImageUrl: cat.categoryImageUrl,
      children: formatCategories(categories, cat._id),
    });
  }

  return categoryList;
}
