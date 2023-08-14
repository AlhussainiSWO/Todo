import { User } from './user';
import { createSelector } from '@ngrx/store';

export interface UserState {
  user: User;
}

export const selectUser = createSelector(
  (state: UserState) => state.user,
  (user: User) => user
);
