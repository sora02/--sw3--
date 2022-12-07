//import { addImageToS3 } from "../../aws-s3.js";
import * as Api from "../api.js";
import {
  getUrlParams,
  navigate,
  checkUrlParams,
} from "../useful-functions.js";

const titleInput = document.querySelector("#titleInput");
const newtitleInput = document.querySelector("#newtitleInput");
const addButton = document.querySelector("#addCategoryButton");
const editButton = document.querySelector("#editCategoryButton");
const deleteButton = document.querySelector("#deleteCategoryButton");
const registerCategoryForm = document.querySelector("#registerCategoryForm");
//const categoryData = await Api.get(`/api/category/${category}`);

addAllEvents();

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  addButton.addEventListener("click", categoryadd);
  //editButton.addEventListener("click", categoryedit);
  deleteButton.addEventListener("click", categorydelete);
}

// 카테고리 추가하기 - 카테고리 정보를 백엔드 db에 저장.
async function categoryadd(e) {
  e.preventDefault();
  const category = titleInput.value;
  // 입력 칸이 비어 있으면 진행 불가
  if (!category) {
    return alert("내용을 입력해주세요.");
  }

  try {
    const data = { category };

    await Api.post("/api/categories/register", data);
    
    alert(`정상적으로 ${category} 카테고리가 등록되었습니다.`);
    navigate(`/`)
    // 폼 초기화
    registerCategoryForm.reset();
   
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}


//카테고리 삭제
async function categorydelete(e) {
    e.preventDefault();
    const category = titleInput.value;
    
    // 입력 칸이 비어 있으면 진행 불가
    if (!category ) {
      return alert("내용을 입력해주세요.");
    }
  
    try {
  
      await Api.delete(`/api/categories/${category}`);
  
      alert(`정상적으로 ${category} 카테고리가 삭제되었습니다.`);
  
      // 폼 초기화
      registerCategoryForm.reset();
      window.location.href="/";
    } catch (err) {
      console.error(err.stack);
      alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
    }
  }
