let selectCategory = require('../../database/categories/selectCategory');
let selectCategories = require('../../database/categories/selectCategories');

let postCategory = function(req, res) {

  let language = req.query.language;
  if(typeof language === 'undefined') {
    return res.status(404).json({
      success: false,
      message: "Missing mandatory get parameter: language"
    });
  }

  let categoryId = req.params.categoryId;
  if(categoryId === "root") {
    categoryId = null;
  }

  validateCategory(categoryId, language).then(function() {
    // The category exists or the id refers to root
  }).catch(function(error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "The category does not exist!"
    });
  }).then(function() {
    return selectCategories.withParentIdAndLanguageCode(categoryId, language);
  }).then(function(data) {
    res.json(data);
  }).catch(function(error) {
    console.log(error);
    res.status(500).json({ result: "Internal server error" });
  });
}

let validateCategory = function(categoryId, language) {

  if(categoryId === null) {
    return new Promise(function(resolve, reject) {
      resolve();
    });
  }

  return selectCategory.withIdAndLanguage(categoryId, language);
};

module.exports = postCategory;
