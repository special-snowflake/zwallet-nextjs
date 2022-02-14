import Joi from 'joi';

export const validateSignUp = (body) => {
  const signUpScheme = Joi.object({
    firstName: Joi.string().min(3).required().messages({
      'string.base': `First name should be a type of 'text'`,
      'string.empty': `First name cannot be an empty`,
      'string.min': `First name should contain {#limit} characters`,
      'any.required': `First name is a required`,
    }),
    lastName: Joi.string().min(3).required().messages({
      'string.base': `Last name should be a type of 'text'`,
      'string.empty': `Last name cannot be an empty`,
      'string.min': `Last name should contain {#limit} characters`,
      'any.required': `Last name is a required`,
    }),
    email: Joi.string()
      .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
      .required()
      .messages({
        'string.empty': `Email cannot be an empty`,
        'string.email': 'Email must be valid',
        'any.required': `Email is a required`,
      }),
    password: Joi.string().min(5).max(32).required().messages({
      'string.empty': `Password cannot be an empty`,
      'string.min': 'Password should be longer than {#limit} characters',
      'string.max': 'Password should be less than {#limit} characters',
      'any.required': `Password is a required`,
    }),
  }).options({abortEarly: false});
  return signUpScheme.validate(body);
};

export const validateLogin = (body) => {
  const loginScheme = Joi.object({
    email: Joi.string()
      .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
      .required()
      .messages({
        'string.empty': `Email cannot be an empty`,
        'string.email': `Email is not valid`,
        'any.required': `Email is a required`,
      }),
    password: Joi.string().min(5).max(32).required().messages({
      'string.empty': `Password cannot be an empty`,
      'string.min': 'Password should be longer than {#limit} characters',
      'string.max': 'Password should be less than {#limit} characters',
      'any.required': `Password is a required`,
    }),
  }).options({abortEarly: false});
  return loginScheme.validate(body);
};

export const validatePassword = (body) => {
  const passwordScheme = Joi.object({
    password: Joi.string()
      .pattern(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{6,}$/)
      .message({
        'any.empty': 'Password is not allowed to be empty',
        'string.empty': 'Password is not allowed to be empty',
        'string.pattern.base':
          'Password must be at least 6 characters, including lowercase, uppercase letter and number',
        'any.required': `Password is required`,
      }),
  });
  return passwordScheme.validate(body);
};

export const validateEmail = (body) => {
  const emailScheme = Joi.object({
    email: Joi.string()
      .pattern(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
      .message({
        'any.empty': 'Email is not allowed to be empty',
        'string.empty': 'Email is not allowed to be empty',
        'string.pattern.base': 'Email is not valid',
      }),
  });
  return emailScheme.validate(body);
};
