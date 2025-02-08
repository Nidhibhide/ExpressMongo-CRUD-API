import Joi from "joi";

// Common validations
const name = Joi.string().min(3).max(30).messages({
  "string.min": "Name must be at least 3 characters",
  "string.max": "Name must not exceed 30 characters",
});

const email = Joi.string().email().messages({
  "string.email": "Invalid email format",
});

const password = Joi.string()
  .min(6)
  .max(20)
  .messages({
    "string.min": "Password must be at least 6 characters",
    "string.max": "Password must not exceed 20 characters",
  });

const orderIds = Joi.array().items(Joi.string().hex().length(24)).messages({
  "string.hex": "Invalid order ID format",
  "string.length": "Order ID must be a 24-character hex string",
});

// Validation for creating a user (all fields required)
export const createUserValidation = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  orderIds: orderIds.default([]), // Default to empty array if not provided
});

// Validation for updating a user (all fields optional)
export const updateUserValidation = Joi.object({
  name,
  email,
  password,
  orderIds,
});
