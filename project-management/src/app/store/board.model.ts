import {ColumnType} from "../shared/types/column-type.model";
import {BoardType} from "../shared/types/board-type.model";

export type Board = {
  id?: string,
  _id?: string,
  title: string,
  owner: string,
  users: string[],
  description?: string,
  columns?: ColumnType[]
}

type PartialRequired<
  T,
  K extends keyof T
  > = Pick<T, K> & Partial<Omit<T, K>>;

export type BoardItem = PartialRequired<BoardType, "_id" | "title">
