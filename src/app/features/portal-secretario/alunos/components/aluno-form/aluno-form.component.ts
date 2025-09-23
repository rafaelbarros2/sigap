import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { Aluno } from '../../../../../core/models/alunos.model';

@Component({
  selector: 'app-aluno-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    ButtonModule, 
    InputTextModule, 
    DropdownModule,
    CalendarModule,
    InputMaskModule
  ],
  templateUrl: './aluno-form.component.html',
  styleUrl: './aluno-form.component.css'
})
export class AlunoFormComponent implements OnInit {
    @Input() aluno: Aluno | null = null;
    @Output() save = new EventEmitter<Partial<Aluno>>();
    @Output() close = new EventEmitter<void>();

    alunoForm: FormGroup;

    statusOptions = [
        { label: 'Ativo', value: 'Ativo' },
        { label: 'Inativo', value: 'Inativo' }
    ];

    turmasOptions = [
        { label: '7º Ano A', value: '7º Ano A' },
        { label: '7º Ano B', value: '7º Ano B' },
        { label: '7º Ano C', value: '7º Ano C' },
        { label: '8º Ano A', value: '8º Ano A' },
        { label: '8º Ano B', value: '8º Ano B' },
        { label: '9º Ano A', value: '9º Ano A' },
        { label: '9º Ano B', value: '9º Ano B' }
    ];

    parentescoOptions = [
        { label: 'Pai', value: 'Pai' },
        { label: 'Mãe', value: 'Mãe' },
        { label: 'Avô(ó)', value: 'Avô(ó)' },
        { label: 'Tio(a)', value: 'Tio(a)' },
        { label: 'Responsável Legal', value: 'Responsável Legal' }
    ];

    constructor(private fb: FormBuilder) {
        this.alunoForm = this.fb.group({
            id: [null],
            nomeCompleto: ['', [Validators.required, Validators.minLength(3)]],
            matricula: ['', Validators.required],
            turma: ['', Validators.required],
            status: ['Ativo', Validators.required],
            email: ['', [Validators.email]],
            telefone: [''],
            dataNascimento: [''],
            cpf: [''],
            endereco: this.fb.group({
                cep: [''],
                logradouro: [''],
                numero: [''],
                complemento: [''],
                bairro: [''],
                cidade: [''],
                uf: ['']
            }),
            responsavel: this.fb.group({
                nome: [''],
                telefone: [''],
                email: ['', [Validators.email]],
                parentesco: ['']
            })
        });
    }

    ngOnInit(): void {
        if (this.aluno) {
            this.alunoForm.patchValue(this.aluno);
        }
    }

    onSubmit(): void {
        if (this.alunoForm.valid) {
            this.save.emit(this.alunoForm.value);
        } else {
            this.markFormGroupTouched();
        }
    }

    private markFormGroupTouched() {
        Object.keys(this.alunoForm.controls).forEach(key => {
            const control = this.alunoForm.get(key);
            control?.markAsTouched();
            
            if (control instanceof FormGroup) {
                Object.keys(control.controls).forEach(nestedKey => {
                    control.get(nestedKey)?.markAsTouched();
                });
            }
        });
    }

    isFieldInvalid(fieldName: string): boolean {
        const field = this.alunoForm.get(fieldName);
        return !!(field && field.invalid && field.touched);
    }
}