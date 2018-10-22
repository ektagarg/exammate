const Mongoose  = require('mongoose'),
    Schema = Mongoose.Schema;

let NotificationSchema = new Schema({
    sender : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    },
    receiver : [{
        type : Schema.Types.ObjectId,
        ref : 'user'
    }],
    template : String ,
    message  : String , 
    extra : String , 
    status : Number , 
    readBy : [{
        readerId :{
            type : Schema.Types.ObjectId,
            ref : 'user'
        },
        readAt : {
            type : Date ,
            default : Date.now()
        }
    }] ,
    actionId : Number

})

module.exports = Mongoose.model('notification' ,  NotificationSchema ) ;