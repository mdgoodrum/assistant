var net = require('net');
const aws = require('aws-sdk')
aws.config.update({
        accessKeyId: 'AKIAJO7P7NFLFMRYNOGQ',
        secretAccessKey: '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',
        region: 'us-east-2'
    })
const lambda = new aws.Lambda()

const express = require('express');
const app = express();
app.set('view engine', 'ejs');

var HOST = 'localhost';
var PORT = 8080;

var prevSensor1 = -1;
var prevSensor2 = -1;
var prevSensor3 = -1;
var buffer = 5; //TODO: experiment with this buffer val

app.locals.takeSomethingNotOKsonika = false
app.locals.placeSomethingNotOKsonika = false
app.locals.takeSomethingNotOKmichael = false
app.locals.placeSomethingNotOKmichael = false
app.locals.takeSomethingNotOKtony = false
app.locals.placeSomethingNotOKtony = false
app.locals.takeSomethingNotOKabdullah = false
app.locals.placeSomethingNotOKabdullah = false
app.locals.itemNotOK = false



//local storage for active user
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
  localStorage.clear();
}


// Create a server instance
var server = net.createServer(function(sock) {

    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
      //Arduino data logic
      /*
        console.log('\n\nDATA ' + sock.remoteAddress + ': \n' + data);
        var json = JSON.parse(data.toString().substring("{ sensor1:"));
        var sensor1 = parseInt(json.sensor1);                 //!!!!!!
THIS int force IS THE DATA FROM THE SENSOR !!!!!! you should't have to
worry about the rest of the stuff going on here
        var sensor2 = parseInt(json.sensor2);
        var sensor3 = parseInt(json.sensor3);

        console.log('\nExtracted Data');
        console.log('1 : ' + sensor1);
        console.log('2 : ' + sensor2);
        console.log('3 : ' + sensor3);
        */
       //start of dummy data
       var sensor1 = data.toString().substring(0, 1);
       var sensor2 = data.toString().substring(1, 2);
       var sensor3 = data.toString().substring(2, 3);

        console.log('\nExtracted Data');
        console.log('1 : ' + sensor1);
        console.log('2 : ' + sensor2);
        console.log('3 : ' + sensor3);
        //end of dummy data

      //first scan of sensors
      if (prevSensor1 < 0) {
        prevSensor1 = sensor1;
        prevSensor2 = sensor2;
        prevSensor3 = sensor3;
      }

      //logged in user
      //var currentUser = localStorage.getItem('ActiveUser');
      let currentUser =  app.locals.ActiveUser

      //Not allowed action

      //Evaluate Zone 1
      if (currentUser != '1') {
        if (prevSensor1 - sensor1 > buffer) {
          prevSensor1 = sensor1;
          if (currentUser == '2'){
            //res.redirect('/takeSomethingNotOKsonika');    //Micheal TODO
            app.locals.itemNotOK = true //set this to false if theitem is placed back
            app.locals.takeSomethingNotOKsonika = true
          } else {
            //res.redirect('/takeSomethingNotOKtony');    //MichealTODO must re render page after this
            app.locals.itemNotOK = true
            app.locals.takeSomethingNotOKtony = true
          }

        } else if (sensor1 - prevSensor1 > buffer) {
          prevSensor1 = sensor1;
          if (currentUser == '2'){
            //res.redirect('/placeSomethingNotOKsonika');    //Micheal TODO
            app.locals.placeSomethingNotOKsonika = true
          } else {
            //res.redirect('/placeSomethingNotOKtony');    //Micheal TODO
            app.locals.placeSomethingNotOKtony = true
          }
        }

      //Evaluate Zone 2
      } else if (currentUser != '2') {
        if (prevSensor2 - sensor2 > buffer) {
          prevSensor2 = sensor2;
          if (currentUser == '1'){
            //res.redirect('/takeSomethingNotOKMicheal');    //Micheal TODO
            app.locals.itemNotOK = true
            app.locals.takeSomethingNotOKMicheal = true
          } else {
            //res.redirect('/takeSomethingNotOKtony');    //Micheal TODO
            app.locals.itemNotOK = true
            app.locals.takeSomethingNotOKtony = true
          }

        } else if (sensor2 - prevSensor2 > buffer) {
          prevSensor2 = sensor2;
          if (currentUser == '1'){
            //res.redirect('/placeNotOKMicheal');    //Micheal TODO
            app.locals.placeNotOKMicheal = true
          } else {
            //res.redirect('/placeSomethingNotOKtony');    //Micheal TODO
            app.locals.placeSomethingNotOKtony = true

          }
        }

      //Evaluate Zone 3
      } else {
        if (prevSensor3 - sensor3 > buffer) {
          prevSensor3 = sensor3;
          if (currentUser == '1'){
            //res.redirect('/takeSomethingNotOKMicheal');    //Micheal TODO
            app.locals.takeSomethingNotOKMicheal = true
          } else {
            //res.redirect('/takeSomethingNotOKsonika');    //Micheal TODO
            app.locals.takeSomethingNotOKsonika = true
          }

        } else if (sensor3 - prevSensor3 > buffer) {
          prevSensor3 = sensor3;
          if (currentUser == '1'){
            //res.redirect('/placeNotOKMicheal');    //Micheal TODO
            app.locals.takeSomethingNotOKMicheal = true
          } else {
            //res.redirect('/placeSomethingNotOKsonika');    //Micheal TODO
            app.locals.takeSomethingNotOKsonika = true
          }
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


//page paths
app.get('/', function(req, res) {
  app.locals.ActiveUser = 0
  res.render('index', { title : 'Main Page' })
  //current user? console
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
  app.locals.ActiveUser = "2"
  res.render('sonika', { title: 'Sonikas page!' })
  //localStorage.setItem('ActiveUser', '2');
  console.log('page' + localStorage.getItem('ActiveUser'));
});
app.get('/michael', function(req, res) {
  app.locals.ActiveUser = "1"
  res.render('michael', { title: 'Michaels page!' })
  //localStorage.setItem('ActiveUser', '1');
  console.log('page' + localStorage.getItem('ActiveUser'));
});
app.get('/tony', function(req, res) {
  app.locals.ActiveUser = "3"
  res.render('tony', { title: 'Tonys page!' })
  //localStorage.setItem('ActiveUser', '3');
  console.log('page' + localStorage.getItem('ActiveUser'));
});
app.get('/abdullah', function(req, res) {
  app.locals.ActiveUser = "4"
  res.render('abdullah', { title: 'Abdullahs page!' })
  //localStorage.setItem('ActiveUser', '4');
  console.log('page' + localStorage.getItem('ActiveUser'));
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
app.get('/takeSomethingNotOKsonika', function(req, res) {
  function goback(arg) {
    if (app.locals.itemNotOK) {
      app.locals.itemNotOK = false
      var params = {
        FunctionName: "sonika"
      }
      lambda.invoke(params, function(err, data) {
        if (err) console.log(err, err.stack)
         else {
          console.log(data)
          if (app.locals.ActiveUser == 1) {
            location.replace('/michael');
          } else if (app.locals.ActiveUser == 2) {
            location.replace('/sonika');
          } else if (app.locals.ActiveUser == 3) {
            location.replace('/tony');
          } else if (app.locals.ActiveUser == 4) {
            location.replace('/abdullah');
          } else {
            location.replace('/login');
          }
        }
      })
    } else {
      if (app.locals.ActiveUser == 1) {
        location.replace('/michael');
      } else if (app.locals.ActiveUser == 2) {
        location.replace('/sonika');
      } else if (app.locals.ActiveUser == 3) {
        location.replace('/tony');
      } else if (app.locals.ActiveUser == 4) {
        location.replace('/abdullah');
      } else {
        location.replace('/login');
      }
    }
  }

  setTimeout(goback, 9000);
});
app.get('/takeSomethingNotOKtony', function(req, res) {
  function goback(arg) {
    if (app.locals.itemNotOK) {
      app.locals.itemNotOK = false
      var params = {
        FunctionName: "tony"
      }
      lambda.invoke(params, function(err, data) {
        if (err) console.log(err, err.stack)
         else {
          console.log(data)
          if (app.locals.ActiveUser == 1) {
            location.replace('/michael');
          } else if (app.locals.ActiveUser == 2) {
            location.replace('/sonika');
          } else if (app.locals.ActiveUser == 3) {
            location.replace('/tony');
          } else if (app.locals.ActiveUser == 4) {
            location.replace('/abdullah');
          } else {
            location.replace('/login');
          }
        }
      })
    } else {
      if (app.locals.ActiveUser == 1) {
        location.replace('/michael');
      } else if (app.locals.ActiveUser == 2) {
        location.replace('/sonika');
      } else if (app.locals.ActiveUser == 3) {
        location.replace('/tony');
      } else if (app.locals.ActiveUser == 4) {
        location.replace('/abdullah');
      } else {
        location.replace('/login');
      }
    }
  }

  setTimeout(goback, 9000);
});
app.get('/takeSomethingNotOKabdullah', function(req, res) {
  function goback(arg) {
    if (app.locals.itemNotOK) {
      app.locals.itemNotOK = false
      var params = {
        FunctionName: "abdullah"
      }
      lambda.invoke(params, function(err, data) {
        if (err) console.log(err, err.stack)
        else {
          console.log(data)
          if (app.locals.ActiveUser == 1) {
            location.replace('/michael');
          } else if (app.locals.ActiveUser == 2) {
            location.replace('/sonika');
          } else if (app.locals.ActiveUser == 3) {
            location.replace('/tony');
          } else if (app.locals.ActiveUser == 4) {
            location.replace('/abdullah');
          } else {
            location.replace('/login');
          }
        }
      })
    } else {
      if (app.locals.ActiveUser == 1) {
        location.replace('/michael');
      } else if (app.locals.ActiveUser == 2) {
        location.replace('/sonika');
      } else if (app.locals.ActiveUser == 3) {
        location.replace('/tony');
      } else if (app.locals.ActiveUser == 4) {
        location.replace('/abdullah');
      } else {
        location.replace('/login');
      }
    }
  }

  setTimeout(goback, 9000);
});
app.get('/takeSomethingNotOKmichael', function(req, res) {
  function goback(arg) {
    if (app.locals.itemNotOK) {
      app.locals.itemNotOK = false
      var params = {
        FunctionName: "michael"
      }
      lambda.invoke(params, function(err, data) {
        if (err) console.log(err, err.stack)
         else {
          console.log(data)
          if (app.locals.ActiveUser == 1) {
            location.replace('/michael');
          } else if (app.locals.ActiveUser == 2) {
            location.replace('/sonika');
          } else if (app.locals.ActiveUser == 3) {
            location.replace('/tony');
          } else if (app.locals.ActiveUser == 4) {
            location.replace('/abdullah');
          } else {
            location.replace('/login');
          }
        }
      })
    } else {
      if (app.locals.ActiveUser == 1) {
        location.replace('/michael');
      } else if (app.locals.ActiveUser == 2) {
        location.replace('/sonika');
      } else if (app.locals.ActiveUser == 3) {
        location.replace('/tony');
      } else if (app.locals.ActiveUser == 4) {
        location.replace('/abdullah');
      } else {
        location.replace('/login');
      }
    }
  }

  setTimeout(goback, 9000);
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
app.get('/takeotherzonevideo', function(req, res) {
  const fs = require('fs');
  const path = 'videos/takeotherzonevideo.webm'
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
app.get('/placeotherzonevideo', function(req, res) {
  const fs = require('fs');
  const path = 'videos/placeotherzonevideo.webm'
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
app.get('/wrongzonevideo', function(req, res) {
  const fs = require('fs');
  const path = 'videos/wrongzonevideo.webm'
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
app.get('/placewrongzonevideo', function(req, res) {
  const fs = require('fs');
  const path = 'videos/placewrongzonevideo.webm'
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