import { inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';
import { Project } from '../../admin/interface/project.interface';

@Injectable( { providedIn: 'root' } )
export class ProyectoService {
    private supabase = inject( SupabaseService ).supabaseClient;
    projectSignal: any = signal( [] );



    //! AGREGADO 20/10/2025
    async getProjects(): Promise<Project[] | null> {
        let { data: t_proyecto, error } = await this.supabase.from( 'v_obtenerproyectos' )
            .select( '*' );

        this.projectSignal.set( t_proyecto );
        return t_proyecto ?? [];
    }

    async getCategorias(): Promise<{ nombre: string; }[]> {
        let { data: t_categoria, error } = await this.supabase
            .from( 't_categoria' )
            .select( '*' );
        console.log( t_categoria );
        return t_categoria ?? [];
    }

    //! METODO PARA ACTUALIZAR
    async updateProyecto( id: number, data: any ) {
        const { data: t_proyecto, error: error } = await this.supabase
            .from( 't_proyecto' ).update( data ).eq( 'id', id ).select().single();

        if ( error ) throw new Error( 'Este es un error al actualizar los proyectos' );

        // this.projectSignal.update( ( prev: any ) => prev.map( ( p: any ) => ( p.id === t_proyecto.id ? t_proyecto : p ) ));
        await this.getProjects();


        return t_proyecto;
    }
}