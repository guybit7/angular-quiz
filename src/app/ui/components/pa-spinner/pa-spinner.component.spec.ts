import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaSpinnerComponent } from './pa-spinner.component';

describe('PaSpinnerComponent', () => {
  let component: PaSpinnerComponent;
  let fixture: ComponentFixture<PaSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaSpinnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
