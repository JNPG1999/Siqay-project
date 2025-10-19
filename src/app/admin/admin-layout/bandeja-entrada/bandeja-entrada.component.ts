import { Component, inject, signal } from '@angular/core';
import { HelperService } from '../../../services/helper/helper.service';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { ModalCorreoComponent } from '../../../components/modal-correo/modal-correo.component';
import { BandejaEntradaService } from '../../../services/bandeja-entrada/bandeja-entrada.service';

type Filtro = 'todos' | 'no-leidos' | 'leidos';

//type Estado = 'leido' | 'no-leido';
//type Categoria = 'Residencial' | 'Comercial' | 'Cultural' | 'Hospitalidad';
interface BandejaItem {
  id: number;
  asunto: string; // texto del asunto
  leido: boolean;
  nombre: string;
  email: string;
  categoria: string; // pill a la izquierda del asunto
  mensaje?: string; // contenido del mensaje
  fecha: string; // ISO o 'DD/MM/YYYY' según tu UI
}

@Component({
  selector: 'app-bandeja-entrada',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatTooltipModule],
  templateUrl: './bandeja-entrada.component.html',
  styleUrl: './bandeja-entrada.component.scss',
})
export class BandejaEntradaComponent {
  _HelperService = inject(HelperService);
  dialog = inject(MatDialog);
  _BandejaEntradaService = inject(BandejaEntradaService);

  filtro = signal<Filtro>('todos');
  displayedColumns: string[] = [
    'leido',
    'nombre',
    'email',
    'asunto',
    'fechacreacion',
    'acciones',
  ];

  // mock-datos.ts

  data = signal<BandejaItem[]>([]);

  dataSource = new MatTableDataSource(this.data());

  totalCorreos = () => this.data().length;
  correosNoLeidos = () =>
    this.data().filter((correo) => !correo.leido).length

  ngOnInit(): void {
    this._HelperService.EnviarItemMenu('bandeja-entrada');
    this.ObtenerBandejaEntrada();
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

  filtrarPorTipo(evento: Event) {
    const filterValue = (evento.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    //this.dataSource.paginator?.firstPage();
  }

  verMensaje(data: BandejaItem) {
    this.dialog.open(ModalCorreoComponent, {
      data: { correo: data },
      width: '670px',
    });
  }

  async ObtenerBandejaEntrada() {
    try {
      const { data, error } =
        await this._BandejaEntradaService.ObtenerBandejaEntrada();
      this.data.set(data as BandejaItem[]);
      this.seleccionar('todos');
      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  }
}
