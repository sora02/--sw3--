import * as Api from "/api.js";
import { navigate } from "/useful-functions.js";

const sidebar = () => {
    const sideberContainer = document.querySelector("#sidebarContainer");

   sideberContainer.insertAdjacentHTML("beforeend", `
   <!--메뉴 바(수정)-->
   <div class="left-side-bar">
     <div class="status-ico">
         <span>▶</span>
         <span>▼</span>
     </div>

     <ul id="categoryContainer">
     </ul>
   </div>
   `)

  addCategory();
}

async function addCategory() {
    const categoryContainer = document.getElementById("categoryContainer");
    const categories = await Api.get("/api/categories/get");
  
    for (const Onecategory of categories) {
      const { _id, category } = Onecategory;
  
      categoryContainer.insertAdjacentHTML("beforeend", `<li class=category  id=category-${_id}>${category}</li>`);
      const selectedCategory = document.querySelector(`#category-${_id}`);
      selectedCategory.addEventListener("click", navigate(`/product/?category=${category}`));
    }
  } 

export default sidebar;