import { Schema } from "mongoose";
// name, shortDesc, price, stock, brand, size
const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    brand: {
      type: String, 
      required: true,
    },
  }, { 
    timestamps: true
  }
)
export { ProductSchema };
