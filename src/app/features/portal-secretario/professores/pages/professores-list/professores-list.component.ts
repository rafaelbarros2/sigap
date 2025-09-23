import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Professor } from '../../../../../core/models/professor.model';
import { ProfessorFormComponent } from '../../components/professor-form/professor-form.component';

@Component({
  selector: 'app-professores-list',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, TableModule, TagModule, ProfessorFormComponent],
  templateUrl: './professores-list.component.html',
  styleUrl: './professores-list.component.css'
})
export class ProfessoresListComponent {
  isFormModalOpen = false;
  professorSelecionado: Professor | null = null;

  professores: Professor[] = [
    { 
      id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 
      nomeCompleto: 'Ana Paula Santos', 
      cpf: '123.456.789-01',
      email: 'ana.santos@escola.com',
      telefone: '(11) 99999-9999',
      status: 'Ativo', 
      materias: ['Matemática', 'Física'],
      cargaHoraria: 40,
      salario: 5500,
      formacaoAcademica: {
        graduacao: 'Licenciatura em Matemática',
        instituicao: 'USP',
        anoConclusao: 2018
      }
    },
    { 
      id: '2c9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bee', 
      nomeCompleto: 'Carlos Eduardo Lima', 
      cpf: '987.654.321-01',
      email: 'carlos.lima@escola.com',
      telefone: '(11) 88888-8888',
      status: 'Ativo', 
      materias: ['História', 'Geografia'],
      cargaHoraria: 30,
      salario: 4800,
      formacaoAcademica: {
        graduacao: 'Licenciatura em História',
        instituicao: 'UNESP',
        anoConclusao: 2015
      }
    },
    { 
      id: '3d9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bef', 
      nomeCompleto: 'Mariana Silva Oliveira', 
      cpf: '456.789.123-01',
      email: 'mariana.oliveira@escola.com',
      telefone: '(11) 77777-7777',
      status: 'Inativo', 
      materias: ['Português', 'Literatura'],
      cargaHoraria: 20,
      salario: 3200,
      formacaoAcademica: {
        graduacao: 'Licenciatura em Letras',
        instituicao: 'PUC-SP',
        anoConclusao: 2020
      }
    }
  ];

  openFormModal(professor: Professor | null = null): void {
    this.professorSelecionado = professor;
    this.isFormModalOpen = true;
  }

  closeFormModal(): void {
    this.isFormModalOpen = false;
    this.professorSelecionado = null;
  }

  onSave(professorData: Partial<Professor>): void {
    if (professorData.id) {
      const index = this.professores.findIndex(p => p.id === professorData.id);
      if (index > -1) {
        this.professores[index] = { ...this.professores[index], ...professorData };
      }
    } else {
      const newProfessor: Professor = {
        ...professorData,
        id: crypto.randomUUID()
      } as Professor;
      this.professores.push(newProfessor);
    }
    this.closeFormModal();
  }
  
  onDelete(id: string): void {
    this.professores = this.professores.filter(p => p.id !== id);
  }
}
