import { createSelector } from "@ngrx/store";
import { stateUsers } from "src/app/shared/models/tools/state.model";
import { _AppState } from "../app.state";

export const selectorUser = (state: _AppState) => state.users;
export const selectorCargandoUser = createSelector(selectorUser, (state: stateUsers) => state.load);
export const selectorUserCargandos = createSelector(selectorUser, (state: stateUsers) => state.data);