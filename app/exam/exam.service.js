const Exam = require('./exam.model');
const ApplicationError = require('../services/error/errorhandler');

//Validations
let ValidateExam = function(){
    
};

let GetExams = async function( query , options ){
    try { 
        let exams = await Exam.find( query );
        return exams;
    }
    catch( err) {
        throw new ApplicationError( err.toString() || "Some Error Occured" ); 
    }

};

let GetExam = async function( id ){
    try{

        let examArr = await Exam.findById( id ) ; 
        
        if ( !examArr)
            throw new Error("Object Not Found");
        return examArr;
        
    }catch(err){
        throw new ApplicationError( err);
    }
    
}

let CreateExam = async function( exam ){

    try{
        let newexam =  new Exam( exam );
        let savedExam = await newexam.save();
        return true;
    }
    catch(err){
        console.error("Err", err);
        if ( err.name && err.name === "ValidationError")
            throw new ApplicationError( JSON.parse( JSON.stringify(err))  , 422 );
        else
        throw new ApplicationError(err._message );
    }
} 



let UpdateExam = async function( condition ,  exam ){
    try{
        let updatedExam   = await Exam.updateOne( condition, exam);
        return true;
    }
    catch(err){
        throw new ApplicationError("Error Fetching exams");
    }
}

let DeleteExam = async function ( exam){

    try{
        let deleted = await ToDo.remove({_id: id});
        if(deleted.result.n === 0){
            throw Error("Exam could not be deleted")
        }
        return deleted;
    }catch(e){
        throw Error("Error Occured while Deleting the Todo")
    }
}


module.exports = { GetExams, GetExam , CreateExam , UpdateExam , DeleteExam  };