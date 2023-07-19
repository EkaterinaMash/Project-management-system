import {ColumnType} from "./column-type.model";

export interface BoardType {
  _id?: string,
  title: string,
  owner: string,
  users: string[],
  description?: string,
  columns?: ColumnType[]
}
