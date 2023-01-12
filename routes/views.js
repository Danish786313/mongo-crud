const express = require("express")
const router = express.Router()

router.get('/home', (req, res) =>{
    res.render('signup.ejs')
})

// router.get('/home', (req, res) =>{
//     // res.sendFile(path.join(__dirname, '../views/createuser.html'))
//     // create path pending
//     res.render('signup.ejs')
// })

router.get('/post', (req, res) =>{
    res.render('post.ejs')
})


module.exports = router
