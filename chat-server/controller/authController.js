const {validationResult} = require('express-validator')
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const user = require('../model/user');

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

        const result = await user.save();
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

exports.SignIn = (req,res,next)=>{
    const {email, password} = req.body;
    let loadUser;

    User.findOne({email: email})
    .then((user)=>{
        if(!user){
            let error= new Error("No email is please enter the correct email");
            error.statusCode = 401;
            throw error
        }

        loadUser = user;
        return bycrypt.compare(password,user.password);
    })
    .then((isEqual)=>{
        if(!isEqual){
            const error = new Error('Wrong Password');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({
            email: loadUser.email,
            userId: loadUser._id.toString(),
        },"supersecretesecrete",{expiresIn: '10h'})

        res.status(200).json({
            token:token,
            userId: loadUser._id.toString(),
        })
    })
    .catch((err)=>{
        if(!err.statusCode){
          err.statusCode = 500;
        }
        next(err)
    })
}

exports.getUserInfo = (req,res,next)=>{
  const userId = req.userId;
  User.findById(userId)
  .select('name email')
  .then(user=>{
    if(!user){
      return res.status(404).json({message:'User not found'})
    }
    res.status(200).json({name:user.name,email:user.email})
  })
}