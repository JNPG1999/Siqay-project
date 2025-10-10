import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase/supabase.service';
import { inject } from '@angular/core';
import { SessionStorageService } from '../services/session-storage/session-storage.service';

export const landingGuard: CanActivateFn = (route, state) => {
  const _supabaseService = inject(SupabaseService);
  const _SessionStorageService = inject(SessionStorageService);
  const _router = inject(Router);

  if (
    _SessionStorageService.validateTokken()
  ) {
    _router.navigateByUrl('/dashboard');
    return false;
  }

  return true;
};
