const Post=require('../models/posts');

module.exports.home=function(req,res){
    console.log(req.cookies);
    // Post.find({},function(err,post){
    //     if(err){console.log('Error in Displaying Posts');return;}
    //     return res.render('home',{
    //         title:"Home Page",
    //         posts:post
    //     });
    // });
    Post.find({}).populate('user').exec(function(err,post){
        if(err){console.log('Error in Displaying Posts');return;}
        return res.render('home',{
            title:"Home Page",
            posts:post
        });
    });
    // return res.render('home',{
    //     title:"Home Page"
    // });
};