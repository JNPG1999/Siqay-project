import { Component, computed, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';  // 👈 IMPORTANTE

@Component( {
    selector: 'app-pagination',
    standalone: true,
    imports: [ CommonModule ],
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.scss',
} )
export class PaginationComponent {
    totalProjects = input(0);
    currentPage = input.required<number>();

    //! PRIMER MODELO DE PAGINATION
    // currentPage = 1;
    // totalPages = 5; // puedes actualizar esto dinámicamente según tus datos

    // get totalPagesArray() {
    //     return Array.from( { length: this.totalPages }, ( _, i ) => i + 1 );
    // }

    // goToPage( page: number ) {
    //     this.currentPage = page;
    //     console.log( 'Página actual:', page );
    //     // aquí puedes llamar a un método para cargar los datos de esa página
    // }

    // nextPage() {
    //     if ( this.currentPage < this.totalPages ) {
    //         this.currentPage++;
    //         this.goToPage( this.currentPage );
    //     }
    // }

    // prevPage() {
    //     if ( this.currentPage > 1 ) {
    //         this.currentPage--;
    //         this.goToPage( this.currentPage );
    //     }
    // }

    // pages = Array.from({ length: Math.trunc(this.totalProjects() / 9) + 1 },  (_, i) => i + 1);

    pages = computed(() => {
    const total = this.totalProjects();
    // const totalPages = Math.trunc(total / 9) + 1; => //! ERROR DE LOGICA
    const totalPages = Math.ceil(total / 9);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  });
    // currentPage = 1;
    pageChange = output<number>();

    setPage( page: number ) {
        // this.currentPage = page;
        console.log( 'Página actual:', page );
        this.pageChange.emit(page);
    }
}
