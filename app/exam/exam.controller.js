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

        let exams = await UserService.GetExam({} , {});
        return res.status( HttpStatus.OK).json( {"exams" : exams } );

    }catch(err){
        return res.status( err.status).json(err);
    }
} 

/**
 * Gets a single exam whose id is provided
 * @param {Object} req The request Object
 * @param {Object} res The response Object
 */
let GetExam = async  function( req , res){
    try {

        let examId = req.params.exam || req.query.exam;

        let exam  = await UserService.GetExam( { id : examId } );
        return res.status( HttpStatus.OK).json( {"exams" : exam } );

    } catch (error) {
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
        console.log('errasdfasdf returned');
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
        
        let examId = req.params.exam || req.query.exam;
        let exam = await UserService.GetExam( {id : examId} )
        
        let fields = ["name" , "abname" , "type" , "category" , "level" , "validated" , "icon" , "status"  , "date" , "adreleasedate"];
        
        fields.forEach( (field) => {
            exam[field] = req.body[field] || exam[field];
        });

        let saved = await exam.save();
        return res.status( HttpStatus.OK).json({"message" : "updated"});

    } catch (err) {
        return res.status( err.status).json(err);        
    }
}

//DELETE

module.exports = { GetExams , GetExam , CreateExam , UpdateExam };
