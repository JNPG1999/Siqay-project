import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CarouselProyectosComponent } from '../../components/carousel-proyectos/carousel-proyectos.component';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import {
  habilidadesNosotros,
  proyectosCarousel,
} from '../../modals/listaHeader';
import { MatDialog } from '@angular/material/dialog';
import { ModalProyectoComponent } from '../../components/modal-proyecto/modal-proyecto.component';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-landing-loyout',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    CarouselProyectosComponent,
    CarouselModule,
    DatePipe,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './landing-loyout.component.html',
  styleUrl: './landing-loyout.component.scss',
})
export class LandingLoyoutComponent implements OnInit {
  dialog = inject(MatDialog);

  categoriasProyecto = computed(() => {
    const categorias = this.data.map((proyecto) => proyecto.categoria);
    return categorias;
  });

  form: FormBuilder = inject(FormBuilder);

  categorias = signal<any>([
    { id: 1, nombre: 'Residencial', seleccionado: false },
    { id: 2, nombre: 'Comercial', seleccionado: false },
    { id: 3, nombre: 'Cultural', seleccionado: false },
    { id: 4, nombre: 'Público', seleccionado: false },
    { id: 5, nombre: 'Hospitalidad', seleccionado: false },
  ]);

  formGrupo = this.form.group({
    nombre: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    telefono: [''],
    categoria: [''],
    mensaje: ['',[ Validators.required]],
  });

  openCategorias = signal<boolean>(false);

  data: proyectosCarousel[] = [
    {
      id: '1',
      titulo: 'Casa Horizonte',
      categoria: 'Residencial',
      fecha: '2023-01-01',
      descripcion: 'Descripción del proyecto 1',
      imagen: 'https://img.heroui.chat/image/places?w=1200&h=800&u=arch1',
    },
    {
      id: '2',
      titulo: 'Edificio Nexus',
      categoria: 'Comercial',
      fecha: '2022-01-01',
      descripcion: 'Descripción del proyecto 2',
      imagen: 'https://img.heroui.chat/image/places?w=1200&h=800&u=arch2',
    },
    {
      id: '3',
      titulo: 'Museo de Arte Contemporáneo',
      categoria: 'Cultural',
      fecha: '2021-01-01',
      descripcion: 'Descripción del proyecto 3',
      imagen: 'https://img.heroui.chat/image/places?w=1200&h=800&u=arch3',
    },
    {
      id: '4',
      titulo: 'Residencia Bosque',
      categoria: 'Residencial',
      fecha: '2023-01-01',
      descripcion: 'Descripción del proyecto 4',
      imagen: 'https://img.heroui.chat/image/places?w=1200&h=800&u=arch4',
    },
    {
      id: '5',
      titulo: 'Centro Comunitario Urbano',
      categoria: 'Público',
      fecha: '2022-01-01',
      descripcion: 'Descripción del proyecto 5',
      imagen: 'https://img.heroui.chat/image/places?w=1200&h=800&u=arch5',
    },
    {
      id: '6',
      titulo: 'Hotel Boutique Alma',
      categoria: 'Hospitalidad',
      fecha: '2021-01-01',
      descripcion: 'Descripción del proyecto 6',
      imagen: 'https://img.heroui.chat/image/places?w=1200&h=800&u=arch6',
    },
  ];

  dataNosotros: habilidadesNosotros[] = [
    {
      id: 1,
      imagen: 'assets/iconos/innovacion.svg',
      habilidad: 'Innovación',
      descripcion:
        'Exploramos constantemente nuevas ideas y tecnologías para crear soluciones arquitectónicas únicas.',
    },
    {
      id: 2,
      imagen: 'assets/iconos/sostenibilidad.svg',
      habilidad: 'Sostenibilidad',
      descripcion:
        'Diseñamos con conciencia ambiental, minimizando el impacto ecológico y maximizando la eficiencia energética.',
    },
    {
      id: 3,
      imagen: 'assets/iconos/colaboracion.svg',
      habilidad: 'Colaboración',
      descripcion:
        'Trabajamos estrechamente con nuestros clientes para entender sus necesidades y convertir sus visiones en realidad.',
    },
    {
      id: 4,
      imagen: 'assets/iconos/excelencia.svg',
      habilidad: 'Excelencia',
      descripcion:
        'Nos comprometemos con los más altos estándares de calidad en cada aspecto de nuestro trabajo.',
    },
  ];

  ngOnInit() {}

  openModalDetalle(proyecto: proyectosCarousel) {
    this.dialog.open(ModalProyectoComponent, {
      width: '650px',
      height: '80%',
      data: { proyecto: proyecto },
    });
  }

  seleccionarCategoria(categoria: any) {

    this.formGrupo.get('categoria')?.setValue(categoria.nombre);

    this.categorias.update((list) =>
      list.map((c: any) => ({ ...c, seleccionado: c.id === categoria.id }))
    );

    console.log(this.categorias());
  }

  onSubmit() {
    if (this.formGrupo.invalid) {
      this.formGrupo.markAllAsTouched();
      return;
    }
    console.log(this.formGrupo.value)
  }
}
