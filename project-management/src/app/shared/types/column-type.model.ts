export interface ColumnType {
  id?: string,
  boardId: string,
  title: string,
  order: number,
}

export interface ColumnData {
  column: ColumnType,
  id: string
}
