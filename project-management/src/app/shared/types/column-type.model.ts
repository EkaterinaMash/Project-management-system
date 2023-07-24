export interface ColumnType {
  _id?: string,
  boardId: string,
  title: string,
  order: number,
}

export interface ColumnData {
  column: ColumnType,
  _id: string
}
