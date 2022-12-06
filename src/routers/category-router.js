import { Router } from "express";
import { categoryService } from "../services/category-service.js"
import { loginRequired } from "../middlewares";
import { adminGuard } from "../middlewares";

const categoryRouter = Router();

// API 확인 완료 
categoryRouter.post("/register", loginRequired,  async (req, res, next) => {
  try {
  const { category } = req.body
  const createdCategory = await categoryService.addCategory(category); 
  res.json(createdCategory);
  } catch(err) {
    next(err);
  } 
});

// API 확인 완료
categoryRouter.get("/get", async (req, res, next) => {
  try {
    const allCategories = await categoryService.getAllCategories()
    res.json(allCategories);
  } catch(error) {
    next(error);
  }
});

// API 확인 완료
categoryRouter.get("/category/:categories", async (req, res, next) => {
    try {
      const { category } = req.params;
      const productsInCategory = await categoryService.getProductsFromCategory(category);
      res.json(productsInCategory);
    } catch(error) {
      next(error);
    }
  });


// body에 productSchema를 배열로 담을 수 있는지 테스트
// categoryRouter.post("/:category/:product", async (req, res, next) => {
//   try {
//     const { category } = req.params;
//     const { products } = req.body;
//     const updatedCategory = await categoryService.updateCategory(category, products);
//     res.json(updatedCategory);
//   } catch(err) {
//     next(err);
//   }
// })

// API 확인 완료
categoryRouter.patch("/:category", loginRequired, async(req, res, next) => {
  try {
    const { category } = req.params;
    const { newCategory } = req.body;
    const updatedCategory = await categoryService.changeCategory(category, newCategory);
    res.json(updatedCategory);
  } catch(err) {
    next(err);
  }
})

// API 확인 완료
categoryRouter.delete("/:category", loginRequired, async (req, res, next) => {  
  try {
    const { category } = req.params;
    const deletedCategory = await categoryService.deleteCategory(category);
    res.json(deletedCategory);
  } catch(err) {
    next(err);
  }
})

export { categoryRouter };