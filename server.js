var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();

var swig = require('swig');
swig.setDefaults({ cache: false });

app.set('views','./views');
app.set('view engine','html');
app.engine('html',swig.renderFile);

var db = require('./db');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));


app.get('/',function(req,res)
{
	res.render('index',{categories: db.getCategories()});

});

app.use('/categories',require('./routes/categories'));


app.listen(process.env.PORT,function()
{
	console.log('app listening ' + process.env.PORT);
});
