import Joi from "joi";

const loginFormValidator = Joi.object({
    email: Joi.string().email({tlds: {allow: false}}).required(),
    password: Joi.string().min(8).max(128).uppercase().lowercase().alphanum().required()
});

export {loginFormValidator}