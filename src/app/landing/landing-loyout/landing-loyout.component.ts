import {
    Component,
    computed,
    ElementRef,
    inject,
    OnInit,
    signal,
    ViewChild,
} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CarouselProyectosComponent } from '../../components/carousel-proyectos/carousel-proyectos.component';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import {
    habilidadesNosotros,
    listaHeader,
    proyectosCarousel,
} from '../../modals/listaHeader';
import { MatDialog } from '@angular/material/dialog';
import { ModalProyectoComponent } from '../../components/modal-proyecto/modal-proyecto.component';
import { CommonModule, DatePipe } from '@angular/common';
import {
    FormBuilder,
    FormControl,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import {
    CardInfoComponent,
    DataCardComponent,
} from '../../components/card-info/card-info.component';
import { TitleReusableComponent } from '../../components/title-reusable/title-reusable.component';
import { LandingLoyoutService } from '../../services/landing-loyout/landing-loyout.service';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from '../../../environments/environments.development';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
    DataCardTestimonios,
    CardTestimoniosComponent,
} from '../../components/card-testimonios/card-testimonios.component';
import { BandejaEntradaService } from '../../services/bandeja-entrada/bandeja-entrada.service';
import { FormContactanos } from '../../modals/bandeja-entrada';
import { ProyectoService } from '../../services/proyectos/proyecto.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { from, Observable, of } from 'rxjs';
import { Project, Projects } from '../../admin/interface/project.interface';

interface ContactoGrupo {
    nombre: FormControl<string | null>;
    asunto: FormControl<string | null>;
    email: FormControl<string | null>;
    telefono: FormControl<string | null>;
    mensaje: FormControl<string | null>;
}

interface Categoria {
    id: number;
    nombre: string;
    seleccionado?: boolean;
}

@Component( {
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
        TitleReusableComponent,
        MatSnackBarModule,
        CardTestimoniosComponent,
    ],
    templateUrl: './landing-loyout.component.html',
    styleUrl: './landing-loyout.component.scss',
} )
export class LandingLoyoutComponent implements OnInit {
    dialog = inject( MatDialog );
    landingLoyoutService = inject( LandingLoyoutService );
    _SnackBar = inject( MatSnackBar );
    _BandejaEntradaService = inject( BandejaEntradaService );

    //! PROYECTOS SECCION
    projectService = inject( ProyectoService );
    //   projectsSignal : any = toSignal(this.projectService.projectSignal(), { initialValue: [] });
    projectSignal = this.projectService.projectSignal;
    categoriaSignal = this.projectService.categoriaSignal;

    categoriasProyecto = computed( () => {
        const categorias = this.data.map( ( proyecto ) => proyecto.categoria );
        return categorias;
    } );



    form: FormBuilder = inject( FormBuilder );
    @ViewChild( 'inicio' ) inicioSeccion!: ElementRef<HTMLInputElement>;
    @ViewChild( 'proyectos' ) proyectosSeccion!: ElementRef<HTMLInputElement>;
    @ViewChild( 'nosotros' ) nosotrosSeccion!: ElementRef<HTMLInputElement>;
    @ViewChild( 'servicios' ) serviciosSeccion!: ElementRef<HTMLInputElement>;
    @ViewChild( 'contactos' ) contactosSeccion!: ElementRef<HTMLInputElement>;

    // categorias = signal<Categoria[]>( [
    //     { id: 1, nombre: 'Residencial', seleccionado: false },
    //     { id: 2, nombre: 'Comercial', seleccionado: false },
    //     { id: 3, nombre: 'Cultural', seleccionado: false },
    //     { id: 4, nombre: 'Público', seleccionado: false },
    //     { id: 5, nombre: 'Hospitalidad', seleccionado: false },
    // ] );

    formGrupo = this.form.group<ContactoGrupo>( {
        nombre: new FormControl( '', [ Validators.required ] ),
        asunto: new FormControl( '', [ Validators.required ] ),
        email: new FormControl( '', [ Validators.email, Validators.required ] ),
        telefono: new FormControl( '', [ Validators.minLength( 9 ) ] ),
        mensaje: new FormControl( '', [ Validators.required ] ),
    } );

    openCategorias = signal<boolean>( false );

    categoriaSeleccionada = signal<Categoria | null>( null );


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
            textDefinition:
                'Diseñamos viviendas que reflejan la personalidad de sus habitantes, optimizando cada espacio para crear ambientes funcionales y estéticamente armoniosos.',
        },
        {
            id: 2,
            numberAndIcon: 'assets/iconos/arquitecturaComercialService.svg',
            title: 'Arquitectura Comercial',
            textDefinition:
                'Creamos espacios comerciales que potencian la identidad de marca y mejoran la experiencia del cliente, desde oficinas hasta tiendas y restaurantes.',
        },
        {
            id: 3,
            numberAndIcon: 'assets/iconos/arquitecturaCulturalService.svg',
            title: 'Arquitectura Cultural',
            textDefinition:
                'Desarrollamos proyectos culturales que se convierten en referentes urbanos, diseñando museos, teatros y centros comunitarios con personalidad única.',
        },
        {
            id: 4,
            numberAndIcon: 'assets/iconos/disenioInterioresService.svg',
            title: 'Diseño de Interiores',
            textDefinition:
                'Transformamos espacios interiores con diseños personalizados que combinan funcionalidad, estética y confort, cuidando cada detalle.',
        },
        {
            id: 5,
            numberAndIcon: 'assets/iconos/paisajismo2Service.svg',
            title: 'Paisajismo',
            textDefinition:
                'Integramos arquitectura y naturaleza mediante diseños paisajísticos sostenibles que crean ambientes exteriores armoniosos y funcionales.',
        },
        {
            id: 6,
            numberAndIcon: 'assets/iconos/consultoriaService.svg',
            title: 'Consultoría',
            textDefinition:
                'Ofrecemos asesoramiento especializado en sostenibilidad, eficiencia energética y normativas para optimizar proyectos arquitectónicos.',
        },
    ];

    dataProcesos: DataCardComponent[] = [
        {
            id: 1,
            numberAndIcon: 1,
            title: 'Consulta Inicial',
            textDefinition:
                'Nos reunimos para entender tus necesidades, objetivos y visión del proyecto. Analizamos el sitio, presupuesto y cronograma.',
        },
        {
            id: 2,
            numberAndIcon: 2,
            title: 'Concepto y Diseño',
            textDefinition:
                'Desarrollamos conceptos arquitectónicos y presentamos opciones de diseño preliminar con bocetos, renders y modelos 3D.',
        },
        {
            id: 3,
            numberAndIcon: 3,
            title: 'Desarrollo del Proyecto',
            textDefinition:
                'Refinamos el diseño seleccionado, definimos materiales, sistemas constructivos y elaboramos planos técnicos detallados.',
        },
        {
            id: 4,
            numberAndIcon: 4,
            title: 'Documentación y Permisos',
            textDefinition:
                'Preparamos toda la documentación necesaria para obtener licencias y permisos de construcción con las autoridades competentes.',
        },
        {
            id: 5,
            numberAndIcon: 5,
            title: 'Construcción',
            textDefinition:
                'Supervisamos la ejecución del proyecto para garantizar que se construya según las especificaciones y estándares de calidad.',
        },
        {
            id: 6,
            numberAndIcon: 6,
            title: 'Entrega y Seguimiento',
            textDefinition:
                'Realizamos la entrega formal del proyecto y ofrecemos seguimiento posterior para asegurar su óptimo funcionamiento.',
        },
    ];

    dataTestimonios: DataCardTestimonios[] = [
        {
            id: 1,
            imgTestimonioTemplate: 'assets/iconos/testimoniosTemplate.svg',
            description:
                'El equipo de ArchiStudio transformó nuestra visión en una casa que supera todas nuestras expectativas. Su enfoque en la sostenibilidad y el diseño bioclimático nos ha permitido reducir significativamente nuestros costos energéticos.',
            imgPersona: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=test1',
            nombrePersona: 'Carlos Rodriguez',
            Ocupacion: 'Propieta, Casa Horizonte',
        },
        {
            id: 2,
            imgTestimonioTemplate: 'assets/iconos/testimoniosTemplate.svg',
            description:
                'Trabajar con ArchiStudio en nuestro edificio corporativo fue una experiencia excepcional. Su capacidad para combinar estética, funcionalidad y sostenibilidad resultó en un espacio que refleja perfectamente nuestra identidad corporativa.',
            imgPersona: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=test2',
            nombrePersona: 'Elena Martínez',
            Ocupacion: 'CEO, Nexus Investments',
        },
        {
            id: 3,
            imgTestimonioTemplate: 'assets/iconos/testimoniosTemplate.svg',
            description:
                'La renovación de nuestro museo superó todas las expectativas. El diseño paramétrico no solo creó un espacio visualmente impactante, sino que también mejoró significativamente la experiencia del visitante y la funcionalidad del espacio.',
            imgPersona: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=test3',
            nombrePersona: 'Miguel Sánchez',
            Ocupacion: 'Director, Fundación Cultural Metropolitana',
        },
    ];

    async ngOnInit() {
        // this.landingLoyoutService.ObtenerProyectos().then(({ data, error }) => {
        //   console.log(data);
        //   if (error) {
        //     console.log('Error al obtener proyectos', error);
        //     return;
        //   }
        // });
        // await this.getProjects()
        // this.projectSignal.set(this.getProjects())
        //     console.log('toSignalProject: ', this.projectsSignal())
        //     setTimeout(() => {
        //     console.log('Después de emitir:', this.projectsSignal());
        //   }, 2000);
        await this.projectService.getProjects();
        await this.projectService.getCategorias();
        await this.parseoCategorias();

        console.log( this.projectSignal() );
        console.log( this.categoriaSignal() );

        setTimeout( () => {
            console.log( this.projectSignal() );
            console.log( this.categoriaSignal() );
            console.log( this.categoriaSignal() );
        }, 2000 );
    }

    //   openModalDetalle(proyecto: proyectosCarousel) {
    //     this.dialog.open(ModalProyectoComponent, {
    //       width: '650px',
    //       height: '80%',
    //       data: { proyecto: proyecto },
    //     });
    //   }

    // openModalDetalle(proyecto: Project ) {
    //     this.dialog.open(ModalProyectoComponent, {
    //       width: 'auto',
    //       maxWidth: '896px',
    //       maxHeight: '80%',

    //       height: 'auto',

    //       data: {
    //         proyecto,
    //         irSeccion: this.RecibeSeccionHeader.bind(this),
    //       }
    //     });

    //     dialogRef.afterClosed().subscribe((result: listaHeader | undefined) => {
    //     if (result) {
    //       this.RecibeSeccionHeader(result);
    //     }
    //   });
    //   }

    openModalDetalle( proyecto: Project ) {
        const dialogRef = this.dialog.open( ModalProyectoComponent, {
            width: 'auto',
            //maxWidth: '896px',
            maxHeight: '80vh',
            //height: 'auto',
            //panelClass: 'custom-dialog',
            data: {
                proyecto,
                irSeccion: this.RecibeSeccionHeader.bind( this ),
            }
        } );

        dialogRef.afterClosed().subscribe( ( result: listaHeader | undefined ) => {
            if ( result ) {
                this.RecibeSeccionHeader( result );
            }
        } );
    }

    //! HECHO POR JEREMY
    // seleccionarCategoria( categoria: Categoria ) {
    //     this.categoriaSeleccionada.set( categoria );

    //     this.categorias.update( ( list ) =>
    //         list.map( ( c: any ) => ( { ...c, seleccionado: c.id === categoria.id } ) )
    //     );
    // }

    //! HECHO POR MI

    parseoCategorias() {
        this.categoriaSignal.update( (categorias : any ) =>
            categorias.map( (categoria : any ) => ( {
                ...categoria,      // mantiene las propiedades existentes
                estado: false       // agrega o sobrescribe la propiedad 'estado'
            } ) )
        );
        console.log(this.categoriaSignal())
    }
    seleccionarCategoria( categoria: any ) {
        this.categoriaSeleccionada.set( categoria );
        this.categoriaSignal.update( ( list : any ) =>
            list.map( ( c: any ) => ( { ...c, seleccionado: c.id === categoria.id } ) )
        );
    }

    onSubmit() {
        if ( this.formGrupo.invalid ) {
            this.formGrupo.markAllAsTouched();
            return;
        }

        const rawForm = this.formGrupo.getRawValue();

        const payload: FormContactanos = {
            nombre: rawForm.nombre || '',
            asunto: rawForm.asunto || '',
            email: rawForm.email || '',
            telefono: rawForm.telefono || '',
            categoria:
                this.categoriaSeleccionada()?.nombre ?? 'Sin categoria seleccionada',
            mensaje: rawForm.mensaje || '',
        };

        if ( payload ) {
            const formContacto: Record<string, string> = {
                ...payload,
            };

            emailjs
                .send( environment.SERVICE_ID, environment.TEMPLATE_ID, formContacto, {
                    publicKey: environment.PUBLIC_ID,
                } )
                .then(
                    () => {
                        this.OpenSnackBar( 'Formulario enviado con éxito' );
                        this.guardarEmail( payload );
                        this.formGrupo.reset();
                        //! HECHO POR JEREMY
                        // this.categorias.update( ( list ) =>
                        //! HECHO POR MI
                        this.categoriaSignal.update( ( list : any ) =>
                            list.map( ( c: any ) => ( { ...c, seleccionado: false } ) )
                        );
                    },
                    ( error ) => {
                        this.OpenSnackBar( 'Error al enviar el formulario' );
                        //console.error('Error al enviar el formulario', error);
                    }
                );
        }
    }

    async guardarEmail( data: FormContactanos ) {
        try {
            //const usuario = this.authService.getCurrentUser()?.email || '';

            const { categoria, ...menosCategoria } = data;

            const usuario = 'jpachecog';
            const idCategoria: number | null =
                this.categoriaSeleccionada()?.id ?? null;
            const payload = {
                ...menosCategoria,
                usuariocreacion: usuario,
                usuariomodificacion: usuario,
                idcategoria: idCategoria,
            };

            await this._BandejaEntradaService.InsertarEmail( payload ).then( () => { } );
        } catch ( error ) {
            if ( error instanceof Error ) {
                console.log( 'Error: ', error );
                // this.openToast(error.message);
                //this.openToast("Email o contraseña son incorrectos")
            }
        }
    }

    soloNumeros( e: Event ) {
        const el = e.target as HTMLInputElement;
        const limpio = el.value.replace( /\D/g, '' ); // quita todo lo no numérico
        if ( limpio !== el.value ) {
            el.value = limpio;
            this.formGrupo.get( 'telefono' )!.setValue( limpio, { emitEvent: false } );
        }
    }

    RecibeSeccionHeader( evento: listaHeader ) {
        console.log( 'Seccion recibida en layout', evento );
        const seccion = evento.nombre.toLocaleLowerCase() + 'Seccion';
        // Acceso dinámico a la propiedad usando bracket notation
        const sectionRef = ( this as any )[ seccion ] as ElementRef<HTMLInputElement>;
        if ( sectionRef && sectionRef.nativeElement ) {
            sectionRef.nativeElement.scrollIntoView( {
                behavior: 'smooth',
                block: 'start',
            } );
        } else {
            console.warn( `No se encontró la sección: ${ seccion }` );
        }
    }

    OpenSnackBar( mensaje: string, duracion?: number ) {
        this._SnackBar.open( mensaje, 'Cerrar', {
            duration: duracion || 3000,
            horizontalPosition: 'center', // 'start' | 'center' | 'end' | 'left' | 'right'
            verticalPosition: 'bottom', // 'top' | 'bottom' });
            //panelClass: ['items-center'], // Clase CSS personalizada
        } );
    }

    //! SECCTION PROYECTOS
    getProjects() {


        // const data = await this.projectService.getProjects();
        // if (!data) console.log('Error al traer los proyectos')
        // return of(data);
        return from( this.projectService.getProjects() );


    }
}
