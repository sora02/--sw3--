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
const orderContainer = document.querySelector("#ordercontainer")
const orderId = document.querySelector("#orderId");
const orderDate = document.querySelector("#orderDate");
const orderTitle = document.querySelector("#orderTitle");
const orderStatus = document.querySelector("#orderStatus");
async function inserOrderData() {
    const orderData = await Api.get(`/api/orders/chekmyorders`);
    for(const order of orderData) {
        const {_id, createdAt, summaryTitle, deliverystatus} = order;
        const date = createdAt.split("T")[0];    
        
        orderContainer.insertAdjacentHTML("beforeend", `<tr class="order-list">
            <td id="orderId" class="order-id">${_id}</td> 
            <td id="orderTitle" class="order-title">${summaryTitle}</td>
            <td id="orderDate" class="order-date">${date}</td>
            <td id="orderStatus" class="order-status">${deliverystatus}</td></tr>`)
    }
    
}