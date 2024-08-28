const Joi = require("joi");

class TaskValidator {
  getTasksValidate(body) {
    const schema = Joi.object({
      token: Joi.string().required().max(220),
    });
    return schema.validate(body);
  }
  addTaskValidate(body){
    const schema = Joi.object({
        token: Joi.string().required().max(220),
        content: Joi.string().required().max(50),
        date: Joi.number().required(),
        important:Joi.boolean(), 
        completed:Joi.boolean(), 
      });
      return schema.validate(body);
  }
  deleteTasksValidate(body){
    const schema=Joi.object({
        token: Joi.string().required().max(220),
        ids:Joi.array().items(Joi.string())
    })
    return schema.validate(body);
  }
  updateTaskValidate(body){
    const schema=Joi.object({
        token: Joi.string().required().max(220),
        id: Joi.string().required().max(30),
        content: Joi.string().max(50),
        last_updated: Joi.number().required(),
        important:Joi.boolean(), 
        completed:Joi.boolean(), 
    })
    return schema.validate(body)
  }
}

module.exports=new TaskValidator();
