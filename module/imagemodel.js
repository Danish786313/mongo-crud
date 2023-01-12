const mongoose = require("mongoose")

const imagechema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : String,
    path : String,
    mimetype : String,
    postid : { type : mongoose.Schema.Types.ObjectId, ref : 'Post', requered : true}
})

module.exports = mongoose.model('Image', imagechema)