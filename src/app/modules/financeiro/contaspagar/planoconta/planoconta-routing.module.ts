/**********************************************************************************************
Code generated with MKL Plug-in version: 22.2.3
Code generated at time stamp: 2019-09-11T06:24:19.516
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { PlanoContaComponent } from './crud-planoconta.component';
import { AuthGuard } from '../../../../security/auth.guard';
import { PlanoContaListComponent } from './list-planoconta.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  // Must add in forRoot
  // { path: 'planoconta', loadChildren: './modules/financeiro/contas_pagar/planoconta/planoconta.module#PlanoContaModule' }
  {
    path: '',
    component: PlanoContaListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'novo',
    component: PlanoContaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: PlanoContaComponent,
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

export class PlanoContaRoutingModule { }
