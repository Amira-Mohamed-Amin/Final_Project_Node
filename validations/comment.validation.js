import Joi from "joi";

export const createCommentSchema = Joi.object({
  content: Joi.string().trim().min(1).required(),
});