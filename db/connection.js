const mongoose = require('mongoose');

const connectionUrl = "mongodb://127.0.0.1:27017/Dckcart"

exports.connect = async () => {
    try {
        await mongoose.connect(connectionUrl)
        console.log("Connected to DB")
    }
    catch (e) {
        console.log(e)
    }
}