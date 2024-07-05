const asyncWrapper=(fn)=>{
    return async(req,res,next)=>{
        try {
            await fn(req,res,next);
        } catch (error) {
            if(error.code==11000)
                error.message="This Email Is Already Exist"
            next(error)
        }
    }
}

module.exports=asyncWrapper;