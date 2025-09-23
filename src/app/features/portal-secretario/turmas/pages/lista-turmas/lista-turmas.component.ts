import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Turma } from '../../../../../core/models/turma.model';
import { TurmaFormComponent } from '../../components/turma-form/turma-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-turmas',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, TableModule, TagModule, TurmaFormComponent],
  templateUrl: './lista-turmas.component.html',
  styleUrl: './lista-turmas.component.css'
})
export class ListaTurmasComponent {
  isFormModalOpen = false;
  turmaSelecionada: Turma | null = null;


  constructor(private router: Router) {}


  turmas: Turma[] = [
    { 
      id: 't1', 
      nome: '8º Ano A', 
      nivel: 'Ensino Fundamental', 
      periodo: 'Manhã', 
      anoLetivo: 2025, 
      capacidadeMaxima: 35, 
      professorResponsavel: 'Ana Paula Santos',
      sala: 'Sala 101',
      status: 'Ativa', 
      totalAlunos: 32 
    },
    { 
      id: 't2', 
      nome: '8º Ano B', 
      nivel: 'Ensino Fundamental', 
      periodo: 'Tarde', 
      anoLetivo: 2025, 
      capacidadeMaxima: 35, 
      professorResponsavel: 'Carlos Eduardo Lima',
      sala: 'Sala 102',
      status: 'Ativa', 
      totalAlunos: 31 
    },
    { 
      id: 't3', 
      nome: '9º Ano A', 
      nivel: 'Ensino Fundamental', 
      periodo: 'Manhã', 
      anoLetivo: 2025, 
      capacidadeMaxima: 30, 
      professorResponsavel: 'Mariana Silva Oliveira',
      sala: 'Sala 201',
      status: 'Ativa', 
      totalAlunos: 28 
    },
    { 
      id: 't4', 
      nome: '1º Ano A', 
      nivel: 'Ensino Médio', 
      periodo: 'Manhã', 
      anoLetivo: 2025, 
      capacidadeMaxima: 40, 
      professorResponsavel: 'João Silva',
      sala: 'Sala 301',
      status: 'Ativa', 
      totalAlunos: 35 
    },
    { 
      id: 't5', 
      nome: '2º Ano A', 
      nivel: 'Ensino Médio', 
      periodo: 'Tarde', 
      anoLetivo: 2025, 
      capacidadeMaxima: 40, 
      professorResponsavel: 'Maria Santos',
      sala: 'Sala 302',
      status: 'Inativa', 
      totalAlunos: 33 
    }
  ];

  openFormModal(turma: Turma | null = null): void {
    this.turmaSelecionada = turma;
    this.isFormModalOpen = true;
  }

  closeFormModal(): void {
    this.isFormModalOpen = false;
    this.turmaSelecionada = null;
  }

  onSave(turmaData: Partial<Turma>): void {
    if (turmaData.id) {
      const index = this.turmas.findIndex(t => t.id === turmaData.id);
      if (index > -1) {
        this.turmas[index] = { ...this.turmas[index], ...turmaData };
      }
    } else {
      const newTurma: Turma = {
        ...turmaData,
        id: crypto.randomUUID(),
        totalAlunos: 0
      } as Turma;
      this.turmas.push(newTurma);
    }
    this.closeFormModal();
  }
  
  onDelete(id: string): void {
    this.turmas = this.turmas.filter(t => t.id !== id);
  }

  gerenciarTurma(turma: Turma): void {
    this.router.navigate(['/turmas/gerenciar', turma.id]);  
  }
}
