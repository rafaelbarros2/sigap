export interface Aluno {
  id: string;
  nomeCompleto: string;
  matricula: string;
  turma: string;
  status: 'Ativo' | 'Inativo';
  email?: string;
  telefone?: string;
  dataNascimento?: Date;
  cpf?: string;
  endereco?: {
    cep?: string;
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    uf?: string;
  };
  responsavel?: {
    nome?: string;
    telefone?: string;
    email?: string;
    parentesco?: string;
  };
}
