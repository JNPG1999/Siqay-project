import { Component, computed, inject, LOCALE_ID, signal } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../../../interface/project.interface';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from "@angular/forms";
import { CommonModule, registerLocaleData } from '@angular/common';
import { SupabaseService } from '../../../../services/supabase/supabase.service';
import { ProyectoService } from '../../../../services/proyectos/proyecto.service';

//! IMPORTACION DEL TOAST
// import { MatSnackBar } from '@angular/material/snack-bar';

//! IMPORTACION DE ANGULAR MATERIAL PARA EL INPUT DE FECHA
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { PERU_DATE_FORMATS } from '../../../../services/helper/peru-date-formats';

import localePe from '@angular/common/locales/es-PE';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastService } from '../../../../services/toast/toast.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
registerLocaleData( localePe );



@Component( {
    selector: 'modal-project-admin',
    standalone: true,
    imports: [ ɵInternalFormsSharedModule, CommonModule, ReactiveFormsModule,
        //! IMPORT DE FECHA
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatNativeDateModule,  //!  para la fecha ctmr, no lo borres mrd
        MatSnackBarModule,  //! para que el toast tenga el estilo personalizado, cuidado borrarlo mrd que te reviento la cabeza
    ],
    providers: [
        provideNativeDateAdapter(),
        // { provide: LOCALE_ID, useValue: 'es-PE'},
        { provide: LOCALE_ID, useValue: 'es-ES' },          // idioma general
        { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },    // idioma del datepicker
        { provide: MAT_DATE_FORMATS, useValue: PERU_DATE_FORMATS }
    ],
    templateUrl: './modal-project-admin.component.html',
    styleUrl: './modal-project-admin.component.scss',
} )


export class ModalProjectAdminComponent {

    private supabase = inject( SupabaseService ).supabaseClient;
    private proyectService = inject( ProyectoService );
    private toastService = inject( ToastService );
    dialogRef = inject( MatDialogRef<ModalProjectAdminComponent> );
    data = inject<{ project: Project; } | null>( MAT_DIALOG_DATA );
    openCategorias = signal<boolean>( false );
    loading = signal<boolean>( false );

    categoriaSeleccionada = signal<Categoria | null>( null );
    // miFecha = new Date( this.data.project.fecha );
    categorias = signal<Categoria[]>( [] );
    fb = inject( FormBuilder );

    imagenesInvalidas: boolean[] = [];

    proyectoForm = this.fb.nonNullable.group( {
        titulo: [ '', Validators.required ],
        idcategoria: [ 0 ],
        // fecha: [ '', Validators.required ],
        fecha: [ null as Date | null, Validators.required ],
        cliente: [ '', [ Validators.required, Validators.minLength( 3 ) ] ],
        ubicacion: [ '', [ Validators.required, Validators.minLength( 3 ) ] ],
        descripcioncorta: [ '', [ Validators.required, Validators.minLength( 10 ) ] ],
        descripcioncompleta: [ '', [ Validators.required, Validators.minLength( 15 ) ] ],
        imagenprincipal: [ '', Validators.required ],
        galeriaimagenes: this.fb.array( [] )
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
                // this.openToast( 'Datos actualizados correctamente' );
                this.toastService.success( 'Editado con exito' );
                this.closeModal();

                return;
            } catch ( error ) {
                console.log( error );
                console.log( "Error al actualizar proyectos, desde modal-project-admin" );
            }
        }

        //! CREACION DE PROYECTO 

        try {
            const response = await this.proyectService.createProyecto( this.proyectoForm.value );
            console.log( 'proyecto creado', response );
            // this.openToast( 'Proyecto creado correctamente' );
            this.toastService.success( 'Creado con exito' );
            this.closeModal();
        } catch ( error ) {
            console.log( error );
            console.log( "Error al crear proyectos, desde modal-project-admin" );
        }
    }

    //! INICIO GALERIA ARRAY IMAGENES
    get galeriaimagenes(): FormArray {
        return this.proyectoForm.get( 'galeriaimagenes' ) as FormArray;
    }

    //! CON GET
    addImagen( url: string = '' ) {
        // Añadir control y estado de validez
        const control = this.fb.control( url, Validators.required );
        this.galeriaimagenes.push( control );
        this.imagenesInvalidas.push( false );
    }

    onImageError( index: number ) {
        const control = this.galeriaimagenes.at( index );
        this.imagenesInvalidas[ index ] = true;

        // Solo marcar error si no lo tenía ya
        if ( !control.hasError( 'invalidImage' ) ) {
            control.setErrors( { invalidImage: true } );
            control.markAsTouched();
        }
    }

    onImageLoad( index: number ) {
        // ✅ Si la imagen se carga correctamente, limpiar error
        const control = this.galeriaimagenes.at( index );
        if ( this.imagenesInvalidas[ index ] || control.hasError( 'invalidImage' ) ) {
            this.imagenesInvalidas[ index ] = false;
            control.setErrors( null );
            control.updateValueAndValidity();
        }
    }


    //! SIN GET
    //? addImagen2( url: string = '' ) {
    //?     (this.proyectoForm.get('galeriaimagenes') as FormArray)?.push( this.fb.control( url ) );
    //? }
    removeImagen( index: number ) {
        this.galeriaimagenes.removeAt( index );
        this.imagenesInvalidas.splice( index, 1 );
    }

    //! FIN GALERIA ARRAY IMAGENES

    categoriaSeleccionadaLectura = computed( () => {
        return this.categorias().find( ( c: Categoria ) => c.seleccionado );
    } );

    // 👉 Si ya viene un JSON de imágenes al editar


    // constructor( private snackBar: MatSnackBar ) { }
    async ngOnInit() {


        if ( this.data?.project ) {
            const formValue = this.data.project;
            console.log( formValue );
            this.proyectoForm.patchValue( {
                titulo: formValue.titulo,
                idcategoria: formValue.idcategoria,
                fecha: formValue.fecha ? new Date( formValue.fecha ) : null,
                cliente: formValue.cliente,
                ubicacion: formValue.ubicacion,
                descripcioncorta: formValue.descripcioncorta,
                descripcioncompleta: formValue.descripcioncompleta,
                imagenprincipal: formValue.imagenprincipal,
            } );
            if ( Array.isArray( formValue.galeriaimagenes ) ) {
                this.galeriaimagenes.clear(); // por si acaso
                formValue.galeriaimagenes.forEach( ( url: string ) => {
                    this.galeriaimagenes.push( this.fb.control( url.trim() ) );
                } );
            }
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

    // openToast( message: string ) {
    //     this.snackBar.open( message, 'Cerrar', {
    //         duration: 3000,
    //         verticalPosition: 'top',
    //         horizontalPosition: 'right',
    //         panelClass: ['toast-success']
    //     } );
    // }
}
