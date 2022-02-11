import Joi from 'joi';

export const validationTopUp = (body) => {
  const topUpScheme = Joi.object({
    amount: Joi.string()
      .pattern(/^[0-9]+$/)
      .min(5)
      .max(8)
      .required()
      .messages({
        'string.empty': `Amount cannot be an empty`,
        'string.pattern.base': 'Amount should all be numbers',
        'string.min': 'Minimum amount is 10.000',
        'string.max': 'Maximum amount is 99.999.999',
        'any.required': `Pin is required`,
      }),
  });
  return topUpScheme.validate(body);
};
