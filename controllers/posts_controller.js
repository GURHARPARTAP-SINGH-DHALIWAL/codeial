const Post=require('../models/posts');
const Comment=require('../models/comment');
module.exports.create=function(req,res){
    Post.create({
        content:req.body.content,
        user:req.user._id
    },function(err,post){
        if(err){console.log('Error in Posting');return ;}
        return res.redirect('back');
    });

}
