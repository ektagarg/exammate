const HttpStatus = require('http-status-codes');   //https://www.npmjs.com/package/http-status-codes
const Exam = require('./exam.model');
const ApplicationError = require('../services/error/errorhandler');
const UserService = require('./exam.service');
 
//GET
/**
 * Gets all the exams 
 * @param {Object} req The request Object
 * @param {Object} res The response Object
 */
let GetExams = async function(req,res){
    try { 

        let exams = await UserService.GetExams({} , {});
        return res.status( HttpStatus.OK).json( exams  );

    }catch(err){
        return res.status( err.status).json(err);
    }
} 

/**
 * Gets a single exam whose id is provided
 * @param {Object} req The request Object
 * @param {Object} res The response Object
 */
let GetExam = async function( req , res){
    try {

        let examId = req.params.id || req.query.id;
        if ( ! examId ){
            throw new ApplicationError("Exam Id No Supplied");
        }

        let exam  = await UserService.GetExam( { _id : examId } );
        return res.status( HttpStatus.OK).json(  exam  );

    } catch (err) {
        console.log( err);
        if (! err instanceof ApplicationError ){
            err = new ApplicationError( );
        }
        return res.status( err.status).json(err);
    }
}

//POST
/**
 * Creates a new exam entry in the database 
 * @param {Object} req The request Object
 * @param {Object} res The response Object
 */
let CreateExam = async function(req , res){
    try{
        let exam = req.body;

        let createdExam = await UserService.CreateExam( exam ) ;
        return res.status( HttpStatus.CREATED).json({"message" : "Success"});

    }catch( err){

        return res.status( err.status).json(err);
    }
}

//PUT

/**
 * Update a previously saved exam
 * @param {Object} req The request Object
 * @param {Object} res The response Object
 */
let UpdateExam = async function( req, res){
    try {
        
        let examId = req.params.id;
        let exam = await UserService.GetExam( {_id : examId} ) ;
        
        
        
        
        //these are the fields of the object
        let fields = ["name" , "abname" , "type" , "category" , "level" , "validated" , "icon" , "status"  , "date" , "adreleasedate"];
        
        //go through each of the field and then check if any of them has to be updated else use previous value
        fields.forEach( (field) => {

            //take the value from body if exists
            exam[field] = req.body[field] || exam[field] || null;
        
        });

        //save the exam object and return the json.
        let saved = await exam.save().catch( (err) => { throw new ApplicationError(err); });
        return res.status( HttpStatus.OK).json({"message" : "Exam updated!" , "exam" : saved});

    } catch (err) {
        console.log(err);
        return res.status( err.status).json(err);        
    }
}

//DELETE

module.exports = { GetExams , GetExam , CreateExam , UpdateExam };
