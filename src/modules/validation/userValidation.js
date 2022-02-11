import Joi from 'joi';

export const validatePin = (body) => {
  const pinScheme = Joi.object({
    pin: Joi.string()
      .pattern(/^[0-9]+$/)
      .min(6)
      .max(6)
      .required()
      .messages({
        'string.empty': `Pin cannot be an empty`,
        'string.min': 'Please fill all the field',
        'string.max': 'Please fill all the field',
        'string.pattern.base': 'Pin should all be numbers',
        'any.required': `Pin is required`,
      }),
  });
  return pinScheme.validate(body);
};
