import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppConfirmationModalComponent } from './app-confirmation-modal.component';

describe('AppConfirmationModalComponent', () => {
  let component: AppConfirmationModalComponent;
  let fixture: ComponentFixture<AppConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppConfirmationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
