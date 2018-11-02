"use strict";

const
    express = require('express'),
    config = require('./config'),
    glob = require('glob'),
    //expressHelper = require('../ServerSide/helpers/express.helper'),
    cors = require('cors'),
    path = require('path'),
  //  redis = require('redis'),
  //  io = require('socket.io'),
    // bluebird = require('bluebird'),
    jwt = require('express-jwt'),
    mongoose = require('mongoose');

module.exports = (app, io) => {
    app.use(cors());

    // io.on('connection', (socket) => {
    //     console.log(socket.id + " herer");
    // });

    
    //let redisClient = redis.createClient(6379, 'localhost');

    // Mongoose setup
    // mongoose.Promise = bluebird;

    mongoose.connect(config.db.connectionString, {useNewUrlParser: true}, (err) => {
        if (err) return console.log(err);
        console.log("connected to database");
    });


	// Globbing through the routes
	let rootPath  = path.normalize( __dirname + '/..' );

    let routes = glob.sync(rootPath + '/routes/**/*.js');
    routes.forEach(route => { 
		console.log(route);
        require(route)(app, io);
    });

    // for unmatched routes
    app.use((req, res) => {
        res.status(404).send('route not found');
    });
}