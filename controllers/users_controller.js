//USer module is required
const User=require('../models/users');
module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('users',{
            title:"profile",
            c_user:user
        });
    });
   
};
module.exports.signUp=function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect('/user/profile');
    }
    return res.render('user_sign_up',{
        title:"Coedial|SignUp"
    });
};

module.exports.signIn=function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect('/user/profile');
    }
    return res.render('user_sign_in',{
        title:"Coedial|SIgnIn"
    });
};
module.exports.create=function(req,res){
  
    console.log(req.body);
  
    if(req.body.password!=req.body.confirm_password)
    {    req.flash('error','Passwords do not match');
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user)
    {
        if(err){console.log('Error in Signing Up the user');
        req.flash('error','Unexpected Error');
        return ;}
        if(!user)
        {
            User.create({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password
            },function(err,user){
                if(err){console.log('Error in Creating User in DB'); req.flash('error','Unexpected Error');return ;}
                req.flash('success','Registered Successfully!');
                return res.redirect('/user/sign-in');
            });
        }
    });
};
module.exports.createSession=function(req,res){
    req.flash("success","Logged In Successsfully");
    return res.redirect('/');
};

module.exports.destroySession=function(req,res)
{
    req.logout();
    req.flash("success","Logged Out Successsfully");
    return res.redirect('/');
}

module.exports.update=function(req,res){
    //My Try
    // User.findById(req.params.id,function(err,user){
    //     console.log(user);
    //     if(user&&req.user.id==req.params.id)
    //     {
    //     user.name=req.body.name;
    //     user.email=req.body.email;
    //     user.save();
    //     return res.redirect('back');
    // }
    // else
    // {
    //     return res.redirect('back');
    // }
    // });

    if(req.params.id==req.user.id)
    {    
        console.log(req.body);
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            if(err){console.log('Error in Updating User Info');return ;}
            return res.redirect('back');

        });
    }
    else
    {
        return res.status(401).send('Unauthorised');
    }

};