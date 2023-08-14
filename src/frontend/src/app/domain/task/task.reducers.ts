import { createReducer, on } from '@ngrx/store';
import { Task } from './task';
import { completeTask, createTask, setAllTasks } from './task.actions';

export const initialState: Task[] = [];

const _taskReducer = createReducer(
  initialState,
  on(createTask, (state, action) => [...state, action.payload.task]),
  on(completeTask, (state, action) =>
    state.filter((task) => {
      if (task.id == action.payload.taskId) {
        task.isDone = true;
      }
    })
  ),
  on(setAllTasks, (state, action) => state = action.payload.tasks)
);

export function taskReducer(state: any, action: any) {
  return _taskReducer(state, action);
}
