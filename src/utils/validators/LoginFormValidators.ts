import Joi from "joi";

const loginFormValidators = Joi.object({
    email: Joi.string().email({tlds: {allow: false}}).required(),
    password: Joi.string().min(8).max(128).required()
});

export {loginFormValidators}