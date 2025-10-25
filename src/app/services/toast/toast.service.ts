
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class ToastService {
    constructor(private snackBar: MatSnackBar) { }
    success(msg: string) {
    this.snackBar.open(msg, 'Cerrar', {
      duration: 3000,
      panelClass: ['toast-success'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  error(msg: string) {
    this.snackBar.open(msg, 'Cerrar', {
      duration: 3000,
      panelClass: ['toast-error'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}