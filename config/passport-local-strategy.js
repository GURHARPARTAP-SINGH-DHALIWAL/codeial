const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/users');

passport.use(new LocalStrategy({
    usernameField:'email'
}, function(email,password,done){
    User.findOne({email:email},function(err,user){
        if(err){console.log('Error in finding user --> Passport ');return done(err);}

        if(!user||user.password!=password){
            console.log('Invalid Username/Password');
            return done(null,false);
        }
        return done(null,user);

        
    });
}



));
//once authrnticated we serialise user and set userid as cookie and when browser makes request we deserialise cookie to fins user

passport.serializeUser(function(user,done){
    //return 
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    
    User.findById(id,function(err,user){
        if(err){console.log('Error in finding user --> Passport ');return done(err);}
       return  done(null,user);
    });
});
//if we try to access profule page we will app;y this middleware and if the user is not authenticated he cannot access it
passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated())
    {
       return  next();
    }
    return res.redirect('/user/sign-in');

};
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated())
    {   
        res.locals.user=req.user;
       return  next();
    }
    return res.redirect('/user/sign-in');
};
module.exports=passport;