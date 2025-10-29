import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SupabaseService } from '../../../services/supabase/supabase.service';
import { Project } from '../../interface/project.interface';
import { ModalProjectAdminComponent } from '../components/modal-project-admin/modal-project-admin.component';
import { ProyectoService } from '../../../services/proyectos/proyecto.service';
import { ModalEliminarComponent } from '../../../components/modal-eliminar/modal-eliminar.component';
import { PaginationComponent } from "../../../components/pagination/pagination.component";
import { PaginationService } from '../../../services/pagination/pagination.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';


@Component( {
    selector: 'app-proyectos',
    standalone: true,
    imports: [ MatTableModule, PaginationComponent, MatTooltipModule, CommonModule ],
    templateUrl: './proyectos.component.html',
    styleUrl: './proyectos.component.scss'
} )
export class ProyectosComponent {


    // private supabase = inject( SupabaseService ).supabaseClient;
    // form: FormBuilder = inject( FormBuilder );
    private projectService = inject( ProyectoService );
    private paginationService = inject(PaginationService);

    categories: { nombre: string; }[] = [];
    displayedColumns: string[] = [ 'imagenprincipal', 'titulo', 'categoria', 'fecha', 'ubicacion', 'acciones' ];
    // dataSource = this.projects;

    dialog = inject( MatDialog );

    projectsActivos = computed( () => this.projects().filter( ( p: any ) => p.estado ) );


    // dataSource
    dataSource = new MatTableDataSource<Project>( [] );
    // pagination = {};
    currentPage = signal(1);

    constructor() {
        effect( () => {
            this.dataSource.data = this.projectsActivos();
        } );
    }


    projects = this.projectService.projectSignal;
    async ngOnInit() {

        this.projectService.getProjects();
        // this.pagination = await this.projectService.paginationProyecto();

        // console.log( this.projects );
        console.log(this.projects())
        console.log( this.categories );
        console.log( 'projectos activos', this.projectsActivos() );
        setTimeout( () => {
            console.log( 'projectos activos leng', this.projectsActivos().length );
            console.log( 'paginacion', this.projects() );
        }, 2000 );

    }


    async DeleteProyecto( id: number ) {
        try {
            const { data, error } = await this.projectService.DeleteProyecto(
                id
            );

            await this.projectService.getProjects();

            if ( error ) throw error;
        } catch ( error ) {
            console.error( error );
        }
    }

    modalDelete( id: number ) {
        const dialogRef = this.dialog.open( ModalEliminarComponent, {
            width: '250px',
        } );

        dialogRef.afterClosed().subscribe( ( result ) => {
            if ( result === true ) {
                this.DeleteProyecto( id );
            }
        } );
    }

    async onPageChange( page: number ) {
        this.currentPage.set(page);
        console.log('Pagina actual en padre:', page);
        const limit = 9;
        const from = ( page - 1 ) * limit;
        const to = from + limit - 1;

        const { data, error } = await this.paginationService.paginationDinamicoByState( from, to );

        if ( !error && data ) {
            this.dataSource.data = data;
        }
    }

    async visible(id: number) {
        try {
            const { data, error } = await this.projectService.updateProyectoVisible(id);
            console.log('cambio visible')
            console.log(this.projects())
            if ( error ) throw error;
        } catch (error) {
            console.log(error);
        }
    }

    async buscarProyecto(event: Event) {
        try {
            await this.projectService.buscarProyecto(event);
        } catch (error) {
            console.log(error);
        }
    }


    openModalDetalle( tipo: string, project?: any ) {
        this.dialog.open( ModalProjectAdminComponent, {
            width: '650px',
            maxHeight: '80vh',
            autoFocus: false,
            // data: { project }
            panelClass: 'modal-redondeado',
            data: tipo === 'editar' ? { project } : null

        } );
    }

}
