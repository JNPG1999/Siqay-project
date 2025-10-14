import { Component, inject, signal } from '@angular/core';
import { HelperService } from '../../../services/helper/helper.service';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';

type Filtro = 'todos' | 'no-leidos' | 'leidos';

type Estado = 'leido' | 'no-leido';
type Categoria = 'Residencial' | 'Comercial' | 'Cultural' | 'Hospitalidad';
interface BandejaItem {
  id: number;
  //estado: Estado; // 'leido' | 'no-leido'
  leido:boolean;
  nombre: string;
  email: string;
  categoria: Categoria; // pill a la izquierda del asunto
  asunto: string; // texto del asunto
  fecha: string; // ISO o 'DD/MM/YYYY' según tu UI
}

@Component({
  selector: 'app-bandeja-entrada',
  standalone: true,
  imports: [CommonModule, MatTableModule,MatTooltipModule],
  templateUrl: './bandeja-entrada.component.html',
  styleUrl: './bandeja-entrada.component.scss',
})
export class BandejaEntradaComponent {
  _HelperService = inject(HelperService);

  filtro = signal<Filtro>('todos');
  displayedColumns: string[] = [
    'leido',
    'nombre',
    'email',
    'asunto',
    'fecha',
    'acciones',
  ];
  // Opcional: helper para tu pill (Tailwind/Angular)
  categoriaBadgeClass: Record<Categoria, string> = {
    Residencial: 'bg-gray-200 text-gray-700',
    Comercial: 'bg-gray-200 text-gray-700',
    Cultural: 'bg-gray-200 text-gray-700',
    Hospitalidad: 'bg-gray-200 text-gray-700',
  };

  // mock-datos.ts

  data = signal<BandejaItem[]>([
    {
      id: 1,
      leido: false,
      nombre: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@example.com',
      categoria: 'Residencial',
      asunto: 'Consulta sobre reforma de vivienda',
      fecha: '2023-11-15',
    },
    {
      id: 2,
      leido: true,
      nombre: 'Elena Martínez',
      email: 'elena.martinez@example.com',
      categoria: 'Comercial',
      asunto: 'Proyecto para nuevo restaurante',
      fecha: '2023-11-12',
    },
    {
      id: 3,
      leido: false,
      nombre: 'Miguel Sánchez',
      email: 'miguel.sanchez@example.com',
      categoria: 'Cultural',
      asunto: 'Colaboración para centro cultural',
      fecha: '2023-11-10',
    },
    {
      id: 4,
      leido: true,
      nombre: 'Laura Gómez',
      email: 'laura.gomez@example.com',
      categoria: 'Residencial',
      asunto: 'Diseño de casa sostenible',
      fecha: '2023-11-08',
    },
    {
      id: 5,
      leido: false,
      nombre: 'Javier López',
      email: 'javier.lopez@example.com',
      categoria: 'Hospitalidad',
      asunto: 'Renovación hotel rural',
      fecha: '2023-11-05',
    },
  ]);
  dataSource = new MatTableDataSource(this.data());

  ngOnInit(): void {
    this._HelperService.EnviarItemMenu('bandeja-entrada');
  }

  seleccionar(f: Filtro) {
    this.filtro.set(f);
    // TODO: llama al servicio o emite evento: this.buscar(f);

    const todos = this.data();

    this.dataSource.data = todos.filter((item) => {

      if (f === 'todos') return true;
      if (f === 'leidos') return item.leido;
      if (f === 'no-leidos') return !item.leido;
      return true;
    });

    //this.dataSource.paginator?.firstPage();

  }

  filtrarPorTipo(evento: Event){
    const filterValue = (evento.target as HTMLInputElement).value;
    this.dataSource.filter= filterValue.trim().toLowerCase();
    //this.dataSource.paginator?.firstPage();
  }

}
