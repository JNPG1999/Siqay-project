import { Component, input } from '@angular/core';

export interface DataCardTestimonios {
    id: number;
    imgTestimonioTemplate: string;
    description: string;
    imgPersona: string;
    nombrePersona: string;
    Ocupacion: string;
}


@Component({
  selector: 'card-testimonios',
  standalone: true,
  imports: [],
  templateUrl: './card-testimonios.component.html',
  styleUrl: './card-testimonios.component.scss',
})


export class CardTestimoniosComponent { 
    data = input.required<DataCardTestimonios[]>();
}
