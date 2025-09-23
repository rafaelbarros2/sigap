import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-documentos-aluno-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './documentos-aluno-modal.component.html',
  styleUrl: './documentos-aluno-modal.component.css'
})
export class DocumentosAlunoModalComponent {

  @Input() alunoNome = '';
  @Output() close = new EventEmitter<void>();

  // Futuramente, aqui teremos a lógica para lidar com os uploads e a lista de documentos.
}
