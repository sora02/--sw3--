
import {
  addCommas,
  convertToNumber,
  navigate,
  compressString,
  randomId,
} from "../useful-functions.js";

// 요소(element), input 혹은 상수
const cartProductsContainer = document.querySelector("#cartProductsContainer");
const allSelectCheckbox = document.querySelector("#allSelectCheckbox");
const partialDeleteLabel = document.querySelector("#partialDeleteLabel");
const productsCountElem = document.querySelector("#productsCount");
const productsTotalElem = document.querySelector("#productsTotal");
const deliveryFeeElem = document.querySelector("#deliveryFee");
const orderTotalElem = document.querySelector("#orderTotal");
const purchaseButton = document.querySelector("#purchaseButton");

addAllElements();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllElements() {
  insertProductsfromCart();
}

// addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.


// indexedDB의 cart와 order에서 필요한 정보를 가져온 후
// 요소(컴포넌트)를 만들어 html에 삽입함.
async function insertProductsfromCart() {
  let products = [{
    title: "화사한 옷",
    img: "/img/2.PNG",
    shortDescription: "화사하다",
    price: 10000,
    quantity: 3,
},{
    title: "귀여운 옷",
    img: "/img/3.PNG",
    shortDescription: "귀엽다",
    price: 15000,
    quantity: 3,
},{
    title: "예쁜 옷",
    img: "/img/4.PNG",
    shortDescription: "예쁘다",
    price: 17000,
    quantity: 3,
},
{
    title: "편안한 옷",
    img: "/img/5.PNG",
    shortDescription: "편안하다",
    price: 18000,
    quantity: 3,
},{
    title: "아이후드",
    img: "/img/6.PNG",
    shortDescription: "후드티",
    price: 15000,
    quantity: 3,
},
]

  products.forEach(async (product) => {
    // 객체 destructuring
    const { _id, title, quantity, img, price } = product;
    let random = randomId();


    cartProductsContainer.insertAdjacentHTML(
      "beforeend",
      `
        <div class="cart-product-item" id="productItem-${_id}">
          <label class="checkbox">
            <input type="checkbox" id="checkbox-${_id}"  />
          </label>
          <button class="delete-button" id="delete-${_id}">
            <span class="icon">
              <i class="fas fa-trash-can"></i>
            </span>
          </button>
          <figure class="image is-96x96">
            <img
              id="image-${_id}"
              src="${img}"
              alt="product-image"
            />
          </figure>
          <div class="content">
            <p id="title-${_id}">${compressString(title)}</p>
            <div class="quantity">
              <button 
                class="button is-rounded" 
                id="minus-${_id}" 
                ${quantity <= 1 ? "disabled" : ""}
              >
                <span class="icon is-small">
                  <i class="fas fa-thin fa-minus"></i>
                </span>
              </button>
              <input
                class="input"
                id="quantityInput-${_id}"
                type="number"
                min="1"
                max="99"
                value="${quantity}"
              />
              <button 
                class="button is-rounded" 
                id="plus-${_id}"
                ${quantity >= 99 ? "disabled" : ""}
              >
                <span class="icon">
                  <i class="fas fa-lg fa-plus"></i>
                </span>
              </button>
            </div>
          </div>
          <div class="calculation">
            <p id="unitPrice-${_id}">${addCommas(price)}원</p>
            <p>
              <span class="icon">
                <i class="fas fa-thin fa-xmark"></i>
              </span>
            </p>
            <p id="quantity-${_id}">${quantity}</p>
            <p>
              <span class="icon">
                <i class="fas fa-thin fa-equals"></i>
              </span>
            </p>
            <p id="total-${_id}">${addCommas(quantity * price)}원</p>
          </div>
        </div>
      `
    );
    })}

    
purchaseButton.addEventListener("click", navigate("/order/order.html"))