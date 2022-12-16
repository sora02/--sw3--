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
        orderContainer.insertAdjacentHTML("beforeend", `<tr class="order-list" id="orderList-${_id}">
            <td id="orderId" class="order-id">${_id}</td> 
            <td id="orderTitle" class="order-title">${summaryTitle}</td>
            <td id="orderStatus" class="order-status">${userId}</td>
            <td id="orderDate" class="order-date">${date}</td>
            <td><select name="" id="selectbox-${_id}">
                <option 
            class="has-background-danger-light has-text-danger"
            ${deliverystatus === "상품 준비중" ? "selected" : ""} 
            value="상품 준비중">
            상품 준비중
          </option>
            <option 
            class="has-background-primary-light has-text-primary"
            ${deliverystatus === "상품 배송중" ? "selected" : ""} 
            value="상품 배송중">
            상품 배송중
          </option>
            <option 
            class="has-background-grey-light"
            ${deliverystatus === "배송완료" ? "selected" : ""} 
            value="배송완료">
            배송완료
            </option>
          </select></td>
          <td class="column-2">
          <button class="delete-button" id="deleteButton-${_id}" >주문 취소</button>
        </td>

            </tr>`) 
            
   // 요소 선택
   const statusSelectBox = document.querySelector(`#selectbox-${_id}`);
   //const deleteButton = document.querySelector(`#deleteButton-${_id}`);

   // 상태관리 박스에, 선택되어 있는 옵션의 배경색 반영
   const index = statusSelectBox.selectedIndex;
   statusSelectBox.className = statusSelectBox[index].className;

   // 이벤트 - 상태관리 박스 수정 시 바로 db 반영
   statusSelectBox.addEventListener("change", async () => {
     const newStatus = statusSelectBox.value;
     const data = { deliverystatus: newStatus };

     // 선택한 옵션의 배경색 반영
     const index = statusSelectBox.selectedIndex;
     statusSelectBox.className = statusSelectBox[index].className;

     // api 요청
     await Api.patch("/api/orders/admin", _id, data);
   });


    const deleteButton = document.querySelector(`#deleteButton-${_id}`);
   deleteButton.addEventListener("click", deleteOrder);
    async function deleteOrder(e) {
    e.preventDefault();

    try {
        await Api.delete("/api/orders/admin", _id);
        alert("주문 정보가 삭제되었습니다.");

        const deletedItem = document.querySelector(`#orderList-${_id}`);
        deletedItem.remove();

      }
    catch (err){
      alert(`주문정보 삭제 과정에서 오류가 발생하였습니다: ${err}`);
    }
      
  
   }

    }
    

 
  
}