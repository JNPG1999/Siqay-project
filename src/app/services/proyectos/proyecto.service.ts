import { inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';
import { Project, Projects } from '../../admin/interface/project.interface';

@Injectable( { providedIn: 'root' } )
export class ProyectoService {
    private supabase = inject( SupabaseService ).supabaseClient;
    projectSignal: any = signal( [] );
    projectSingalPagination : any = signal([]);
    categoriaSignal: any = signal( [] );




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
        this.categoriaSignal.set( t_categoria );
        return t_categoria ?? [];
    }

    async createProyecto( data: any ): Promise<Projects> {
        // async createProyecto( data: Partial<Projects> | null ) : Promise<Projects> {
        const usuario = 'develop_hunk';
        const { data: t_proyecto, error } = await this.supabase
            .from( 't_proyecto' )
            .insert( [
                {
                    ...data,
                    estado: true,
                    usuariocreacion: usuario,
                    usuariomodificacion: usuario,
                } as Projects
            ] )
            .select().single();

        if ( error ) {
            console.error( '❌ Error al crear proyecto:', error.message );
            throw error; // lanza el error real de Supabase
        }
        await this.getProjects();

        return t_proyecto;
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

    async DeleteProyecto( id: number ) {
        const { data, error } = await this.supabase
            .from( 't_proyecto' )
            .update( { estado: false } )
            .eq( 'id', id );
        return { data, error };
    }

    // async paginationProyecto(page: number, limit = 8) {
    //     const from = ( page - 1 ) * limit;
    //     const to = from + limit - 1;
    //     let { data: t_proyecto, error } = await this.supabase
    //         .from( 't_proyecto' )
    //         .select( '*' )
    //         .range( from, to );
    //     if ( this.projectSingalPagination() ) {
    //         this.projectSingalPagination.update( (p : any) => p = t_proyecto )
    //     } 
    //     this.projectSingalPagination.set(t_proyecto);

    //     return { t_proyecto }
    // }
}