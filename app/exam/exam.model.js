const
    mongoose  = require('mongoose'),
    Schema =  mongoose.Schema;

/**
 * Exam Schema : Stores the details about the exams a user have to go to
 */
let ExamSchema = new Schema ( {
    
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
ExamSchema.index({ "loc": "2dsphere" });

module.exports =  mongoose.model( 'exam' , ExamSchema );