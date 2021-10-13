import Joi from 'joi';

export const createTaskSchema = Joi.object({
  title: Joi.string().min(3).max(40).required(),
  description: Joi.string().min(3).max(255).required(),
  status: Joi.boolean(),
});
export const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(40),
  description: Joi.string().min(3).max(255),
  status: Joi.boolean(),
});
