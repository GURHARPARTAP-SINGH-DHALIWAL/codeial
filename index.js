const express=require('express');
const port =8000;

const app=express();

app.listen(port,function (err){
    if(err)
    {
        console.log(`Error in Running the Server : ${err}`);
        return ;
    }
    console.log(`Server is Succesfully running on Port :  ${port}`);
});