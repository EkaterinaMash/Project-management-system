import {createReducer, on} from "@ngrx/store";
import {initialSelectedUserState, initialUsersState} from "../users-state.model";
import {getUsers, setSelectedUser, setUser} from "../actions/users.actions";

export const usersReducer = createReducer(
  initialUsersState,
  on(getUsers, (state, {users}) => {
    return {
      ...state,
      users: users
    }
  })
)
