//USer module is required
const User=require('../models/users');
module.exports.profile=function(req,res){
   User.findById(req.cookies.user_id,function(err,user){
       //if(err){console.log('Error in Loading Profile Page');return ;}
       if(!(req.cookies.user_id))
       {
           return res.redirect('user/sign-in');
       }
   
       if(user)
       {
           console.log("hello");
        return res.render('users',{
            title:"Profile",
            name:user.name,
            email:user.email
        });
       }
       else
       return res.redirect('/user/sign-in');
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
    //Find User
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('Error in Signing In the user');return ;}
        if(user)
        {   
            //Found
            console.log(req.body);
            console.log(user);
             //var userObj=user.toObject();
            if(user.password!=req.body.password)
            { //Wrong Password
                return res.redirect('back');
            }
            else
            {   
                res.cookie('user_id',user.id);
                return res.redirect('/user/profile');
            }
        }
        else
        {
            return res.redirect('back');
        }
    });
};