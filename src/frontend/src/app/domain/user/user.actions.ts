import { createAction, props } from '@ngrx/store';
import { User } from './user';

export const setActiveUser = createAction(
  '[User] Set Active User',
  props<{ payload: { user: User } }>()
);
