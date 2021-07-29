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
let surveyModel = mongoose.Schema({
    title: String,
    type: String,
    startdate: String,
    enddate: String
},
{
    collection: "surveys"
});



module.exports = mongoose.model('Survey', surveyModel);

