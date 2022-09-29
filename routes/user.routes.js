const {
     userSignup ,
     userSignIn ,
     donation   ,
     pagenatedCreatorsList,
     getDonationsBetweenTwoCreator 
} = require('../controllers/user')
const express = require('express')
const router = express.Router()
const {upload} = require("../middleware/imgUpload")

router.post("/signup", upload.single('Image'), userSignup)
router.post("/login", userSignIn) 
router.post("/donation", donation)
// router.get("/alldonations", alldonations)
router.get("/pagenatedCreatorsList", pagenatedCreatorsList)
router.get("/getDonationsBetweenTwoCreator", getDonationsBetweenTwoCreator)


module.exports = router;    