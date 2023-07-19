import {createReducer, on} from "@ngrx/store";
import {failed, initialAuthState, loading, succeeded} from "../auth-state.model";
import {register, registerError, registerSuccess, login, loginSuccess, loginError, logout} from "../actions/auth.actions";
import {error} from "@angular/compiler-cli/src/transformers/util";

export const AuthReducer = createReducer(
  initialAuthState,
  on(register, state => {
    return {...state, status: loading}
  }),
  on(registerError, (state, {error}) => {
    return {
      ...state,
      status: failed,
      error: error
    }
  }),
  on(registerSuccess, state => {
    return {
      ...state,
      status: succeeded
    }
  }),
  on(login, (state, {data}) => {
    return {
      ...state,
      data: data,
      status: loading
    }
  }),
  on(loginSuccess, (state, {user}) => {
    return {
      ...state,
      token: user.token,
      userId: user.id,
      isLoggedIn: true,
      status: succeeded
    }
  }),
  on(loginError, (state) => {
    return {
      token: null,
      error: error,
      isLoggedIn: false,
      status: failed
    }
  }),
  on(logout, state => {
    return {
      token: null,
      isLoggedIn: false,
      status: idle,
      userId: null,
      userName: null,
      error: null,
    }
  })
)
