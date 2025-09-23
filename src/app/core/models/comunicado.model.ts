export interface Comunicado {
  id: string;
  titulo: string;
  conteudo: string;
  tipo: 'Geral' | 'Turma' | 'Urgente' | 'Evento';
  prioridade: 'Baixa' | 'Media' | 'Alta' | 'Urgente';
  status: 'Rascunho' | 'Enviado' | 'Programado';
  autor: string;
  destinatarios: string[]; // IDs das turmas ou 'todos'
  dataCreacao: Date;
  dataEnvio?: Date;
  dataExpiracao?: Date;
  anexos?: AnexoComunicado[];
  visualizacoes?: VisualizacaoComunicado[];
  respostas?: RespostaComunicado[];
}

export interface AnexoComunicado {
  id: string;
  nome: string;
  url: string;
  tamanho: number;
  tipo: string;
}

export interface VisualizacaoComunicado {
  alunoId: string;
  dataVisualizacao: Date;
  respondido: boolean;
}

export interface RespostaComunicado {
  id: string;
  alunoId: string;
  nomeAluno: string;
  conteudo: string;
  dataResposta: Date;
}

export interface FiltroComunicados {
  tipo?: string;
  status?: string;
  prioridade?: string;
  dataInicio?: Date;
  dataFim?: Date;
  texto?: string;
}

export interface EstatisticasComunicado {
  totalEnviados: number;
  totalVisualizados: number;
  totalRespostas: number;
  percentualVisualizacao: number;
  percentualResposta: number;
}