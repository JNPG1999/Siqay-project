import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-eliminar',
  standalone: true,
  imports: [],
  templateUrl: './modal-eliminar.component.html',
  styleUrl: './modal-eliminar.component.scss'
})
export class ModalEliminarComponent {

  dialogRef = inject(MatDialogRef<ModalEliminarComponent>);

  AceptarEliminar(): void {
    this.dialogRef.close(true);
  }

  CancelarEliminar(): void {
    this.dialogRef.close(false)
  }

}
