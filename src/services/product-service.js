import { productModel } from "../db/models/product-model";

class ProductService {
  
    constructor(productModel) {
      this.productModel = productModel;
    }

    async addProduct(productInfo) {
        
        const { name, brand, price } = productInfo;
        const foundProduct = await this.productModel.findByName(name);
        if (foundProduct) {
          throw new Error("같은 이름의 제품이 이미 등록되어 있습니다.");
        }
        const createdProduct = await this.productModel.createProduct({
          name, brand, price
        });
        return createdProduct;
    }

    async getProduct(name) {
      const foundProduct = await this.productModel.findByName(name);
      return foundProduct;
    }

    async getAllProdcuts() {
      const allProducts = await this.productModel.findAll();
      return allProducts
    }

    async updateProduct(name, update) {
      const { price, brand } = update;
      const product = await this.productModel.findByName(name);

      if (!product) {
        throw new Error("해당 이름의 상품을 찾을 수 없습니다. 새로 추가해주세요.");
      }

      if (!(name&&brand&&price)) {
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