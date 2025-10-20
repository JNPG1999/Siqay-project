import { inject, Injectable } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';
import {
  BandejaEntradaPayload,
  BandejaItem,
} from '../../modals/bandeja-entrada';

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

  async ObtenerBandejaEntrada(): Promise<{
    data: BandejaItem[] | null;
    error: Error | null;
  }> {
    let { data, error } = await this._SupabaseService
      .from('v_obtenerbandejaentrada')
      .select('*');
    console.log(data);
    return { data, error };
  }
  //: Promise<{ data: BandejaItem[] | null; error: Error | null }>

  //Cuando se le hace un select solo devuelve valor de la tabla afectada en este caso t_bandejaentrada
  async ActualizarEstadoLeido(
    id: number,
    leido: boolean
  ): Promise<{ data: Partial<BandejaItem>[] | null; error: Error | null }> {
    const { data, error } = await this._SupabaseService
      .from('t_bandejaentrada')
      .update({ leido: leido })
      .eq('id', id);
    //.select('id, leido');
    //.select('id, asunto, leido, nombre, email, categoria, mensaje, fechacreacion');

    //console.log(data);

    return { data, error };
  }

  async EliminarEmail(id: number) {
    const { data, error } = await this._SupabaseService
      .from('t_bandejaentrada')
      .update({ estado: false })
      .eq('id', id);
    return { data, error };
  }
}
