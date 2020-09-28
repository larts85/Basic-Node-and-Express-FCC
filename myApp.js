const bodyParser = require('body-parser')
var express = require('express');
var app = express();

app.use(bodyParser.urlencoded({extended: false}))
// --> 7)  Mount the Logger middleware here
app.use((req,res,next)=> {
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
})

// --> 11)  Mount the body-parser middleware  here


/** 1) Meet the node console. */
console.log('Hello World');

/** 2) A first working Express Server */
// app.get('/', (req, res) => {
//   res.send('Hello Express');
// })

/** 3) Serve an HTML file */
app.get('/', (req, res) => {
  let path = __dirname + '/views/index.html'
  res.sendFile(path);
})

/** 4) Serve static assets  */
app.use(express.static(__dirname + '/public'))

/** 5) serve JSON on a specific route */
app.get('/json', (req, res)=> {
  if(process.env.MESSAGE_STYLE==='uppercase'){
    return res.json({message: 'HELLO JSON'})
  }
  res.json({
    message: 'Hello json'
  })
})

/** 6) Use the .env file to configure the app */
process.env.MESSAGE_STYLE='uppercase'

 
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */
app.get('/now', (req, res, next)=>{
  req.time = new Date().toString();
  next();
}, (req, res)=>{
  let time = req.time;
  res.json({
    time: time
  })
})

/** 9)  Get input from client - Route parameters */
app.get('/:word/echo', (req, res)=>{
  let word = req.params.word;
  res.json({
    echo: word
  })
})

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.get('/name', (req, res)=>{
  let {first, last} = req.query;
  res.json({
    name: first + ' ' + last
  })
})
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */

app.post('/name', (req, res)=>{
  let {first, last} = req.body;
  res.json({
    name: first + ' ' + last
  })
})

// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
