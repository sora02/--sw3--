import { model } from "mongoose";
import { CartSchema } from "../schemas/cart-schema";

const Cart = model("carts", CartSchema);

export class CartModel {

    async createCart(user) {
        const createdCart = await Cart.create({ user: user._id });
        return createdCart;
    }

    async findCartByUser(user) {
        const foundCart = await Cart.findOne({ user: user._id });
        return foundCart;
    }
    
    async findAllCarts() {
        const allCarts = await Cart.find({});
        return allCarts;
    }
    
    async findCartAndUpdate(user, updateInfo) {
        const filter = { user: user._id };
        const option = { returnOriginal: false };
        const updatedCart = await Cart.findOneAndUpdate(filter, updateInfo, option);
        return updatedCart;
      }
}
    
const cartModel = new CartModel();
    
export { cartModel };