/* 
    server.js
    mongodb-rest

    Created by Tom de Grunt on 2010-10-03.
    Copyright (c) 2010 Tom de Grunt.
		This file is part of mongodb-rest.
*/ 

var fs = require("fs"),
	sys = require("sys"),
	console = require("console"),
	express = require('express'),
	path = require('path');
		
var config = { "db": {
  'port': 27017,
  'host': "localhost"
  },
  'server': {
    'port': 3000,
    'address': "0.0.0.0"
  },
 "accessControl": {
		"allowOrigin": "*",
		"allowMethods": "GET,POST,PUT,DELETE,HEAD,OPTIONS"
	},
	'flavor': "regular",
  'debug': true
};

var app = module.exports.app = express();


try {
  config = JSON.parse(fs.readFileSync(process.cwd()+"/config.json"));
} catch(e) {
	console.log("config from disk failed");
}

module.exports.config = config;

app.configure(function(){
	console.log('Configuring');
    app.use(express.bodyParser());
    app.use(express.logger());
		// client folder is one folder up the tree.  Use index.html as default		
    app.use('/client',express.static(path.resolve(__dirname , '../client/app')));
		// chess is two folders up
    app.use('/chess',express.static(path.resolve(__dirname , '../../public/chess')));
//   app.set('views', __dirname + '/views');
//   app.set('view engine', 'jade');
	
	if (config.accessControl){
		var accesscontrol = require('./accesscontrol');
		app.use(accesscontrol.handle);
	}	
});

require('./main');
require('./command');
require('./rest');

if(!process.argv[2] || !process.argv[2].indexOf("expresso")) {
	if (config.server.address) {
	  app.listen(config.server.port, config.server.address);
	} else {
	  app.listen(config.server.port);
	}
	console.log('Listening on port ' + config.server.port);
}
