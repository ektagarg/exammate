const Mongoose  = require('mongoose'),
    Schema = Mongoose.Schema;

/**
 * MeetUpSchema
 * This schema show which user has matched with which user for which upcoming exams
 */
let MeetUpSchema = new Schema({
    for : {
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    user : {
        type : Schema.Types.ObjectId , 
        ref : 'user' 
    } , 
    exam : {
        type : Schema.Types.ObjectId,
        ref: 'exam'
    },
        
});

module.exports = Mongoose.model( 'meetup' , MeetUpSchema);

