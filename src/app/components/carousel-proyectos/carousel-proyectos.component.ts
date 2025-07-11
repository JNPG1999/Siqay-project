import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { OwlOptions,CarouselModule } from 'ngx-owl-carousel-o';
import { proyectosCarousel } from '../../modals/listaHeader';


@Component({
  selector: 'app-carousel-proyectos',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './carousel-proyectos.component.html',
  styleUrl: './carousel-proyectos.component.scss'
})

export class CarouselProyectosComponent {

  proyectosCarousel: proyectosCarousel[] = [
    {
      id: '1',
      titulo: 'Proyecto 1',
      descripcion: 'Descripción del proyecto 1',
      imagen:'https://img.heroui.chat/image/places?w=1200&h=800&u=arch1',
    },
    {
      id: '2',
      titulo: 'Proyecto 2',
      descripcion: 'Descripción del proyecto 2',
      imagen:'https://img.heroui.chat/image/places?w=1200&h=800&u=arch2',
    },
    {
      id: '3',
      titulo: 'Proyecto 3',
      descripcion: 'Descripción del proyecto 3',
      imagen:'https://img.heroui.chat/image/places?w=1200&h=800&u=arch3',
    },
    {
      id: '4',
      titulo: 'Proyecto 4',
      descripcion: 'Descripción del proyecto 4',
      imagen:'https://img.heroui.chat/image/places?w=1200&h=800&u=arch4',
    }
  ]
  
  carouselOptions:OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: false,
    touchDrag: false,
    autoplayTimeout: 5000,
    //autoplayHoverPause: true,
    autoHeight: true,
    dots: true,
    navSpeed: 700,
    nav: true,
    autoWidth:true,
    navText:['<', '>'],
    items: 1,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      1024: {
        items: 3
      },
      1420:{
        items: 4
      },
      1980:{
        items: 4
      }
    }
  }

    loadedFirstImage = false;

}
