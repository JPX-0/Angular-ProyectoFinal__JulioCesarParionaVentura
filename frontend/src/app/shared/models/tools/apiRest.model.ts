import { CommissionSpecial, ToReceive_commission, ToReceive_commissions } from "../db/commission.model";
import { ToReceive_course, ToReceive_courses } from "../db/course.model";
import { ToReceive_user } from "../db/user.model";

// █ █▄ █ ▀█▀ ██▀ █▀▄ █▀ ▄▀▄ ▄▀▀ ██▀ 
// █ █ ▀█  █  █▄▄ █▀▄ █▀ █▀█ ▀▄▄ █▄▄ 
export interface ApiRestInterface<res> {
  error: boolean,
  statusCode: number,
  response: (res)
}

// ▀█▀ ▀▄▀ █▀▄ ██▀ 
//  █   █  █▀  █▄▄ 
export type ApiResponse_default = ApiRestInterface<string>;
export type ApiResponse_user = ApiRestInterface<ToReceive_user>;
export type ApiResponse_users = ApiRestInterface<ToReceive_user[]>;
export type ApiResponse_course = ApiRestInterface<ToReceive_course[]>;
export type ApiResponse_courses = ApiRestInterface<ToReceive_courses>;
export type ApiResponse_myCourses = ApiRestInterface<CommissionSpecial[]>;
export type ApiResponse_commission = ApiRestInterface<ToReceive_commission>;
export type ApiResponse_commissions = ApiRestInterface<ToReceive_commissions>;