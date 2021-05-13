const Post=require('../models/posts');

module.exports.home=function(req,res){
    console.log(req.cookies);
    // Post.find({},function(err,post){
    //     if(err){console.log('Error in Displaying Posts');return;}
    // });
    return res.render('home',{
        title:"Home Page"
    });
};