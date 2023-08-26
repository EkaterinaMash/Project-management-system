import {UserType} from "../shared/types/user-type.model";

export interface UserState {
  users: UserType[] | undefined
}

export const initialUsersState: UserState = {
  users: undefined
};

export interface SelectedUserState {
  user: UserType | undefined
}

export const initialSelectedUserState: SelectedUserState = {
  user: undefined
}

