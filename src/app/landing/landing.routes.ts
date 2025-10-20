import { Routes } from '@angular/router';
import { landingGuard } from './landing.guard';

export const LANDING_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./landing-loyout/landing-loyout.component').then(
        (m) => m.LandingLoyoutComponent
      ),
  },
  {
    path: 'login-admin',
    canMatch: [landingGuard],
    loadComponent: () =>
      import('./login-admin/login-admin.component').then(
        (m) => m.LoginAdminComponent
      ),
  },
];
