const express=require('express');
const router=express.Router();

console.log('In the file');
const homeController=require('../controllers/homeController');

router.get('/',homeController.home);

router.use('/user',require('./users'));

router.use('/post',require('./posts'));

router.use('/comment',require('./comment'));


module.exports=router;