import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../user/user';
import { Store, select } from '@ngrx/store';
import { UserState } from '../user/user.selectors';
import { setActiveUser } from '../user/user.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public isAuthorized$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private _store: Store<UserState>) {}

  public authorizeUser(_user: User) {
    this.isAuthorized$.next(true);
    this._store.dispatch(setActiveUser({ payload: { user: _user } }));
  }

  public logoutUser() {
    this.isAuthorized$.next(false);
  }
}
