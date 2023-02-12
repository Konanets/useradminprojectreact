import Joi from "joi";

const groupFormValidators = Joi.object({
    name: Joi.string().min(4).max(128).required()
});

export {groupFormValidators}