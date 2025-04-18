// product.validation.js
import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().max(255).required(),
  price: Joi.number().min(0).required(),
  quantity: Joi.number().min(1).required(),
  category: Joi.string()
    .valid(
      "french fries",
      "Samosa",
      "Chaumin",
      "Momo",
      "Sweets rasvari",
      "pizza",
      "paneer",
      "nan",
      "pakoda",
      "fruits slaad"
    )
    .required(),
  description: Joi.string().min(10).max(1000).required(),
  image: Joi.string().uri().optional(),
});
