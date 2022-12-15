import { ToSend_course } from "./course.model";
import { UserInfoSpecial } from "./user.model";

// █ █▄ █ ▀█▀ ██▀ █▀▄ █▀ ▄▀▄ ▄▀▀ ██▀ 
// █ █ ▀█  █  █▄▄ █▀▄ █▀ █▀█ ▀▄▄ █▄▄ 
export interface CommissionSpecial {
  _id: string,
  name: string,
  teacher: string,
  tutor: string,
  action: actionType
}
export interface UpdateCommission {
  _addGroup?: string,
  _addStudent?: {
    tutor: string,
    student: string
  },
  _removeStudent?: {
    tutor: string,
    student: string
  }
}
export interface commissionGroup<student> {
  _id?: string,
  tutor: string,
  students: (student)
}
interface commissionData<group> extends ToSend_course {
  _id: string,
  groups: commissionGroup<group>[]
}

// ▀█▀ ▀▄▀ █▀▄ ██▀ 
//  █   █  █▀  █▄▄ 
export type actionType = "without-starting" | "studying" | "finalized"
export type ToReceive_commission = commissionData<UserInfoSpecial[]>
export type ToReceive_commissions = commissionData<string[]>