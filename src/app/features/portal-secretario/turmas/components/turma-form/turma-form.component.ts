import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { Turma } from '../../../../../core/models/turma.model';

@Component({
  selector: 'app-turma-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    ButtonModule, 
    InputTextModule, 
    DropdownModule,
    InputNumberModule
  ],
  templateUrl: './turma-form.component.html',
  styleUrl: './turma-form.component.css'
})
export class TurmaFormComponent implements OnInit {
    @Input() turma: Turma | null = null;
    @Output() save = new EventEmitter<Partial<Turma>>();
    @Output() close = new EventEmitter<void>();

    turmaForm: FormGroup;

    nivelOptions = [
        { label: 'Ensino Fundamental', value: 'Ensino Fundamental' },
        { label: 'Ensino Médio', value: 'Ensino Médio' }
    ];

    periodoOptions = [
        { label: 'Manhã', value: 'Manhã' },
        { label: 'Tarde', value: 'Tarde' }
    ];

    statusOptions = [
        { label: 'Ativa', value: 'Ativa' },
        { label: 'Inativa', value: 'Inativa' }
    ];

    constructor(private fb: FormBuilder) {
        const currentYear = new Date().getFullYear();
        this.turmaForm = this.fb.group({
            id: [null],
            nome: ['', [Validators.required, Validators.minLength(3)]],
            nivel: ['', Validators.required],
            periodo: ['', Validators.required],
            anoLetivo: [currentYear, [Validators.required, Validators.min(2020), Validators.max(2030)]],
            capacidadeMaxima: [30, [Validators.required, Validators.min(1), Validators.max(50)]],
            professorResponsavel: [''],
            sala: [''],
            status: ['Ativa', Validators.required]
        });
    }

    ngOnInit(): void {
        if (this.turma) {
            this.turmaForm.patchValue(this.turma);
        }
    }

    onSubmit(): void {
        if (this.turmaForm.valid) {
            this.save.emit(this.turmaForm.value);
        } else {
            this.markFormGroupTouched();
        }
    }

    private markFormGroupTouched() {
        Object.keys(this.turmaForm.controls).forEach(key => {
            const control = this.turmaForm.get(key);
            control?.markAsTouched();
        });
    }

    isFieldInvalid(fieldName: string): boolean {
        const field = this.turmaForm.get(fieldName);
        return !!(field && field.invalid && field.touched);
    }
}
