const Joi = require("joi");

class TaskValidator {
  addTaskValidate(body) {
    const schema = Joi.object({
      content: Joi.string().required().max(50),
      date: Joi.number().required(),
      important: Joi.boolean(),
      completed: Joi.boolean(),
    });
    return schema.validate(body);
  }
  deleteTasksValidate(body) {
    const schema = Joi.object({
      ids: Joi.array().items(Joi.string()),
    });
    return schema.validate(body);
  }
  updateTaskValidate(body) {
    const schema = Joi.object({
      id: Joi.string().required().max(30),
      content: Joi.string().max(50),
      last_updated: Joi.number().required(),
      important: Joi.boolean(),
      completed: Joi.boolean(),
    });
    return schema.validate(body);
  }
}

module.exports = new TaskValidator();
