import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdonnancelistComponent } from './ordonnancelist.component';

describe('OrdonnancelistComponent', () => {
  let component: OrdonnancelistComponent;
  let fixture: ComponentFixture<OrdonnancelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdonnancelistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdonnancelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
