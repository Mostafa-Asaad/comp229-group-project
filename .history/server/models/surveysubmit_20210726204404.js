const { ObjectId } = require('mongodb');
let mongoose = require('mongoose');

let surveySubmitModel = mongoose.Schema({
    surveyId:String,
    q1: String,
    a1: String,
    q2: String,
    a2: String,
    q3: String,
    a3: String,
    q4: String,
    a4: String,
    q5: String,
    a5: String
},
{
    collection: "surveysubmit"
});



module.exports = mongoose.model('SurveySubmit', surveySubmitModel);

