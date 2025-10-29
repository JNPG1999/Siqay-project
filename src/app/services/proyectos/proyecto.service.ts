import { inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';
import { Project, Projects } from '../../admin/interface/project.interface';

@Injectable( { providedIn: 'root' } )
export class ProyectoService {
    private supabase = inject( SupabaseService ).supabaseClient;
    projectSignal: any = signal( [] );
    projectSingalPagination: any = signal( [] );
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

        this.projectSignal.update( ( prev: any ) => prev.map( ( p: any ) => ( p.id === t_proyecto.id ? t_proyecto : p ) ) );
        await this.getProjects();


        return t_proyecto;
    }

    async updateProyectoVisible( id: number ) {

        const { data: proyecto, error: getError } = await this.supabase
            .from( 't_proyecto' )
            .select( 'id, estado, visible' )
            .eq( 'id', id )
            .single();

        if ( getError ) throw new Error( 'Error al obtener el proyecto' );


        if ( !proyecto.estado ) {
            throw new Error( 'No se puede cambiar la visibilidad de un proyecto inactivo' );
        }

        //! OBTENEMOS EL ESTADO DE VISIBLE
        const nuevoVisible = !proyecto.visible;

        const { data: t_proyecto, error: updateError } = await this.supabase
            .from( 't_proyecto' )
            .update( { visible: nuevoVisible } )
            .eq( 'id', id )
            .select()
            .single();

        if ( updateError ) throw new Error( 'Error al cambiar el estado de visible' );

        this.projectSignal.update( ( prev: any ) =>
            prev.map( ( p: any ) => ( p.id === id ? { ...p, visible: nuevoVisible } : p ) )
        );

        return t_proyecto;
    }


    async buscarProyecto( event: Event ) {
        const searchTerm = ( event.target as HTMLInputElement ).value.trim();

        if ( !searchTerm ) {
            await this.getProjects();
            return;
        }

        const term = `%${ searchTerm }%`;
        const isYear = /^\d{4}$/.test( searchTerm );
        const isFullDate = /^\d{4}-\d{2}-\d{2}$/.test( searchTerm );

        let query = this.supabase
            .from( 'v_obtenerproyectos' )
            .select( '*' )
            .eq( 'estado', true );
        // .eq( 'visible', true );

        if ( isYear ) {
            //! Búsqueda por año: rango [YYYY-01-01, YYYY+1-01-01)
            const year = Number( searchTerm );
            const start = `${ year }-01-01`;
            const nextYear = year + 1;
            const end = `${ nextYear }-01-01`;

            query = query.gte( 'fecha', start ).lt( 'fecha', end );
        } else if ( isFullDate ) {
            //! Buscar por fecha exacta (YYYY-MM-DD)
            query = query.eq( 'fecha', searchTerm );
        } else {
            //! Búsqueda por texto en título, categoría o ubicación
            query = query.or( `titulo.ilike.${ term },categoria.ilike.${ term },ubicacion.ilike.${ term }` );
        }

        const { data, error } = await query;

        if ( error ) {
            console.error( '❌ Error al buscar proyectos:', error.message );
            return;
        }

        this.projectSignal.set( data ?? [] );
    }







    async DeleteProyecto( id: number ) {
        const { data, error } = await this.supabase
            .from( 't_proyecto' )
            .update( { estado: false } )
            .eq( 'id', id );
        return { data, error };
    }
}