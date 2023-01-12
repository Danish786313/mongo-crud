const express = require("express")
const router = express.Router()
const usercontroller = require("../controller/usercontroller")
const checkauth = require("../middleware/check-auth")

router.get("user", checkauth.checkauth, usercontroller.getuser)

router.post("/signup", usercontroller.signup)

router.post("/signin", usercontroller.signin)

router.get("/user", usercontroller.getAllusers)

module.exports = router
