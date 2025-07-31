import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralConfirmationModalComponent } from './general-confirmation-modal.component';

describe('GeneralConfirmationModalComponent', () => {
  let component: GeneralConfirmationModalComponent;
  let fixture: ComponentFixture<GeneralConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralConfirmationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
