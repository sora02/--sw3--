import { Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    category: {
      type: String,
    }
  },
    {
    collection: "categories",
    timestamps: true,
  }
)
export { CategorySchema };
