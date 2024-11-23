import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeConsultationComponent } from './list-de-consultation.component';

describe('ListDeConsultationComponent', () => {
  let component: ListDeConsultationComponent;
  let fixture: ComponentFixture<ListDeConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDeConsultationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDeConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
