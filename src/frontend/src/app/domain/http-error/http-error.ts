import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';

export const handleHttpError =
  (entity: string, _snackBar: MatSnackBar) => (err: any) => {
    _snackBar.dismiss();

    function openSnackBar(message: string) {
      return _snackBar.open(message, 'OK', {
        panelClass: ['snack-bar-failed'],
      });
    }

    switch (err.status) {
      case 400:
        if (typeof err?.error === 'string') {
          openSnackBar(`Error: ${err.error}`);
        } else {
          openSnackBar(`Error: ${Object.values(err.error.errors).join(' ')}`);
        }
        break;
      case 401:
        openSnackBar(`Error: You are not authorized for action`);
        break;
      case 403:
        openSnackBar(`Error: This action is forbidden`);
        break;
      case 404:
        openSnackBar(`Error: ${entity} could not be found`);
        break;
      case 500:
        openSnackBar(`Server Error: ${err.error.detail}. Contact Admin!`);
        break;
      default:
        console.error(err);
        break;
    }
    return throwError(() => err);
  };
