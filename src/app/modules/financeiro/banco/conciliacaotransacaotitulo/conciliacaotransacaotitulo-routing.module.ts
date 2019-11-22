/**********************************************************************************************
Code generated with MKL Plug-in version: 30.0.4
Code generated at time stamp: 2019-11-20T06:17:24.247
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { ConciliacaoTransacaoTituloComponent } from './crud-conciliacaotransacaotitulo.component';
import { AuthGuard } from '../../../../security/auth.guard';
import { ConciliacaoTransacaoTituloListComponent } from './list-conciliacaotransacaotitulo.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  // Must add in forRoot
  // { path: 'conciliacaotransacaotitulo', loadChildren: './modules/cadastros/banco/conciliacaotransacaotitulo/conciliacaotransacaotitulo.module#ConciliacaoTransacaoTituloModule' }
  {
    path: '',
    component: ConciliacaoTransacaoTituloListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'novo',
    component: ConciliacaoTransacaoTituloComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: ConciliacaoTransacaoTituloComponent,
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

export class ConciliacaoTransacaoTituloRoutingModule { }
