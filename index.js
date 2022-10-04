const express = require('express')
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors")
app.use(cors())
app.use(express.json())
const { connect } = require('./db/connection')
const { errorHandler } = require('./Error Handler/Error.handler')
connect()
const user = require('./routes/user.routes')
app.use(express.static('uploads'))
app.use('/',user)
app.use(errorHandler)

app.listen(port, () => {
    console.log("connected to view port " + port);
})