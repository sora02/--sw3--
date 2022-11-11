import * as Api from "../api.js";
import {
    getUrlParams,
    addCommas,
    checkUrlParams,
    navigate,
  } from "../useful-functions.js";
  

   
const productImageTag = document.querySelector("#productImageTag");
const titleTag = document.querySelector("#titleTag");
const detailDescriptionTag = document.querySelector("#detailDescriptionTag");
const priceTag = document.querySelector("#price");
const addToCartButton = document.querySelector("#addToCartButton");
const purchaseButton = document.querySelector("#purchaseButton");


insertProductData();

async function insertProductData() {
  
    // 객체 destructuring
    const {
      title,
      detailDescription,
      imageKey,
      price,
    } = product;
    const imageUrl = await getImageUrl(imageKey);
  
    productImageTag.src = imageUrl;
    titleTag.innerText = title;
    detailDescriptionTag.innerText = detailDescription;
    priceTag.innerText = `${addCommas(price)}원`;
}  

addToCartButton.addEventListener("click", async () => {
    alert("장바구니에 추가되었습니다.")
})
purchaseButton.addEventListener("click", () => {
  navigate("/order/order.html")
})