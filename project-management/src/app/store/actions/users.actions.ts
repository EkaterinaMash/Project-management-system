import {createAction, props} from "@ngrx/store";
import {UserType} from "../../shared/types/user-type.model";

export const setUser = createAction(
  '[Register page] set user', props<{user: UserType}>())
export const setSelectedUser = createAction(
  '[Register page] set selected user', props<{selectedUser: UserType}>())
export const getUsers = createAction(
  '[Register page] get users', props<{users: UserType[]}>());
