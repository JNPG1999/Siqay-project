import { Component, effect, inject, signal } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../../../interface/project.interface';
import { ReactiveFormsModule, ɵInternalFormsSharedModule } from "@angular/forms";
import { CommonModule, DatePipe } from '@angular/common';
import { SupabaseService } from '../../../../services/supabase/supabase.service';

export interface ModalProjectDataAdmin {
    project: Project;
    // categories: { nombre: string; }[];
}

interface Categoria {
    id: number;
    nombre: string;
    seleccionado?: boolean;
}


@Component( {
    selector: 'modal-project-admin',
    standalone: true,
    imports: [ ɵInternalFormsSharedModule, DatePipe, CommonModule, ReactiveFormsModule ],
    templateUrl: './modal-project-admin.component.html',
    styleUrl: './modal-project-admin.component.scss',
} )


export class ModalProjectAdminComponent {
    private supabase = inject( SupabaseService ).supabaseClient;
    dialogRef = inject( MatDialogRef<ModalProjectAdminComponent> );
    data = inject<any>( MAT_DIALOG_DATA );
    openCategorias = signal<boolean>( false );

    categoriaSeleccionada = signal<Categoria | null>( null );
    miFecha = new Date( this.data.project.fecha );
    categorias = signal<any>( [] );


    ngOnInit(): void {
        // console.log( this.data.project );
        // console.log( this.data );
        // this.categories = await this.getCategorias();
        // this.categorias.set( this.getCategorias() );
        // effect( () => {
        //     console.log(this.categorias())
        // })

        this.getCategoriasHarcode()
    
        
    }

    async getCategoriasHarcode() {
        const { data, error } = await this.getCategorias()
        this.categorias.set(data?.map( dataAddSeleccionado => {
            return {
                ...dataAddSeleccionado,
                seleccionado: false,
            }
        }))

        console.log(this.categorias())

    }

    async getCategorias() {
        let { data, error } = await this.supabase
            .from( 't_categoria' )
            .select( 'id, nombre' );
        // return t_categoria;
        return { data, error }
    }

    seleccionarCategoria( categoria: Categoria ) {
        this.categoriaSeleccionada.set( categoria );

        this.categorias.update( ( list ) =>
            list.map( ( c: any ) => ( { ...c, seleccionado: c.id === categoria.id } ) )
        );

        console.log(this.categoriaSeleccionada())
    }

    closeModal() {
        this.dialogRef.close();
    }


}
