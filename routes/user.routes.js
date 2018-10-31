"use strict";

const
    express = require('express'),
    router = express.Router(),
    isAuthenticated = require('../middleware/is-authenticated'),
    UserController = require('../app/user/user.controller');


router.post('/login/' , UserController.login );
router.post('/register/' , UserController.createUser );

module.exports = function(app ) {

    app.use('/api/users',  router);

}