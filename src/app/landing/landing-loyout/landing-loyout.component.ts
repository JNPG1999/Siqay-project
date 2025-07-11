import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { CarouselProyectosComponent } from '../../components/carousel-proyectos/carousel-proyectos.component';
import { OwlOptions,CarouselModule } from 'ngx-owl-carousel-o';
import { habilidadesNosotros, proyectosCarousel } from '../../modals/listaHeader';

@Component({
  selector: 'app-landing-loyout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,CarouselProyectosComponent,CarouselModule],
  templateUrl: './landing-loyout.component.html',
  styleUrl: './landing-loyout.component.scss'
})
export class LandingLoyoutComponent implements OnInit{

  data: proyectosCarousel[] = [
    {
      id: '1',
      titulo: 'Casa Horizonte',
      categoria:'Residencial | 2023',
      descripcion: 'Descripción del proyecto 1',
      imagen: 'https://img.heroui.chat/image/places?w=1200&h=800&u=arch1',
    },
    {
      id: '2',
      titulo: 'Edificio Nexus',
      categoria:'Comercial | 2022',
      descripcion: 'Descripción del proyecto 2',
      imagen: 'https://img.heroui.chat/image/places?w=1200&h=800&u=arch2',
    },
    {
      id: '3',
      titulo: 'Museo de Arte Contemporáneo',
      categoria:'Cultural | 2021',
      descripcion: 'Descripción del proyecto 3',
      imagen: 'https://img.heroui.chat/image/places?w=1200&h=800&u=arch3',
    },
    {
      id: '4',
      titulo: 'Residencia Bosque',
      categoria:'Residencial | 2023',
      descripcion: 'Descripción del proyecto 4',
      imagen: 'https://img.heroui.chat/image/places?w=1200&h=800&u=arch4',
    },
    {
      id: '5',
      titulo: 'Centro Comunitario Urbano',
      categoria:'Público | 2022',
      descripcion: 'Descripción del proyecto 5',
      imagen: 'https://img.heroui.chat/image/places?w=1200&h=800&u=arch5',
    },
    {
      id: '6',
      titulo: 'Hotel Boutique Alma',
      categoria:'Hospitalidad | 2021',
      descripcion: 'Descripción del proyecto 6',
      imagen: 'https://img.heroui.chat/image/places?w=1200&h=800&u=arch6',
    }
  ]

  dataNosotros: habilidadesNosotros[] =[
    {
      id:1,
      imagen:'assets/iconos/innovacion.svg',
      habilidad:'Innovación',
      descripcion:'Exploramos constantemente nuevas ideas y tecnologías para crear soluciones arquitectónicas únicas.'
    },
    {
      id:2,
      imagen:'assets/iconos/sostenibilidad.svg',
      habilidad:'Sostenibilidad',
      descripcion:'Diseñamos con conciencia ambiental, minimizando el impacto ecológico y maximizando la eficiencia energética.'
    },
    {
      id:3,
      imagen:'assets/iconos/colaboracion.svg',
      habilidad:'Colaboración',
      descripcion:'Trabajamos estrechamente con nuestros clientes para entender sus necesidades y convertir sus visiones en realidad.'
    },
    {
      id:4,
      imagen:'assets/iconos/excelencia.svg',
      habilidad:'Excelencia',
      descripcion:'Nos comprometemos con los más altos estándares de calidad en cada aspecto de nuestro trabajo.'
    }
  ]

  ngOnInit(){

  }



}
