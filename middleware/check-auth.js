const jwt = require("jsonwebtoken")
const User = require("../module/usermodule")

exports.checkauth = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1]
        // console.log(req.headers.authorization)
        const decodedToken = jwt.verify(token, process.env.secret)
        req.userData = decodedToken
        // console.log(req.userData)
        next()
    }catch(e){
        return res.status(401).json({
            "message": "Invalid or expire token provided",
            "error": e
        })
    }
}


exports.getlogedInuser = (req, res, next) => {
    User.find({ email : req.userData.email }).exec().then(user => {
        req.profile = user
        next()
    }).catch(err => {
        res.status(404).json({
            success : false,
            message : "Something went wrong in middleware"
        })
    })
}

