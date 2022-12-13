// █ █▄ █ ▀█▀ ██▀ █▀▄ █▀ ▄▀▄ ▄▀▀ ██▀ 
// █ █ ▀█  █  █▄▄ █▀▄ █▀ █▀█ ▀▄▄ █▄▄ 
export interface UserInfoSpecial {
  _id: string,
  info: UserInfo
}
export interface UserInfo {
  firstName: string,
  lastName: string,
  image: string,
  age?: number,
  birth: Date,
}
export interface UserData {
  email: string,
  password: string,
  role?: userRoleType
}
export interface ToReceive_user {
  _id: string,
  info: UserInfo,
  data: UserData
}
export interface ToSend_user extends UserInfo {
  email: string,
  npassword: string
  rpassword: string
}

// ▀█▀ ▀▄▀ █▀▄ ██▀ 
//  █   █  █▀  █▄▄ 
export type userRoleType = "admin" | "user" | "student";