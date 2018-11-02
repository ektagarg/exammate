//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Exam = require('./exam.model');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Exams Test', () => {

    //set up 
    beforeEach((done) => { //Before each test we empty the database
        Exam.deleteMany({}, (err) => {
            console.error(err);
            done();
        });
    });


    //Get Exams

    describe('/GET exam', () => {
        it('it should GET all the exams', (done) => {
            chai.request(server)
                .get('/api/exams/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });


    /*
     * Test the /POST route
    */
    describe('/POST exam', () => {
        it('it should not POST a exam without abname field', (done) => {
            let exam = {
                name: "India Institute Of Foreign Trading",
                //abname: "IIFT",
                category: "MBA Prep Exams",
                level : "National",
                validated : "true",
                status : "Upcoming"
            }
            chai.request(server)
                .post('/api/exams')
                .send(exam)
                .end((err, res) => {
                    console.log( res.body);
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.message.should.have.property('errors');
                    res.body.message.errors.should.have.property('abname');
                    res.body.message.errors.abname.should.have.property('kind').eql('required');
                    done();
                });
        });

    });

    describe('/POST exam', () => {
        it('it should not POST a exam without abname field', (done) => {
            let exam = {
                name: "India Institute Of Foreign Trading",
                //abname: "IIFT",
                category: "MBA Prep Exams",
                level : "National",
                validated : "true",
                status : "Upcoming"
            }
            chai.request(server)
                .post('/api/exams')
                .send(exam)
                .end((err, res) => {
                    console.log( res.body);
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.message.should.have.property('errors');
                    res.body.message.errors.should.have.property('abname');
                    res.body.message.errors.abname.should.have.property('kind').eql('required');
                    done();
                });
        });

        //create a exam
        it('it should POST a exam ', (done) => {
            let exam = {
                name: "India Institute Of Foreign Trading",
                abname: "IIFT",
                category: "MBA Prep Exams",
                level : "National",
                validated : "true",
                status : "Upcoming"
            }
              chai.request(server)
              .post('/api/exams/')
              .send(exam)
              .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Success');
                done();
              });
        });

    });



    describe('/GET/:id exam', () => {
        it('it should GET a exam by the given id', (done) => {
            let exam = new Exam({
                name: "India Institute Of Foreign Trading",
                abname: "IIFT",
                category: "MBA Prep Exams",
                level : "National",
                validated : "true",
                status : "Upcoming"
            });
            exam.save((err, exam) => {
                chai.request(server)
              .get('/api/exams/exam/' + exam.id)
              .send(exam)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('abname');
                    res.body.should.have.property('category');
                    res.body.should.have.property('status');
                    res.body.should.have.property('_id').eql(exam.id);
                done();
              });
            });
  
        });
    });





    describe('/PUT/:id exam' , () => {

        it('it should update the exam data' , (done) => {

            let exam = {
                name: "India Institute Of Foreign Transactions",
                abname: "IIFT",
                category: "MBA Prep Exams",
                level : "National",
                validated : "true",
                status : "Upcoming"
            };
            exam = new Exam(exam);
            exam.save((err, exam) => {
                chai.request(server)
                .put('/api/exams/exam/' + exam.id)
                .send({name: "Indian Institute of Foreign Trading",  date: "2018-12-10" })
                .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message').eql('Exam updated!');
                      res.body.exam.should.have.property('date').eql("2018-12-10T00:00:00.000Z");
                      res.body.exam.should.have.property('name').eql("Indian Institute of Foreign Trading");
                  done();
                });
          });

        });

    });




});

