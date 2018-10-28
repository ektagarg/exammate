const
    mongoose  = require('mongoose'),
    Schema =  mongoose.Schema;

/**
 * User Schema : Details of the student who is going for an exam
 */
let UserSchema = new Schema ( {
    
    exam :  {
        type : Schema.Types.ObjectId , 
        ref : 'Exam',
    },
    first_name :  {
        type: String,
        required : true 
    },
    last_name :  {
        type: String,
        required : true 
    },                                                           
    email : {
        type: Date,
        trim: true,
        required: true,
        unique : true
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

} , { timestamps });                                   //adds updateAt and createAd fields

module.exports =  mongoose.model( 'user' , UserSchema );