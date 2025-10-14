import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { HelperService } from '../../services/helper/helper.service';
import { FooterAdminComponent } from "../../components/footer-admin/footer-admin.component";

interface NavegationItem {
  nombre: string;
  ruta: string;
  imagen: string;
  status: boolean;
}

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    MatSidenavModule,
    CommonModule,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    FooterAdminComponent
],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
})
export class AdminLayoutComponent {
  _HelperService = inject(HelperService);
  //ItemActualSeleccionado = signal<string>('');
  collapse = signal<boolean>(false);

  navegationItems = signal<NavegationItem[]>([
    {
      nombre: 'Proyectos',
      ruta: 'proyectos',
      imagen: 'proyectos.svg',
      status: false,
    },
    {
      nombre: 'Bandeja de entrada',
      ruta: 'bandeja-entrada',
      imagen: 'bandeja-entrada.svg',
      status: false,
    },
  ]);

  ngOnInit() {
  }

  //collapsePanel = computed(() => this.collapse.set(!this.collapse()));

  collapsePanel(){
    this.collapse.update(v => !v);
  }

}
