import { LoginRequest } from './../login-request/login-request';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs';
import { handleHttpError } from '../http-error/http-error';
import { AuthService } from '../auth/auth.service';
import { Store, select } from '@ngrx/store';
import { selectUser, UserState } from './user.selectors';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userUrl = 'api/user';

  constructor(
    private _httpClient: HttpClient,
    private _snackBar: MatSnackBar,
    private _authService: AuthService,
  ) {}

  private _handleHttpError = handleHttpError('User', this._snackBar);

  public registerUser(user: User) {
    return this._httpClient.post<User>(this.userUrl + '/create', user).pipe(
      catchError(this._handleHttpError),
      tap(() =>
        this._snackBar.open(`Welcome ${user.userName}!`, 'HI!', {
          panelClass: ['snack-bar-success'],
        })
      )
    );
  }

  public loginUser(loginRequest: LoginRequest) {
    return this._httpClient
      .post<User>(this.userUrl + '/login', loginRequest)
      .pipe(
        catchError(this._handleHttpError),
        tap((user) => {
          this._authService.authorizeUser(user)
        }),
        tap((user) =>
        this._snackBar.open(`Hi ${user.userName}!`, '', {
          panelClass: ['snack-bar-success'],
        }),
      ));
  }
}
