import Joi from "joi";

export const orderValidation = Joi.object({
  totalAmount: Joi.number().integer().min(1).required().messages({
    "number.base": "Total amount must be a number.",
    "number.min": "Total amount must be at least 1.",
    "any.required": "Total amount is required.",
  }),
  
  Items: Joi.array().items(Joi.string().min(1)).min(1).required().messages({
    "array.min": "At least one item is required.",
    "string.min": "Item name cannot be empty.",
    "any.required": "Items field is required.",
  }),
});
