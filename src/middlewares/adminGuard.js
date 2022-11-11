import jwt from "jsonwebtoken";

function adminGuard(req, res, next) {
    const userToken = req.headers["authorization"]?.split(" ")[1];
    
    if (!userToken || userToken === "null") {
        console.log("authorization에 token이 존재하지 않습니다.");
        res.status(403).json({
          result: "잘못된 접근",
          reason: "로그인한 유저만 사용할 수 있는 서비스입니다.",
        });
        return;
    }

    // token의 role 확인
    try {
        const secretKey = process.env.JWT_SECERT_KEY || "secret-key";
        const jwtDecoded = jwt.verify(userToken, secretKey);

        const userRole = jwtDecoded.role;

        if (userRole === "Admin") {
            next();
        } else {
            //애초에 html에서 보이지 않아야 함
            throw new Error("관리지만 접근할 수 있습니다.")
        }
    } catch(err) {
        res.status(403).json({
            result: "잘못된 접근",
            reason: "정상적인 토큰이 아닙니다.",
        });
        return;
    }
}

export { adminGuard } ;