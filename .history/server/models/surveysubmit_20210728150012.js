const { ObjectId } = require('mongodb');
let mongoose = require('mongoose');

let surveySubmitModel = mongoose.Schema({
    surveyId:String,
    a1: String,
    a2: String,
    a3: String,
    a4: String,
    a5: String
},
{
    collection: "surveysubmit"
});



module.exports = mongoose.model('SurveySubmit', surveySubmitModel);

