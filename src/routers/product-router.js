import { Router } from "express";
import { productService } from "../services/product-service.js"
import { loginRequired } from "../middlewares";
import { adminGuard } from "../middlewares";

const productRouter = Router();

// API 확인 완료
productRouter.post("/register", loginRequired,  async (req, res, next) => {  
  try {
    const { title, categoryId, price, shortDescription, detailDescription, searchKeywords } = req.body
    const productInfo = { title, categoryId, price, shortDescription, detailDescription, searchKeywords };
    const createdProduct = await productService.addProduct(productInfo);
    res.json(createdProduct);
  } catch(err) {
    next(err);
  } 
});

// API 확인 완료
productRouter.get("/get", async (req, res, next) => {
  try {
    const allProducts = await productService.getAllProdcuts()
    res.json(allProducts);
  } catch(error) {
    next(error);
  }
});

// API 확인 완료
// :name을 :_id로 바꿀 시 오류 발생.
productRouter.get("/:category", async (req, res, next) => {
  const { category } = req.params;
  try {
    console.log(req);
    const foundProduct = await productService.getProduct(category);
    res.json(foundProduct);
  } catch(err) {
    next(err);
  }

})
productRouter.get("/detail/:id", async (req, res, next) => {
  const { id } = req.params.id;
  try {
    console.log(req);
    const foundProduct = await productService.getProductById(id);
    res.json(foundProduct);
  } catch(err) {
    next(err);
  }
})

// API 확인 완료
productRouter.patch("/:category", loginRequired, adminGuard, async (req, res, next) => {
  const { category } = req.params;
  const { brand, price} = req.body;
  try {
    const updatedProduct = await productService.updateProduct(category, { brand, price });
    res.json(updatedProduct);
  } catch (err) {
    next(err);
  }
})

// API 확인 완료 
productRouter.delete("/:category", loginRequired, adminGuard, async (req, res, next) => {
  const { category } = req.params;
  try {
    const deletedProduct = await productService.deleteProduct(category);
    res.json(deletedProduct);
  } catch(err) {
    next(err);
  }
})

export { productRouter };