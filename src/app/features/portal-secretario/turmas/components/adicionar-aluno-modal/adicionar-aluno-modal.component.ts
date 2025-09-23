import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { Aluno } from '../../../../../core/models/alunos.model';

@Component({
  selector: 'app-adicionar-aluno-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, CheckboxModule],
  templateUrl: './adicionar-aluno-modal.component.html',
  styleUrl: './adicionar-aluno-modal.component.css'
})
export class AdicionarAlunoModalComponent implements OnInit {
  @Input() alunosJaMatriculados: Aluno[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() alunosAdicionados = new EventEmitter<Aluno[]>();

  searchTerm: string = '';
  todosAlunos: Aluno[] = [];
  alunosDisponiveis: Aluno[] = [];
  alunosFiltrados: Aluno[] = [];
  alunosSelecionados: Aluno[] = [];

  ngOnInit(): void {
    this.carregarAlunos();
    this.filtrarAlunosDisponiveis();
    this.filtrarResultados();
  }

  carregarAlunos(): void {
    // Simulando dados de todos os alunos da escola
    this.todosAlunos = [
      {
        id: 'a1',
        nomeCompleto: 'Ana Clara Vasconcelos',
        matricula: '2025010',
        turma: '8º Ano A',
        status: 'Ativo'
      },
      {
        id: 'a2',
        nomeCompleto: 'Bruno Costa Guimarães',
        matricula: '2025011',
        turma: '8º Ano A',
        status: 'Ativo'
      },
      {
        id: 'a3',
        nomeCompleto: 'Carlos Eduardo Silva',
        matricula: '2025012',
        turma: '',
        status: 'Ativo'
      },
      {
        id: 'a4',
        nomeCompleto: 'Daniela Santos Oliveira',
        matricula: '2025013',
        turma: '',
        status: 'Ativo'
      },
      {
        id: 'a5',
        nomeCompleto: 'Eduardo Ferreira Lima',
        matricula: '2025014',
        turma: '',
        status: 'Ativo'
      },
      {
        id: 'a6',
        nomeCompleto: 'Fernanda Rodrigues Costa',
        matricula: '2025015',
        turma: '9º Ano B',
        status: 'Ativo'
      },
      {
        id: 'a7',
        nomeCompleto: 'Gabriel Henrique Souza',
        matricula: '2025016',
        turma: '',
        status: 'Ativo'
      },
      {
        id: 'a8',
        nomeCompleto: 'Helena Maria Santos',
        matricula: '2025017',
        turma: '',
        status: 'Ativo'
      },
      {
        id: 'a9',
        nomeCompleto: 'Igor Pereira Alves',
        matricula: '2025018',
        turma: '',
        status: 'Ativo'
      },
      {
        id: 'a10',
        nomeCompleto: 'Julia Cristina Martins',
        matricula: '2025019',
        turma: '',
        status: 'Ativo'
      }
    ];
  }

  filtrarAlunosDisponiveis(): void {
    const idsMatriculados = this.alunosJaMatriculados.map(a => a.id);
    this.alunosDisponiveis = this.todosAlunos.filter(aluno => 
      !idsMatriculados.includes(aluno.id) && 
      aluno.status === 'Ativo' &&
      (!aluno.turma || aluno.turma === '')
    );
  }

  filtrarResultados(): void {
    if (!this.searchTerm.trim()) {
      this.alunosFiltrados = [...this.alunosDisponiveis];
    } else {
      const termo = this.searchTerm.toLowerCase();
      this.alunosFiltrados = this.alunosDisponiveis.filter(aluno =>
        aluno.nomeCompleto.toLowerCase().includes(termo) ||
        aluno.matricula.toLowerCase().includes(termo)
      );
    }
  }

  onSearchChange(): void {
    this.filtrarResultados();
  }

  onAlunoSelecionado(aluno: Aluno, selecionado: boolean): void {
    if (selecionado) {
      if (!this.alunosSelecionados.find(a => a.id === aluno.id)) {
        this.alunosSelecionados.push(aluno);
      }
    } else {
      this.alunosSelecionados = this.alunosSelecionados.filter(a => a.id !== aluno.id);
    }
  }

  isAlunoSelecionado(aluno: Aluno): boolean {
    return this.alunosSelecionados.some(a => a.id === aluno.id);
  }

  adicionarSelecionados(): void {
    if (this.alunosSelecionados.length > 0) {
      this.alunosAdicionados.emit([...this.alunosSelecionados]);
      this.fecharModal();
    }
  }

  fecharModal(): void {
    this.close.emit();
  }
}
