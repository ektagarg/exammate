"use strict";

const
    express = require('express'),
    router = express.Router(),
    ExamController = require('../app/exam/exam.controller');

router.get( ''  , ExamController.GetExams );
router.get(':exam', ExamController.GetExam  );
router.post('' , ExamController.CreateExam );
router.put(':exam' , ExamController.UpdateExam )


module.exports = function(app ) {

    app.use('/api/exams/',  router);

}