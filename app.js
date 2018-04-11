const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.get('/', function(req, res) {  
  res.render('index', { title: 'The index page!' })
});
app.get('/login', function(req, res) {  
  res.render('login', { title: 'Login page!' })
});
app.get('/sonikaPassword', function(req, res) {  
  res.render('sonikaPassword', { title: 'Sonikas Password page!' })
});
app.get('/michaelPassword', function(req, res) {  
  res.render('michaelPassword', { title: 'Michaels Password page!' })
});
app.get('/tonyPassword', function(req, res) {  
  res.render('tonyPassword', { title: 'Tonys Password page!' })
});
app.get('/abdullahPassword', function(req, res) {  
  res.render('abdullahPassword', { title: 'Abdullahs Password page!' })
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
app.get('/logout', function(req, res) {  
  res.render('logout', { title: 'Logout page!' })
});
app.get('/timeout', function(req, res) {
  const util = require('util');
  const setTimeoutPromise = util.promisify(setTimeout);
setTimeoutPromise(40, 'foobar').then((value) => {
  // value === 'foobar' (passing values is optional)
  // This is executed after about 40 milliseconds.
});
})
app.get('/video', function(req, res) {
  const fs = require('fs');
  const path = 'videos/sample.mp4'
  const stat = fs.statSync(path)
  const fileSize = stat.size
  const range = req.headers.range
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1] 
      ? parseInt(parts[1], 10)
      : fileSize-1
    const chunksize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
});
app.listen(3000, () => console.log('Example app listening on port 3000!'))