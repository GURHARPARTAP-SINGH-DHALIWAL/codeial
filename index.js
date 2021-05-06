const express=require('express');
const port =8000;
const expressejslayouts=require('express-ejs-layouts');

const app=express();
app.use(expressejslayouts);

//Use router for handling all requests any route starting wth / is sent to routes to entry point file index.js
app.use('/',require('./routes'));

//set up the view engine
app.set('view engine','ejs');
//folder for views
app.set('views','./views');





app.listen(port,function (err){
    if(err)
    {
        console.log(`Error in Running the Server : ${err}`);
        return ;
    }
    console.log(`Server is Succesfully running on Port :  ${port}`);
});