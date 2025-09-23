import { Injectable, signal, computed } from '@angular/core';
import {
  AlunoDiario,
  TurmaInfo,
  EstadoDiario,
  TipoPresenca,
  TipoBimestre
} from '../../core/models/professor-diario.model';

@Injectable({
  providedIn: 'root'
})
export class ProfessorEstadoService {

  // Estado principal usando signals
  private _estadoDiario = signal<EstadoDiario>({
    turmaAtual: null,
    alunosDaTurma: [],
    abaAtiva: 'frequencia',
    dataAtual: new Date()
  });

  // Signals computados para facilitar o acesso
  turmaAtual = computed(() => this._estadoDiario().turmaAtual);
  alunosDaTurma = computed(() => this._estadoDiario().alunosDaTurma);
  abaAtiva = computed(() => this._estadoDiario().abaAtiva);
  dataAtual = computed(() => this._estadoDiario().dataAtual);

  // Dados mockados das turmas
  private turmasMock: TurmaInfo[] = [
    {
      id: '1',
      nomeTurma: '8º Ano A',
      disciplina: 'Geografia',
      periodo: 'Manhã',
      totalAlunos: 32
    },
    {
      id: '2',
      nomeTurma: '7º Ano C',
      disciplina: 'Geografia',
      periodo: 'Manhã',
      totalAlunos: 28
    },
    {
      id: '3',
      nomeTurma: '9º Ano B',
      disciplina: 'Geografia',
      periodo: 'Tarde',
      totalAlunos: 30
    },
    {
      id: '4',
      nomeTurma: '6º Ano A',
      disciplina: 'Geografia',
      periodo: 'Tarde',
      totalAlunos: 25
    }
  ];

  // Dados mockados dos alunos por turma
  private alunosPorTurma: { [turmaId: string]: AlunoDiario[] } = {
    '1': [
      { id: 'a1', nome: 'Ana Clara Vasconcelos', matricula: '2025010', presenca: 'P', notas: { b1: 8.5, b2: 9.0, b3: null, b4: null }, mediaFinal: 8.8 },
      { id: 'a2', nome: 'Bruno Costa Guimarães', matricula: '2025011', presenca: 'P', notas: { b1: 7.0, b2: 6.5, b3: null, b4: null }, mediaFinal: 6.8 },
      { id: 'a3', nome: 'Carlos Eduardo Santos', matricula: '2025012', presenca: 'F', notas: { b1: 5.5, b2: 4.0, b3: null, b4: null }, mediaFinal: 4.8 },
      { id: 'a4', nome: 'Daniela Ferreira Alves', matricula: '2025013', presenca: 'P', notas: { b1: 9.5, b2: 10.0, b3: null, b4: null }, mediaFinal: 9.8 },
      { id: 'a5', nome: 'Eduardo Pereira Lima', matricula: '2025014', presenca: 'P', notas: { b1: null, b2: null, b3: null, b4: null }, mediaFinal: null },
    ],
    '2': [
      { id: 'a6', nome: 'Fernanda Silva Santos', matricula: '2025020', presenca: 'P', notas: { b1: 8.0, b2: 7.5, b3: null, b4: null }, mediaFinal: 7.8 },
      { id: 'a7', nome: 'Gabriel Oliveira Costa', matricula: '2025021', presenca: 'F', notas: { b1: 6.0, b2: 5.5, b3: null, b4: null }, mediaFinal: 5.8 },
      { id: 'a8', nome: 'Helena Rodrigues Lima', matricula: '2025022', presenca: 'P', notas: { b1: 9.0, b2: 8.5, b3: null, b4: null }, mediaFinal: 8.8 },
    ],
    '3': [
      { id: 'a9', nome: 'Igor Martins Souza', matricula: '2025030', presenca: 'P', notas: { b1: 7.5, b2: 8.0, b3: null, b4: null }, mediaFinal: 7.8 },
      { id: 'a10', nome: 'Juliana Pereira Alves', matricula: '2025031', presenca: 'P', notas: { b1: 9.5, b2: 9.0, b3: null, b4: null }, mediaFinal: 9.3 },
    ],
    '4': [
      { id: 'a11', nome: 'Kevin Santos Silva', matricula: '2025040', presenca: 'F', notas: { b1: 6.5, b2: 7.0, b3: null, b4: null }, mediaFinal: 6.8 },
      { id: 'a12', nome: 'Larissa Costa Ferreira', matricula: '2025041', presenca: 'P', notas: { b1: 8.5, b2: 8.0, b3: null, b4: null }, mediaFinal: 8.3 },
    ]
  };

  // Métodos para obter dados
  obterTurmas(): TurmaInfo[] {
    return this.turmasMock;
  }

  obterTurmaPorId(id: string): TurmaInfo | undefined {
    return this.turmasMock.find(turma => turma.id === id);
  }

  // Métodos para gerenciar estado
  selecionarTurma(turmaId: string): void {
    const turma = this.obterTurmaPorId(turmaId);
    if (turma) {
      const alunos = this.alunosPorTurma[turmaId] || [];

      this._estadoDiario.update(estado => ({
        ...estado,
        turmaAtual: turma,
        alunosDaTurma: alunos,
        abaAtiva: 'frequencia' // Reset para frequência ao trocar turma
      }));
    }
  }

  alternarAba(aba: 'frequencia' | 'notas'): void {
    this._estadoDiario.update(estado => ({
      ...estado,
      abaAtiva: aba
    }));
  }

  atualizarPresenca(alunoId: string, presenca: TipoPresenca): void {
    this._estadoDiario.update(estado => ({
      ...estado,
      alunosDaTurma: estado.alunosDaTurma.map(aluno =>
        aluno.id === alunoId
          ? { ...aluno, presenca }
          : aluno
      )
    }));
  }

  atualizarNota(alunoId: string, bimestre: TipoBimestre, nota: number | null): void {
    this._estadoDiario.update(estado => ({
      ...estado,
      alunosDaTurma: estado.alunosDaTurma.map(aluno => {
        if (aluno.id === alunoId) {
          const notasAtualizadas = { ...aluno.notas, [bimestre]: nota };
          const mediaFinal = this.calcularMediaFinal(notasAtualizadas);

          return {
            ...aluno,
            notas: notasAtualizadas,
            mediaFinal
          };
        }
        return aluno;
      })
    }));
  }

  limparEstado(): void {
    this._estadoDiario.set({
      turmaAtual: null,
      alunosDaTurma: [],
      abaAtiva: 'frequencia',
      dataAtual: new Date()
    });
  }

  // Método auxiliar para calcular média final
  private calcularMediaFinal(notas: AlunoDiario['notas']): number | null {
    const notasValidas = Object.values(notas).filter(nota => nota !== null) as number[];

    if (notasValidas.length === 0) return null;

    const soma = notasValidas.reduce((acc, nota) => acc + nota, 0);
    return soma / notasValidas.length;
  }

  // Computed para estatísticas úteis
  estatisticasTurma = computed(() => {
    const alunos = this.alunosDaTurma();
    const total = alunos.length;
    const presentes = alunos.filter(a => a.presenca === 'P').length;
    const ausentes = alunos.filter(a => a.presenca === 'F').length;
    const semRegistro = alunos.filter(a => a.presenca === null).length;

    const comNota = alunos.filter(a => a.mediaFinal !== null).length;
    const aprovados = alunos.filter(a => a.mediaFinal !== null && a.mediaFinal >= 7).length;
    const reprovados = alunos.filter(a => a.mediaFinal !== null && a.mediaFinal < 7).length;

    return {
      total,
      presentes,
      ausentes,
      semRegistro,
      comNota,
      aprovados,
      reprovados,
      percentualPresenca: total > 0 ? Math.round((presentes / total) * 100) : 0,
      percentualAprovacao: comNota > 0 ? Math.round((aprovados / comNota) * 100) : 0
    };
  });
}