import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CalendarModule } from 'primeng/calendar';

interface Turma {
  id: string;
  nome: string;
  materia: string;
  periodo: 'Manhã' | 'Tarde';
  totalAlunos: number;
  cor: 'info' | 'success' | 'warning' | 'danger';
}

interface Aula {
  id: string;
  turmaId: string;
  turma: string;
  materia: string;
  horario: string;
  data: Date;
}

@Component({
  selector: 'app-painel-prof',
  imports: [CommonModule, FormsModule, CardModule, ButtonModule, TagModule, CalendarModule],
  templateUrl: './painel-prof.component.html',
  styleUrl: './painel-prof.component.css'
})
export class PainelProfComponent implements OnInit {
  dataSelecionada: Date = new Date();

  constructor(private router: Router) {}

  turmas: Turma[] = [
    {
      id: '1',
      nome: '8º Ano A',
      materia: 'Geografia',
      periodo: 'Manhã',
      totalAlunos: 32,
      cor: 'info'
    },
    {
      id: '2',
      nome: '7º Ano C',
      materia: 'Geografia',
      periodo: 'Manhã',
      totalAlunos: 28,
      cor: 'success'
    },
    {
      id: '3',
      nome: '9º Ano B',
      materia: 'Geografia',
      periodo: 'Tarde',
      totalAlunos: 30,
      cor: 'warning'
    },
    {
      id: '4',
      nome: '6º Ano A',
      materia: 'Geografia',
      periodo: 'Tarde',
      totalAlunos: 25,
      cor: 'danger'
    }
  ];

  todasAulas: Aula[] = [
    // Segunda-feira (hoje)
    { id: '1', turmaId: '1', turma: '8º Ano A', materia: 'Geografia', horario: '07:30 - 08:20', data: new Date() },
    { id: '2', turmaId: '1', turma: '8º Ano A', materia: 'Geografia', horario: '08:20 - 09:10', data: new Date() },
    { id: '3', turmaId: '2', turma: '7º Ano C', materia: 'Geografia', horario: '09:30 - 10:20', data: new Date() },
    { id: '4', turmaId: '3', turma: '9º Ano B', materia: 'Geografia', horario: '13:30 - 14:20', data: new Date() },
    { id: '5', turmaId: '4', turma: '6º Ano A', materia: 'Geografia', horario: '14:20 - 15:10', data: new Date() },

    // Terça-feira
    { id: '6', turmaId: '2', turma: '7º Ano C', materia: 'Geografia', horario: '07:30 - 08:20', data: this.getDatePlusDays(1) },
    { id: '7', turmaId: '1', turma: '8º Ano A', materia: 'Geografia', horario: '09:30 - 10:20', data: this.getDatePlusDays(1) },
    { id: '8', turmaId: '4', turma: '6º Ano A', materia: 'Geografia', horario: '13:30 - 14:20', data: this.getDatePlusDays(1) },

    // Quarta-feira
    { id: '9', turmaId: '3', turma: '9º Ano B', materia: 'Geografia', horario: '08:20 - 09:10', data: this.getDatePlusDays(2) },
    { id: '10', turmaId: '1', turma: '8º Ano A', materia: 'Geografia', horario: '10:30 - 11:20', data: this.getDatePlusDays(2) },
    { id: '11', turmaId: '2', turma: '7º Ano C', materia: 'Geografia', horario: '14:20 - 15:10', data: this.getDatePlusDays(2) }
  ];

  aulasFiltradas: Aula[] = [];
  turmasFiltradas: Turma[] = [];

  ngOnInit() {
    this.filtrarPorData();
  }

  private getDatePlusDays(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }

  onDataChange() {
    this.filtrarPorData();
  }

  private filtrarPorData() {
    if (!this.dataSelecionada) {
      this.aulasFiltradas = [];
      this.turmasFiltradas = [];
      return;
    }

    // Filtrar aulas pela data selecionada
    this.aulasFiltradas = this.todasAulas.filter(aula =>
      this.isSameDate(aula.data, this.dataSelecionada)
    );

    // Filtrar turmas que têm aulas na data selecionada
    const turmasComAulas = new Set(this.aulasFiltradas.map(aula => aula.turmaId));
    this.turmasFiltradas = this.turmas.filter(turma =>
      turmasComAulas.has(turma.id)
    );
  }

  private isSameDate(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }

  abrirDiarioClasse(turma: Turma) {
    this.router.navigate(['/diario-classe', turma.id]);
  }
}