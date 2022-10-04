const {
     userSignup ,
     userSignIn ,
     donation   ,
     paginatedCreatorsList,
     getDonationsBetweenTwoCreator 
} = require('../controllers/user')
const {authUser} = require("../middleware/authUser")
const express = require('express')
const router = express.Router()
const {upload} = require("../middleware/imgUpload")

router.post("/signup", upload.single('Image'), userSignup)
router.post("/login", userSignIn) 
router.post("/donation",authUser, donation)
router.post("/getDonationsBetweenTwoCreator",authUser, getDonationsBetweenTwoCreator)
// router.get("/alldonations", alldonations)
router.get("/paginatedCreatorsList", paginatedCreatorsList)


module.exports = router;    