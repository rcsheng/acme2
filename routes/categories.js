var router = require('express').Router();

module.exports = router;

var db = require('../db');

router.post('/', function(req,res)
{
	db.newCategory(req.body.categoryName);
	res.redirect('/categories/'+req.body.categoryName);
});


router.get('/:category',function(req,res)
{
	var categoryName = req.params.category;
	res.render('category',{
    categories: db.getCategories(),
    selectedCategory: categoryName,
    products: db.getProducts(categoryName)
  });
});

router.delete('/:category',function(req,res)
{
	db.deleteCategory(req.params.category);
	res.redirect('/');
})

router.post('/:category/products',function(req,res)
{
	db.addProduct(req.params.category, req.body.productName);
	res.redirect('/categories/'+req.params.category);
});

router.delete('/:category/products/:index',function(req,res)
{
	db.deleteProduct(req.params.category, Number(req.params.index)-1);
	res.redirect('/categories/'+req.params.category);
});
