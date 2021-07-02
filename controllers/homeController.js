const Post=require('../models/posts');
const Comment=require('../models/comment');
const User=require('../models/users');

module.exports.home=async function(req,res){
   try{
       //Added -password change if error
    let post=await Post.find({}).populate('user','-password').populate({
        path:'comments',
        
        populate:{
            path:'user'
        }
    }).sort('-createdAt');

    
    let users=await User.find({});
    return res.render('home',{
        title:'Home Page',
        posts:post,
        all_users:users

    });}
    catch(err){
        console.log('Error ',err);
        return ;
    }
    // console.log(req.cookies);
    // // Post.find({},function(err,post){
    // //     if(err){console.log('Error in Displaying Posts');return;}
    // //     return res.render('home',{
    // //         title:"Home Page",
    // //         posts:post
    // //     });
    // // });
    // //populate the 'user' field with object
    // Post.find({}).populate('user')
    // .populate({
    //     path:'comments',
    //     populate:{
    //         path:'user'
    //     }
    // })
    // .exec(function(err,post){
    //     if(err){console.log('Error in Displaying Posts');return;}
       
    //     User.find({},function(err,users){
    //         if(err){console.log('Error in Dislplaying Friends List');return;}

    //         return res.render('home',{
    //             title:"Home Page",
    //             posts:post,
    //             all_users:users
                
    //         });
    //     });
       
    // });
    // // return res.render('home',{
    // //     title:"Home Page"
    // // });
};