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
import { CardInfoComponent, DataCardComponent } from '../../components/card-info/card-info.component';
import { TitleReusableComponent } from "../../components/title-reusable/title-reusable.component";

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
    CardInfoComponent,
    TitleReusableComponent
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
    telefono: ['', [Validators.minLength(9)]],
    categoria: [''],
    mensaje: ['', [Validators.required]],
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

  dataServicios: DataCardComponent[] = [
    {
        id: 1,
        numberAndIcon: 'assets/iconos/casaService.svg',
        title: 'Arquitectura Residencial',
        textDefinition: 'Diseñamos viviendas que reflejan la personalidad de sus habitantes, optimizando cada espacio para crear ambientes funcionales y estéticamente armoniosos.'
    },
    {
        id: 2,
        numberAndIcon: 'assets/iconos/arquitecturaComercialService.svg',
        title: 'Arquitectura Comercial',
        textDefinition: 'Creamos espacios comerciales que potencian la identidad de marca y mejoran la experiencia del cliente, desde oficinas hasta tiendas y restaurantes.'
    },
    {
        id: 3,
        numberAndIcon: 'assets/iconos/arquitecturaCulturalService.svg',
        title: 'Arquitectura Cultural',
        textDefinition: 'Desarrollamos proyectos culturales que se convierten en referentes urbanos, diseñando museos, teatros y centros comunitarios con personalidad única.'
    },
    {
        id: 4,
        numberAndIcon: 'assets/iconos/disenioInterioresService.svg',
        title: 'Diseño de Interiores',
        textDefinition: 'Transformamos espacios interiores con diseños personalizados que combinan funcionalidad, estética y confort, cuidando cada detalle.'
    },
    {
        id: 5,
        numberAndIcon: 'assets/iconos/paisajismo2Service.svg',
        title: 'Paisajismo',
        textDefinition: 'Integramos arquitectura y naturaleza mediante diseños paisajísticos sostenibles que crean ambientes exteriores armoniosos y funcionales.'
    },
    {
        id: 6,
        numberAndIcon: 'assets/iconos/consultoriaService.svg',
        title: 'Consultoría',
        textDefinition: 'Ofrecemos asesoramiento especializado en sostenibilidad, eficiencia energética y normativas para optimizar proyectos arquitectónicos.'
    },
   
  ]



   dataProcesos: DataCardComponent[] = [
    {
        id: 1,
        numberAndIcon: 1,
        title: 'Consulta Inicial',
        textDefinition: 'Nos reunimos para entender tus necesidades, objetivos y visión del proyecto. Analizamos el sitio, presupuesto y cronograma.'
    },
    {
        id: 2,
        numberAndIcon: 2,
        title: 'Concepto y Diseño',
        textDefinition: 'Desarrollamos conceptos arquitectónicos y presentamos opciones de diseño preliminar con bocetos, renders y modelos 3D.'
    },
    {
        id: 3,
        numberAndIcon: 3,
        title: 'Desarrollo del Proyecto',
        textDefinition: 'Refinamos el diseño seleccionado, definimos materiales, sistemas constructivos y elaboramos planos técnicos detallados.'
    },
    {
        id: 4,
        numberAndIcon: 4,
        title: 'Documentación y Permisos',
        textDefinition: 'Preparamos toda la documentación necesaria para obtener licencias y permisos de construcción con las autoridades competentes.'
    },
    {
        id: 5,
        numberAndIcon: 5,
        title: 'Construcción',
        textDefinition: 'Supervisamos la ejecución del proyecto para garantizar que se construya según las especificaciones y estándares de calidad.'
    },
    {
        id: 6,
        numberAndIcon: 6,
        title: 'Entrega y Seguimiento',
        textDefinition: 'Realizamos la entrega formal del proyecto y ofrecemos seguimiento posterior para asegurar su óptimo funcionamiento.'
    },
   
  ]

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
    console.log(this.formGrupo.value);
  }

  soloNumeros(e: Event) {
    const el = e.target as HTMLInputElement;
    const limpio = el.value.replace(/\D/g, ''); // quita todo lo no numérico
    if (limpio !== el.value) {
      el.value = limpio;
      this.formGrupo.get('telefono')!.setValue(limpio, { emitEvent: false });
    }
  }
}
