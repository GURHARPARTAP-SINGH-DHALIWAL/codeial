//USer module is required
const User=require('../models/users');
module.exports.profile=function(req,res){
    return res.render('users',{
        title:"profile",
        name:"GSD"
    });
};
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:"Coedial|SignUp"
    });
};

module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title:"Coedial|SIgnIn"
    });
};
module.exports.create=function(req,res){
  
    console.log(req.body);
  
    if(req.body.password!=req.body.confirm_password)
    {
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user)
    {
        if(err){console.log('Error in Signing Up the user');return ;}
        if(!user)
        {
            User.create({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password
            },function(err,user){
                if(err){console.log('Error in Creating User in DB');return ;}
                return res.redirect('/user/sign-in');
            });
        }
    });
};
module.exports.createSession=function(req,res){
    return res.redirect('/');
};