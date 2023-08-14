import { Task } from './task';
import { createSelector } from '@ngrx/store';

export interface TaskState {
  task: Task[];
}

export const selectTasks = createSelector(
  (state: TaskState) => state.task,
  (tasks: Task[]) => tasks
);
