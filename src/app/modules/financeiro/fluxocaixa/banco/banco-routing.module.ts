/**********************************************************************************************
Code generated with MKL Plug-in version: 7.0.3
Code generated at time stamp: 2019-07-24T07:02:34.124
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { BancoComponent } from './crud-banco.component';
import { AuthGuard } from '../../../../security/auth.guard';
import { BancoListComponent } from './list-banco.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  // Must add in forRoot
  // { path: 'banco', loadChildren: './modules/financeiro/fluxo_caixa/banco/banco.module#BancoModule' }
  {
    path: '',
    component: BancoListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'novo',
    component: BancoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: BancoComponent,
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

export class BancoRoutingModule { }
