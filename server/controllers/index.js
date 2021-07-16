/*
File name: index.js
Name: Sarabun Tohura
Student no: 300685525
Date: 2021-06-17
*/

// create express reference 
let express = require('express');

// create router reference 
let router = express.Router();

// create mongoose reference 
let mongoose = require('mongoose');

// create passport reference 
let passport = require('passport');

// define user model
let userModel = require('../models/user');
// kind of alias creation
let User = userModel.User;

//Home page rendering with passing different values
module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home',displayName:req.user ? req.user.displayName : ''});
}

//About page rendering with passing different values
module.exports.displayGroupPage = (req, res, next) => {
    res.render('index', { title: 'Group Members',displayName:req.user ? req.user.displayName : ''});
}

//Project page rendering with passing different values
module.exports.displayProjectsPage = (req, res, next) => {
    res.render('index', { title: 'Projects',displayName:req.user ? req.user.displayName : ''});
}

//Services page rendering with passing different values
//module.exports.displayServicesPage = (req, res, next) => {
//    res.render('index', { title: 'Services',displayName:req.user ? req.user.displayName : ''});
//}

//Contact page rendering with passing different values
//module.exports.displayContactPage = (req, res, next) => {
//    res.render('index', { title: 'Contact',displayName:req.user ? req.user.displayName : ''});
//}

//Login page rendering with passing different values
module.exports.displayLoginPage = (req, res, next) => {
    // check if user login already
    if(!req.user){
        res.render('auth/login',
        {
            title:"Login",
            messages:req.flash('loginMessage'),
            displayName:req.user ? req.user.displayName : ''
        })
    }
    else
    {
        // redirecting
        return res.redirect('/');
    }
}

//When user will hit Submit of login page, this will be invoked
/*
module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err,user,info) => {
        // server error
        if(err)
        {
            return next(err);
        }
        // user login error
        if(!user)
        {
            req.flash('loginMessage','Authentication Error');
            return res.redirect('/login');
        }
        req.login(user,(err) =>{
            if(err){
                return next(err);
            }
            return res.redirect('/contact-list');
        });
    })(req,res,next);
    
}
*/
module.exports.displayRegisterPage = (req, res, next) => {
    if(!req.user){
        res.render('auth/register',
        {
            title:"Register",
            messages:req.flash('registerMessage'),
            displayName:req.user ? req.user.displayName : ''
        })
    }
    else
    {
        return res.redirect('/');
    }
}

/*
module.exports.processRegisterPage = (req, res, next) => {
    let newUser =  new User({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName
    });
    User.register(newUser,req.body.password,(err) =>{
        if(err)
        {
            console.log("Error: Inserting New User");
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log("Error: User Already Exists!");
            }
            return res.render('auth/register',
            {
                title:'Register',
                messages:req.flash('registerMessage'),
                displayName:req.user ? req.user.displayName : ''
            });
        }
        else
        {
            return passport.authenticate('local')(req,res,() =>{
                res.redirect('/contact-list')

            });
        }
    });
}
*/

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');   
}
