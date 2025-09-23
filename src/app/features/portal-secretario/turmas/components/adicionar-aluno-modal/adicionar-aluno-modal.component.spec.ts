import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarAlunoModalComponent } from './adicionar-aluno-modal.component';

describe('AdicionarAlunoModalComponent', () => {
  let component: AdicionarAlunoModalComponent;
  let fixture: ComponentFixture<AdicionarAlunoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarAlunoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarAlunoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
