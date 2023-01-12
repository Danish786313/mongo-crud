const mongoose = require("mongoose")

const postschema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    post : { type : String, required : true },
    all_seen: { type : Boolean, required : true },
    images : { type : Array, required : true },
    userid : { type : mongoose.Schema.Types.ObjectId, ref : 'User', requered : true},
})

module.exports = mongoose.model('Post', postschema)