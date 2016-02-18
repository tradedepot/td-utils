var express = require('express');
var http = require('http');


//Create server and router
var app = express();
var router = express.Router();


app.use(function redirectHTTP(req, res, next) {
    return res.redirect('https://' + req.headers.host + req.url);
    next();
});

app.all('/', router); 

//Start server
var port = process.env.PORT || 80;

var server = http.createServer(app).listen(port, function() {
  console.log('Redirect server listening on port ' + port + ' in ' + app.settings.env + ' mode');
});



