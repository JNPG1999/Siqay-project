import { inject, Injectable } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class LandingLoyoutService {
  _SupabaseService = inject(SupabaseService).supabaseClient;

  async ObtenerProyectos() {
    let { data: any, error } = await this._SupabaseService
      .from('t_proyectos')
      .select('*');
    return { data: any, error };
  }

  
}
