const asyncWrapper=(fn)=>{
    return async(req,res,next)=>{
        try {
            await fn(req,res,next);
        } catch (error) {
            if(error.name=='SequelizeUniqueConstraintError')
                error.message="the email is already used"
            next(error)
        }
    }
}

module.exports=asyncWrapper;