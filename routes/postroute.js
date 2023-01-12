const express = require("express")
const router = express.Router()
const productcontroller = require("../controller/postcontroller")
const fileuploade = require("../middleware/fileupload")
const checkauth = require("../middleware/check-auth")

router.get("/post", checkauth.checkauth, checkauth.getlogedInuser, productcontroller.getallPost)

router.post("/post", checkauth.checkauth, checkauth.getlogedInuser, fileuploade.upload.array('postimage'), productcontroller.createPost)

router.get("/post/:postid", checkauth.checkauth, productcontroller.findOne)

router.patch("/post/:postid", checkauth.checkauth, productcontroller.patchPost)

router.delete("/post/:postid", checkauth.checkauth, productcontroller.deletePost)


module.exports = router