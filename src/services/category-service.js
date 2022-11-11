import { categoryModel } from "../db/models/category-model";
import { productModel } from "../db/models/product-model";

class CategoryService {
  
    constructor(categoryModel, productModel) {
      this.categoryModel = categoryModel;
      this.productModel = productModel;
    }

    async addCategory(category) {
        const foundCategory = await this.categoryModel.findOneByCategory(category);
        if (foundCategory) {
          throw new Error("같은 이름의 카테고리가 이미 등록되어 있습니다.");
        }
        const createdCategory = await this.categoryModel.createCategory(category);
        return createdCategory;
    }

    async getAllCategories() {
      const allCategories = await this.categoryModel.findAll();
      return allCategories;
    }
  
    async getProductsFromCategory(category) {
      const foundCategory = await this.categoryModel.findOneByCategory(category);
      const productsInCategory = foundCategory.products;
      return productsInCategory;
    }
    
    async changeCategory(category, newCategory) {
      const updatedCategory = await this.categoryModel.patchCategory(category, newCategory);
      return updatedCategory;
    }
    async updateCategory(category, products) {
      const updatedCategory = await this.categoryModel.updateCategory(category, products);
      return updatedCategory;
    }
    async updateProductIntoOrFromCategory( category, product, operation ) {
      const products = await this.getProductsFromCategory(category);
      if (operation === "add") {
        products.push(product);
        const updatedCategory = await this.categoryModel.updateCategory(category, products)
        return updatedCategory;
      } else if (operation === "remove") {
        const newProducts = products.filter(eachProduct => {
          return eachProduct._id != product._id; 
        }) 
        const updatedCategory = await this.categoryModel.updateCategory(category, newProducts)
        return updatedCategory;
      }
    }

    async deleteCategory(category) {
      const deletedCategory = await this.categoryModel.deleteCategory(category);
      return deletedCategory;
    }

}

const categoryService = new CategoryService(categoryModel);

export { categoryService };