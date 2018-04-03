const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.get('/', function(req, res) {  
  res.render('index', { title: 'The index page!' })
});
app.get('/login', function(req, res) {  
  res.render('login', { title: 'The index page!' })
});
app.get('/sonika', function(req, res) {  
  res.render('sonika', { title: 'The index page!' })
});
app.get('/michael', function(req, res) {  
  res.render('michael', { title: 'The index page!' })
});
app.get('/tony', function(req, res) {  
  res.render('tony', { title: 'The index page!' })
});
app.get('/abdullah', function(req, res) {  
  res.render('abdullah', { title: 'The index page!' })
});
app.listen(3000, () => console.log('Example app listening on port 3000!'))