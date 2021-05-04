const express=require('express');
const router=express.Router();

console.log('In the file');
const homeController=require('../controllers/homeController');

router.get('/',homeController.home);


module.exports=router;