const Comment=require('../models/comment');
const Post=require('../models/posts');
const User=require('../models/users');

module.exports.create=function(req,res)
{   

    var pid=req.body.post;
    Post.findById(pid,function(err,post){
        if(err){console.log('Error in verifying Post');return ;}
        if(!post)
        {
            return res.redirect('back');
        }
        else
        {
            Comment.create({
                content:req.body.comment,
                user:req.user._id,
                post:pid
            },function(err,comment){
                if(err){console.log('Error in Adding Comment');return ;}
                post.comments.push(comment);
                post.save();
                return res.redirect('back');
            });
        }
    });

};