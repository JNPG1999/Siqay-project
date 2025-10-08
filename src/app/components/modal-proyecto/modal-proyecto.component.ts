import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { modalProyecto, proyectosCarousel } from '../../modals/listaHeader';
@Component({
  selector: 'app-modal-proyecto',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './modal-proyecto.component.html',
  styleUrl: './modal-proyecto.component.scss'
})
export class ModalProyectoComponent {

  dialogRef = inject(MatDialogRef<ModalProyectoComponent>);
  data = inject<modalProyecto>(MAT_DIALOG_DATA);

  ngOnInit(): void {
    console.log(this.data);
  }

  closeModal() {
    this.dialogRef.close();
  }
}
