import { inject, Injectable } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';
import { BandejaEntradaPayload } from '../../modals/bandeja-entrada';

@Injectable({
  providedIn: 'root',
})
export class BandejaEntradaService {
  _SupabaseService = inject(SupabaseService).supabaseClient;

  constructor() {}

  async InsertarEmail(email: BandejaEntradaPayload) {
    let { error } = await this._SupabaseService
      .from('t_bandejaentrada')
      .insert([email]);

    if (error) throw error;
  }

  async ObtenerBandejaEntrada() {
    let { data, error } = await this._SupabaseService
      .from('v_obtenerbandejaentrada')
      .select('*');

    return { data, error };
  }
}
