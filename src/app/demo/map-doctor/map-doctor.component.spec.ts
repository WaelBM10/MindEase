import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDoctorComponent } from './map-doctor.component';

describe('MapDoctorComponent', () => {
  let component: MapDoctorComponent;
  let fixture: ComponentFixture<MapDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapDoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
