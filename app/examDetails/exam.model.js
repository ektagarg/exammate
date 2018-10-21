const
    mongoose  = require('mongoose'),
    Schema =  mongoose.Schema;

/**
 * Exam Schema : Stores the details about the exams a user have to go to
 */
let ExamSchema = new Schema ( {
    
    user :  {
        type : Schema.Types.ObjectId , ref : 'User'
    },
    name :  String ,                                                            //name of the exam
    date : Date ,                                                               //date of the exam
    time : String,                                                              //time slot
    location :  {                                                               //location user have to go to [latititude , longitude ]
        type: { type: String },
        coordinates: [],
    }

} , { timestamps });                                                            //adds updateAt and createAd fields

//adding index to help us with the queries
ExamSchema.index({ "loc": "2dsphere" });

module.exports =  mongoose.model( 'exam' , ExamSchema );