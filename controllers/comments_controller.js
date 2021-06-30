const Comment=require('../models/comment');
const Post=require('../models/posts');
const User=require('../models/users');

module.exports.create=async function(req,res)
{   
    
    
    try{
        //get id from params send slong with from
        //some things are hidden too
        //post id is sedn using hidden form
        //_id returns object id returns string
        let post=await Post.findById(req.body.post);
        console.log(post);
        if(!post)
        return res.redirect('back');
        let comment=await Comment.create({
            content:req.body.comment,
            user:req.user._id,
            post:req.body.post

        });
        req.flash('success','Comment added Successfully');
        console.log(comment);
      await  post.comments.push(comment);
      await  post.save();
      await comment.populate('user','-password').execPopulate();
      if(req.xhr)
      {
          return res.status(200).json({
              data:{
                  comment:comment,
              },
              flash:{
                success:req.flash('success'),
                error:req.flash('error')
            },
              message:"Comment Created"
          });
      }
        return res.redirect('back');



    }catch(err){
        req.flash('error','Unexpected Error');
        console.log('Error ',err);
        return res.redirect('back');
    }

    // var pid=req.body.post;
    // Post.findById(pid,function(err,post){
    //     if(err){console.log('Error in verifying Post');return ;}
    //     if(!post)
    //     {
    //         return res.redirect('back');
    //     }
    //     else
    //     {
    //         Comment.create({
    //             content:req.body.comment,
    //             user:req.user._id,
    //             post:pid
    //         },function(err,comment){
    //             if(err){console.log('Error in Adding Comment');return ;}
    //             post.comments.push(comment);
    //             post.save();
    //             return res.redirect('back');
    //         });
    //     }
    // });

};
module.exports.destroy=async function(req,res){
    try{
        let comment=await Comment.findById(req.params.id);
        if(comment&&comment.user==req.user.id)
        {
            const PostId=comment.post;
            await  comment.remove();
            req.flash('success','Comment Deleted!');
            Post.findByIdAndUpdate(PostId,{$pull:{comments:req.params.id}});
           

        }
        else
        {
            req.flash('error','You are  not authorised to delete this comment!');
        }
        return res.redirect('back');

       
    }catch(err){
        req.flash('error','Unexpected Error');
        console.log('Error ',err);
        return res.redirect('back');

    }

    // Comment.findById(req.params.id,function(err,comment){
    //     if(err){console.log('Error in Deleting Comment');return ;}
    //     if(comment && req.user.id==comment.user)
    //     {   
    //         const pid=comment.post;
    //         comment.remove();
    //         Post.findByIdAndUpdate(pid,{$pull:{comments:req.params.id}},function(err,post){
    //             if(err){console.log('Error in Deleting Comment from post');return ;}
    //             return res.redirect('back');
    //         });



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





    //     }
    //     else
    //     {
    //         return res.redirect('back');
    //     }
    // });
};