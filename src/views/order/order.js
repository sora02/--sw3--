import * as Api from "../api.js"
import {
    randomId,
    validateEmail,
    addCommas,
    convertToNumber,
    wait,
    checkLogin,
    navigate,
    randomPick,
} from "../useful-functions.js"
import { deleteFromDb, getFromDb, putToDb } from "../indexed-db.js";
import createNavbar  from "/navbar.js";


//요소 가져오기
const nameElem = document.querySelector("#name");
const phoneNumElem = document.querySelector("#phone_number");
const addressElem = document.querySelector("#address");
const detailAddressElem = document.querySelector("#detail_address");
const memoElem = document.querySelector("#memo");
const buttonElem = document.querySelector("#button");

const orderedProductElem = document.querySelector("#orderedProduct");
const orderTotalElem = document.querySelector("#ordertotal");
const deliveryFeeElem = document.querySelector("#deliveryFee");
const totalPriceElem = document.querySelector("#total-price");


// 주소 api
window.onload = function(){
    document.getElementById("address_kakao").addEventListener("click", function(){
        new daum.Postcode({
            oncomplete : function(data){
                document.getElementById("address_kakao").value = data.address;
                document.querySelector("input[name=address]").focus();
            }
        }).open()
    })
}

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllElements() {
  insertOrderSummary();
  insertUserData();
  navigate();
  createNavbar();
}

// addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  buttonElem.addEventListener("click", doCheckout);
}


// 페이지 로드 시 실행되며, 결제정보 카드에 값을 삽입함.
async function insertOrderSummary() {
  const { ids, selectedIds, productsTotal} = await getFromDb(
    "order",
    "summary"
  );
  orderTotalElem.innerText = addCommas(productsTotal);
  // 구매할 아이템이 없다면 다른 페이지로 이동시킴
  const hasItemInCart = ids.length !== 0;
  const hasItemToCheckout = selectedIds.length !== 0;

  if (!hasItemInCart) {
    const categorys = await Api.get("/api/categories/get");
    const categoryTitle = randomPick(categorys).title;

    alert(`구매할 제품이 없습니다. 제품을 선택해 주세요.`);

    return window.location.replace(`/product/list?category=${categoryTitle}`);
  }

  if (!hasItemToCheckout) {
    alert("구매할 제품이 없습니다. 장바구니에서 선택해 주세요.");

    return window.location.replace("/cart");
  }

  // 화면에 보일 상품명
  let productsTitle = "";

  for (const id of selectedIds) {
    const { title, quantity } = await getFromDb("cart", id);
    // 첫 제품이 아니라면, 다음 줄에 출력되도록 \n을 추가함
    if (productsTitle) {
      productsTitle += "\n";
    }

    productsTitle += `${title} / ${quantity}개`;
  }

  orderedProductElem.innerText = productsTitle;
  
  if (hasItemToCheckout) {
    deliveryFeeElem.innerText = "3,000원";
    totalPriceElem.innerText = `${addCommas(productsTotal + 3000)}원`;
  } else {
    deliveryFeeElem.innerText = `0원`;
    totalPriceElem.innerText = `0원`;
  }

  nameElem.focus();
}

async function insertUserData() {
  const userData = await Api.get("/api/users/oneuser");
  const { fullName, phoneNumber, address } = userData;

  // 만약 db에 데이터 값이 있었다면, 배송지정보에 삽입
  if (fullName) {
    nameElem.value = fullName;
  }

  if (phoneNumber) {
    phoneNumElem.value = phoneNumber;
  }

  if (address) {
    addressElem.value = address.addressElem;
    detailAddressElem.value = address.detailAddressElem;
  }
}

// 결제 진행
async function doCheckout() {
  const receiverNameInput = nameElem.value;
  const phoneNum = phoneNumElem.value;
  const addressinput = addressElem.value;
  const detailAddress = detailAddressElem.value;
  const memo = memoElem.value;
  const summaryTitle = orderedProductElem.innerText;
  const totalPrice = convertToNumber(totalPriceElem.innerText);
  const { selectedIds } = await getFromDb("order", "summary");

  if (!receiverNameInput || !phoneNum || !detailAddress || !addressinput) {
    return alert("배송지 정보를 모두 입력해 주세요.");
  }

  const address = {
    addressinput,
    detailAddress,
    receiverNameInput,
    phoneNum,
    memo,
  };

  try {
    // 전체 주문을 등록함
    const orderData = await Api.post("/api/orders/register", {
      summaryTitle,
      totalPrice,
      address,
    });

    const orderId = orderData._id;

    // 제품별로 주문아이템을 등록함
    for (const productId of selectedIds) {
      const { quantity, price } = await getFromDb("cart", productId);
      const totalPrice = quantity * price;

      await Api.post("/api/orders/orderitem", {
        orderId,
        productId,
        quantity,
        totalPrice,
      });

      // indexedDB에서 해당 제품 관련 데이터를 제거함
      await deleteFromDb("cart", productId);
      await putToDb("order", "summary", (data) => {
        data.ids = data.ids.filter((id) => id !== productId);
        data.selectedIds = data.selectedIds.filter((id) => id !== productId);
        data.productsCount -= 1;
        data.productsTotal -= totalPrice;
      });
    }

    // 입력된 배송지정보를 유저db에 등록함
    const data = {
      phoneNumber: phoneNum,
      address: {
        addressinput,
        detailAddress,
      },
    };
    await Api.post("/api/orders/deliveryinfo", data);

    alert("결제 및 주문이 정상적으로 완료되었습니다.\n감사합니다.");
    window.location.href = "../ordercheck";
  } catch (err) {
    console.log(err);
    alert(`결제 중 문제가 발생하였습니다: ${err.message}`);
  }
}

