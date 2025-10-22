import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../../../interface/project.interface';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from "@angular/forms";
import { CommonModule, DatePipe } from '@angular/common';
import { SupabaseService } from '../../../../services/supabase/supabase.service';
import { ProyectoService } from '../../../../services/proyectos/proyecto.service';

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
    private proyectService = inject( ProyectoService );
    dialogRef = inject( MatDialogRef<ModalProjectAdminComponent> );
    data = inject<any>( MAT_DIALOG_DATA );
    openCategorias = signal<boolean>( false );
    loading = signal<boolean>( false );

    categoriaSeleccionada = signal<Categoria | null>( null );
    miFecha = new Date( this.data.project.fecha );
    categorias = signal<any>( [] );
    fb = inject( FormBuilder );

    proyectoForm = this.fb.group( {
        titulo: [ '', Validators.required ],
        idcategoria: [ 0 ],
        fecha: [ new Date(), Validators.required ],
        // cliente: [ '' ],
        ubicacion: [ '', Validators.required ],
        descripcioncorta: [ '', Validators.required ],
        descripcioncompleta: [ '',  Validators.required ],
        imagenprincipal: [ '', Validators.required ],
    } );



    async onSubmit() {
        const isValid = this.proyectoForm.valid;
        // console.log( this.proyectoForm.value, { isValid } );

        this.proyectoForm.markAllAsTouched();
        this.loading.set( true );

        if ( !isValid ) return;


        try {
            const proyectoActualizado = { ...this.proyectoForm.value, idcategoria: this.proyectoForm.value.idcategoria};
            const id = this.data.project.id;

            const response = await this.proyectService.updateProyecto( id, proyectoActualizado );
            console.log( "Proyecto actualizado", response );
            console.log( "El id: ", id );
            this.closeModal();
            // const productLike: Partial<any> = {
            //     ...(formValue),
            // }
        } catch ( error ) {
            console.log( error );
            console.log( "Error al actualizar productos, desde modal-project-admin" );
        } 
    }

    categoriaSeleccionadaLectura = computed( () => {
        // busca la categoría cuyo 'seleccionado' sea true

        return this.categorias().find( ( c: any ) => c.seleccionado );
    } );


    async ngOnInit() {
        
        if ( this.data?.project ) {
            const formValue = this.data.project;
            this.proyectoForm.patchValue( {
                titulo: formValue.titulo,
                idcategoria: formValue.idcategoria,
                fecha: formValue.fecha,
                // cliente: '',
                ubicacion: formValue.ubicacion,
                descripcioncorta: formValue.descripcioncorta,
                descripcioncompleta: formValue.descripcioncompleta,
                imagenprincipal: formValue.imagenprincipal,
            } );
        }
        await this.getCategorias();
        await this.getCategoriasHarcode();
        console.log( this.data.project.idcategoria );


    }
    //! COMENTAR POR AHORA
    async getCategoriasHarcode() {
        const { data, error } = await this.getCategorias();
        this.categorias.set( data?.map( dataAddSeleccionado => {

            if ( dataAddSeleccionado.id === this.data?.project.idcategoria ) {
                return {
                    ...dataAddSeleccionado,
                    seleccionado: true,
                };
            }

            return {
                ...dataAddSeleccionado,
                seleccionado: false,
            };
        } ) );

        console.log( 'categoriasHarcode', this.categorias() );

    }

    //! COMENTAR POR AHORA




    async getCategorias() {
        let { data, error } = await this.supabase
            .from( 't_categoria' )
            .select( 'id, nombre' );
        // return t_categoria;
        return { data, error };
    }

    seleccionarCategoria( categoria: Categoria ) {
        this.categoriaSeleccionada.set( categoria );

        this.categorias.update( ( list ) =>
            list.map( ( c: any ) => ( { ...c, seleccionado: c.id === categoria.id } ) )
        );

        this.proyectoForm.patchValue({
            idcategoria: categoria.id
        })

        console.log( 'categoria seleccionado', this.categoriaSeleccionada() );
    }

    isValidField( form: FormGroup, fieldName: string ) {
        return (
            !!form.controls[ fieldName ]?.errors && form.controls[ fieldName ]?.touched
        );
    }

    isValidFieldInArray( formArray: FormArray, index: number ) {
        return (
            formArray.controls[ index ].errors && formArray.controls[ index ].touched
        );
    }

    closeModal() {
        this.dialogRef.close();
    }


}
