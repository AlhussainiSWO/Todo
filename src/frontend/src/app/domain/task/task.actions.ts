import { Task } from './task';
import { createAction, props } from '@ngrx/store';

export const createTask = createAction(
  '[Task] Create New Task',
  props<{ payload: { task: Task } }>()
);

export const setAllTasks = createAction(
  '[Task] Set All Tasks For UserId',
  props<{ payload: { tasks: Task[] } }>()
);

export const completeTask = createAction(
  '[Task] Create New Task',
  props<{ payload: { taskId: string } }>()
);
