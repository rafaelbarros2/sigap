import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-app-confirmation-modal',
  imports: [CommonModule],
  templateUrl: './app-confirmation-modal.component.html',
  styleUrl: './app-confirmation-modal.component.css'
})
export class ConfirmationModalComponent {
  @Input() title = 'Confirmar Ação';
  @Input() message = 'Você tem certeza que deseja prosseguir?';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
