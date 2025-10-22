import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SupabaseService } from '../../../services/supabase/supabase.service';
import { Project } from '../../interface/project.interface';
import { ModalProjectAdminComponent } from '../components/modal-project-admin/modal-project-admin.component';
import { ProyectoService } from '../../../services/proyectos/proyecto.service';
import { ModalEliminarComponent } from '../../../components/modal-eliminar/modal-eliminar.component';


@Component( {
    selector: 'app-proyectos',
    standalone: true,
    imports: [ MatTableModule ],
    templateUrl: './proyectos.component.html',
    styleUrl: './proyectos.component.scss'
} )
export class ProyectosComponent {


    // private supabase = inject( SupabaseService ).supabaseClient;
    // form: FormBuilder = inject( FormBuilder );
    private projectService = inject( ProyectoService );
    
    categories: { nombre: string; }[] = [];
    displayedColumns: string[] = [ 'imagenprincipal', 'titulo', 'categoria', 'fecha', 'ubicacion', 'acciones' ];
    // dataSource = this.projects;

    dialog = inject( MatDialog );

    projectsActivos = computed(() => this.projects().filter(( p : any ) => p.estado));

    // dataSource
    dataSource = new MatTableDataSource<Project>([]);

    constructor() {
        effect( () => {
            this.dataSource.data = this.projectsActivos();
        })
    }

    
    projects = this.projectService.projectSignal;
    async ngOnInit() {

        this.projectService.getProjects();
        
        console.log( this.projects );
        
        console.log( this.categories );
      
    }


    async DeleteProyecto(id: number) {
        try {
          const { data, error } = await this.projectService.DeleteProyecto(
            id
          );
    
          await this.projectService.getProjects();
    
          if (error) throw error;
        } catch (error) {
          console.error(error);
        }
      }
    
      modalDelete(id: number) {
        const dialogRef = this.dialog.open(ModalEliminarComponent, {
          width: '250px',
        });
    
        dialogRef.afterClosed().subscribe((result) => {
          if (result === true) {
            this.DeleteProyecto(id);
          }
        });
      }
    

    openModalDetalle( tipo: string, project? : any ) {
        this.dialog.open( ModalProjectAdminComponent, {
            width: '650px',
            height: '80%',
            autoFocus: false,
            // data: { project }
            panelClass: 'modal-redondeado',
            data: tipo === 'editar' ? {project} : null 

        } );
    }

}
