import { Router } from "express";
import { productService } from "../services/product-service.js"
import { loginRequired } from "../middlewares";
import { adminGuard } from "../middlewares";

const productRouter = Router();

// API 확인 완료
productRouter.post("/register", loginRequired, adminGuard, async (req, res, next) => {  
  try {
    const { name, brand, price } = req.body
    const productInfo = { name, brand, price };
    const createdProduct = await productService.addProduct(productInfo);
    res.json(createdProduct);
  } catch(err) {
    next(err);
  } 
});

// API 확인 완료
productRouter.get("/", async (req, res, next) => {
  try {
    const allProducts = await productService.getAllProdcuts()
    res.json(allProducts);
  } catch(error) {
    next(error);
  }
});

// API 확인 완료
// :name을 :_id로 바꿀 시 오류 발생.
productRouter.get("/:name", async (req, res, next) => {
  const { name } = req.params;
  try {
    console.log(req);
    const foundProduct = await productService.getProduct(name);
    res.json(foundProduct);
  } catch(err) {
    next(err);
  }
})

// API 확인 완료
productRouter.patch("/:name", loginRequired, adminGuard, async (req, res, next) => {
  const { name } = req.params;
  const { brand, price} = req.body;
  try {
    const updatedProduct = await productService.updateProduct(name, { brand, price });
    res.json(updatedProduct);
  } catch (err) {
    next(err);
  }
})

// API 확인 완료 
productRouter.delete("/:name", loginRequired, adminGuard, async (req, res, next) => {
  const { name } = req.params;
  try {
    const deletedProduct = await productService.deleteProduct(name);
    res.json(deletedProduct);
  } catch(err) {
    next(err);
  }
})

export { productRouter };