import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingLoyoutComponent } from './landing-loyout.component';

describe('LandingLoyoutComponent', () => {
  let component: LandingLoyoutComponent;
  let fixture: ComponentFixture<LandingLoyoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingLoyoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingLoyoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
