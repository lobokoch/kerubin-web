/**********************************************************************************************
Code generated with MKL Plug-in version: 40.2.5
Code generated at time stamp: 2019-12-31T10:27:34.608
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { ConciliacaoBancariaComponent } from './crud-conciliacaobancaria.component';
import { AuthGuard } from '../../../../security/auth.guard';
import { ConciliacaoBancariaListComponent } from './list-conciliacaobancaria.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  // Must add in forRoot
  // { path: 'conciliacaobancaria', loadChildren: './modules/cadastros/banco/conciliacaobancaria/conciliacaobancaria.module#ConciliacaoBancariaModule' }
  {
    path: '',
    component: ConciliacaoBancariaListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'novo',
    component: ConciliacaoBancariaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: ConciliacaoBancariaComponent,
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

export class ConciliacaoBancariaRoutingModule { }
