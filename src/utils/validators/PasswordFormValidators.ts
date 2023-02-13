import Joi from "joi";

const passwordFormValidators = Joi.object({
    password: Joi.string().min(8).max(128).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required().messages({
        "string.min": "Must have at least 8 characters",
        "object.regex": "Must have at least 8 characters",
        "string.pattern.base": "Must containe: Min 1 uppercase letter.\n" +
            "Min 1 lowercase letter.\n" +
            "Min 1 special character.\n" +
            "Min 1 number.\n" +
            "Min 8 characters.\n" +
            "Max 30 characters."
    }),
    password_confirmation: Joi.string().valid(Joi.ref('password')).required()
});

export {passwordFormValidators}