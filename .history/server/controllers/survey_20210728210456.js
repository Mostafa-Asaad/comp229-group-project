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
            displayName: req.user ? req.user.displayName:'',
            today: currentDate
           });      
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('survey/add', {title: 'Add Survey'})          
}

module.exports.processAddPage = (req, res, next) => {

    let currentDate = new Date()
    let newSurvey = Survey({
        "title": req.body.title,
        "type": req.body.surveyType,
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
            displayName: req.user ? req.user.displayName:''
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
             // refresh the contact list
             res.redirect('/survey-list');
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
            displayName: req.user ? req.user.displayName:''
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
            displayName: req.user ? req.user.displayName:''
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