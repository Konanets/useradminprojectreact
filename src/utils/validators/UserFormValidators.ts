import Joi from "joi";

const userFormValidators = Joi.object({
    email: Joi.string().email({tlds: {allow: false}}).required(),
    profile: {
        name: Joi.string().min(1).max(20).regex(/^[a-zа-яёіA-ZА-ЯЇЁ]+$/, 'iu').required(),
        surname: Joi.string().min(1).max(20).regex(/^[a-zа-яёіA-ZА-ЯЇЁ]+$/, 'iu').required(),
    }
});

export {userFormValidators}