import { Component } from '@angular/core';
import { listaHeader } from '../../modals/listaHeader';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  listaHeader: listaHeader[] = [
    {id:1,nombre:'Inicio'},
    {id:2,nombre:'Proyectos'},
    {id:3,nombre:'Nosotros'},
    {id:4,nombre:'Servicios'},
    {id:5,nombre:'Contacto'},
  ]

}
