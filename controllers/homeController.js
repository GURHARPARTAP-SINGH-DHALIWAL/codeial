const Post=require('../models/posts');
const Comment=require('../models/comment');

module.exports.home=function(req,res){
    console.log(req.cookies);
    // Post.find({},function(err,post){
    //     if(err){console.log('Error in Displaying Posts');return;}
    //     return res.render('home',{
    //         title:"Home Page",
    //         posts:post
    //     });
    // });
    //populate the 'user' field with object
    Post.find({}).populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err,post){
        if(err){console.log('Error in Displaying Posts');return;}
       

        return res.render('home',{
            title:"Home Page",
            posts:post,
            
        });
    });
    // return res.render('home',{
    //     title:"Home Page"
    // });
};