import { model } from "mongoose";
import { ProductSchema } from "../schemas/product-schema";

const Product = model("products", ProductSchema);

export class ProductModel {

    async createProduct(productInfo) {
      const createdNewProduct = await Product.create(productInfo);
      return createdNewProduct;
    }
    
    async findByName(name) {
      const foundProduct = await Product.findOne({ name });
      return foundProduct;
    }


    async findAll() {
      const products = await Product.find({});
      return products;
    }

    async updateProduct(name, update) {
      const filter = { name };
      const option = { returnOriginal: false };
      const updatedProduct =  await Product.findOneAndUpdate(filter, update, option);
      return updatedProduct;
    }
    async deleteProduct(name) {
      const deletedProduct = await Product.findOneAndDelete({ name });
      return deletedProduct;
    }

  }
  
  const productModel = new ProductModel();
  
  export { productModel };