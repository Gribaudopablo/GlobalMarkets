const { Console } = require('console');
const bcrypt =require('bcrypt'); 
const {validationResult} = require('express-validator');

const userSchema = require('../../models/user'); 

const createLogin = (req, res) => {

    res.render('Login')
   
    
}


module.exports = createLogin;