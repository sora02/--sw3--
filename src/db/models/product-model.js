import { model } from "mongoose";
import { ProductSchema } from "../schemas/product-schema";

const Product = model("products", ProductSchema);

export class ProductModel {

    async createProduct(productInfo) {
      const createdNewProduct = await Product.create(productInfo);
      return createdNewProduct;
    }
    
    async findAllByCategoryId(categoryId) {
      const foundProduct = await Product.find({ categoryId });
      return foundProduct;
    }

    async findByName(title) {
      const foundProduct = await Product.findOne({ title });
      return foundProduct;
    }

    async findByProductId(productId) {
      const product = await Product.findOne( { _id: productId });
      console.log(productId)
      return product;
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