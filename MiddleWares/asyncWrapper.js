const asyncWrapper=(fn)=>{
    return async(req,res,next)=>{
        try {
            await fn(req,res,next);
        } catch (error) {
            if(error.code==11000)
                error.message="the email is already used"
            next(error)
        }
    }
}

module.exports=asyncWrapper;