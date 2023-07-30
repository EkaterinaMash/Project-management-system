import {token} from "../../store/auth-state.model";

export interface UserData {
  token: token;
  id: string;
}

export interface UserType {
  _id?: string,
  name?: string,
  login?: string,
  password?: string
}
