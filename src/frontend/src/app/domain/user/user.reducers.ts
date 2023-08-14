import { createReducer, on } from '@ngrx/store';
import { User } from './user';
import { setActiveUser } from './user.actions';

const guest: User = {
  id: 'guest',
  userName: 'Guest',
  password: '',
  email: '',
};

export const initialState: User = guest;

const _userReducer = createReducer(
  initialState,
  on(setActiveUser, (state, action) => (state = action.payload.user))
);

export function userReducer(state: any, action: any) {
  return _userReducer(state, action);
}
