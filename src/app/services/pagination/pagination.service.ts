import { inject, Injectable } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable( { providedIn: 'root' } )
export class PaginationService {

    private supabase = inject( SupabaseService ).supabaseClient;

    async paginationDinamicoAllData( from: number, to: number, tabla = 'v_obtenerproyectos' ) {
        return await this.supabase
            .from( tabla )
            .select( '*' )
            .range( from, to );
    }
    async paginationDinamicoByState( from: number, to: number, tabla = 'v_obtenerproyectos' ) {
        // const from = ( page - 1 ) * limit;
        // const to = from + limit - 1;
        // let { data: t_proyecto, error } = await this.supabase
        //     .from( 't_proyecto' )
        //     .select( '*' )
        //     .range( from, to );
        // return { t_proyecto }

        return await this.supabase.from( tabla ).select( '*' )
            .range( from, to ).eq('estado', true);
    }
}