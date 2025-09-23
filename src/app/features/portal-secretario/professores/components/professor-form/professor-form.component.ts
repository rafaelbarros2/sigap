import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumberModule } from 'primeng/inputnumber';
import { Professor } from '../../../../../core/models/professor.model';

@Component({
  selector: 'app-professor-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    ButtonModule, 
    InputTextModule, 
    DropdownModule,
    CalendarModule,
    InputMaskModule,
    MultiSelectModule,
    InputNumberModule
  ],
  templateUrl: './professor-form.component.html',
  styleUrl: './professor-form.component.css'
})
export class ProfessorFormComponent implements OnInit {
    @Input() professor: Professor | null = null;
    @Output() save = new EventEmitter<Partial<Professor>>();
    @Output() close = new EventEmitter<void>();

    professorForm: FormGroup;

    statusOptions = [
        { label: 'Ativo', value: 'Ativo' },
        { label: 'Inativo', value: 'Inativo' }
    ];

    materiasOptions = [
        { label: 'Matemática', value: 'Matemática' },
        { label: 'Português', value: 'Português' },
        { label: 'História', value: 'História' },
        { label: 'Geografia', value: 'Geografia' },
        { label: 'Ciências', value: 'Ciências' },
        { label: 'Física', value: 'Física' },
        { label: 'Química', value: 'Química' },
        { label: 'Biologia', value: 'Biologia' },
        { label: 'Inglês', value: 'Inglês' },
        { label: 'Espanhol', value: 'Espanhol' },
        { label: 'Arte', value: 'Arte' },
        { label: 'Educação Física', value: 'Educação Física' },
        { label: 'Literatura', value: 'Literatura' }
    ];

    constructor(private fb: FormBuilder) {
        this.professorForm = this.fb.group({
            id: [null],
            nomeCompleto: ['', [Validators.required, Validators.minLength(3)]],
            cpf: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            telefone: ['', Validators.required],
            dataNascimento: [''],
            status: ['Ativo', Validators.required],
            materias: [[], Validators.required],
            cargaHoraria: [40, [Validators.required, Validators.min(1), Validators.max(60)]],
            salario: [0, [Validators.required, Validators.min(0)]],
            dataAdmissao: [''],
            endereco: this.fb.group({
                cep: [''],
                logradouro: [''],
                numero: [''],
                complemento: [''],
                bairro: [''],
                cidade: [''],
                uf: ['']
            }),
            formacaoAcademica: this.fb.group({
                graduacao: ['', Validators.required],
                instituicao: ['', Validators.required],
                anoConclusao: [''],
                posGraduacao: [''],
                instituicaoPosGrad: [''],
                anoConclusaoPosGrad: [''],
                mestrado: [''],
                instituicaoMestrado: [''],
                anoConclusaoMestrado: [''],
                doutorado: [''],
                instituicaoDoutorado: [''],
                anoConclusaoDoutorado: ['']
            }),
            experienciaProfissional: this.fb.group({
                tempoExperiencia: [''],
                escolasAnteriores: [''],
                especialidades: [[]]
            })
        });
    }

    ngOnInit(): void {
        if (this.professor) {
            this.professorForm.patchValue(this.professor);
        }
    }

    onSubmit(): void {
        if (this.professorForm.valid) {
            this.save.emit(this.professorForm.value);
        } else {
            this.markFormGroupTouched();
        }
    }

    private markFormGroupTouched() {
        Object.keys(this.professorForm.controls).forEach(key => {
            const control = this.professorForm.get(key);
            control?.markAsTouched();
            
            if (control instanceof FormGroup) {
                Object.keys(control.controls).forEach(nestedKey => {
                    control.get(nestedKey)?.markAsTouched();
                });
            }
        });
    }

    isFieldInvalid(fieldName: string): boolean {
        const field = this.professorForm.get(fieldName);
        return !!(field && field.invalid && field.touched);
    }
}
