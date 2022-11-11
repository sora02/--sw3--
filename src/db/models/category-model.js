import { model } from "mongoose";
import { CategorySchema } from "../schemas/category-schema";

const Category = model("categories", CategorySchema);

export class CategoryModel {

    async createCategory(category) {
      const newCategory = await Category.create({
        category,
        products: [],
      });
      return newCategory;
    }

    async findOneByCategory(category) {
        const foundCategory = await Category.findOne({ category });
        return foundCategory;
    }
    
    async findAll() {
      const allCategories = await Category.find({});
      return allCategories;
    }
    
    async updateCategory(category, products) {
      const filter = { category };
      const option = { returnOriginal: false };
      const updatedCategory = await Category.findOneAndUpdate(filter, { products }, option);
      return updatedCategory;
    }

    async patchCategory(category, newCategory) {
      const filter = { category };
      const option = { returnOriginal: false };
      const updatedCategory = await Category.findOneAndUpdate(filter, { category: newCategory }, option);
      return updatedCategory;
    }

    async deleteCategory(category) {
      const deletedCategory = await Category.findOneAndDelete({ category });
      return deletedCategory;
    }

  }
  
  const categoryModel = new CategoryModel();
  
  export { categoryModel };