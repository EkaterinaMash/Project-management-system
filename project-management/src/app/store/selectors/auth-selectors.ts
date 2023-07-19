import {AuthState} from "../auth-state.model";
import {createFeatureSelector, createSelector} from "@ngrx/store";

export const getAuthStatus = (state: AuthState) => state.isLoggedIn;
export const getAuthError = (state: AuthState) => state.error && state.error.message;
export const getUserId = (state: AuthState) => state.userId;
export const getUserName = (state: AuthState) => state.userName;

export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectAuthError = createSelector(
  selectAuthState, getAuthError
)
export const selectLoginStatus = createSelector(
  selectAuthState, getAuthStatus
)
