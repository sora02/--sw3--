import { Router } from "express";
import { cartService } from "../services";
import { userService } from "../services";
import { loginRequired } from "../middlewares";
//ddd 도메인 주도 개발
const cartRouter = Router();

// cartRouter.patch("/:product" -> 추가/줄이기
// post -> add, patch ->remove
// operation trigger의 어색함이 핵심
cartRouter.post("/:product", loginRequired, async (req, res, next) => {  
  try {
    const { product } = req.params;
    // operation이 아닌 patchAPI
    const { amount, operation } = req.body;
    const user = await userService.getUserByUseridSafely(req.currentUserId);
    if(operation === "add") {
        const updatedCart = await cartService.addProductIntoCart(user, product, amount )
        res.json(updatedCart);
        res.send("/api/carts/:product add-update success");        
    } else if(operation === "remove") {
        const updatedCart = await cartService.removeProductFromCart(user, product)
        res.json(updatedCart);
        res.send("api/carts/:product remove-update success");
    }
  } catch(err) {
    next(err);
  } 
});

export { cartRouter };