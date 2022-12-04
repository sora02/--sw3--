import * as Api from '../api.js';


const button = document.getElementById('submit');
const passwordInput = document.querySelector('#password');

addAllElements();
function addAllElements(){
    button.addEventListener('click', deleteregister);
}

async function deleteregister(e) {
  e.preventDefault();

  const password = passwordInput.value;
  const email = sessionStorage.getItem('email');

  
  //회원탈퇴 api요청
  try {
    const userInfo = { email, password };
    await Api.delete('/api/users/deletemyaccount', '', userInfo);
    alert('성공적으로 탈퇴되었습니다!');

    sessionStorage.removeItem('email');
    sessionStorage.removeItem('token');

    window.location.href = '/';
  } catch (err) {
    console.error(err);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

