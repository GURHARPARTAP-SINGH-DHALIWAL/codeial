const Post=require('../models/posts');
const Comment=require('../models/comment');
module.exports.create=function(req,res){
    Post.create({
        content:req.body.content,
        user:req.user._id
    },function(err,post){
        if(err){console.log('Error in Posting');
        req.flash('error','Unexpected Error'); 
        return ;}
       req.flash('success','Post Created!');
     
        if(req.xhr)
        {
            return res.status(200).json({
                data:{
                    post:post,
                   
                },
                flash:{
                    success:req.flash('success'),
                    error:req.flash('error')
                },
                message:"Post Created"
            });
        }
        return res.redirect('back');
    });

}

module.exports.destroy=async function(req,res){
    let post=await Post.findById(req.params.id);
    if(post&&post.user==req.user.id)
    {
    await post.remove();
    await Comment.deleteMany({post:post._id});
    req.flash('success','Post Deleted!');
    console.log(req);
    // console.log(res);
    if(req.xhr){ 
    return res.status(200).json({
        data:{
            post_id:req.params.id,
            
        },
        flash:{
            success:req.flash('success'),
            error:req.flash('error')
        },
        message:"Post Deleted Successfully"
    });
}
    
    }
    else
    {
        req.flash('error','You cannot delete this Post!');
    }
    return res.redirect('back');
    
    
    // Post.findById(req.params.id,function(err,post){
    //     if(err){console.log('Error in Deleting Post');return ;}
    //     if(post&&post.user==req.user.id)
    //     {
    //         post.remove();
    //         Comment.deleteMany({post:req.params.id},function(err){
    //             if(err){console.log('Error in Deleting Comments While Deleting a Post');return ;}
    //             return res.redirect('back');
    //         });
    //     }
    //     else
    //     {
    //         return res.redirect('back');
    //     }
    // });
};