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
  logger.info('Redirect server listening on port %d in %s mode', port, app.settings.env);
});



