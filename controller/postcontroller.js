const Post = require("../module/postmodel")
const Image = require("../module/imagemodel")
const User = require("../module/usermodule")
const mongoose = require("mongoose")

exports.getallPost = async (req, res) => {
    Post.find({ $or: [{all_seen : true}, { userid : req.profile[0].id}] }).select().populate('userid').exec().then(result => {
        res.status(200).json({
            success: true,
            message: "All Post fetched successfully",
            count: result.length,
            result: result
        })
    }).catch(err => {
        res.status(400).json({
            success: false,
            message: "Error while fetching Post",
            error: err
        })
    })
}


exports.createPost = async (req, res) => {
    let images = []
    for (let i=0; i<=req.files.length-1; i++) {
        images.push(req.files[i].path)
    }

    const post = new Post({
        _id : new mongoose.Types.ObjectId(),
        post : req.body.post,
        all_seen : req.body.all_seen,
        images : images,
        userid : req.profile[0].id,
    })
   
    post.save().then(result => {
        res.status(200).json({
            success: true,
            message: "Post created succesfully",
            result: result
        })
    }).catch(err => {
        res.status(400).json({
            success: true,
            message: "Something went wrong while creating Post",
            error: err
        })
    })
}

exports.findOne = async (req, res) => {
    // Post.findById(req.params.postId).select().exec().then(result => {
    //     res.status(200).json({
    //         success: true,
    //         message: "Post fetched successfully",
    //         result: result
    //     })
    // }).catch(err => {
    //     res.status(400).json({
    //         success: true,
    //         message: "error while fetching Post",
    //         error: err
    //     })
    // })
    try {
        return res.status(200).json({
            success: true,
            message: "Product fetched successfully.",
            result: req.post
        })
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error fetching product.",
            Error: error
        })
    }
}

exports.patchPost = async (req, res) => {
    const id = req.params.postId
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Post.update({ _id: id}, {$set: updateOps}).exec().then(result => {
        res.status(200).json({
            success: true,
            message: "Product updated successfullty",
            result: result
        })
    }).catch(err => {
        res.status(400).json({
            success: false,
            message: "Errore while updating product",
            error: err
        })
    })
}

exports.deletePost = async (req, res) => {
    Post.remove({ _id: req.params.PostId }).exec().then(result => {
        res.status(200).json({
            success: true,
            message: "Post deleted succesfully",
            result: result
        })
    }).catch(err => {
        res.status(400).json({
            success: true,
            message: "Error while deleting Post",
            error: err
        })
    })
}
















// exports.get = async(req, res) => {

//     // console.log("ID", req.profile[0].id)
    // let post = await Post.aggregate([
    //     { $match: {seen_permission : "Everyone can view"} },
    //     { $lookup: { 
    //         from: "Images", 
    //         let : { "pid" : "$_id" },
    //         pipeline : [
    //             { $match : { $expr : { $eq : ["$postid", "$$pid" ]}}}
    //         ],
    //         as :"Images"} },
    // ]).exec((err, data) => {
    //     if (err) throw err;
    //     res.json(data)
    // });

// ===========================================================================================
// let post = await Post.aggregate([
//         {
//           $lookup: {
//             from: "Images",
//             // localField: "_id",
//             // foreignField: "postid",
//             let: { pid: "$_id" },
//             pipeline: [
//             { $match: { $expr: { $eq: ["$postid", "$$pid"] } } }
//           ],
//             as: "Images"
//           }
//         },
//        {
//          $project: {
//            post: "$post",
//            seen_permission : "$seen_permission",
//            userid : "$userid",
//            mimetype: "$mimetype",
//            Images : "$Images"
//          }
//        }
//      ]).exec();

//     res.json(post)
// }