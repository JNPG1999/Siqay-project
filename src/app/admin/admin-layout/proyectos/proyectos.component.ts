import { Component, effect, inject, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SupabaseService } from '../../../services/supabase/supabase.service';
import { Project } from '../../interface/project.interface';
import { ModalProjectAdminComponent } from '../components/modal-project-admin/modal-project-admin.component';
import { ProyectoService } from '../../../services/proyectos/proyecto.service';


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

    
    projects = this.projectService.projectSignal;
    async ngOnInit() {

        this.projectService.getProjects();
        
        console.log( this.projects );
        
        console.log( this.categories );
      
    }

    openModalDetalle( project : any ) {
        this.dialog.open( ModalProjectAdminComponent, {
            width: '650px',
            height: '80%',
            data: { project }

        } );
    }

}
