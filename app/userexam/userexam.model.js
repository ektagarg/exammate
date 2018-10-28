const
    mongoose  = require('mongoose'),
    Schema =  mongoose.Schema;

/**
 * Exam Schema : Stores the details about exams a user has applied for and sets a destination for it
 */
let UserexamSchema = new Schema ( {
    
    user :  {
        type : Schema.Types.ObjectId , 
        ref : 'User',
        required : true
    },
    name :  {
        type: String,
        required : true 
    },                                                           
    date : {
        type: Date,
        required : true 
    }, 
    time : {
        type: String,
        required : true 
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
    location :  {                                       //location user have to go to [latititude , longitude ]
        type: { type: String },
        coordinates: [],
    }

} , { timestamps });                                   //adds updateAt and createAd fields

//adding index to help us with the queries
ExamSchema.index({ "location": "2dsphere" });

module.exports =  mongoose.model( 'userexam' , UserexamSchema );