/**********************************************************************************************
Code generated with MKL Plug-in version: 3.11.1
Code generated at time stamp: 2019-06-16T23:35:31.119
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { CaixaLancamentoComponent } from './crud-caixalancamento.component';
import { AuthGuard } from '../../../../security/auth.guard';
import { CaixaLancamentoListComponent } from './list-caixalancamento.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  // Must add in forRoot
  // { path: 'caixalancamento', loadChildren: './modules/financeiro/fluxo_caixa/caixalancamento/caixalancamento.module#CaixaLancamentoModule' }
  {
    path: '',
    component: CaixaLancamentoListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'novo',
    component: CaixaLancamentoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: CaixaLancamentoComponent,
    canActivate: [AuthGuard]
  }
];


@NgModule({

  imports: [
    RouterModule.forChild(routes)
  ],

  exports: [
    RouterModule
  ]

})

export class CaixaLancamentoRoutingModule { }