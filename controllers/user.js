const donation = require('../models/donationSchema')
const User = require('../models/userSchema')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
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
    bcrypt.compare(password, finalUser.password, async function (err, isMatch) {
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
            );
            await User.findOneAndUpdate({ username: finalUser.username }, { $set: { jwtToken: token } })
            let loggedInUserDetails = {
                id: finalUser._id,
                username: finalUser.username,
                imageUrl: finalUser.imageUrl,
                profession: finalUser.profession,
                token: token
            }
            return res.status(200).json({
                message: "logged in",
                status: 'ok',
                loggedInUserDetails
            })
        }
    })
}


exports.userSignup = async (req, res) => {
    try {
        // console.log(req.file)
        const { username, profession, confirmPassword } = req.body;
        const userNameExists = await User.exists({ username: username });
        if (userNameExists) {
            return res.status(409).json({
                status: "error",
                message: "User already exists with the same username."
            })
        }

        const encryptedPassword = await bcrypt.hash(req.body.password, 10);
        let picUrl = req.file ? req.file.originalname : null
        if (confirmPassword !== req.body.password) {
            res.json({
                message: "Please check your password"
            })
        } else {
            const user = new User({
                username: req.body.username,
                profession: profession,
                password: encryptedPassword,
                imageUrl: picUrl ? `/${picUrl}` : null,
                confirmPassword: confirmPassword
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

exports.donation = async (req, res) => {
    try {
        const donor = new donation({
            currency: req.body.currency,
            amount: req.body.amount,
            name: req.body.name,
            message: req.body.message,
            toCreator: req.body.toCreator,
            fromCreator: req.body.fromCreator
        })
        await donor.save()
        res.send("done")
    }
    catch (e) {
        console.log(e)
    }
}
exports.getDonationsBetweenTwoCreator = async (req, res) => {
    try {
        const { reciever } = req.body
        let results = await donation.find({ toCreator: reciever } && { fromCreator: req.user._id })
        res.send(results)
    } catch (e) {

    }
}
exports.paginatedCreatorsList = async (req, res) => {
    try {
        let { page, limit } = req.query
        !page ? page = 1 : null
        !limit ? limit = 5 : null
        const skip = (page - 1) * 5
        let users = await User.find().select('username profession imageUrl -_id' ).skip(skip).limit(limit)
        // console.log(users.username)
        res.send({ page: page, limit: limit, users: users })
    } catch (e) {
        console.log(e)
    }
}
// 