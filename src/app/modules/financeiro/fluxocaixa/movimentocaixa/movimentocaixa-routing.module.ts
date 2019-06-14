/**********************************************************************************************
Code generated with MKL Plug-in version: 3.9.0
Code generated at time stamp: 2019-06-14T00:00:25.670
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { MovimentoCaixaComponent } from './crud-movimentocaixa.component';
import { AuthGuard } from '../../../../security/auth.guard';
import { MovimentoCaixaListComponent } from './list-movimentocaixa.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  // Must add in forRoot
  // { path: 'movimentocaixa', loadChildren: './modules/financeiro/fluxo_caixa/movimentocaixa/movimentocaixa.module#MovimentoCaixaModule' }
  {
    path: '',
    component: MovimentoCaixaListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'novo',
    component: MovimentoCaixaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: MovimentoCaixaComponent,
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

export class MovimentoCaixaRoutingModule { }
