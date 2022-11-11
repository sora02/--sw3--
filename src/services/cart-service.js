import { cartModel } from "../db/models/cart-model";

class CartService {

  constructor(cartModel) {
    this.cartModel = cartModel;
  }

  // 사실상 유저에 귀속된 카트를 생성/삭제하는 것은 넌센스로 이해되므로 add/remove 등 update 과정에 create/delete를 포함시켜 보자!
  // 카트 자체가 존재하지 않을 때, 카트는 있으나 품목이 존재할 때/하지 않을 때 세 가지 경우를 구현한다.
  async addProductIntoCart(user, product, amount) {
    const foundCart = await this.cartModel.findCartByUser(user).populate("user")
    const productsNames = foundCart.products.map(product => {
      return product.name;
    })
    if (!foundCart) {
      const createdCart = await this.cartModel.createCart(user);
      const updateInfo = {
        totalPrice: product.price * amount,
        products: [{
          name: product.name,
          quantity: amount,
        }],
      }
      const updatedCart = await this.cartModel.findCartAndUpdate(user, updateInfo);
      return updatedCart;
    } else if ( product.name in productsNames ) {
        const products = foundCart.products;
        const productIndex = productsNames.indexOf(product.name)
        products.splice(productIndex, 1, {
          name: product.name,
          quantity: quantity + amount,
        })
        const updateInfo = {
          totalPrice: foundCart.totalPrice + product.price * amount,
          products: products,
        }
        const updatedCart = await this.cartModel.findCartAndUpdate(user, updateInfo);
        return updatedCart;
      } else if (!product.name in productsNames) {
        const products = foundCart.products;
        products.push({
          name: product.name,
          quantity: amount,
        })
        const updateInfo = {
          totalPrice: product.price * amount,
          products: products,
        }
        const updatedCart = await this.cartModel.findCartAndUpdate(user, updateInfo);
        return updatedCart;
      }
  }
  
  // 품목 빼기는 하나씩 이뤄지므로 amount는 1로 고정한다.
  // 상품의 수량이 1인 상태에서 빼면 상품은 없어지고, 1보다 큰 상태에서 빼면 수량만 1 감소한다.
  // 빈 배열이 남을 경우, 프론트에서 표시할 게 없는 것이므로 괜찮을 것 같다.
  async removeProductFromCart(user, product) {
    const foundCart = await this.cartModel.findCartByUser(user).populate("user")
    const productsNames = foundCart.products.map(product => {
      return product.name;
    })
    const productIndex = productsNames.indexOf(product.name)
    if (foundCart.products[productIndex].quantity > 1) {
      const products = foundCart.products;
      products.splice(productIndex, 1, {
        name: product.name,
        quantity: quantity - 1,
      })
      const updateInfo = {
        totalPrice: foundCart.totalPrice - product.price,
        products: products,
      }
      const updatedCart = await this.cartModel.findCartAndUpdate(user, updateInfo);
      return updatedCart;
    } else if (foundCart.products[productIndex].quantity = 1) {
      const products = foundCart.products;
      products.splice(productIndex, 1);
      const updateInfo = {
        totalPrice: foundCart.totalPrice - product.price,
        products: products,
      }
      const updatedCart = await this.cartModel.findCartAndUpdate(user, updateInfo);
      return updatedCart;
    }
  }
  // 수량만 update하는 기능도 구현해볼 수 있겠다.
  // 전체 삭제 옵션을 넣을 경우에는 카트의 요소를 빈 배열로 만든다.
}

const cartService = new CartService(cartModel);

export { cartService };