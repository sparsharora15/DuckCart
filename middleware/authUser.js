const userSchema = require("../models/userSchema")
const jwt = require('jsonwebtoken');
const secret = 'kbvliy712iw3rrhrwlfbo727';

exports.authUser = async (req, res, next) => {
    try {

        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            const verification = jwt.verify(token, secret)
            const user = await userSchema.findById(verification.id)
            if (user.jwtToken === token) {
                req.user = user;
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
    catch (e) {
        res.json({
            status: "Error",
            message: 'you are not authorised '
        })

    }
}