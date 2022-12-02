import * as Api from "../api.js";
import {
    randomId,
    getUrlParams,
    addCommas,
    navigate,
    checkUrlParams,
  
} from "../useful-functions.js";
import createNavbar  from "/navbar.js";
import sidebar  from "/sidebar.js";
const productcontainerElem = document.querySelector("#product-container");
const titleBoldElem = document.querySelector("#title-bold");
const titleThinElem = document.querySelector("#title-thin");

addAllElements();
addAllEvents();

function addAllElements() {
    addProductItemsToContainer();
    createNavbar();
    addTitleBold();
    sidebar();
}
  
function addAllEvents() {}

async function addProductItemsToContainer() {
  // 제품들 예시
  const { category } = getUrlParams();
  const products = await Api.get(`/api/products/${category}`);

// 제품들 insert로 html에 집어넣기
     products.forEach(async (product) => {
      // 객체 destructuring
      const { _id, title, price, shortDescription} = product;
      const random = randomId();
      productcontainerElem.insertAdjacentHTML(
        "beforeend",
        `<div class="individual" id="a${random}">
        <a href="/product_detail/product_detail.html">

            </a>
            <div class="phrase">
                <strong class="text-small">${title}</strong>
                <p class="text-medium">${shortDescription}</p>
                <p>${addCommas(price)}</p>
            </div>
            </div>
            
        `
      );
  //제품 클릭하면 id값으로 detail 페이지 찾아가기
      const productItem = document.querySelector(`#a${random}`);
      productItem.addEventListener(
        "click",
        navigate(`/product/detail?id=${_id}`)
      );
    });
  }
  function addTitleBold () {
    const { category } = getUrlParams();
    titleBoldElem.innerHTML = category;
  }
  
