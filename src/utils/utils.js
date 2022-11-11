import is from "@sindresorhus/is";

class Utils {
    static isemptyObject(reqbody) {
        if (is.emptyObject(reqbody)) {
            throw new Error(
              "body로 전달된 데이터가 없습니다"
            );
        }
    }

}
module.exports = Utils;

// /// 
// const checkEmptyObject = (reqBody) => {
//     if (is.emptyObject(reqbody)) {
//         throw new Error(
//           "body로 전달된 데이터가 없습니다"
//         );
//     }
// };

// export {checkEmptyObject};



// import {checkEmptyObject} from '../utils';
// import * as Utils from '../utils';
// checkEmptyObject
// Utils.checkEmptyObject
// import Utils from '../utils'; // default export / named export 