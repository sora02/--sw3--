import createNavbar  from "/navbar.js";
import * as Api from "/api.js";

AllElements()

function AllElements() {
    createNavbar();
    inserOrderData();
}
const orderContainer = document.querySelector("#ordercontainer");
//주문 리스트 보여주는 함수
async function inserOrderData() {
    const orderData = await Api.get(`/api/orders/admin/allorders`);
    for(const order of orderData) {
        //객체 destructuring
        const {_id, createdAt, summaryTitle, deliverystatus, userId} = order; 
        const date = createdAt.split("T")[0];    
        //주문 리스트 넣어주기
        orderContainer.insertAdjacentHTML("beforeend", `<tr class="order-list" id="orderList">
            <td id="orderId" class="order-id">${_id}</td> 
            <td id="orderTitle" class="order-title">${summaryTitle}</td>
            <td id="orderStatus" class="order-status">${userId}</td>
            <td id="orderDate" class="order-date">${date}</td>
            <td id="orderStatus" class="order-status">${deliverystatus}</td>
            </tr>`)
    }
    
}