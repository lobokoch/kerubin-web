/**********************************************************************************************
Code generated with MKL Plug-in version: 26.0.4
Code generated at time stamp: 2019-10-17T21:44:20.610
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { ConciliacaoTransacaoComponent } from './crud-conciliacaotransacao.component';
import { AuthGuard } from '../../../../security/auth.guard';
import { ConciliacaoTransacaoListComponent } from './list-conciliacaotransacao.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  // Must add in forRoot
  // { path: 'conciliacaotransacao', loadChildren: './modules/cadastros/banco/conciliacaotransacao/conciliacaotransacao.module#ConciliacaoTransacaoModule' }
  {
    path: '',
    component: ConciliacaoTransacaoListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'novo',
    component: ConciliacaoTransacaoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: ConciliacaoTransacaoComponent,
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

export class ConciliacaoTransacaoRoutingModule { }
