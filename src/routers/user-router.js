import { Router } from "express";
import is from "@sindresorhus/is";
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from "../middlewares";
import { userService } from "../services";
import Utils from "../utils/utils";

const userRouter = Router();

const istherePassword = (password) => {
  if (!password) {
    throw new Error("password가 입력되지 않았습니다");
  }
}

//유저 신규등록
userRouter.post("/register", async (req, res, next) => {
  try {
    Utils.isemptyObject(req.body)
    const {fullName, email, password, passwordConfirm} = req.body
    const newUser = await userService.addUser({ fullName, email, password, passwordConfirm });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

userRouter.post(
  "/deliveryinfo",
  loginRequired,
  async function (req, res, next) {
    try {
      // content-type 을 application/json 로 프론트에서
      // 설정 안 하고 요청하면, body가 비어 있게 됨.
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }

      // 토큰으로부터 추출됐던 id를 가져옴
      const userId = req.currentUserId;

      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const address = req.body.address;
      const phoneNumber = req.body.phoneNumber;

      // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
      // 보내주었다면, 업데이트용 객체에 삽입함.
      const deliveryinfo = {
        ...(address && { address }),
        ...(phoneNumber && { phoneNumber }),
      };

      // 사용자 정보를 업데이트함.
      const updatedUserInfo = await userService.saveDeliveryInfo(
        userId,
        deliveryinfo
      );

      res.status(200).json(updatedUserInfo);
    } catch (error) {
      next(error);
    }
  }
);



//로그인
userRouter.post("/login", async function (req, res, next) {
  try {
    Utils.isemptyObject(req.body);
    const {email, password} = req.body;
    const userToken = await userService.getUserToken({ email, password });
    res.cookie('userToken', userToken.token).status(200).json(userToken);
  } catch (error) {
    next(error);
  }
});

//유저리스트 전체보기
userRouter.get("/userlist", loginRequired, async function (req, res, next) {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

//유저 가져오기
userRouter.get("/get", loginRequired, async function (req, res, next) {
  try {
    const id = req.currentUserId;
    const users = await userService.getMyinfo(id);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});
  
//유저 정보수정(이름, 비밀번호, 이메일 수정)
userRouter.patch("/update", loginRequired, async function (req, res, next) {
    try {
      Utils.isemptyObject(req.body);
      const userId = req.currentUserId;
      const {fullName, password, address,} = req.body;
      istherePassword(password);

      const userInfoRequired = { userId, password };

      const toUpdate = {
        ...(fullName && { fullName }),
        ...(password && { password }),
        ...(address && { address }),
      };

      const updatedUserInfo = await userService.setUser(
        userInfoRequired,
        toUpdate
      );
      res.status(200).json(updatedUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

//로그아웃. 
userRouter.get("/logout", async function (req, res, next) {
  try {
    res.clearCookie('user');
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

//유저 내정보보기
userRouter.get("/checkmyinfo", loginRequired, async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    const myinfo = await userService.getMyinfo(userId);

    res.status(200).json(myinfo);
  } catch (error) {
    next(error);
  }
});
  
//내정보삭제
userRouter.delete("/deletemyaccount", loginRequired, async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    const deletedInfo = await userService.deleteMyinfo(userId);

    res.status(200).json(deletedInfo);
  } catch (error) {
    next(error);
  }
});

export { userRouter };
