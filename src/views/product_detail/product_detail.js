import * as Api from "/api.js";
import {
    getUrlParams,
    addCommas,
    checkUrlParams,
    navigate,
  } from "/useful-functions.js";
import createNavbar  from "/navbar.js";
import sidebar  from "/sidebar.js";
import { addToDb, putToDb } from "../../indexed-db.js";
   
const productImageTag = document.querySelector("#productImageTag");
const titleTag = document.querySelector("#titleTag");
const detailDescriptionTag = document.querySelector("#detailDescriptionTag");
const priceTag = document.querySelector("#priceTag");
const addToCartButton = document.querySelector("#addToCartButton");
const purchaseButton = document.querySelector("#purchaseButton");

addAllEvents()

function addAllEvents() {
  insertProductData();
  createNavbar();
  sidebar();
}


async function insertProductData() {
  const { id } = getUrlParams();
  const product = await Api.get(`/api/products/detail/${id}`);
    // 객체 destructuring
    const {
      title,
      detailDescription,
      //imageKey,
      price,
    } = product;
    //const imageUrl = await getImageUrl(imageKey);
  
    //productImageTag.src = imageUrl;
    titleTag.innerText = title;
    detailDescriptionTag.innerText = detailDescription;
    priceTag.innerText = `${addCommas(price)}원`;
    
    addToCartButton.addEventListener("click", async () => {
  try {
    insertDb(product);

    alert("장바구니에 추가되었습니다.");
  } catch (err) {
    // Key already exists 에러면 아래와 같이 alert함
    if (err.message.includes("Key")) {
      alert("이미 장바구니에 추가되어 있습니다.");
    }

    console.log(err);
  }
});

purchaseButton.addEventListener("click", async () => {
  try {
    await insertDb(product);

    window.location.href = "/order";
  } catch (err) {
    console.log(err);

    //insertDb가 에러가 되는 경우는 이미 제품이 장바구니에 있던 경우임
    //따라서 다시 추가 안 하고 바로 order 페이지로 이동함
    window.location.href = "/order";
  }
});
}  


async function insertDb(product) {
// 객체 destructuring
const { _id: id, price } = product;

// 장바구니 추가 시, indexedDB에 제품 데이터 및
// 주문수량 (기본값 1)을 저장함.
await addToDb("cart", { ...product, quantity: 1 }, id);

// 장바구니 요약(=전체 총합)을 업데이트함.
await putToDb("order", "summary", (data) => {
  // 기존 데이터를 가져옴
  const count = data.productsCount;
  const total = data.productsTotal;
  const ids = data.ids;
  const selectedIds = data.selectedIds;

  // 기존 데이터가 있다면 1을 추가하고, 없다면 초기값 1을 줌
  data.productsCount = count ? count + 1 : 1;

  // 기존 데이터가 있다면 가격만큼 추가하고, 없다면 초기값으로 해당 가격을 줌
  data.productsTotal = total ? total + price : price;

  // 기존 데이터(배열)가 있다면 id만 추가하고, 없다면 배열 새로 만듦
  data.ids = ids ? [...ids, id] : [id];

  // 위와 마찬가지 방식
  data.selectedIds = selectedIds ? [...selectedIds, id] : [id];
});
}
