const Task=require("../models/task-model");

const getTasks=async(req,res)=>{
    try {
        const tasks=await Task.find().sort({date:"asc"});
        res.status(200).json({
            status:"success",
            data:{tasks}
        })
    } catch (error) {
        res.status(500).json({
            status:"error",
            message:error.message
        })
    }
}

const addtask=async(req,res)=>{
    try{const {content,date}=req.body;
    if(!content){
        res.status(500).json({
            status:"fail",
            data:{content:"content is required!"}
        })
    }
    const task=await Task.create({content,date});
    res.status(201).json({
        status:"success",
        data:{task}
    })
    }catch(err){
        res.status(500).json({
            status:"error",
            message:err.message
        })
    }
}

module.exports={
    getTasks,
    addtask
}