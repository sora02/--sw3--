import createNavbar  from "/navbar.js";
import * as Api from "/api.js";
import {
    getUrlParams,
    addCommas,
    checkUrlParams,
    navigate,
  } from "/useful-functions.js";

AllElements();
function AllElements() {
    createNavbar();
    inserOrderData();
}
//요소들 가져오기
const orderContainer = document.querySelector("#ordercontainer")
const orderId = document.querySelector("#orderId");
const orderDate = document.querySelector("#orderDate");
const orderTitle = document.querySelector("#orderTitle");
const orderStatus = document.querySelector("#orderStatus");
//api로 주문데이터 받아와서 보여주기
async function inserOrderData() {
    const orderData = await Api.get(`/api/orders/chekmyorders`);
    for(const order of orderData) {
        //객체 destructuring
        const {_id, createdAt, summaryTitle, deliverystatus} = order; 
        const date = createdAt.split("T")[0];    
        //주문 리스트 넣어주기
        orderContainer.insertAdjacentHTML("beforeend", `<tr class="order-list">
            <td id="orderId" class="order-id"><a href="order/detail?id=${_id}"  id="orderList-${_id}">${_id}</a></td>
            <td id="orderTitle" class="order-title">${summaryTitle}</td>
            <td id="orderDate" class="order-date">${date}</td>
            <td id="orderStatus" class="order-status">${deliverystatus}</td></tr>`)
    }
    
}