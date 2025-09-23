export interface Turma {
  id: string;
  nome: string;
  nivel: 'Ensino Fundamental' | 'Ensino Médio';
  periodo: 'Manhã' | 'Tarde';
  anoLetivo: number;
  capacidadeMaxima: number;
  professorResponsavel?: string;
  sala?: string;
  status: 'Ativa' | 'Inativa';
  totalAlunos?: number;
}


export interface DisciplinaVinculada {
  id: string;
  nome: string;
  professorId: string | null; // ID do professor vinculado
}

export interface MinhaTurma {
  id: string;
  nomeTurma: string; // Ex: "8º Ano A"
  disciplina: string; // Ex: "Geografia"
  totalAlunos: number;
  periodo: 'Manhã' | 'Tarde';
}

export interface AulaDoDia {
  horario: string; // Ex: "07:30 - 08:20"
  turma: string;   // Ex: "8º Ano A"
  disciplina: string; // Ex: "Geografia"
}


