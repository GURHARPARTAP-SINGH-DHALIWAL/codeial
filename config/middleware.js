//setting flash messages this is a middle ware
module.exports.setFlash=function(req,res,next){

    res.locals.flash={
        'success':req.flash('success'),
        'error':req.flash('error')
    }
    next();
}