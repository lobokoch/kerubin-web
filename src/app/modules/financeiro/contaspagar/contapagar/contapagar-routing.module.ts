/**********************************************************************************************
Code generated with MKL Plug-in version: 7.19.6
Code generated at time stamp: 2019-08-18T11:25:25.413
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { ContaPagarComponent } from './crud-contapagar.component';
import { AuthGuard } from '../../../../security/auth.guard';
import { ContaPagarListComponent } from './list-contapagar.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  // Must add in forRoot
  // { path: 'contapagar', loadChildren: './modules/financeiro/contas_pagar/contapagar/contapagar.module#ContaPagarModule' }
  {
    path: '',
    component: ContaPagarListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'novo',
    component: ContaPagarComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: ContaPagarComponent,
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

export class ContaPagarRoutingModule { }
