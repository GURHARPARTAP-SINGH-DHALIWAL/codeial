const express=require('express');
const cookieParser=require('cookie-parser');
const port =8000;
const expressejslayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const app=express();
const session=require('express-session');   
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
app.use(expressejslayouts);
//From every ejs page it will take the link tag and put it in the head
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(cookieParser());//Put it before tellingthat route will handle requests
app.use(express.urlencoded());
app.use(express.static('assets'));


//set up the view engine
app.set('view engine','ejs');
//folder for views
app.set('views','./views');

//Actually to encrypt the session cookie express session is used ir is told which cookie to creatre value is provided in serialised function and an encryption secret is used
app.use(session({
    name:'codeial',
    secret:'protectmywebsite',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge : (1000*60*200)
    }
}));

app.use(passport.initialize());
app.use(passport.session());
//Use router for handling all requests any route starting wth / is sent to routes to entry point file index.js
app.use('/',require('./routes'));
// app.use(express.urlencoded());
// app.use(express.static('assets'));



app.listen(port,function (err){
    if(err)
    {
        console.log(`Error in Running the Server : ${err}`);
        return ;
    }
    console.log(`Server is Succesfully running on Port :  ${port}`);
});