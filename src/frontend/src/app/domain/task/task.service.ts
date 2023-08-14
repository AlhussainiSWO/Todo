import { LoginRequest } from '../login-request/login-request';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs';
import { handleHttpError } from '../http-error/http-error';
import { Task } from './task';
import { TaskState } from './task.selectors';
import { Store } from '@ngrx/store';
import { completeTask, createTask } from './task.actions';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  apiUrl = 'api/task';

  constructor(
    private _httpClient: HttpClient,
    private _snackBar: MatSnackBar,
    private _store: Store<TaskState>
  ) {}

  private _handleHttpError = handleHttpError('Task', this._snackBar);

  public createTask(task: Task) {
    return this._httpClient.post<Task>(this.apiUrl + '/create', task).pipe(
      catchError(this._handleHttpError),
      tap((_task) =>
        this._store.dispatch(createTask({ payload: { task: _task } }))
      ),
      tap(() =>
        this._snackBar.open(`Added!`, 'HI!', {
          panelClass: ['snack-bar-success'],
        })
      )
    );
  }

  public completeTask(taskId: string) {
    return this._httpClient.post<Task>(this.apiUrl + '/complete', taskId).pipe(
      catchError(this._handleHttpError),
      tap((task) => {
        this._store.dispatch(completeTask({ payload: { taskId: task.id } }));
      }),
      tap(() =>
        this._snackBar.open(`Done!`, '', {
          panelClass: ['snack-bar-success'],
        })
      )
    );
  }
}
