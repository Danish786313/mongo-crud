const mongoose = require("mongoose")
const User  = require("../module/usermodule")
const bcryptjs = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.getuser = async (req, res) => {
    return res.status(200).json({
        success : false,
        message : "User already exist"
    })
}

exports.signup = async (req, res) => {
    User.find({ email : req.body.email }).exec().then(user => {
        if (user.length) {
            return res.status(409).json({
                success : false,
                message : "User already exist"
            })
        } else {
            bcryptjs.hash(req.body.password, 10, (err, hash) => {
                if (err) throw Error
                let user = new User({
                    _id : mongoose.Types.ObjectId(),
                    email : req.body.email,
                    password : hash
                })
                user.save().then(result => {
                    res.status(200).json({
                        success :  true,
                        message : "user created successffully",
                        result : result
                    })
                }).catch(err => {
                    res.status(200).json({
                        success :  false,
                        message : "Errore while creating user",
                        error : err
                    })
                })
            })
        }
    }).catch(err => {
        return res.status(400).json({
            success :  false,
            message : "Errore while creating user",
            error : err
        })
    })
}

exports.signin = async (req, res) => {  
    User.find({ email : req.body.email }).exec().then(user => {
        if (!user.length) {
            return res.status(409).json({
                success : false,
                message : "Invalid email try another email"
            })
        } else {
            bcryptjs.compare(req.body.password, user[0].password, (err, result) => {
                if (err) throw err;
                jwt.sign({
                    email : user[0].email,
                    password : user[0].password
                }, process.env.secret, { expiresIn : '1h' }, (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        success : true,
                        message : "user signin successfully",
                        token: token
                    })
                })
            })
        } 
    }).catch(err => {
        res.status(400).json({
            success : false,
            message : "Something went wrong",
            error: err
        })
    })
}

exports.getAllusers = async (req, res) => {
    User.find().exec().then(user => {
        res.status(200).json({
            success : true,
            message : "All users fetched successfully",
            count : user.length,
            result : user
        })
    }).catch(err => {
        res.status(400).json({
            success : false,
            message : "Error fetching users",
            error : err
        })
    })
}