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

const { ObjectId } = require('mongodb');
let mongoose = require('mongoose');

// create a model class
/*
let saraSurveyModel = mongoose.Schema({
    name: String,
    contactno: String,
    email: String,
    accomplish: String,
    recommend: String,
    bestmatch: String,
    easyuse: String,
    satisfied: String,
    competitive: String,
    oftenuse: String,
    comments: String
},
{
    collection: "sara_survey"
});
*/

// added username to save the logged-in user name, to identify the creator of the survey.
let surveyModel = mongoose.Schema({
    title: String,
    type: String,
    startdate: Date,
    enddate: Date,
    username: String,
    q1: String,
    q2: String,
    q3: String,
    q4: String,
    q5: String
},
{
    collection: "surveys"
});



module.exports = mongoose.model('Survey', surveyModel);

