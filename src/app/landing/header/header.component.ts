import { Component, Output, output } from '@angular/core';
import { listaHeader } from '../../modals/listaHeader';
import { EventEmitter } from 'stream';


//! IMPORTACIONES DE ANGULAR MATERIAL

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component( {
    selector: 'app-header',
    standalone: true,
    imports: [ 
        MatIconModule,
        MatButtonModule,
        MatToolbarModule ,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
} )
export class HeaderComponent {


    openMenuToggle = false;
    listaHeader: listaHeader[] = [
        { id: 1, nombre: 'Inicio' },
        { id: 2, nombre: 'Proyectos' },
        { id: 3, nombre: 'Nosotros' },
        { id: 4, nombre: 'Servicios' },
        { id: 5, nombre: 'Contactos' }
    ];

    ObtenerHeaderId( id: number ): listaHeader {
        return this.listaHeader.find( ( lista ) => lista.id === id )!;
    }

    seccionHeader = output<listaHeader>();

    EnviarSeccion( header: listaHeader ) {
        console.log( 'Se hizo click en id', header );

        this.seccionHeader.emit( header );
        this.openMenuToggle = false;
    }

    openMenu() {
        this.openMenuToggle = !this.openMenuToggle;
    }

}
