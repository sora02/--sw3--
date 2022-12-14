# 아동의류 쇼핑몰

<div>

<img alt="쇼핑-데모 로고" src="https://i.ibb.co/xSZHxmy/image.png">

</div>

<br />

## 1. 서비스 소개

#### 제품 등록, 장바구니 추가, 주문하기 등 쇼핑몰의 핵심 서비스를 구현합니다. 
1. 회원가입, 로그인, 회원정보 수정 등 **유저 정보 관련 CRUD** 
2. **제품 목록**을 조회 및, **제품 상세 정보**를 조회 가능함. 
3. 장바구니에 제품을 추가할 수 있으며, **장바구니에서 CRUD** 작업이 가능함.
4. 장바구니는 서버 DB가 아닌, 프론트 단에서 저장 및 관리됨 (localStorage, indexedDB 등)
5. 장바구니에서 주문을 진행하며, **주문 완료 후 조회 및 삭제**가 가능함.
6. 추가 기능 ...

<br />

### 1-1. API 문서

### https://documenter.getpostman.com/view/23952739/2s847JrX6f

<br>

### 1-2. 데모 영상

<details><summary>사용자 회원가입, 로그인</summary>

![image](https://user-images.githubusercontent.com/91174156/172159634-1e105633-9948-464e-a540-5429200a1353.gif)

</details>

<details><summary>카테고리 추가, 수정, 삭제</summary>

![images](https://user-images.githubusercontent.com/66052289/209558950-72234013-67ce-491a-838c-571c944ef082.gif)


</details>

<details><summary>제품 추가 및 반영</summary>

![images](https://user-images.githubusercontent.com/66052289/209559045-6f046fd8-5cf0-4092-be69-5c87e9c31437.gif)


</details>

<details><summary>장바구니 기능</summary>

![images](https://user-images.githubusercontent.com/66052289/209559080-4a7d1c0f-b566-4f05-8147-f8595ab51cdf.gif)


</details>

<details><summary>주문 기능</summary>
  
![](https://user-images.githubusercontent.com/66052289/209563115-886b4f4c-38d6-4474-aba8-0394249558a0.gif)


</details>

<details><summary>관리자 페이지</summary>

![images](https://user-images.githubusercontent.com/66052289/209560097-9458b3c3-232e-43e0-b7d9-796cc41c726a.gif)

</details>

<br />

### 1-3. 페이지 별 화면

|  |  |
| ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------|
|![image](https://user-images.githubusercontent.com/66052289/209560232-010caa95-d42c-47eb-91fc-7ae2d16c4ec3.png) |![image](https://i.ibb.co/Q860RKz/image.png) 
|    메인 페이지                                |      회원가입 화면                            |
| ![image](https://i.ibb.co/RpYN379/image.png)  |       ![image](https://user-images.githubusercontent.com/66052289/209560337-712d1a61-e392-4787-b5de-adb63db4663b.png)
|    로그인 페이지                              |     상품화면                         |
|![image](https://user-images.githubusercontent.com/66052289/209560457-1db3eca4-ed73-4e7f-8228-dd4a865a25cc.png)| ![image](https://user-images.githubusercontent.com/66052289/209560600-8a59fdc9-5274-444a-8f0d-fb079dc09d66.png)
|    관리자 페이지 - 카테고리                   |        관리자 페이지 - 주문확인           |
|![image](https://user-images.githubusercontent.com/66052289/209560792-76da6bde-da90-4c94-a7cb-8ce68706b3de.png)|![image](https://user-images.githubusercontent.com/66052289/209561153-58f4b445-a470-403f-b84b-0e3e9c4c3e7b.png)|
|   관리자 페이지 - 제품 추가                   |      제품 상세 페이지                     |
|![image](https://user-images.githubusercontent.com/66052289/209561728-d85e8b06-d4f9-4156-ac7f-3808488604b0.png)|![image](https://user-images.githubusercontent.com/66052289/209561793-bb3e0319-d8a8-41eb-9dac-cd215f8b418f.png)|
|   사용자 페이지 - 주문 조회                   |      사용자 페이지 - 회원정보 수정           |
|![image](https://user-images.githubusercontent.com/66052289/209561850-b7e57530-a400-49fa-854a-3c42747ebf96.png)|![image](https://user-images.githubusercontent.com/66052289/209561895-c0c72b41-bdd7-4b0b-98b1-1495f8099c5d.png)|
|사용자 페이지 - 회원 탈퇴|장바구니|
|![image](https://user-images.githubusercontent.com/66052289/209562213-a2378a76-449b-4729-89d0-7ef350b7782b.png)|![image](https://user-images.githubusercontent.com/66052289/209561990-e613f07d-865d-43f7-b6b2-dd5c2209649d.png)|
|주문 및 결제|결제 완료 페이지|
<br />


## 2. 기술 스택

![image](https://i.ibb.co/N34mXzy/image.png)

<br />

### 2-1. 프론트엔드

- **Vanilla javascript**, html, css (**Bulma css**)
- Font-awesome 
- Daum 도로명 주소 api 
- 이외

### 2-2. 백엔드 

- **Express** (nodemon, babel-node로 실행됩니다.)
- Mongodb, Mongoose
- cors
- 이외



## 3. 인프라 구조

![image](https://i.ibb.co/9tGxmx0/image.png)<br />

### 3-1. 폴더 구조
- 프론트: `src/views` 폴더 
- 백: src/views 이외 폴더 전체
- 실행: **프론트, 백 동시에, express로 실행**

<br />

## 4. 제작자

| 이름 | 담당 업무 |
| ------ | ------ |
| 조욱현 | 팀장/백엔드개발 |
| 백소라 | 프론트엔드팀장/프론트엔드개발 |
| 김준영 | 프론트엔드개발 |
| 김민지 | 프론트엔드개발 |
| 김은비 | 프론트엔드개발 |
| 장은미 | 엔드개발 |
<br />

## 5. 실행 방법

1. 레포지토리를 클론하고자 하는 디렉토리에서 아래 명령어를 수행

```bash
git clone <레포지토리 주소>
```


2. 클론한 디렉토리에서 backend 디렉토리로 들어가 아래 명령어를 통해 backend에서 필요한 module 설치

```bash
npm install
```


3. backend에서 필요한 `.env` 설정

```bash
MONGODB_URL=<몽고DB URL>
PORT=5000
JWT_SECERT_KEY=<랜덤 문자열>
```

  앱을 테스트하고 싶은 경우 다음의 몽고DB URL을 이용하세요.

  - mongodb+srv://elice:W8RsZsSX2Xs1ydE4@cluster0.4gz9ij3.mongodb.net/?retryWrites=true&w=majority

  단, 해당 URL은 READ만 가능하며 회원 가입을 하거나 상품 정보를 추가하는 등의 동작은 할 수 없습니다. <br>
  주어진 URL은 테스트 용이므로 실제 개발을 할 때는 해당 URL을 사용하지 않고, 반드시 직접 설치한 몽고DB의 URL을 사용하시기를 바랍니다.



4. express 앱을 실행

```bash
npm start
```

<br>

## 6. 버전
### 1.0.0

<br>

## 7. FAQ
<details><summary>1. 배포된 페이지는 어디에서 확인할 수 있나요?</summary>

  <p>
    프로젝트 기본 코드는 따로 배포하지 않았습니다, 레포지토리를 클론하여 직접 실행해보세요.
  </p>

</details>
<details><summary>2. env 파일이 보이지 않습니다.</summary>

  <p>
    해당 파일은 직접 만들어서 코드를 작성해야 합니다, DB를 비롯한 서비스의 계정 정보는 <b>절대로</b> Git에 함부로 공유하면 안되기 때문에 유의 바랍니다.
  </p>

</details>

---

본 프로젝트에서 제공하는 모든 코드 등의는 저작권법에 의해 보호받는 ㈜엘리스의 자산이며, 무단 사용 및 도용, 복제 및 배포를 금합니다.
Copyright 2022 엘리스 Inc. All rights reserved.
