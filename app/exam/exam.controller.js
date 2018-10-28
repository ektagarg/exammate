const HttpStatus = require('http-status-codes');   //https://www.npmjs.com/package/http-status-codes
const Exam = require('./exam.model');
const ApplicationError = require('../services/error/errorhandler');

 
//GET
let GetExams = (req , res) =>{
    try { 

        Exam.find()
        .then( (exams) => {
            return res.status( HttpStatus.OK).json( {"exams" : exams } );
        })
        .catch( err => {  throw new ApplicationError( "Some Error Occured" ); });

    }catch(err){
        return res.status( err.status).json(err);
    }



} 



//POST

//PUT

//DELETE

module.exports = {

};
