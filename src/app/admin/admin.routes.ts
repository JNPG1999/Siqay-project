import { Routes } from "@angular/router";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";


export const ADMIN_ROUTES: Routes = [
    {
        path:'',
        loadComponent: () => import('./admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
        children: [
            {path:'',redirectTo:'proyectos', pathMatch: 'full'},
            {
                path: 'proyectos',
                loadComponent: () => import('./admin-layout/proyectos/proyectos.component').then(m => m.ProyectosComponent)
            },
            {
                path: 'bandeja-entrada',
                loadComponent: () => import('./admin-layout/bandeja-entrada/bandeja-entrada.component').then(m => m.BandejaEntradaComponent)
            }
        ]
    }
]