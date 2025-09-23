export interface Professor {
  id: string;
  nomeCompleto: string;
  cpf: string;
  email: string;
  telefone: string;
  dataNascimento?: Date;
  status: 'Ativo' | 'Inativo';
  materias: string[];
  cargaHoraria?: number;
  salario?: number;
  dataAdmissao?: Date;
  endereco?: {
    cep?: string;
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    uf?: string;
  };
  formacaoAcademica: {
    graduacao: string;
    instituicao: string;
    anoConclusao?: number;
    posGraduacao?: string;
    instituicaoPosGrad?: string;
    anoConclusaoPosGrad?: number;
    mestrado?: string;
    instituicaoMestrado?: string;
    anoConclusaoMestrado?: number;
    doutorado?: string;
    instituicaoDoutorado?: string;
    anoConclusaoDoutorado?: number;
  };
  experienciaProfissional?: {
    tempoExperiencia?: number;
    escolasAnteriores?: string;
    especialidades?: string[];
  };
}