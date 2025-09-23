import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Aluno } from '../../core/models/alunos.model';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private alunos: Aluno[] = [
    { id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', nomeCompleto: 'João da Silva Pereira', matricula: '2024001', turma: '8º Ano A', status: 'Ativo' },
    { id: '2c9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bee', nomeCompleto: 'Maria Oliveira Souza', matricula: '2024002', turma: '9º Ano B', status: 'Ativo' },
    { id: '3d9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bef', nomeCompleto: 'Carlos Eduardo Lima', matricula: '2023054', turma: '7º Ano C', status: 'Inativo' },
    { id: '4e9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4beg', nomeCompleto: 'Ana Clara Ferreira', matricula: '2024003', turma: '8º Ano A', status: 'Ativo' },

  ];

  constructor() { }

  // Simula a busca de todos os alunos
  getAlunos(): Observable<Aluno[]> {
    return of(this.alunos).pipe(delay(500)); // Simula latência de rede
  }

  // Simula a adição de um novo aluno
  addAluno(alunoData: Omit<Aluno, 'id' | 'matricula'>): Observable<Aluno> {
    const newAluno: Aluno = {
      ...alunoData,
      id: crypto.randomUUID(),
      matricula: `2024${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`
    };
    this.alunos.push(newAluno);
    return of(newAluno).pipe(delay(500));
  }

  // Simula a atualização de um aluno existente
  updateAluno(aluno: Aluno): Observable<Aluno> {
    const index = this.alunos.findIndex(a => a.id === aluno.id);
    if (index > -1) {
      this.alunos[index] = aluno;
      return of(aluno).pipe(delay(500));
    }
    return throwError(() => new Error('Aluno não encontrado'));
  }

  // Simula a exclusão de um aluno
  deleteAluno(id: string): Observable<boolean> {
    const index = this.alunos.findIndex(a => a.id === id);
    if (index > -1) {
      this.alunos.splice(index, 1);
      return of(true).pipe(delay(500));
    }
    return of(false).pipe(delay(500));
  }
}

