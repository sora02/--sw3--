// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다.

import * as Api from "/api.js";
import createNavbar  from "/navbar.js";
import sidebar  from "/sidebar.js";

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
createNavbar();
sidebar();
// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
