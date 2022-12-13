// import { Guide_UserBackInterface, Guide_UserFrontInterface, UserBackInterface, UserFrontInterface, UserInfoInterface } from "../models/user.model";
import { ToReceive_user, ToSend_user } from "../models/db/user.model";
import { getYears } from "../utils/getYears.utils";

export class DtoUser {

  // static generateUser(user: UserFrontInterface): Guide_UserBackInterface {
  //   return ({
  //     info: {
  //       firstName: user.firstName,
  //       lastName: user.lastName,
  //       image: user.image,
  //       birth: user.birth,
  //     },
  //     data: {
  //       email: user.email,
  //       password: user.npassword
  //     }
  //   })
  // }
  // static updateUser(user: UserBackInterface, newUser: Guide_UserFrontInterface): UserBackInterface {
  //   const info = { ...user.info }
  //   if(newUser.firstName && info.firstName != newUser.firstName) info.firstName = newUser.firstName;
  //   if(newUser.lastName && info.lastName != newUser.lastName) info.lastName = newUser.lastName;
  //   if(info.image != newUser.image) info.image = (newUser.image || "");
  //   if(newUser.birth && info.birth != newUser.birth) {
  //     const { _currentTime, _myTime } = getYears(info.birth);
  //     info.birth = newUser.birth;
  //     info.age = _currentTime - _myTime;
  //   }
  //   return ({ ...user, ...info  });
  // }
  // static profileUser(user: UserBackInterface): UserInfoInterface {
  //   return ({ 
  //     firstName: user.info.firstName,
  //     lastName: user.info.lastName,
  //     image: user.info.image,
  //     birth: user.info.birth,
  //   });
  // }
  // static resetUser(user: ToReceive_user): ToSend_user {
  //   return ({ 
  //     _id: user._id,
  //     firstName: user.info.firstName,
  //     lastName: user.info.lastName,
  //     image: user.info.image,
  //     age: user.info.age,
  //     birth: user.info.birth,
  //     email: user.data.email,
  //     npassword: user.data.password,
  //     rpassword: user.data.password,
  //     role: user.data.role
  //   });
  // }

  constructor() {}

}