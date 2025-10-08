import { Component, input } from '@angular/core';

@Component( {
    selector: 'app-title-reusable',
    standalone: true,
    imports: [],
    templateUrl: './title-reusable.component.html',
    styleUrl: './title-reusable.component.scss',
} )
export class TitleReusableComponent {
    title = input('Titulo Reutilizable');
    description = input('Exploramos la intersección entre funcionalidad, estética y sostenibilidad para crear espacios que transforman la experiencia humana.')
}
