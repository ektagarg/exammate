const 
    express = require('express') ,
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    port=process.env.port||8000 ,
    mongoose = require('mongoose') , 
    glob = require('glob'),
    config = require('./config/cofig'),
    //expressHelper = require('../ServerSide/helpers/express.helper'),
    path = require('path');


app.use(cors());

//set up the database
mongoose.connect( config.database.connectionString , ( err ) => {
    if ( err) {
        console.error("failed to connect to the database");
    }else{
        console.log("Successfully connected to database in " + process.env.mode );
    }
});

//set up body parse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//set up Logging

//set Up Global Error Handler

//application performance monitoring tools

//set the routes in place
let initialize = (app) => {
    app.use(cors());
	// Globbing through the routes
	let rootPath  = path.normalize( __dirname );
    console.log(rootPath);
    let routes = glob.sync(rootPath + '/routes/*.js');
    console.log("route: " , routes);
    routes.forEach(route => { 
		console.log( "route: " , route);
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





module.exports = app