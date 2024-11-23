import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDePatientComponent } from './list-de-patient.component';

describe('ListDePatientComponent', () => {
  let component: ListDePatientComponent;
  let fixture: ComponentFixture<ListDePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDePatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
