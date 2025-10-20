import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase/supabase.service';
import { inject } from '@angular/core';
import { SessionStorageService } from '../services/session-storage/session-storage.service';

export const landingGuard: CanMatchFn  = async (route, state) => {
  const _supabaseService = inject(SupabaseService);
  const _SessionStorageService = inject(SessionStorageService);
  const _router = inject(Router);

  // if (
  //   _SessionStorageService.validateTokken()
  // ) {
  //   _router.navigateByUrl('/dashboard');
  //   return false;
  // }

    const { data } = await _supabaseService.supabaseClient.auth.getSession();
  return data.session ? _router.parseUrl('/dashboard') : true;

  //return true;
};
