import * as Api from "../api.js";
import {
    randomId,
    getUrlParams,
    addCommas,
    navigate,
    checkUrlParams,
  
} from "../useful-functions.js";

const containerElem = document.querySelector("#container");

addAllElements();
addAllEvents();

function addAllElements() {
    addProductItemsToContainer();
}
  
function addAllEvents() {}

async function addProductItemsToContainer() {
  // 제품들 예시
    let Example = [{
    title: "화사한 옷",
    img: "/img/2.PNG",
    shortDescription: "화사하다",
    price: 10000,
},{
    title: "귀여운 옷",
    img: "/img/3.PNG",
    shortDescription: "귀엽다",
    price: 15000,
},{
    title: "예쁜 옷",
    img: "/img/4.PNG",
    shortDescription: "예쁘다",
    price: 17000,
},
{
    title: "편안한 옷",
    img: "/img/5.PNG",
    shortDescription: "편안하다",
    price: 18000,
},{
    title: "아이후드",
    img: "/img/6.PNG",
    shortDescription: "후드티",
    price: 15000,
},
]
// 제품들 insert로 html에 집어넣기
     Example.forEach(async (product) => {
      // 객체 destructuring
      const { _id, title, shortDescription, img, price } =
        product;
      const random = randomId();
        console.log(_id, random);
      containerElem.insertAdjacentHTML(
        "beforeend",
        `<div class="individual" id="a${random}">
        <a href="/product_detail/product_detail.html">
        
            <p class="list-img">
                <img src=${img} alt="제품사진">
                
            </p>
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
        navigate(`/product_detail/a${random}`)
      );
    });
  }
  
