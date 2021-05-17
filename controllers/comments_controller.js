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
module.exports.destroy=function(req,res){

    Comment.findById(req.params.id,function(err,comment){
        if(err){console.log('Error in Deleting Comment');return ;}
        if(comment && req.user.id==comment.user)
        {   
            const pid=comment.post;
            comment.remove();
            Post.findByIdAndUpdate(pid,{$pull:{comments:req.params.id}},function(err,post){
                if(err){console.log('Error in Deleting Comment from post');return ;}
                return res.redirect('back');
            });



            //MY mEthod
//             Post.findById(comment.post,function(err,post){
//                 if(err){console.log('Error in Deleting Comment from post');return ;}
// //                 const index = array.indexOf(5);
// // if (index > -1) {
// //   array.splice(index, 1);
// // }
//                 const idx=post.comments.indexOf(req.params.id);
//                 post.comments.splice(idx,1);
//                 post.save();
//                 return res.redirect('back');
//             });





        }
        else
        {
            return res.redirect('back');
        }
    });
};