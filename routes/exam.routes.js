"use strict";

const
    express = require('express'),
    router = express.Router(),
    ExamController = require('../app/exam/exam.controller');
    

router.get( ''  , ExamController.GetExams );
router.post('' , ExamController.CreateExam );
router.put('/exam/:id' , ExamController.UpdateExam )
router.get('/exam/:id', ExamController.GetExam);

module.exports = function(app ) {

    app.use('/api/exams/',  router);

}