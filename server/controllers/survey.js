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
    let newSurvey = Survey({
        "title": req.body.title,
        "type": req.body.surveytype,
        "username": req.body.username,
        "startdate": req.body.startdate,
        "enddate": req.body.enddate,
        "q1": req.body.q1,
        "q2": req.body.q2,
        "q3": req.body.q3,
        "q4": req.body.q4,
        "q5": req.body.q5,
    });

    Survey.create(newSurvey, (err, Survey) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/mypage');
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

    let updatedSurvey = Survey({
        "_id": id,
        "title": req.body.title,
        "startdate": req.body.startdate,
        "enddate": req.body.enddate,
        "q1": req.body.q1,
        "q2": req.body.q2,
        "q3": req.body.q3,
        "q4": req.body.q4,
        "q5": req.body.q5
    });

    Survey.updateOne({_id: id}, updatedSurvey, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the my survey list
            res.redirect('/mypage');
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
             // refresh the my survey list
             res.redirect('/mypage');
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
            {title: 'Submit Survey', 
            survey: surveyToSubmit,
            userId:req.user ? req.user.username : ''
           })
        }
    });
}

module.exports.processViewPage = (req, res, next) => {
    let id = req.params.id

    let newSurveySubmit = SurveySubmit({
        "surveyId": id,
        "a1": req.body.a1,
        "a2": req.body.a2,
        "a3": req.body.a3,
        "a4": req.body.a4,
        "a5": req.body.a5
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
            {title: 'Submit Survey', 
            survey: surveyToSubmit,
            userId:req.user ? req.user.username : ''
           })
        }
    });
}

module.exports.processSurveyViewPage = (req, res, next) => {
    let id = req.params.id

    let newSurveySubmit = SurveySubmit({
        "surveyId": id,
        "a1": req.body.a1,
        "a2": req.body.a2,
        "a3": req.body.a3,
        "a4": req.body.a4,
        "a5": req.body.a5
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