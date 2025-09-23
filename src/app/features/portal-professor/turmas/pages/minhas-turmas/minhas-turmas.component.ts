import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ChipModule } from 'primeng/chip';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';

import { ProfessorEstadoService } from '../../../../../shared/services/professor-estado.service';
import { TurmaInfo } from '../../../../../core/models/professor-diario.model';

interface TurmaDetalhada extends TurmaInfo {
  proximaAula: string;
  frequenciaMedia: number;
  mediaGeral: number;
  totalAulas: number;
  aulasRealizadas: number;
  statusTurma: 'Em Andamento' | 'Finalizada' | 'Aguardando';
}

@Component({
  selector: 'app-minhas-turmas',
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    TagModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    ProgressBarModule,
    ChipModule,
    AvatarModule,
    TooltipModule
  ],
  templateUrl: './minhas-turmas.component.html',
  styleUrl: './minhas-turmas.component.css'
})
export class MinhasTurmasComponent implements OnInit {

  turmasDetalhadas: TurmaDetalhada[] = [];
  turmasFiltradas: TurmaDetalhada[] = [];

  // Filtros
  filtroTexto: string = '';
  filtroPeriodo: string = '';
  filtroStatus: string = '';

  // Opções para filtros
  periodosOptions = [
    { label: 'Todos os Períodos', value: '' },
    { label: 'Manhã', value: 'Manhã' },
    { label: 'Tarde', value: 'Tarde' }
  ];

  statusOptions = [
    { label: 'Todos os Status', value: '' },
    { label: 'Em Andamento', value: 'Em Andamento' },
    { label: 'Finalizada', value: 'Finalizada' },
    { label: 'Aguardando', value: 'Aguardando' }
  ];

  // View mode: 'cards' ou 'table'
  modoVisualizacao: 'cards' | 'table' = 'cards';

  constructor(
    private router: Router,
    private professorEstado: ProfessorEstadoService
  ) {}

  ngOnInit() {
    this.carregarTurmasDetalhadas();
    this.aplicarFiltros();
  }

  private carregarTurmasDetalhadas() {
    const turmasBase = this.professorEstado.obterTurmas();

    this.turmasDetalhadas = turmasBase.map(turma => ({
      ...turma,
      proximaAula: this.gerarProximaAula(turma),
      frequenciaMedia: this.gerarFrequenciaMedia(),
      mediaGeral: this.gerarMediaGeral(),
      totalAulas: this.gerarTotalAulas(),
      aulasRealizadas: this.gerarAulasRealizadas(),
      statusTurma: this.gerarStatusTurma() as 'Em Andamento' | 'Finalizada' | 'Aguardando'
    }));
  }

  private gerarProximaAula(turma: TurmaInfo): string {
    const horariosManhas = ['07:30', '08:20', '09:30', '10:20'];
    const horariosTarde = ['13:30', '14:20', '15:10', '16:00'];

    const horarios = turma.periodo === 'Manhã' ? horariosManhas : horariosTarde;
    const horario = horarios[Math.floor(Math.random() * horarios.length)];

    const dias = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
    const dia = dias[Math.floor(Math.random() * dias.length)];

    return `${dia} - ${horario}`;
  }

  private gerarFrequenciaMedia(): number {
    return Math.floor(Math.random() * 30) + 70; // 70-100%
  }

  private gerarMediaGeral(): number {
    return Math.round((Math.random() * 3 + 6) * 10) / 10; // 6.0-9.0
  }

  private gerarTotalAulas(): number {
    return Math.floor(Math.random() * 20) + 40; // 40-60 aulas
  }

  private gerarAulasRealizadas(): number {
    const total = this.gerarTotalAulas();
    return Math.floor(Math.random() * (total * 0.3)) + Math.floor(total * 0.6); // 60-90% do total
  }

  private gerarStatusTurma(): string {
    const status = ['Em Andamento', 'Em Andamento', 'Em Andamento', 'Finalizada', 'Aguardando'];
    return status[Math.floor(Math.random() * status.length)];
  }

  aplicarFiltros() {
    this.turmasFiltradas = this.turmasDetalhadas.filter(turma => {
      const matchTexto = this.filtroTexto === '' ||
        turma.nomeTurma.toLowerCase().includes(this.filtroTexto.toLowerCase()) ||
        turma.disciplina.toLowerCase().includes(this.filtroTexto.toLowerCase());

      const matchPeriodo = this.filtroPeriodo === '' || turma.periodo === this.filtroPeriodo;
      const matchStatus = this.filtroStatus === '' || turma.statusTurma === this.filtroStatus;

      return matchTexto && matchPeriodo && matchStatus;
    });
  }

  onFiltroChange() {
    this.aplicarFiltros();
  }

  limparFiltros() {
    this.filtroTexto = '';
    this.filtroPeriodo = '';
    this.filtroStatus = '';
    this.aplicarFiltros();
  }

  alternarVisualizacao() {
    this.modoVisualizacao = this.modoVisualizacao === 'cards' ? 'table' : 'cards';
  }

  abrirDiarioClasse(turma: TurmaDetalhada) {
    this.router.navigate(['/diario-classe', turma.id]);
  }

  verDetalhes(turma: TurmaDetalhada) {
    // Implementar navegação para detalhes da turma
    console.log('Ver detalhes da turma:', turma.nomeTurma);
  }

  gerarRelatorio(turma: TurmaDetalhada) {
    // Implementar geração de relatório
    console.log('Gerar relatório da turma:', turma.nomeTurma);
  }

  getProgressoAulas(turma: TurmaDetalhada): number {
    return Math.round((turma.aulasRealizadas / turma.totalAulas) * 100);
  }

  getCorStatus(status: string): string {
    switch (status) {
      case 'Em Andamento': return 'success';
      case 'Finalizada': return 'info';
      case 'Aguardando': return 'warning';
      default: return 'secondary';
    }
  }

  getCorMedia(media: number): string {
    if (media >= 8) return 'text-green-600';
    if (media >= 7) return 'text-blue-600';
    if (media >= 6) return 'text-yellow-600';
    return 'text-red-600';
  }

  getCorFrequencia(frequencia: number): string {
    if (frequencia >= 90) return 'text-green-600';
    if (frequencia >= 80) return 'text-blue-600';
    if (frequencia >= 70) return 'text-yellow-600';
    return 'text-red-600';
  }
}