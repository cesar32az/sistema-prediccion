import Joi from 'joi';

export const updateUser = Joi.object({
  name: Joi.string().min(3).max(1),
});
