const { format } = require("morgan");
const slugify = require("slugify");
const Category = require("../models/category.model");

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

exports.addCategory = (req, res) => {
  if (req.body.name) {
    const catObj = {
      name: req.body.name,
      slug: slugify(req.body.name),
    };
    if (req.file) {
      catObj.categoryImageUrl =
        process.env.API + "/public/category-images/" + req.file.filename;
    }

    if (req.body.parentId) catObj.parentId = req.body.parentId;
    const cat = new Category(catObj);
    cat.save((err, category) => {
      if (err)
        return res.status(400).json({
          message: "Error occure while adding the category. ",
          error: err
        });
      else if (category)
        return res.status(201).json({
          message: "Category added successfully!",
          result: category,
        });
    });
  } else
    return res.status(400).json({
      message: "Please provide the category details!",
      error: err
    });
};

exports.getCategories = (req, res) => {
  Category.find({}).exec((err, categories) => {
    if (err)
      return res.status(400).json({
        message: "Error occure while fetching the categories. ",
        result: err,
      });

    if (categories) {
      //formatting the categories in an order
      const categoryList = formatCategories(categories);
      return res.status(200).json({
        message: "Categories fetched successfully!",
        result: categoryList,
      });
    }
  });
};
