const Joi = require("joi");
class OfflineValidator {
  validate(body) {
    const schema = Joi.object({
        token:Joi.string().required().max(220),
        deleteArray: Joi.array().items(Joi.string().max(30)).required(),
      updateArray: Joi.array().items(
        Joi.object({
          _id: Joi.string().required().max(30),
          content: Joi.string().max(50),
          last_updated: Joi.number().required(),
          important:Joi.boolean(), 
          completed:Joi.boolean(), 
        })
      ),
      addArray: Joi.array().items(
        Joi.object({
          _id: Joi.string().max(30),
          content: Joi.string().max(50),
          date: Joi.number(),
          important:Joi.boolean(), 
          completed:Joi.boolean(),
        })
      ).required(),
    });
    return schema.validate(body);
  }
}


module.exports=new OfflineValidator()