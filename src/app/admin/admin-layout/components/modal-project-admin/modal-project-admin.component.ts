import { Component, computed, inject, LOCALE_ID, signal } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../../../interface/project.interface';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from "@angular/forms";
import { CommonModule, registerLocaleData } from '@angular/common';
import { SupabaseService } from '../../../../services/supabase/supabase.service';
import { ProyectoService } from '../../../../services/proyectos/proyecto.service';

//! IMPORTACION DEL TOAST
import { MatSnackBar } from '@angular/material/snack-bar';

//! IMPORTACION DE ANGULAR MATERIAL PARA EL INPUT DE FECHA
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_FORMATS, MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { PERU_DATE_FORMATS } from '../../../../services/helper/peru-date-formats';

import localePe from '@angular/common/locales/es-PE';





export interface ModalProjectDataAdmin {
    project: Project;
    // categories: { nombre: string; }[];
}

interface Categoria {
    id: number;
    nombre: string;
    seleccionado?: boolean;
}

interface CategoriaPure {
    id: number;
    nombre: string;
}
registerLocaleData(localePe);



@Component( {
    selector: 'modal-project-admin',
    standalone: true,
    imports: [ ɵInternalFormsSharedModule, CommonModule, ReactiveFormsModule,
                //! IMPORT DE FECHA
                MatDatepickerModule,
                MatFormFieldModule,
                MatInputModule,
                MatNativeDateModule,  // 🔥 este es el importante
     ],
     providers: [provideNativeDateAdapter(),
        { provide: LOCALE_ID, useValue: 'es-PE'},
        { provide: MAT_DATE_FORMATS, useValue: PERU_DATE_FORMATS }
     ],
    templateUrl: './modal-project-admin.component.html',
    styleUrl: './modal-project-admin.component.scss',
} )


export class ModalProjectAdminComponent {
    
    private supabase = inject( SupabaseService ).supabaseClient;
    private proyectService = inject( ProyectoService );
    dialogRef = inject( MatDialogRef<ModalProjectAdminComponent> );
    data = inject<{ project : Project }>( MAT_DIALOG_DATA );
    openCategorias = signal<boolean>( false );
    loading = signal<boolean>( false );

    categoriaSeleccionada = signal<Categoria | null>( null );
    // miFecha = new Date( this.data.project.fecha );
    categorias = signal<Categoria[]>( [] );
    fb = inject( FormBuilder );

    proyectoForm = this.fb.nonNullable.group( {
        titulo: [ '', Validators.required ],
        idcategoria: [ 0 ],
        // fecha: [ '', Validators.required ],
        fecha: [ null as Date | null, Validators.required],
        cliente: [ '', [ Validators.required, Validators.minLength( 3 ) ] ],
        ubicacion: [ '', [ Validators.required, Validators.minLength( 3 ) ] ],
        descripcioncorta: [ '', [ Validators.required, Validators.minLength( 10 ) ] ],
        descripcioncompleta: [ '', [ Validators.required, Validators.minLength( 15 ) ] ],
        imagenprincipal: [ '', Validators.required ],
    } );



    async onSubmit() {
        const isValid = this.proyectoForm.valid;
        this.proyectoForm.markAllAsTouched();
        this.loading.set( true );
        if ( !isValid ) return;

        if ( this.data?.project ) {

            //! EDICION DE ALGUN PROYECTO
            try {
                const proyectoActualizado = { ...this.proyectoForm.value, idcategoria: this.proyectoForm.value.idcategoria };
                const id = this.data.project.id;

                const response = await this.proyectService.updateProyecto( id, proyectoActualizado );
                console.log( "Proyecto actualizado", response );
                console.log( "El id: ", id );
                this.openToast('Datos actualizados correctamente');
                this.closeModal();
                
                return;
            } catch ( error ) {
                console.log( error );
                console.log( "Error al actualizar proyectos, desde modal-project-admin" );
            }
        } 
        
        //! CREACION DE PROYECTO 

        try {
            const response = await this.proyectService.createProyecto(this.proyectoForm.value)
            console.log('proyecto creado', response)
            this.closeModal();
        } catch ( error ) {
            console.log(error);
            console.log( "Error al crear proyectos, desde modal-project-admin" );
        }
    }

    categoriaSeleccionadaLectura = computed( () => {
        return this.categorias().find( ( c: Categoria ) => c.seleccionado );
    } );

    constructor(private snackBar: MatSnackBar) {}
    async ngOnInit() {
        

        if ( this.data?.project ) {
            const formValue = this.data.project;
            console.log( formValue );
            this.proyectoForm.patchValue( {
                titulo: formValue.titulo,
                idcategoria: formValue.idcategoria,
                fecha: formValue.fecha ? new Date(formValue.fecha) : null,
                cliente: formValue.cliente,
                ubicacion: formValue.ubicacion,
                descripcioncorta: formValue.descripcioncorta,
                descripcioncompleta: formValue.descripcioncompleta,
                imagenprincipal: formValue.imagenprincipal,
            } );
        } else {
            this.proyectoForm.reset();
        }
        // await this.getCategorias();
        await this.getCategoriasHarcode();
    }

    async getCategoriasHarcode() {
        const { data, error } = await this.getCategorias();
        if ( error ) {
            console.error( 'Error al obtener categorías:', error );
            return;
        }
        const idCategoria = this.data?.project?.idcategoria ?? null;

        this.categorias.set(
            ( data ?? [] ).map( ( categoria ) => ( {
                ...categoria,
                seleccionado: idCategoria ? categoria.id === idCategoria : false,
            } ) )
        );
    }
    async getCategorias() {
        let { data, error } = await this.supabase
            .from( 't_categoria' )
            .select( 'id, nombre' );
        return { data, error };
    }

    seleccionarCategoria( categoria: Categoria ) {
        this.categoriaSeleccionada.set( categoria );

        this.categorias.update( ( list ) =>
            list.map( ( c: CategoriaPure ) => ( { ...c, seleccionado: c.id === categoria.id } ) )
        );

        this.proyectoForm.patchValue( {
            idcategoria: categoria.id
        } );

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

    openToast(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
