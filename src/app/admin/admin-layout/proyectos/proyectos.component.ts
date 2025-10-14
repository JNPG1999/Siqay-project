import { Component, inject } from '@angular/core';
import { HelperService } from '../../../services/helper/helper.service';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.scss'
})
export class ProyectosComponent {

  _HelperService = inject(HelperService);


  ngOnInit(): void {

    this._HelperService.EnviarItemMenu('proyectos');

  }

}
