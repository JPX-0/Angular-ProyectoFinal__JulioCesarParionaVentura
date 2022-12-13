import { ToReceive_user } from "../db/user.model";

// █ █▄ █ ▀█▀ ██▀ █▀▄ █▀ ▄▀▄ ▄▀▀ ██▀ 
// █ █ ▀█  █  █▄▄ █▀▄ █▀ █▀█ ▀▄▄ █▄▄ 
export interface _State<data> {
  load: boolean,
  data: (data)
}

// ▀█▀ ▀▄▀ █▀▄ ██▀ 
//  █   █  █▀  █▄▄ 
export type stateUsers = _State<ToReceive_user[]>;
export type stateCourses = _State<ToReceive_user[]>;
export type stateCommission = _State<ToReceive_user[]>;
export type stateMyInfo = _State<ToReceive_user[]>;
export type stateMyCourses = _State<ToReceive_user[]>;