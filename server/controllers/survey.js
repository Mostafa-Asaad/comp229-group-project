//  File Name : survey.js
//  COMP228 - Web Application Developmnet
//  Summer 2021 Group 6
//  Mighty Bunch

//  Developers: 
//  Sarabun Tohura - 300685525
//  Yerim Cho - 301143325
//  Mohammed Husain - 301149144
//  Mostafa Asaad - 301173762
//  Chaehyun Lee - 301084271
//  Viktoriia Romaniuk - 301079072

//  Web App Name : Migthy Survey
//  Description : Users can create new survey. 
//  There are two types of surveys, True or False / Scale.
//  Only logged-in users can answer the survey,
//  and only the creator of survey can edit / delte the survey. 


// creating express reference
let express = require('express');

// creating reference of Router
let router = express.Router();

// Creating a reference object of mongoose
let mongoose = require('mongoose');

// create a reference to the model
let Survey = require('../models/survey');

// create a reference to the survey submit model
let SurveySubmit = require('../models/surveysubmit');

module.exports.displaySurveyList = (req, res, next) => {
    Survey.find((err, surveyList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            // Get current day
            let currentDate = new Date()
            res.render('survey/list', 
            {title: 'Surveys', 
            SurveyList: surveyList,
            userId:req.user ? req.user.username : '',
            today: currentDate
           });      
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('survey/add', {title: 'Add Survey', userId:req.user ? req.user.username : ''})          
}

module.exports.processAddPage = (req, res, next) => {

    let currentDate = new Date()

    let question = [];
    question.push(req.body.q1);
    question.push(req.body.q2);
    question.push(req.body.q3);
    question.push(req.body.q4);
    question.push(req.body.q5);

    let newSurvey = Survey({
        "title": req.body.title,
        "type": req.body.surveytype,
        "username": req.body.username,
        "startdate": req.body.startdate,
        "enddate": req.body.enddate,
        "question": question
    });

    Survey.create(newSurvey, (err, Survey) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/survey-list');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('survey/edit', 
            {title: 'Edit Survey', 
            survey: surveyToEdit,
            userId:req.user ? req.user.username : ''
           })
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let question = [];
    question.push(req.body.q1);
    question.push(req.body.q2);
    question.push(req.body.q3);
    question.push(req.body.q4);
    question.push(req.body.q5);

    let updatedSurvey = Survey({
        "_id": id,
        "title": req.body.title,
        "startdate": req.body.startdate,
        "enddate": req.body.enddate,
        "question": question
    });

    Survey.updateOne({_id: id}, updatedSurvey, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the contact list
            res.redirect('/survey-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Survey.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            SurveySubmit.remove({"surveyId": id}, (err) => {
                if(err)
                {
                    console.log(err);
                    res.end(err);
                }
                else
                {
                     // refresh the contact list
                     res.redirect('/survey-list');
                }
            });
        }
    });   
}


module.exports.displayViewPage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToSubmit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the view page
            res.render('survey/survey', 
            {title: surveyToSubmit.title, 
            survey: surveyToSubmit,
            userId:req.user ? req.user.username : ''
           })
        }
    });
}

module.exports.processViewPage = (req, res, next) => {
    let id = req.params.id
    let answer = [];
    answer.push([req.body.a0, req.body.a1, req.body.a2, req.body.a3, req.body.a4])

    let newSurveySubmit = SurveySubmit({
        "surveyId": id,
        "answer": answer
    });

    SurveySubmit.create(newSurveySubmit, (err, SurveySubmit) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/survey-list');
        }
    });
}

module.exports.displaySurveyViewPage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToSubmit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the view page
            res.render('survey/survey', 
            {title: surveyToSubmit.title, 
            survey: surveyToSubmit,
            userId:req.user ? req.user.username : ''
           })
        }
    });
}

module.exports.processSurveyViewPage = (req, res, next) => {
    let id = req.params.id

    let answer = [];
    answer.push(req.body.a0);
    answer.push(req.body.a1);
    answer.push(req.body.a2);
    answer.push(req.body.a3);
    answer.push(req.body.a4);

    let newSurveySubmit = SurveySubmit({
        "surveyId": id,
        "answer": answer
    });

    SurveySubmit.create(newSurveySubmit, (err, SurveySubmit) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/survey-list');
        }
    });
}

module.exports.displayReportViewPage = (req, res, next) => {
    
    let id = req.params.id;

    Survey.findById(id, (err, survey) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //let votes = SurveySubmit.countDocuments({"surveyId" : id});
            SurveySubmit.find({"surveyId" : id}, (err, docs) => {  

                let trueAnswer = [0,0,0,0,0];
                let falseAnswer = [0,0,0,0,0];
                let veryBad = [0,0,0,0,0];
                let bad = [0,0,0,0,0];
                let good = [0,0,0,0,0];
                let veryGood = [0,0,0,0,0];
                let excellent = [0,0,0,0,0];

                for (j=0; j < docs.length; j++) {
                    //console.log("docs[" + j + "] = > " + docs[j] );
                    for ( i=0; i < docs[j].answer.length; i++) {
                        if ( survey.type == "True/False" ) {
                            if (docs[j].answer[i] == "true") {
                                trueAnswer[i]++;
                            }
                            else {
                                falseAnswer[i]++;
                            }
                        }
                        if ( survey.type == "Scale" ) {

                            switch (docs[j].answer[i]) {
                                case "very bad":
                                    veryBad[i]++;
                                    break;
                                case "bad":
                                    bad[i]++;
                                    break;
                                case "good":
                                    good[i]++;
                                    break;
                                case "very good":
                                    veryGood[i]++;
                                    break;
                                case "excellent":
                                    excellent[i]++;
                                    break;
                                default:
                                    break;
                            }

                        }
                    }
                }
                if ( survey.type == "True/False" ) {
                    res.render('survey/report', 
                    {
                        title: survey.title,
                        survey: survey,
                        votes: docs.length,
                        trueAnswer: trueAnswer,
                        falseAnswer: falseAnswer,
                        userId:req.user ? req.user.username : ''
                    });
                }
                if ( survey.type == "Scale" ) {
                    res.render('survey/report', 
                    {
                        title: survey.title,
                        survey: survey,
                        votes: docs.length,
                        veryBad: veryBad,
                        bad: bad,
                        good: good,
                        veryGood: veryGood,
                        excellent: excellent,
                        userId:req.user ? req.user.username : ''
                    });
                }
            });   
        }
    });
}