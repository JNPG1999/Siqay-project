import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SupabaseService } from '../../../services/supabase/supabase.service';
import { Project } from '../../interface/project.interface';
import { ModalProjectAdminComponent } from '../components/modal-project-admin/modal-project-admin.component';


@Component( {
    selector: 'app-proyectos',
    standalone: true,
    imports: [ MatTableModule ],
    templateUrl: './proyectos.component.html',
    styleUrl: './proyectos.component.scss'
} )
export class ProyectosComponent {


    private supabase = inject( SupabaseService ).supabaseClient;
    // form: FormBuilder = inject( FormBuilder );

    projects: Project[] = [];
    // projectWithCategories : Pick<Project, { nombre: string }[]>
    categories: { nombre: string; }[] = [];
    displayedColumns: string[] = [ 'imagenprincipal', 'titulo', 'categoria', 'fecha', 'ubicacion', 'acciones' ];
    // dataSource = this.projects;

    dialog = inject( MatDialog );

    // categorias = signal<any>( [
    //     { id: 1, nombre: 'Residencial', seleccionado: false },
    //     { id: 2, nombre: 'Comercial', seleccionado: false },
    //     { id: 3, nombre: 'Cultural', seleccionado: false },
    //     { id: 4, nombre: 'Público', seleccionado: false },
    //     { id: 5, nombre: 'Hospitalidad', seleccionado: false },
    //   ] );
    // formGrupo = this.form.group( {
    //     titulo: new FormControl( '', [ Validators.required ] ),
    //     categoria: new FormControl( '' ),
    //     fecha: new FormControl(''),
    //     ubicacion: new FormControl('', [Validators.required]),
    //     descripcioncorta: new FormControl('', [Validators.required]),
    //     descripcioncompleta: new FormControl('', [Validators.required]),
    //     imagenprincipal: new FormControl('', [Validators.required]),
    //     galeriaimagenes: new FormControl( ''),
        
    // } );

    async ngOnInit() {
        this.projects = await this.getProjects() ?? [];
        this.categories = await this.getCategorias();
        // this.projectWithCategories = [...await this.getProjects() ?? [], ]
        console.log( this.projects );
        console.log( this.categories );
        // this.projects = [...this.projects, ...this.categories];
    }

    async getProjects(): Promise<Project[] | null> {
        let { data: t_proyecto, error } = await this.supabase.from( 'v_obtenerproyectos' )
            .select( '*' );
        return t_proyecto ?? [];
    }

    async getCategorias(): Promise<{ nombre: string; }[]> {
        let { data: t_categoria, error } = await this.supabase
            .from( 't_categoria' )
            .select( '*' );
        console.log( t_categoria );
        return t_categoria ?? [];
    }

    // seleccionarCategoria( categoria: any ) {
    //     this.formGrupo.get( 'categoria' )?.setValue( categoria.nombre );

    //     this.categorias.update( ( list ) =>
    //         list.map( ( c: any ) => ( { ...c, seleccionado: c.id === categoria.id } ) )
    //     );

    //     console.log( this.categorias() );
    // }


    openModalDetalle( project : any ) {
        this.dialog.open( ModalProjectAdminComponent, {
            width: '650px',
            height: '80%',
            //   data: project,
            // data: {
            //     project,
            //     categories: this.categories
            // }
            data: { project }

        } );
    }

}
