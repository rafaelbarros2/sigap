import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosAlunoModalComponent } from './documentos-aluno-modal.component';

describe('DocumentosAlunoModalComponent', () => {
  let component: DocumentosAlunoModalComponent;
  let fixture: ComponentFixture<DocumentosAlunoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentosAlunoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentosAlunoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
