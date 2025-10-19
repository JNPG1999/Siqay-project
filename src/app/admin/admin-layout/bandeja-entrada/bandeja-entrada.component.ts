import { Component, effect, inject, signal } from '@angular/core';
import { HelperService } from '../../../services/helper/helper.service';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { ModalCorreoComponent } from '../../../components/modal-correo/modal-correo.component';
import { BandejaEntradaService } from '../../../services/bandeja-entrada/bandeja-entrada.service';
import { BandejaItem } from '../../../modals/bandeja-entrada';

type Filtro = 'todos' | 'no-leidos' | 'leidos';

//type Estado = 'leido' | 'no-leido';
//type Categoria = 'Residencial' | 'Comercial' | 'Cultural' | 'Hospitalidad';

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

  dataSource = new MatTableDataSource<BandejaItem>([]);

  constructor(){
    effect(() => {
      this.dataSource.data = this.data();
    })
  }

  totalCorreos = () => this.data().length;
  correosNoLeidos = () => this.data().filter((correo) => !correo.leido).length;

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

  async ObtenerBandejaEntrada(){
    try {
      const { data, error } =
        await this._BandejaEntradaService.ObtenerBandejaEntrada();
      this.data.set(data as BandejaItem[]);
      console.log(data);
      this.seleccionar('todos');
      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  }

  async ActualizarEstadoLeido(id: number, leido: boolean) {
    try {
      const { data, error } =
        await this._BandejaEntradaService.ActualizarEstadoLeido(id, leido);

      console.log({ data, error });

      let rowAfectada = data?.[0];

      console.log(rowAfectada);

      //Solo actualizamos una fila
      this.data.update((email: BandejaItem[]) =>
        email.map((it) => (it.id === rowAfectada?.id ? { ...it, leido: rowAfectada.leido! } : it))
      );
      
      //Actualizamos toda la data
      //await this.ObtenerBandejaEntrada();

      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  }
}
