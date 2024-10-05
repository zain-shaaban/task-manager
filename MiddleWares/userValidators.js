const Joi = require("joi");
class UserValidator {
  registerValidate(body) {
    const schema = Joi.object({
      username: Joi.string().required().max(30),
      email: Joi.string().required().email().min(3).max(30),
      password: Joi.string().required().min(8).max(30),
    });
    return schema.validate(body);
  }
  loginValidate(body) {
    const schema = Joi.object({
      email: Joi.string().required().email().min(3).max(30),
      password: Joi.string().required().max(30),
    });
    return schema.validate(body);
  }
  updateUserValidate(body) {
    const schema = Joi.object({
      username: Joi.string().min(3).max(30),
      email: Joi.string().email().min(3).max(30),
      password: Joi.string().min(8).max(30),
      appearance: Joi.number(),
      auto_delete: Joi.boolean(),
    });
    return schema.validate(body);
  }
  confirmUserValidate(body) {
    const schema = Joi.object({
      confirm_key: Joi.string().required().length(6),
    });
    return schema.validate(body);
  }
  deleteUserValidate(body) {
    const schema = Joi.object({
      userId: Joi.number().required(),
      password: Joi.string().required().max(30),
    });
    return schema.validate(body);
  }
}

module.exports = new UserValidator();
