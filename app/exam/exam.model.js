const
    mongoose  = require('mongoose'),
    Schema =  mongoose.Schema;

/**
 * Exam Schema : Stores the details about available exams
 */
let ExamSchema = new Schema ( {
    
    name :  {
        type: String,
        required : true 
    },
    
    //abbreviated name : short form -> NDA , CAT 
    abname : {
        type : String , 
        required : true
    },                                                        

    //tech , banking , PSU , LAW etc
    category : {
        type: String,
        required : true 
    },
    //internation , national , discrict
    level: {
        type : String, 
        enum : ["National" , "District" , "International"],
        default : "National"
    },

    //is a valid exam
    validated : {
        type:Boolean,
        default : true
    },
    icon : {
        type:String,
        default : 'default'
    },
    //upcoming , next month, next week
    status : {
        type : String , 
        enum : ['Upcoming' , 'Next Month' , ''],
        default : ''   
    },
    //date of exam
    date : {
        type : Date ,
        default : null
    },
    //admit card release date
    adreleasedate:{
        type: Date ,
        default : null
    }

} , { timestamps: true });                                   //adds updateAt and createAd fields

//adding index to help us with the queries
ExamSchema.index({ "abname": 1} , { unique : true } );

module.exports =  mongoose.model( 'exam' , ExamSchema );