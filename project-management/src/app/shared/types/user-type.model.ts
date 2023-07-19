import {token} from "../../store/auth-state.model";

export interface User {
  name: string;
  login: string;
  password?: string;
}

export interface UserData {
  token: token;
  id: string;
}
