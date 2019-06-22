/**********************************************************************************************
Code generated with MKL Plug-in version: 3.20.3
Code generated at time stamp: 2019-06-22T18:21:47.106
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { CaixaDiarioComponent } from './crud-caixadiario.component';
import { AuthGuard } from '../../../../security/auth.guard';
import { CaixaDiarioListComponent } from './list-caixadiario.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  // Must add in forRoot
  // { path: 'caixadiario', loadChildren: './modules/financeiro/fluxo_caixa/caixadiario/caixadiario.module#CaixaDiarioModule' }
  {
    path: '',
    component: CaixaDiarioListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'novo',
    component: CaixaDiarioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: CaixaDiarioComponent,
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

export class CaixaDiarioRoutingModule { }
