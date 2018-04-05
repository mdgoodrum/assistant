const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.get('/', function(req, res) {  
  res.render('index', { title: 'The index page!' })
});
app.get('/login', function(req, res) {  
  res.render('login', { title: 'Login page!' })
});
app.get('/sonika', function(req, res) {  
  res.render('sonika', { title: 'Sonikas page!' })
});
app.get('/michael', function(req, res) {  
  res.render('michael', { title: 'Michaels page!' })
});
app.get('/tony', function(req, res) {  
  res.render('tony', { title: 'Tonys page!' })
});
app.get('/abdullah', function(req, res) {  
  res.render('abdullah', { title: 'Abdullahs page!' })
});
app.get('/takeSomethingOK', function(req, res) {  
  res.render('takeSomethingOK', { title: 'Take Something OK page!' })
});
app.get('/takeSomethingNotOK', function(req, res) {  
  res.render('takeSomethingNotOK', { title: 'Take Something Not OK page!' })
});
app.get('/placeOK', function(req, res) {  
  res.render('placeOK', { title: 'Place OK page!' })
});
app.get('/placeNotOK', function(req, res) {  
  res.render('placeNotOK', { title: 'Place Not OK page!' })
});
app.listen(3000, () => console.log('Example app listening on port 3000!'))