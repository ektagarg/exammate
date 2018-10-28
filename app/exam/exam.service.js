const Exam = require('./exam.model');

//Validations
let ValidateExam = function(){
    
};

let GetExam = async function( query , options ){
    try { 
        let exams = await Exam.find( query );
        return exams;
    }
    catch( err) {
        throw new Error("Error Fetching exams");
    }

};

let CreateExam = async function ( exam  ){

    try{
        let savedExam   = await Exam.save(exam);
        return true;
    }
    catch(err){
        throw new Error("Error Fetching exams");
    }
} 



let UpdateExam = async function( condition ,  exam ){
    try{
        let updatedExam   = await Exam.updateOne( condition, exam);
        return true;
    }
    catch(err){
        throw new Error("Error Fetching exams");
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


module.exports = { GetExam , CreateExam , UpdateExam , DeleteExam  };