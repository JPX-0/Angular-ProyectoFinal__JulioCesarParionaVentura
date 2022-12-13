import { createReducer, on } from "@ngrx/store";
import { stateUsers } from "src/app/shared/models/tools/state.model";
import { cargarUser, userCargado } from "../actions/user.action";

const stateInit: stateUsers = {
  load: false, 
  data: []
}
export const userReducer = createReducer(stateInit, 
  on(cargarUser, state => {
    console.log("userReducer - cargarUser: ", state);
    return ({ ...state, load: true })
  }),
  on(userCargado, (state, { data }) => {
    console.log("userReducer - userCargado: ", state);
    console.log("userReducer - userCargado: ", data);
    return ({ ...state, data })
  })
)
