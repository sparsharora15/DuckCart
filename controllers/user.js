const donation  = require('../models/donationSchema')
const   User  = require('../models/userSchema')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const secret = 'kbvliy712iw3rrhrwlfbo727';

exports.userSignIn = async (req, res) => {
    const { username, password } = req.body
    let finalUser
  if (username) {
        finalUser = await User.findOne({ username: username })
    }  

    if (!finalUser) {
        return res.status(401).json({ status: 'error', error: 'Please check your username' })

    }
    bcrypt.compare(password, finalUser.password, function (err, isMatch) {
        if (err) {
            throw err
        } else if (!isMatch) {
            return res.status(403).json({
                message: "The password is not correct"
            })
        } else {
            const token = jwt.sign(
                {
                    id: finalUser._id,
                    username: finalUser.username,
                },
                secret
            )

            return res.status(200).json({ status: 'ok', data: finalUser, token: token })
        }
    })
}


exports.userSignup = async (req, res) => {
    try {
        // console.log(req.file)
        const { username , profession , confirmPassword } = req.body;
        const userNameExists = await User.exists({ username: username });
        if (userNameExists) {
            return res.status(409).json({
                status: "error",
                message: "User already exists with the same username."
            })
        }
        
        const encryptedPassword = await bcrypt.hash(req.body.password, 10);
        let picUrl = req.file ? req.file.originalname : null
        if(confirmPassword!==req.body.password){
         res.json({
            message:"Please check your password"
         })
        } else{
        const user = new User({
            username: req.body.username,
            profession:profession,
            password: encryptedPassword,
            imageUrl: picUrl ? `/${picUrl}` : null,
            confirmPassword:confirmPassword
        });

               await user
                   .save()
               return res.status(200).json({
                   message: "The user successfully registered"
               })
           }
    }

    catch (err) {
        console.log(err)
    }
}

exports.donation = async(req,res)=>{
    try{
        const donor = new donation({
            currency:req.body.currency,
            amount:req.body.amount,
            name:req.body.name,
            message:req.body.message,
            toCreator:req.body.toCreator,
            fromCreator:req.body.fromCreator
        })
        await donor.save()
        res.send("done")
    }
    catch(e){
        console.log(e)
    }
}
exports.getDonationsBetweenTwoCreator = async(req,res)=>{
    try {
        const {sender,reciever} = req.body
        let results = await donation.find({toCreator:reciever}&& {fromCreator:sender})
        res.send(results)
    }catch(e){

    }
}
exports.pagenatedCreatorsList = async(req,res)=>{
    try {
        let { page , limit } = req.query
        !page?page=1:""
        !limit?limit=5:""
        const skip = (page-1)*5
        const users = await User.find().skip(skip).limit(limit)
        res.send({page:page , limit : limit , users:users})
    }catch(e){

    }
}
