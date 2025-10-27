import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

@Component( {
    selector: 'app-carousel-proyectos',
    standalone: true,
    imports: [],
    templateUrl: './carousel-proyectos.component.html',
    styleUrls: [ './carousel-proyectos.component.scss' ],
} )
export class CarouselProyectosComponent implements AfterViewInit {
    @ViewChild( 'swiperContainer', { static: false } ) swiperContainer!: ElementRef;

    proyectosCarousel = [
        {
            id: '1',
            titulo: 'Casa Horizonte',
            descripcion: 'Residencia minimalista con vistas panoramicas',
            imagen: 'https://img.heroui.chat/image/places?w=1200&h=800&u=arch1',
        },
        {
            id: '2',
            titulo: 'Proyecto 2',
            descripcion: 'Descripción del proyecto 2',
            imagen: 'https://img.heroui.chat/image/places?w=1200&h=800&u=arch2',
        },
        {
            id: '3',
            titulo: 'Proyecto 3',
            descripcion: 'Descripción del proyecto 3',
            imagen: 'https://img.heroui.chat/image/places?w=1200&h=800&u=arch3',
        },
        {
            id: '4',
            titulo: 'Proyecto 4',
            descripcion: 'Descripción del proyecto 4',
            imagen: 'https://img.heroui.chat/image/places?w=1200&h=800&u=arch4',
        },
    ];

    ngAfterViewInit(): void {
        new Swiper( this.swiperContainer.nativeElement, {
            modules: [ Navigation, Pagination, Autoplay ],
            loop: true,
            slidesPerView: 1,
            spaceBetween: 20,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                // el: '.swiper-pagination',
                el: this.swiperContainer.nativeElement.querySelector('.swiper-pagination'),
                clickable: true,
                // bulletClass: 'custom-bullet',
                // bulletActiveClass: 'custom-bullet-active',
            },
            autoplay: {
                delay: 3000, 
            },
        } );
    }
}
