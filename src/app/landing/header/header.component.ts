import { Component, Output, output } from '@angular/core';
import { listaHeader } from '../../modals/listaHeader';
import { EventEmitter } from 'stream';

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
    {id:5,nombre:'Contactos'}
  ]

  ObtenerHeaderId(id:number):listaHeader{
    return this.listaHeader.find((lista) => lista.id === id)!;
  }

  seccionHeader = output<listaHeader>();

  EnviarSeccion(header:listaHeader){
      console.log('Se hizo click en id', header)

      this.seccionHeader.emit(header)
  }

}
