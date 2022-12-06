import * as Api from '../api.js';


const submitButton = document.querySelector('#submitButton');
const fullNameInput = document.querySelector('#fullNameInput');
const emailInput = document.querySelector('#emailInput');
const newPasswordInput = document.querySelector('#newPasswordInput');
const newPasswordConfirmInput = document.querySelector('#newPasswordConfirmInput');
const phoneNumberInput = document.querySelector('#phoneNumberInput');
const userAddressInput = document.querySelector('#userAddress');
const userAddressDetailInput = document.querySelector('#userAddressDetail');
const addressInput = document.querySelector('#addressInput');


let user = {};

const init = () => {
  fetchUserInfo();
  addEvent();
};

const addEvent = () => {
  submitButton.addEventListener('click', updateUserInfo);
  addressInput.addEventListener('click',findAddr); //코드리뷰 
};

const setUserInfo = (user) => {
  fullNameInput.value = user.fullName;
  emailInput.value = user.email;
  phoneNumberInput.value = user.phoneNumber || '';
  userAddressInput.value = user.address ? user.address.address1 : '';
  userAddressDetailInput.value = user.address ? user.address.address2 : '';
  addressInput.value = user.address ? user.address.address3 : '';
};

const fetchUserInfo = async () => {
  const email = localStorage.getItem('email');
  try {
    user = await Api.get(`/api/users/checkmyinfo`);
    setUserInfo(user);
  } catch (err) {
    alert(`${err.message}`);
  }
};

// 정보수정 
const updateUserInfo = (e) => {
  e.preventDefault();

  const fullName = fullNameInput.value;
  const Password = newPasswordInput.value;
  const PasswordConfirm = newPasswordConfirmInput.value;
  const phoneNumber = phoneNumberInput.value;
  const userAddress = userAddressInput.value;
  const userAddressDetail = userAddressDetailInput.value;
  const addressCode = addressInput.value;

  
  const isFullNameValid = fullName.length >= 2;
  const isPasswordValid = Password.length === 0 || Password.length >= 4;
  const isPasswordConfirm = Password === PasswordConfirm;
  const isPhoneNumber = phoneNumber.length === 0 || phoneNumber.length === 11;

  if (!isFullNameValid || !isPasswordValid) {
    return alert('이름은 2글자 이상, 비밀번호는 4글자 이상이어야 합니다.');
  }

  if (!isPasswordValid) {
    return alert('새로 변경하시는 비밀번호가 4글자 이상인지 확인해 주세요.');
  }

  if (!isPasswordConfirm) {
    return alert('변경하시는 비밀번호와 비밀번호 확인이 일치 하지 않습니다.');
  }

  if (!isPhoneNumber) {
    return alert('전화번호 형식에 맞게 적어 주세요.');
  }

  // 변경되는 유저 정보 
  const userInfo = {
    fullName,
    Password,
    address: {
      addressinput: userAddress,
      detailAddress: userAddressDetail,
    },
    phoneNumber,
  };

  // 유저 정보를 수정하는 api 요청
  patchUserInfo(userInfo);
};

// 유저 정보 수정 api
const patchUserInfo = async (userInfo) => {
  try {
    await Api.patch(`/api/users/update`, user._id, userInfo);
    alert('정상적으로 수정되었습니다.');
    window.location.href = '/account';
  } catch (err) {
    alert(`${err.message}`);
  }
};

init();

// 주소 찾기 (코드리뷰)
function findAddr() {
  new daum.Postcode({
    oncomplete: function (data) {
      const roadAddr = data.roadAddress;
      const jibunAddr = data.jibunAddress;
      document.getElementById('addressInput').value = data.zonecode;
      if (roadAddr !== '') {
        document.getElementById('userAddress').value = roadAddr;
      } else if (jibunAddr !== '') {
        document.getElementById('userAddress').value = jibunAddr;
      }
    },
  }).open();
}

