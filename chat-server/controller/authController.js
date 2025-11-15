const {validationResult} = require('express-validator')
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

exports.SignUp =  async (req,res,next)=>{
    const errors = validationResult(req);

    // 422 Unprocessable Content
    if(!errors.isEmpty()){
        return res.status(422).json({
            message:'Validation Failed',
            errors: errors.array()
        })
    }

    const {name, email, password} = req.body;

    try{
        const hashpwd = await bycrypt.hash(password, 12);

        const user = new User({
            name: name,
            email: email,
            password: hashpwd
        });

        const result = user.save();
        res.status(201).json({
            message: 'User created successfully',
            userId: result._id
        })

    }
    catch(err){
        console.log(err);
        // 500 Internal Server Error
        res.status(500).json({
            message:'something went wrong on the server',
            err: err.message,
        })
    }
}