/**********************************************************************************************
Code generated with MKL Plug-in version: 40.2.5
Code generated at time stamp: 2019-12-31T10:27:51.742
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { ContaReceberComponent } from './crud-contareceber.component';
import { AuthGuard } from '../../../../security/auth.guard';
import { ContaReceberListComponent } from './list-contareceber.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  // Must add in forRoot
  // { path: 'contareceber', loadChildren: './modules/financeiro/contas_receber/contareceber/contareceber.module#ContaReceberModule' }
  {
    path: '',
    component: ContaReceberListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'novo',
    component: ContaReceberComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: ContaReceberComponent,
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

export class ContaReceberRoutingModule { }
