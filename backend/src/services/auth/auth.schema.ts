import Joi from 'joi';

export const signupSchema = Joi.object({
  username: Joi.string().min(4).max(12).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(4).required().strict(),
  repeat_password: Joi.ref('password'),
  roles: Joi.array().items(Joi.string().valid('user', 'creator', 'admin')),
  name: Joi.string().min(3).max(15).required(),
});

export const signinSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(4).required().strict(),
});
