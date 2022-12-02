import { Schema } from "mongoose";
import { productService } from "../../services";

const ProductSchema = new Schema(
  {
    title: {
      type: String,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "categories",
    },
    shortDescription: {
      type: String,
    },
    detailDescription: {
      type: String,
    },
    price: {
      type: Number,
    },
    searchKeywords: {
      type: [String],
    },
  },
  {
    collection: "products",
    timestamps: true,
  }
);

export { ProductSchema };
