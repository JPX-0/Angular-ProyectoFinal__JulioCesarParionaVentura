
import { ToReceive_commission, ToReceive_commissions } from "./commission.model";

// █ █▄ █ ▀█▀ ██▀ █▀▄ █▀ ▄▀▄ ▄▀▀ ██▀ 
// █ █ ▀█  █  █▄▄ █▀▄ █▀ █▀█ ▀▄▄ █▄▄ 
interface start_end<type> {
  start: (type),
  end: (type)
}
interface courseData<commission> {
  _id: string,
  name: string,
  commissions: (commission)
}
export interface ToSend_course {
  name: string,
  teacher: string,
  date: start_end<Date>,
  time: start_end<string>,
  days: string,
}

// ▀█▀ ▀▄▀ █▀▄ ██▀ 
//  █   █  █▀  █▄▄ 
export type ToReceive_course = courseData<ToReceive_commission[]>;
export type ToReceive_courses = courseData<ToReceive_commissions[]>[];