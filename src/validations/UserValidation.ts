import Joi from "joi";

// Common validations
const name = Joi.string().min(3).max(30).required().messages({
  "string.min": "Name must be at least 3 characters",
  "string.max": "Name must not exceed 30 characters",
  "any.required": "Name is required",
});

const email = Joi.string().email().required().messages({
  "string.email": "Invalid email format",
  "any.required": "Email is required",
});

const password = Joi.string().min(6).max(20).required().messages({
  "string.min": "Password must be at least 6 characters",
  "string.max": "Password must not exceed 20 characters",
  "any.required": "Password is required",
});



const role = Joi.string().valid("admin", "user", "seller").messages({
  "any.only": 'Role must be one of "admin", "user", or "seller"',
});

// Validation for creating a user (all fields required)
export const createUserValidation = Joi.object({
  name,
  email,
  password,
  // orderIds,
  role: role.required().messages({
    "any.required": "Role is required",
  }),
});

// Validation for updating a user (all fields optional)
export const updateUserValidation = Joi.object({
  name: name.optional(),
  email: email.optional(),
  password: password.optional(),
  // orderIds: orderIds.optional(),
  role: role.optional(),
});
