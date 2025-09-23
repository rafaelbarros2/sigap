import { Routes } from '@angular/router';
import { ListaTurmasComponent } from './features/portal-secretario/turmas/pages/lista-turmas/lista-turmas.component';
import { GerenciarTurmaComponent } from './features/portal-secretario/turmas/components/gerenciar-turma/gerenciar-turma.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/alunos',
    pathMatch: 'full'
  },
  {
    path: 'alunos',
    loadComponent: () => import('./features/portal-secretario/alunos/pages/alunos-list/alunos-list.component').then(c => c.AlunosListComponent)
  },
  {
    path: 'professores',
    loadComponent: () => import('./features/portal-secretario/professores/pages/professores-list/professores-list.component').then(c => c.ProfessoresListComponent)
  },
   {
        path: 'turmas',
        children: [
            // Quando aceder a /turmas, mostra a lista
            { path: '', component: ListaTurmasComponent },

            // Quando aceder a /turmas/gerenciar/t1 (por exemplo), mostra os detalhes
            { path: 'gerenciar/:id', component: GerenciarTurmaComponent }
        ]
      },
  {
    path: 'painel-prof',
    loadComponent: () => import('./features/portal-professor/painel/pages/painel-prof/painel-prof.component').then(c => c.PainelProfComponent)
  },
  {
    path: 'diario-classe/:id',
    loadComponent: () => import('./features/portal-professor/diario/pages/diario-classe/diario-classe.component').then(c => c.DiarioClasseComponent)
  },
  {
    path: 'minhas-turmas',
    loadComponent: () => import('./features/portal-professor/turmas/pages/minhas-turmas/minhas-turmas.component').then(c => c.MinhasTurmasComponent)
  },
  {
    path: 'comunicados',
    loadComponent: () => import('./features/portal-professor/comunicados/pages/comunicados-list/comunicados-list.component').then(c => c.ComunicadosListComponent)
  }
];
