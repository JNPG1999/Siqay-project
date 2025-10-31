import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { HelperService } from '../../services/helper/helper.service';
import { FooterAdminComponent } from '../../components/footer-admin/footer-admin.component';
import { SupabaseService } from '../../services/supabase/supabase.service';

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
    FooterAdminComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
})
export class AdminLayoutComponent {
  _HelperService = inject(HelperService);
  _SupabaseService = inject(SupabaseService);
  //ItemActualSeleccionado = signal<string>('');
  collapse = signal<boolean>(false);



  //isReady = signal<boolean>(false);
  get isReady() {
    return this._SupabaseService.isReady();
  }

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

  // get isReady() {
  //   console.log(this._SupabaseService.isReady());
  //   return this._SupabaseService.isReady();
  // }

  ngOnInit() {
    //console.log('Ready: ', this.isReady());
    // this.isReady.set(this._SupabaseService.isReady());
    // console.log('Ready: ', this.isReady());
    //this.recuperarIsReady();
  }

  //collapsePanel = computed(() => this.collapse.set(!this.collapse()));

  collapsePanel() {
    this.collapse.update((v) => !v);
  }

  // recuperarIsReady() {

  //   this._SupabaseService.isReady.subscribe((value) => {
  //     this.isReady.set(value);
  //   });

  // }

}
