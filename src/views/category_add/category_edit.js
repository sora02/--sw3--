import * as Api from "../api.js";
import {
  getUrlParams,
  navigate,
  checkUrlParams,
} from "../useful-functions.js";

const titleInput = document.querySelector("#titleInput");
const newtitleInput = document.querySelector("#newtitleInput");
const editButton = document.querySelector("#addCategoryButton");
const registerCategoryForm = document.querySelector("#registerCategoryForm");

editButton.addEventListener("click", categoryedit);

//카테고리 수정
async function categoryedit(e) {
    e.preventDefault();
  
    const category = titleInput.value;
    const nCategory = newtitleInput.value;
    
    // 입력 칸이 비어 있으면 진행 불가
    if (!category || !nCategory) {
      return alert("내용을 입력해주세요.");
    }
    try {
        const newData = {newCategory: nCategory}
      await Api.patch(`/api/categories/${category}`, "", newData );
  
      alert(`${category} -> ${nCategory} 카테고리로 수정되었습니다.`);
  
      // 폼 초기화
      registerCategoryForm.reset();
      window.location.href="/";
    } catch (err) {
      console.error(err.stack);
      alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
    }
  }