import {createReducer, on} from "@ngrx/store";
import {initialSelectedUserState, initialUsersState} from "../users-state.model";
import {getUsers, setSelectedUser, setUser} from "../actions/users.actions";

export const UserReducer = createReducer(
initialUsersState,
  on(setUser, (state, {user}) => {
    const clone = Object.assign({}, state);
    if (!clone.users) clone.users = [];
    return {
      ...clone,
      users: [...clone.users, user],
    };
  }),
  on(getUsers, state => state.users)
)

export const SelectedUserReducer = createReducer(
  initialSelectedUserState,
  on(setSelectedUser, (state, {selectedUser}) => {
    return {
      ...state,
      selectedUser: selectedUser
    }
  })
)
