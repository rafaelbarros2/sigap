export interface AlunoDiario {
  id: string;
  nome: string;
  matricula: string;
  presenca: 'P' | 'F' | null; // P = Presente, F = Falta
  notas: {
    b1: number | null;
    b2: number | null;
    b3: number | null;
    b4: number | null;
  };
  mediaFinal: number | null;
}

export interface TurmaInfo {
  id: string;
  nomeTurma: string;
  disciplina: string;
  periodo: 'Manhã' | 'Tarde';
  totalAlunos: number;
}

export interface AulaInfo {
  id: string;
  turmaId: string;
  turma: string;
  materia: string;
  horario: string;
  data: Date;
}

export interface EstadoDiario {
  turmaAtual: TurmaInfo | null;
  alunosDaTurma: AlunoDiario[];
  abaAtiva: 'frequencia' | 'notas';
  dataAtual: Date;
}

export type TipoPresenca = 'P' | 'F' | null;
export type TipoBimestre = 'b1' | 'b2' | 'b3' | 'b4';