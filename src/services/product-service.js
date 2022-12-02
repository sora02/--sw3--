import { productModel } from "../db/models/product-model";
import { categoryModel } from "../db/models/category-model";

class ProductService {
  
    constructor(productModel ) {
      this.productModel = productModel;
      this.categoryModel = categoryModel;
    }

    async addProduct(productInfo) {
        
        const { title, categoryId, price, shortDescription, detailDescription, searchKeywords } = productInfo;
        const foundProduct = await this.productModel.findByName(title);
        if (foundProduct) {
          throw new Error("같은 이름의 제품이 이미 등록되어 있습니다.");
        }
        const createdProduct = await this.productModel.createProduct({
          title, categoryId, price, shortDescription, detailDescription, searchKeywords
        });
        return createdProduct;
    }

    async getProduct(category) {
      const categoryname = await this.categoryModel.findOneByCategory(category);
      const foundProduct = await this.productModel.findAllByCategoryId(categoryname._id);
      return foundProduct;
    }

    async getProductById(id) {
      const foundProduct = await this.productModel.findByProductId(id);
      return foundProduct;
    }

    async getAllProdcuts() {
      const allProducts = await this.productModel.findAll();
      return allProducts
    }

    async updateProduct(name, update) {
      const { title, categoryId, price, shortDescription, detailDescription, searchKeywords } = update;
      const product = await this.productModel.findByName(name);

      if (!product) {
        throw new Error("해당 이름의 상품을 찾을 수 없습니다. 새로 추가해주세요.");
      }

      if (!(title, categoryId, price, shortDescription, detailDescription, searchKeywords)) {
        throw new Error("모든 항목을 입력해주세요.");
      }
      
      const updatedProduct = await this.productModel.updateProduct(name, update)
      return updatedProduct;
    }

    async deleteProduct(name) {
      const deletedProduct = await this.productModel.deleteProduct(name);
      return deletedProduct;
    }

}

const productService = new ProductService(productModel);

export { productService };