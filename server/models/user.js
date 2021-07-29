//  File Name : user.js
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


let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema(
    {
        username:{
            type: String,
            default: '',
            trim: true,
            required: 'username is required'
        },
        /*
        password:{
            type: String,
            default: '',
            trim: true,
            required: "Password is required"
        }
        */
        email:{
            type: String,
            default: '',
            trim: true,
            required: 'email address is required'
        },
        displayName:{
            type: String,
            default: '',
            trim: true,
            required: 'Display name is required'
        },
        created:{
            type: Date,
            default: Date.now
        },
        updated:{
            type: Date,
            default: Date.now
        }
    },
    {
        collection: "users"
    }
);

// configure options for user model
let options = ({ missingPasswordError: 'Wrong / Missing Password'});
User.plugin(passportLocalMongoose,options);
module.exports.User = mongoose.model('User',User);