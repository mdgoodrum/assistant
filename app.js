var net = require('net');

var HOST = 'localhost';
var PORT = 8080;

var prevSensor1 = 0;
var prevSensor2 = 0;
var prevSensor3 = 0;
var buffer = 5; //TODO: experiment with this buffer val

// Create a server instance
var server = net.createServer(function(sock) {
    
    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
        console.log('\n\nDATA ' + sock.remoteAddress + ': \n' + data);
        var json = JSON.parse(data.toString().substring("{ sensor1:"));
        var sensor1 = parseInt(json.sensor1);                 //!!!!!! THIS int force IS THE DATA FROM THE SENSOR !!!!!! you should't have to worry about the rest of the stuff going on here
        var sensor2 = parseInt(json.sensor2);
        var sensor3 = parseInt(json.sensor3);

        console.log('\nExtracted Data');
        console.log('1 : ' + sensor1);
        console.log('2 : ' + sensor2);
        console.log('3 : ' + sensor3);

        //Not allowed action
        //TODO: how to check for user?
        if (currentUser != user1) {  
          if (prevSensor1 - sensor1 > buffer) {
            prevSensor1 = sensor1;
            //TODO: can add in param for where they took it?
            location.replace('/takeSomethingNotOK');    //TODO: can change pages like this?
          } else if (sensor1 - prevSensor1 > buffer) {
            prevSensor1 = sensor1;
            location.replace('/placeNotOK');
          }
        } else if (currentUser != user2) {
          if (prevSensor2 - sensor2 > buffer) {
            prevSensor2 = sensor2;
            //TODO: can add in param for where they took it?
            location.replace('/takeSomethingNotOK');    //TODO: can change pages like this?
          } else if (sensor2 - prevSensor2 > buffer) {
            prevSensor2 = sensor2;
            location.replace('/placeNotOK');
          }
        } else {
          if (prevSensor3 - sensor3 > buffer) {
            prevSensor3 = sensor3;
            //TODO: can add in param for where they took it?
            location.replace('/takeSomethingNotOK');    //TODO: can change pages like this?
          } else if (sensor3 - prevSensor3 > buffer) {
            prevSensor3 = sensor3;
            location.replace('/placeNotOK');
          }
        }

    });
    
    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });
});
server.listen(PORT, HOST);
console.log('Data server listening on ' + HOST +':'+ PORT);




const express = require('express');
const app = express();
app.set('view engine', 'ejs');


//page paths
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
app.get('/invaliduser', function(req, res) {  
  res.render('invaliduser', { title: 'Invalid username page!' })
});
app.get('/tonyInvalid', function(req, res) {  
  res.render('tonyInvalid', { title: 'Invalid password page!' })
});
app.get('/sonikaInvalid', function(req, res) {  
  res.render('sonikaInvalid', { title: 'Invalid password page!' })
});
app.get('/abdullahInvalid', function(req, res) {  
  res.render('abdullahInvalid', { title: 'Invalid password page!' })
});
app.get('/michaelInvalid', function(req, res) {  
  res.render('michaelInvalid', { title: 'Invalid password page!' })
});
app.get('/placeOtherZone', function(req, res) {  
  res.render('placeOtherZone', { title: 'Place other zone page!' })
});


//video paths
app.get('/invaliduservideo', function(req, res) {
  const fs = require('fs');
  const path = 'videos/invaliduservideo.webm'
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
      'Content-Type': 'video/webm',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/webm',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
});
app.get('/greeting', function(req, res) {
  const fs = require('fs');
  const path = 'videos/greeting.webm'
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
      'Content-Type': 'video/webm',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/webm',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
});
app.get('/logoutvideo', function(req, res) {
  const fs = require('fs');
  const path = 'videos/logoutvideo.webm'
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
      'Content-Type': 'video/webm',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/webm',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
});
app.get('/zone4', function(req, res) {
  const fs = require('fs');
  const path = 'videos/zone4.webm'
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
      'Content-Type': 'video/webm',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/webm',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
});
app.get('/zone3', function(req, res) {
  const fs = require('fs');
  const path = 'videos/zone3.webm'
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
      'Content-Type': 'video/webm',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/webm',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
});
app.get('/zone2', function(req, res) {
  const fs = require('fs');
  const path = 'videos/zone2.webm'
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
      'Content-Type': 'video/webm',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/webm',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
});
app.get('/zone1', function(req, res) {
  const fs = require('fs');
  const path = 'videos/zone1.webm'
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
      'Content-Type': 'video/webm',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/webm',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
});
app.get('/wrongpassword', function(req, res) {
  const fs = require('fs');
  const path = 'videos/wrongpassword.webm'
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
      'Content-Type': 'video/webm',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/webm',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
});
app.get('/username', function(req, res) {
  const fs = require('fs');
  const path = 'videos/username.webm'
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
      'Content-Type': 'video/webm',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/webm',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
});
app.get('/password', function(req, res) {
  const fs = require('fs');
  const path = 'videos/password.webm'
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
      'Content-Type': 'video/webm',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/webm',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
});
app.get('/wrongplacevid', function(req, res) {
  const fs = require('fs');
  const path = 'videos/wrongplacevid.webm'
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
      'Content-Type': 'video/webm',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/webm',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
});
app.get('/stealNEW', function(req, res) {
  const fs = require('fs');
  const path = 'videos/stealNEW.webm'
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
      'Content-Type': 'video/webm',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/webm',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
});

//port connection
app.listen(3000, () => console.log('Example app listening on port 3000!'))