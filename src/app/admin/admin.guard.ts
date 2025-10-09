import { CanActivateFn } from "@angular/router";
import { SupabaseService } from "../services/supabase/supabase.service";
import { inject } from "@angular/core";
import { Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {

    const _supabaseService = inject(SupabaseService);
    const _router = inject(Router);

    if (!_supabaseService.getTokenSupabase() && !_supabaseService.getIsAuthenticated()) {
        _router.navigateByUrl('/login-admin');
        return false;
    }

    return true;
};
