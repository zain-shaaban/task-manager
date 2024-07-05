const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    appearance:{
        type:Number,
        default:1
    }
})

userSchema.pre("save",function(next){
    this.password=bcrypt.hashSync(this.password,bcrypt.genSaltSync());
    next();
})

userSchema.pre("findOneAndUpdate",function(next){
    if(this._update.password)
        this._update.password=bcrypt.hashSync(this._update.password,bcrypt.genSaltSync());
    next();
})

userSchema.method("Auth",function(password){
    return bcrypt.compareSync(password,this.password);
})

module.exports=mongoose.model("User",userSchema)