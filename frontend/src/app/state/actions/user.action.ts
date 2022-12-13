import { createAction, props } from "@ngrx/store";
import { ToReceive_user } from "src/app/shared/models/db/user.model";

export const cargarUser = createAction(
  "[lista user] Cargar user"
);
export const userCargado = createAction(
  "[lista user] User cargados",
  props<{ data: ToReceive_user[] }>()
);