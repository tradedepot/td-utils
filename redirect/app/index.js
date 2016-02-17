var express = require('express'),
	exphbs = require('express-handlebars'),
	http = require('http'),
	routes = require('./routes'),
  bodyParser = require('body-parser'),
  defaultConfig = require('./config/default.json');

var logger = require('./lib/log');
var DDPClient = require("ddp");


var ERROR_RESPONSE_CODE = 422;
var AUTH_ERROR_RESPONSE_CODE = 409;
  
// Create an express instance and set a port variable
var app = exports.app = express();
var router = express.Router(); // Create our Express router

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', __dirname + '/views/');

// Create `ExpressHandlebars` instance with a default layout.
var hbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: 'views/layouts/',
    partialsDir: 'views/partials/',
    compilerOptions: undefined
});

// Register `hbs` as our view engine using its bound `engine()` function.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


// Disable etag headers on responses
app.disable('etag');

// WEB Routes
app.get('/', routes.index);
app.get('/signup', routes.signup);
app.get('/validate/tenant', routes.validateTenant);
app.use("/", express.static(__dirname + "/public/"));


//Start server
var port = 8080;

var server = http.createServer(app).listen(port, function() {
  logger.info('TDC server listening on port %d in %s mode', port, app.settings.env);
});

// process socket.io
var io = require('socket.io').listen(server);
io.on('connection', function(socket) {
	socket.on('geodata', function(data) {
		console.log('Geodata: %s', JSON.stringify(data));
	});
});

/*
 * Use defaults, assume local connection
 * Deploy as docker image linked to main meteor image
 */
 /*
var ddpclient = exports.ddpclient = new DDPClient({
  host : "localhost",
  port : 3000,
  ssl  : false,
  useSockJs : true
});

/*
 * Connect to the Meteor Server
 *
ddpclient.connect(function(error, wasReconnect){
	if (error) {
		logger.info("DDP connection error: " + error);
    return;
	}
  
  if (wasReconnect) {
    logger.info("Connection re-established");
  }
  
  /*
   * Subscribe to a Meteor Collection
   *
  ddpclient.subscribe(
    'Tenants',                  
    [],                        
    function () {              
      logger.info('Subscribed to tenants');
      // logger.debug(ddpclient.collections.tenants);
    }
  );
  
});*/
  

