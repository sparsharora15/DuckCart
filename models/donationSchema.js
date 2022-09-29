const mongoose = require('mongoose')

const donationSchema = new mongoose.Schema({
currency:{
    type:String,
    required:true
},
amount:{
    type:Number,
    required:true
},
name:{
    type:String,
},
message:{
    type:String,
},
toCreator:{
    type:[mongoose.Schema.Types.ObjectId]   
},
fromCreator:{
    type:[mongoose.Schema.Types.ObjectId],
    required:true   
}
})
const donation = mongoose.model('donation', donationSchema)
module.exports =donation