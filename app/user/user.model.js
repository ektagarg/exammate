'use strict';
const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto'),
    _ = require('lodash');

/**
 * User Schema : Details of the student who is going for an exam
 */
let UserSchema = new Schema ( {
    
    first_name :  {
        type: String,
        required : true 
    },
    last_name :  {
        type: String,
        required : true 
    },                                                           
    email : {
        type: String,
        trim: true,
        required: true,
        unique : true
    }, 
    password : {
        type: String,
        required : true

    },
    salt : {
        type :String
    },
    contact_no : {
        type: String,
    },                                                             
    address : {
        addr_line_1 : String , 
        addr_line_2 : String ,
        street_addr : String ,
        city        : String ,
        state       : String ,
        pincode     : String ,
        country     : String 

    },
    picture :  {                                       
        type: { type: String }
    }

});                                   //adds updateAt and createAd fields

//module.exports =  mongoose.model( 'user' , UserSchema );


/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
    console.log("[Pre Save]");

    if(!this.salt) {
        if (this.password && this.password.length >= 4) {
            this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
            this.password = this.hashPassword(this.password);
        }
    }

    console.log('ger', this.password);
    next();
});

UserSchema.methods.publicFilter = function() {
        var userInstance = this.toObject();

        delete userInstance.password;
        delete userInstance.salt;

        console.log("User Instance", userInstance);

        return userInstance;
    }
    /**
     * Create instance method for hashing a password
     */
UserSchema.methods.hashPassword = function(password) {
    if (this.salt && password) {
        return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'SHA1').toString('base64');
    } else {
        return password;
    }
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};

module.exports = mongoose.model('User', UserSchema)