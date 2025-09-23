import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { TabViewModule } from 'primeng/tabview';

import { ProfessorEstadoService } from '../../../../../shared/services/professor-estado.service';
import { AlunoDiario, TipoPresenca, TipoBimestre } from '../../../../../core/models/professor-diario.model';

@Component({
  selector: 'app-diario-classe',
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    TagModule,
    TableModule,
    InputNumberModule,
    TabViewModule
  ],
  templateUrl: './diario-classe.component.html',
  styleUrl: './diario-classe.component.css'
})
export class DiarioClasseComponent implements OnInit, OnDestroy {

  // Signals do service - inicializados no constructor
  turmaAtual;
  alunosDaTurma;
  abaAtiva;
  estatisticas;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private professorEstado: ProfessorEstadoService
  ) {
    // Inicializar signals após injeção do service
    this.turmaAtual = this.professorEstado.turmaAtual;
    this.alunosDaTurma = this.professorEstado.alunosDaTurma;
    this.abaAtiva = this.professorEstado.abaAtiva;
    this.estatisticas = this.professorEstado.estatisticasTurma;
  }

  ngOnInit() {
    // Pegar o ID da turma da rota
    const turmaId = this.route.snapshot.paramMap.get('id');
    if (turmaId) {
      this.professorEstado.selecionarTurma(turmaId);
    } else {
      // Se não há ID, volta pro painel
      this.voltarAoPainel();
    }
  }

  ngOnDestroy() {
    // Opcional: limpar estado quando sair do componente
    // this.professorEstado.limparEstado();
  }

  voltarAoPainel() {
    this.router.navigate(['/painel-prof']);
  }

  alternarAba(aba: 'frequencia' | 'notas') {
    this.professorEstado.alternarAba(aba);
  }

  onTabChange(index: number) {
    const aba = index === 0 ? 'frequencia' : 'notas';
    this.professorEstado.alternarAba(aba);
  }

  atualizarPresenca(alunoId: string, presenca: TipoPresenca) {
    this.professorEstado.atualizarPresenca(alunoId, presenca);
  }

  atualizarNota(alunoId: string, bimestre: TipoBimestre, event: any) {
    const nota = event.value;
    this.professorEstado.atualizarNota(alunoId, bimestre, nota);
  }

  isPresencaSelecionada(aluno: AlunoDiario, presenca: TipoPresenca): boolean {
    return aluno.presenca === presenca;
  }

  getCorMedia(media: number | null): string {
    if (media === null) return 'text-gray-500';
    return media >= 7 ? 'text-green-600' : 'text-red-600';
  }

  salvarDados() {
    // Aqui você implementaria a lógica para salvar no backend
    console.log('Salvando dados...', {
      turma: this.turmaAtual(),
      alunos: this.alunosDaTurma()
    });

    // Feedback visual seria implementado aqui
    alert('Dados salvos com sucesso!');
  }
}