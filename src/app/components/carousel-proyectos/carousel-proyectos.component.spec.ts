import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselProyectosComponent } from './carousel-proyectos.component';

describe('CarouselProyectosComponent', () => {
  let component: CarouselProyectosComponent;
  let fixture: ComponentFixture<CarouselProyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselProyectosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
