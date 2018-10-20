var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var port=process.env.port||8000;

app.use(cors());
const
    glob = require('glob'),
    //expressHelper = require('../ServerSide/helpers/express.helper'),
    path = require('path');

//set up body parse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let initialize = (app) => {
    app.use(cors());
	// Globbing through the routes
	let rootPath  = path.normalize( __dirname );
    console.log(rootPath);
    let routes = glob.sync(rootPath + '/routes/*.js');
    console.log(routes);
    routes.forEach(route => { 
		console.log(route);
        require(route)(app);
    });

    // for unmatched routes
    app.use((req, res) => {
        res.status(404).send('route not found');
    });
}

initialize( app);

app.listen(port, function(){
	var datetime = new Date();
	var message = "server running on port :"+port+" started at:"+datetime;
	console.log(message);
})





