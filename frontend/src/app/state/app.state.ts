import { ActionReducerMap } from "@ngrx/store";
import { stateUsers } from "../shared/models/tools/state.model";
import { userReducer } from "./reducers/user.reduce";

export interface _AppState {
  users: stateUsers
}

export const ROOT_REDUCERS: ActionReducerMap<_AppState> = {
  users: userReducer
}