import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css'
})
export class ConfirmationModalComponent {
  @Input() title: string = 'Confirmar Ação';
  @Input() message: string = 'Tem certeza que deseja continuar?';
  @Input() confirmText: string = 'Sim';
  @Input() cancelText: string = 'Não';
  @Input() confirmSeverity: 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger' = 'danger';
  
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
