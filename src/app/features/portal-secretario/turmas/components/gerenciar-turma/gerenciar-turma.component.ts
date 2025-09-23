import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Professor } from '../../../../../core/models/professor.model';
import { Aluno } from '../../../../../core/models/alunos.model';
import { DisciplinaVinculada } from '../../../../../core/models/turma.model';
import { AdicionarAlunoModalComponent } from '../adicionar-aluno-modal/adicionar-aluno-modal.component';
import { ConfirmationModalComponent } from '../../../../../shared/components/confirmation-modal/confirmation-modal.component';
import { CelulaHorario, HorarioAula } from '../../../../../core/models/horario-aula.model';





@Component({
  selector: 'app-gerenciar-turma',
  standalone: true,
  imports: [CommonModule, FormsModule, AdicionarAlunoModalComponent, ConfirmationModalComponent],
  templateUrl: './gerenciar-turma.component.html',
  styleUrl: './gerenciar-turma.component.css'
})
export class GerenciarTurmaComponent implements OnInit {
  isAddAlunoModalOpen = false;
  isRemoveModalOpen = false;
  alunoParaRemover: Aluno | null = null;

  // --- DADOS DE EXEMPLO ---
  turma = { id: 't1', nome: '8º Ano A', nivel: 'Ensino Fundamental', anoLetivo: 2025, numeroAlunos: 2, periodo: 'Manhã' };
  alunosNaTurma: Aluno[] = [ 
    { id: 'a1', nomeCompleto: 'Ana Clara Vasconcelos', matricula: '2025010', turma: '8º Ano A', status: 'Ativo' }, 
    { id: 'a2', nomeCompleto: 'Bruno Costa Guimarães', matricula: '2025011', turma: '8º Ano A', status: 'Ativo' } 
  ];
  todosOsAlunosDaEscola: Aluno[] = [ 
    { id: 'a1', nomeCompleto: 'Ana Clara Vasconcelos', matricula: '2025010', turma: '8º Ano A', status: 'Ativo' }, 
    { id: 'a2', nomeCompleto: 'Bruno Costa Guimarães', matricula: '2025011', turma: '8º Ano A', status: 'Ativo' }, 
    { id: 'a3', nomeCompleto: 'Carlos Eduardo Santos', matricula: '2025012', turma: '', status: 'Ativo' }, 
    { id: 'a4', nomeCompleto: 'Daniela Ferreira Alves', matricula: '2025013', turma: '', status: 'Ativo' }, 
    { id: 'a5', nomeCompleto: 'Eduardo Pereira Lima', matricula: '2025014', turma: '', status: 'Ativo' }, 
    { id: 'a6', nomeCompleto: 'Fernanda Gonçalves Ribeiro', matricula: '2025015', turma: '', status: 'Ativo' }, 
    { id: 'a7', nomeCompleto: 'Gustavo Henrique Oliveira', matricula: '2025016', turma: '', status: 'Ativo' }, 
    { id: 'a8', nomeCompleto: 'Isabela Martins Costa', matricula: '2025017', turma: '', status: 'Ativo' } 
  ];
  disciplinasDaTurma: DisciplinaVinculada[] = [ { id: 'd1', nome: 'Matemática', professorId: 'p2' }, { id: 'd2', nome: 'Língua Portuguesa', professorId: null }, { id: 'd3', nome: 'Ciências', professorId: 'p3' }, { id: 'd4', nome: 'História', professorId: null }, { id: 'd5', nome: 'Geografia', professorId: 'p1' }, { id: 'd6', nome: 'Educação Física', professorId: 'p4' }];
  professoresDisponiveis: Professor[] = [ 
    { 
      id: 'p1', 
      nomeCompleto: 'Carlos Nogueira',
      cpf: '123.456.789-01',
      email: 'carlos@escola.com',
      telefone: '(11) 99999-9999',
      status: 'Ativo',
      materias: ['Geografia'],
      formacaoAcademica: { graduacao: 'Licenciatura em Geografia', instituicao: 'USP' }
    }, 
    { 
      id: 'p2', 
      nomeCompleto: 'Helena Martins',
      cpf: '123.456.789-02',
      email: 'helena@escola.com',
      telefone: '(11) 99999-9998',
      status: 'Ativo',
      materias: ['Matemática'],
      formacaoAcademica: { graduacao: 'Licenciatura em Matemática', instituicao: 'UNESP' }
    }, 
    { 
      id: 'p3', 
      nomeCompleto: 'Marta Ribeiro',
      cpf: '123.456.789-03',
      email: 'marta@escola.com',
      telefone: '(11) 99999-9997',
      status: 'Ativo',
      materias: ['Ciências'],
      formacaoAcademica: { graduacao: 'Licenciatura em Ciências', instituicao: 'UNICAMP' }
    }, 
    { 
      id: 'p4', 
      nomeCompleto: 'Paulo Andrade',
      cpf: '123.456.789-04',
      email: 'paulo@escola.com',
      telefone: '(11) 99999-9996',
      status: 'Ativo',
      materias: ['Educação Física'],
      formacaoAcademica: { graduacao: 'Licenciatura em Educação Física', instituicao: 'USP' }
    }
  ];

  // --- DADOS PARA O QUADRO DE HORÁRIO ---
  diasDaSemana: string[] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
  horariosAula: HorarioAula[] = [
    { id: 'h1', descricao: '1º Horário', hora: '07:30 - 08:20' },
    { id: 'h2', descricao: '2º Horário', hora: '08:20 - 09:10' },
    { id: 'h3', descricao: 'Intervalo', hora: '09:10 - 09:30' },
    { id: 'h4', descricao: '3º Horário', hora: '09:30 - 10:20' },
    { id: 'h5', descricao: '4º Horário', hora: '10:20 - 11:10' },
  ];
  quadroDeHorario: CelulaHorario[][] = [];
  
  ngOnInit(): void {
    this.inicializarQuadroDeHorario();
  }

  inicializarQuadroDeHorario(): void {
    this.quadroDeHorario = this.horariosAula.map((horario, i) => {
      // Preenche o intervalo automaticamente
      if (horario.descricao === 'Intervalo') {
        return Array(this.diasDaSemana.length).fill({ disciplinaId: 'intervalo' });
      }
      return Array(this.diasDaSemana.length).fill({ disciplinaId: null });
    });
  }

  get alunosJaNaTurmaIds(): string[] { return this.alunosNaTurma.map(a => a.id); }
  get disciplinasVinculadas(): DisciplinaVinculada[] {
    return this.disciplinasDaTurma.filter(d => d.professorId !== null);
  }

  // --- Lógica do Modal de Adicionar Aluno ---
  openAddAlunoModal(): void { this.isAddAlunoModalOpen = true; }
  closeAddAlunoModal(): void { this.isAddAlunoModalOpen = false; }
  onAlunosAdicionados(novosAlunos: Aluno[]): void {
    novosAlunos.forEach(novoAluno => {
      if (!this.alunosNaTurma.some(a => a.id === novoAluno.id)) { this.alunosNaTurma.push(novoAluno); }
    });
    this.alunosNaTurma.sort((a, b) => a.nomeCompleto.localeCompare(b.nomeCompleto));
    this.closeAddAlunoModal();
  }

  // --- Lógica do Modal de Remover Aluno ---
  openRemoveConfirmation(aluno: Aluno): void { this.alunoParaRemover = aluno; this.isRemoveModalOpen = true; }
  closeRemoveConfirmation(): void { this.isRemoveModalOpen = false; this.alunoParaRemover = null; }
  confirmarRemocao(): void {
    if (this.alunoParaRemover) { this.alunosNaTurma = this.alunosNaTurma.filter(a => a.id !== this.alunoParaRemover!.id); }
    this.closeRemoveConfirmation();
  }

  // --- Lógica da Atribuição de Professores ---
  onProfessorSelect(professorId: string | null, disciplinaId: string): void {
    const disciplina = this.disciplinasDaTurma.find(d => d.id === disciplinaId);
    if (disciplina) { disciplina.professorId = professorId; }
  }

  // --- Lógica do Quadro de Horário ---
  onHorarioSelect(disciplinaId: string | null, indexHorario: number, indexDia: number): void {
    this.quadroDeHorario[indexHorario][indexDia] = { disciplinaId };
  }

  getDisciplinaCor(disciplinaId: string | null): string {
    if (disciplinaId === 'intervalo') return 'bg-gray-200 text-gray-500 italic';
    if (!disciplinaId) return 'bg-white';
    
    // Lógica simples para dar uma cor diferente para cada disciplina
    const cores = ['bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-purple-100', 'bg-pink-100', 'bg-indigo-100'];
    const index = this.disciplinasDaTurma.findIndex(d => d.id === disciplinaId) % cores.length;
    return cores[index] || 'bg-gray-100';
  }
}