import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-modal-correo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-correo.component.html',
  styleUrl: './modal-correo.component.scss'
})
export class ModalCorreoComponent {

  dialogRef = inject(MatDialogRef<ModalCorreoComponent>);

  data = inject(MAT_DIALOG_DATA);

  ngOnInit(){
    console.log(this.data);
  }

  close(){
    this.dialogRef.close();
  }

}
