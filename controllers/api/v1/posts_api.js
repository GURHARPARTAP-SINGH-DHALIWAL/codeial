const Post=require('../../../models/posts');
const Comment=require('../../../models/comment');

module.exports.index=async function(req,res){
    console.log(req.params.id);
    let post=await Post.find({}).populate('user','-password').populate({
        path:'comments',
        
        populate:{
            path:'user'
        }
    }).sort('-createdAt');
    return res.status(200).json({
        message:"List of Posts",
        posts:post
    });
}




module.exports.destroy=async function(req,res){
    try{
    let post=await Post.findById(req.params.id);
  
    await post.remove();
    await Comment.deleteMany({post:post._id});
  
     console.log(post);
  
  
    return res.status(200).json({
        message:"Post and Associated Comments Deleted"
    });


}catch(err)
{  console.log("hell");
    return res.status(500).json({
        message:"Internal Server Error"
    });
}
    

};