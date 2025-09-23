import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { InputTextarea } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { FileUploadModule } from 'primeng/fileupload';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ChipModule } from 'primeng/chip';
import { BadgeModule } from 'primeng/badge';

import { Comunicado, FiltroComunicados } from '../../../../../core/models/comunicado.model';
import { ProfessorEstadoService } from '../../../../../shared/services/professor-estado.service';

@Component({
  selector: 'app-comunicados-list',
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    TagModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    DialogModule,
    InputTextarea,
    MultiSelectModule,
    FileUploadModule,
    TooltipModule,
    ConfirmDialogModule,
    ToastModule,
    ChipModule,
    BadgeModule
  ],
  templateUrl: './comunicados-list.component.html',
  styleUrl: './comunicados-list.component.css'
})
export class ComunicadosListComponent implements OnInit {

  comunicados: Comunicado[] = [];
  comunicadosFiltrados: Comunicado[] = [];

  // Modal de criação/edição
  showModalComunicado = false;
  comunicadoAtual: Partial<Comunicado> = {};
  isEditMode = false;

  // Modal de visualização
  showModalVisualizacao = false;
  comunicadoSelecionado: Comunicado | null = null;

  // Filtros
  filtros: FiltroComunicados = {};

  // Opções para dropdowns
  tiposOptions = [
    { label: 'Todos os Tipos', value: '' },
    { label: 'Geral', value: 'Geral' },
    { label: 'Turma', value: 'Turma' },
    { label: 'Urgente', value: 'Urgente' },
    { label: 'Evento', value: 'Evento' }
  ];

  statusOptions = [
    { label: 'Todos os Status', value: '' },
    { label: 'Rascunho', value: 'Rascunho' },
    { label: 'Enviado', value: 'Enviado' },
    { label: 'Programado', value: 'Programado' }
  ];

  prioridadeOptions = [
    { label: 'Todas as Prioridades', value: '' },
    { label: 'Baixa', value: 'Baixa' },
    { label: 'Média', value: 'Media' },
    { label: 'Alta', value: 'Alta' },
    { label: 'Urgente', value: 'Urgente' }
  ];

  // Opções para novo comunicado
  turmasOptions: any[] = [];
  tiposComunicado = [
    { label: 'Geral', value: 'Geral' },
    { label: 'Turma Específica', value: 'Turma' },
    { label: 'Urgente', value: 'Urgente' },
    { label: 'Evento', value: 'Evento' }
  ];

  prioridadesComunicado = [
    { label: 'Baixa', value: 'Baixa' },
    { label: 'Média', value: 'Media' },
    { label: 'Alta', value: 'Alta' },
    { label: 'Urgente', value: 'Urgente' }
  ];

  constructor(private professorEstado: ProfessorEstadoService) {}

  ngOnInit() {
    this.carregarTurmas();
    this.carregarComunicados();
    this.aplicarFiltros();
  }

  private carregarTurmas() {
    const turmas = this.professorEstado.obterTurmas();
    this.turmasOptions = [
      { label: 'Todas as Turmas', value: 'todos' },
      ...turmas.map(turma => ({
        label: turma.nomeTurma,
        value: turma.id
      }))
    ];
  }

  private carregarComunicados() {
    // Dados mockados
    this.comunicados = [
      {
        id: '1',
        titulo: 'Reunião de Pais - 2º Bimestre',
        conteudo: 'Prezados pais e responsáveis, informamos que será realizada a reunião de pais do 2º bimestre no próximo sábado, dia 15/03, às 09h00 no auditório da escola.',
        tipo: 'Evento',
        prioridade: 'Alta',
        status: 'Enviado',
        autor: 'Prof. Carlos Nogueira',
        destinatarios: ['todos'],
        dataCreacao: new Date('2024-03-01'),
        dataEnvio: new Date('2024-03-01'),
        dataExpiracao: new Date('2024-03-15'),
        visualizacoes: [
          { alunoId: 'a1', dataVisualizacao: new Date('2024-03-02'), respondido: true },
          { alunoId: 'a2', dataVisualizacao: new Date('2024-03-02'), respondido: false }
        ]
      },
      {
        id: '2',
        titulo: 'Prova de Geografia - 8º Ano A',
        conteudo: 'A prova de Geografia do 2º bimestre será realizada na próxima quinta-feira, dia 14/03, durante a aula. O conteúdo abrange os capítulos 5 e 6 do livro didático.',
        tipo: 'Turma',
        prioridade: 'Media',
        status: 'Enviado',
        autor: 'Prof. Carlos Nogueira',
        destinatarios: ['1'],
        dataCreacao: new Date('2024-03-05'),
        dataEnvio: new Date('2024-03-05'),
        visualizacoes: [
          { alunoId: 'a1', dataVisualizacao: new Date('2024-03-06'), respondido: false },
          { alunoId: 'a2', dataVisualizacao: new Date('2024-03-07'), respondido: false }
        ]
      },
      {
        id: '3',
        titulo: 'Trabalho em Grupo - Sustentabilidade',
        conteudo: 'Estou criando um novo trabalho sobre sustentabilidade ambiental. O trabalho será em grupos de até 4 alunos e deverá ser entregue até o final do mês.',
        tipo: 'Geral',
        prioridade: 'Media',
        status: 'Rascunho',
        autor: 'Prof. Carlos Nogueira',
        destinatarios: ['todos'],
        dataCreacao: new Date(),
        visualizacoes: []
      },
      {
        id: '4',
        titulo: 'URGENTE: Cancelamento de Aula',
        conteudo: 'Por motivos de saúde, a aula de hoje (12/03) está cancelada. A matéria será reposta na próxima semana.',
        tipo: 'Urgente',
        prioridade: 'Urgente',
        status: 'Enviado',
        autor: 'Prof. Carlos Nogueira',
        destinatarios: ['1', '2'],
        dataCreacao: new Date('2024-03-12'),
        dataEnvio: new Date('2024-03-12'),
        visualizacoes: [
          { alunoId: 'a1', dataVisualizacao: new Date('2024-03-12'), respondido: false }
        ]
      }
    ];
  }

  aplicarFiltros() {
    this.comunicadosFiltrados = this.comunicados.filter(comunicado => {
      const matchTexto = !this.filtros.texto ||
        comunicado.titulo.toLowerCase().includes(this.filtros.texto.toLowerCase()) ||
        comunicado.conteudo.toLowerCase().includes(this.filtros.texto.toLowerCase());

      const matchTipo = !this.filtros.tipo || comunicado.tipo === this.filtros.tipo;
      const matchStatus = !this.filtros.status || comunicado.status === this.filtros.status;
      const matchPrioridade = !this.filtros.prioridade || comunicado.prioridade === this.filtros.prioridade;

      const matchData = (!this.filtros.dataInicio || comunicado.dataCreacao >= this.filtros.dataInicio) &&
                       (!this.filtros.dataFim || comunicado.dataCreacao <= this.filtros.dataFim);

      return matchTexto && matchTipo && matchStatus && matchPrioridade && matchData;
    });
  }

  onFiltroChange() {
    this.aplicarFiltros();
  }

  limparFiltros() {
    this.filtros = {};
    this.aplicarFiltros();
  }

  novoComunicado() {
    this.comunicadoAtual = {
      tipo: 'Geral',
      prioridade: 'Media',
      status: 'Rascunho',
      destinatarios: ['todos'],
      autor: 'Prof. Carlos Nogueira',
      dataCreacao: new Date(),
      visualizacoes: []
    };
    this.isEditMode = false;
    this.showModalComunicado = true;
  }

  editarComunicado(comunicado: Comunicado) {
    this.comunicadoAtual = { ...comunicado };
    this.isEditMode = true;
    this.showModalComunicado = true;
  }

  salvarComunicado() {
    if (this.isEditMode) {
      const index = this.comunicados.findIndex(c => c.id === this.comunicadoAtual.id);
      if (index >= 0) {
        this.comunicados[index] = { ...this.comunicadoAtual as Comunicado };
      }
    } else {
      const novoComunicado: Comunicado = {
        ...this.comunicadoAtual as Comunicado,
        id: Date.now().toString(),
        dataCreacao: new Date()
      };
      this.comunicados.unshift(novoComunicado);
    }

    this.aplicarFiltros();
    this.fecharModal();
  }

  enviarComunicado(comunicado: Comunicado) {
    const index = this.comunicados.findIndex(c => c.id === comunicado.id);
    if (index >= 0) {
      this.comunicados[index].status = 'Enviado';
      this.comunicados[index].dataEnvio = new Date();
      this.aplicarFiltros();
    }
  }

  excluirComunicado(comunicado: Comunicado) {
    const index = this.comunicados.findIndex(c => c.id === comunicado.id);
    if (index >= 0) {
      this.comunicados.splice(index, 1);
      this.aplicarFiltros();
    }
  }

  visualizarComunicado(comunicado: Comunicado) {
    this.comunicadoSelecionado = comunicado;
    this.showModalVisualizacao = true;
  }

  fecharModal() {
    this.showModalComunicado = false;
    this.showModalVisualizacao = false;
    this.comunicadoAtual = {};
    this.comunicadoSelecionado = null;
  }

  getCorTipo(tipo: string): string {
    switch (tipo) {
      case 'Geral': return 'info';
      case 'Turma': return 'success';
      case 'Urgente': return 'danger';
      case 'Evento': return 'warning';
      default: return 'secondary';
    }
  }

  getCorPrioridade(prioridade: string): string {
    switch (prioridade) {
      case 'Baixa': return 'success';
      case 'Media': return 'info';
      case 'Alta': return 'warning';
      case 'Urgente': return 'danger';
      default: return 'secondary';
    }
  }

  getCorStatus(status: string): string {
    switch (status) {
      case 'Rascunho': return 'secondary';
      case 'Enviado': return 'success';
      case 'Programado': return 'info';
      default: return 'secondary';
    }
  }

  getEstatisticas(comunicado: Comunicado) {
    const total = comunicado.visualizacoes?.length || 0;
    const visualizados = total;
    const respondidos = comunicado.visualizacoes?.filter(v => v.respondido).length || 0;

    return {
      total,
      visualizados,
      respondidos,
      percentualVisualizacao: total > 0 ? Math.round((visualizados / total) * 100) : 0,
      percentualResposta: total > 0 ? Math.round((respondidos / total) * 100) : 0
    };
  }

  formatarData(data: Date): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }

  truncarTexto(texto: string, limite: number = 100): string {
    return texto.length > limite ? texto.substring(0, limite) + '...' : texto;
  }
}