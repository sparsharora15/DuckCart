const userSchema = require("../models/userSchema")
const jwt = require('jsonwebtoken');
const secret = 'kbvliy712iw3rrhrwlfbo727';

exports.DonationAuth = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            let verification = jwt.verify(token, secret)
            let user = await userSchema.findById(verification.id)
            console.log(user.jwtToken)
            if(user.jwtToken === token){
                req.body.fromCreator = user._id; 
                next();
            } else {
                res.status(401).json({
                    status: "Unauthorized",
                    message: "Invalid Token"
                })
            }
        }
        else {
            res.status(401).json({
                status: "Unauthorized",
                message: "No token passed"
            })
        }
    }
    catch(e){
        res.json({
            status: "Error",
            message: 'you are not authorised to do this transaction'
        })
    }
}