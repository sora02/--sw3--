import { Schema } from "mongoose";
import { ProductSchema } from "./product-schema";

const CategorySchema = new Schema(
  {
    category: {
      type: String,
      enum: ['outer', 'top', 'bottom'],
      required: true,
    },
    products: [ProductSchema],
    
  }
)
export { CategorySchema };
