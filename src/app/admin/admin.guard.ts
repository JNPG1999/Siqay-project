import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SupabaseService } from '../services/supabase/supabase.service';

export const adminGuard: CanActivateFn = async () => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);
  
  if (!supabase['isBrowser']) return true;

  // ⏳ Espera hasta que la sesión esté completamente cargada
  await supabase.readyPromise;

  const isAuthenticated = supabase.isAuthenticated();

  if (!isAuthenticated) {
    router.navigateByUrl('/login-admin');
    return false;
  }

  return true;
};
