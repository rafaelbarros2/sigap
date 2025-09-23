export interface HorarioAula {
  id: string;
  descricao: string; // Ex: "1º Horário"
  hora: string; // Ex: "07:30 - 08:20"
}

export interface CelulaHorario {
  disciplinaId: string | null;
}