import * as Api from "/api.js";
import { navigate } from "/useful-functions.js";
 
const createNavbar = () => {
  
   const container = document.querySelector("#container")
   const sideberContainer = document.querySelector("#sidebarContainer");

   container.insertAdjacentHTML("beforeend", `
   <!-- 헤더 -->
   <header style="text-align : center;">
       <a href="/home" >shop</a>
     </header>
   <nav>
       <div class="navbar-end breadcrumb my-auto" aria-label="breadcrumbs">
         <ul id="navbar">
           <li><a href="/login">LOGIN</a></li>
           <li><a href="/register">REGISTER</a></li>
           <li><a href="/account">MYPAGE</a></li>
           <li><a href="/admin">ADMINMANGE</a></li>
           <li>
             <a href="/cart" aria-current="page">
               <span class="icon">
                 <i class="fas fa-cart-shopping"></i>
               </span>
               <span>CART</span>
             </a>
           </li>
         </ul>
       </div>
     </div>
   </nav>
   `)


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
  };

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
  
  export default createNavbar;