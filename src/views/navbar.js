
 
const createNavbar = () => {
  
   const container = document.querySelector("#container")

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

  };

  export default createNavbar;