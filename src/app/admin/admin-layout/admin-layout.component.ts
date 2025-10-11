import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [MatSidenavModule, CommonModule, RouterLink, RouterOutlet],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {

  navegationItems:any = [
    {nombre:'Proyectos', ruta:'proyectos', imagen:''},
    {nombre:'Bandeja de entrada', ruta:'bandeja-entrada', imagen:''}
  ]

  irARuta(ruta: string) {

  }

}
