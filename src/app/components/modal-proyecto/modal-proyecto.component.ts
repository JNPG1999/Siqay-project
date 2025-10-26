import { Component, ElementRef, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { modalProyecto, proyectosCarousel } from '../../modals/listaHeader';
import { Project } from '../../admin/interface/project.interface';
import { DatePipe, NgClass } from '@angular/common';
@Component( {
    selector: 'app-modal-proyecto',
    standalone: true,
    imports: [MatDialogModule, DatePipe, NgClass],
    templateUrl: './modal-proyecto.component.html',
    styleUrl: './modal-proyecto.component.scss'
} )
export class ModalProyectoComponent {

    dialogRef = inject( MatDialogRef<ModalProyectoComponent> );
    data = inject<any>( MAT_DIALOG_DATA );
    showImages = signal('');
    editAndInformation = signal( false );
    project : any = []
    irSeccion?: (evento: { id?: number; nombre: string }) => void;

    // ngOnInit() : void {

    // }

    ngOnInit(): void {
        this.project = this.data.proyecto;
        this.irSeccion = this.data.irSeccion;
        console.log( this.data );
        console.log(this.data.galeriaimagenes)
        
    }


    get gateleriaParsed() {
        try {
            const imagenesArray = JSON.parse(this.data.galeriaimagenes || '[]');
            console.log(imagenesArray);
            return imagenesArray;
            
        } catch (error) {
            return [];
        }
    }

    clickImageShow(url? : string ) {
        if ( url ) {

            if ( this.showImages() === url ) {
                return this.showImages.set('')
            }
            
            if ( this.showImages() === '') {

                return this.showImages.set(url);
            }

            if ( this.showImages() ) {
                return this.showImages.update( () => url)
            }           
        } 
    }

    irContactos() {
        if ( this.irSeccion ) {
            this.irSeccion({ nombre: 'contactos' });
        }
    }


//     RecibeSeccionHeader(evento: { id?: number; nombre: string }) {
//   const seccion = evento.nombre.toLowerCase() + 'Seccion';
//   const sectionRef = (this as any)[seccion] as ElementRef<HTMLInputElement>;
//   if (sectionRef && sectionRef.nativeElement) {
//     sectionRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
//   } else {
//     console.warn(`No se encontró la sección: ${seccion}`);
//   }
// }

    toggleGaleriaAndInformacion() {
        this.editAndInformation.update( p => !p );
    }

     
    closeModal() {
        this.dialogRef.close();
    }

    closeMOdalRedirect() {
        this.dialogRef.close({
            id: 4,
            nombre: 'contactos'
        })
    }

    
}
