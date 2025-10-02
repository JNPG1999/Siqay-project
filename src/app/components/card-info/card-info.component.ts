import { Component, input } from '@angular/core';


export interface DataCardComponent {
    id: number;
    numberAndIcon: string | number;
    title: string;
    textDefinition: string;
}

@Component({
  selector: 'app-card-info',
  standalone: true,
  imports: [],
  templateUrl: './card-info.component.html',
  styleUrl: './card-info.component.scss',
})

export class CardInfoComponent { 
    // numberAndIcon = input.required<string|number>();
    // title = input.required<string>();
    // textDefinition = input.required<string>();
    data = input.required<DataCardComponent[]>();

    isString(value : string | number ): value is string {
        return typeof value === 'string';
    }
}
