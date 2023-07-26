export interface TaskType {
  _id: string,
  boardId: string,
  columnId: string,
  userId: string,
  title: string,
  description: string,
  order: number,
  users?: string[]
}
