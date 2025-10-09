import { CanActivateFn, Router } from "@angular/router";
import { SupabaseService } from "../services/supabase/supabase.service";
import { inject } from "@angular/core";


export const landingGuard: CanActivateFn = (route, state) => {
    
    const _supabaseService = inject(SupabaseService);
    const _router = inject(Router);

    if (_supabaseService.getTokenSupabase() && _supabaseService.getIsAuthenticated()) {
        _router.navigateByUrl('/dashboard');
        return false;
    }

    return true;
};
