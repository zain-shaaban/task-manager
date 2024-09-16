const errorHandler=(err,req,res,next)=>{
    if(err.failToken)
    return res.status(err.status||500).json({
        status:0,
        message:err.message,
        data:{verifyUserToken:err.failToken}
    })
    res.status(err.status||500).json({
        status:0,
        message:err.message,
    })
}

module.exports=errorHandler