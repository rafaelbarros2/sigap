import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Aluno } from '../../../../../core/models/alunos.model';
import { AlunoFormComponent } from '../../components/aluno-form/aluno-form.component';



@Component({
  selector: 'app-alunos-list',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, TableModule, TagModule, AlunoFormComponent],
  templateUrl: './alunos-list.component.html',
  styleUrl: './alunos-list.component.css'
})
export class AlunosListComponent {
  isFormModalOpen = false;
  alunoSelecionado: Aluno | null = null;

  alunos: Aluno[] = [
    { id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', nomeCompleto: 'João da Silva Pereira', matricula: '2024001', turma: '8º Ano A', status: 'Ativo' },
    { id: '2c9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bee', nomeCompleto: 'Maria Oliveira Souza', matricula: '2024002', turma: '9º Ano B', status: 'Ativo' },
    { id: '3d9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bef', nomeCompleto: 'Carlos Eduardo Lima', matricula: '2023054', turma: '7º Ano C', status: 'Inativo' },
  ];

  openFormModal(aluno: Aluno | null = null): void {
    this.alunoSelecionado = aluno;
    this.isFormModalOpen = true;
  }

  closeFormModal(): void {
    this.isFormModalOpen = false;
    this.alunoSelecionado = null;
  }

  onSave(alunoData: Partial<Aluno>): void {
    if (alunoData.id) {
      const index = this.alunos.findIndex(a => a.id === alunoData.id);
      if (index > -1) {
        this.alunos[index] = { ...this.alunos[index], ...alunoData };
      }
    } else {
      const newAluno: Aluno = {
        ...alunoData,
        id: crypto.randomUUID(),
        matricula: `2024${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`
      } as Aluno;
      this.alunos.push(newAluno);
    }
    this.closeFormModal();
  }
  
  onDelete(id: string): void {
    // Em um app real, aqui teríamos um modal de confirmação.
    this.alunos = this.alunos.filter(a => a.id !== id);
  }
}