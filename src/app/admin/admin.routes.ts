import { Routes } from "@angular/router";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";


export const ADMIN_ROUTES: Routes = [
    {
        path:'',
        loadComponent: () => import('./admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent)
    }
]