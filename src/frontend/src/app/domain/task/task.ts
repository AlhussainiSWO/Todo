export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string;
  isDone: boolean;
  createdDate: Date;
  completedDate: Date;
}
