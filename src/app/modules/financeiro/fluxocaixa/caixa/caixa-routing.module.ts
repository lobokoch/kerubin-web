/**********************************************************************************************
Code generated with MKL Plug-in version: 60.0.6
Copyright: Kerubin - kerubin.platform@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { CaixaComponent } from './crud-caixa.component';
import { AuthGuard } from '../../../../security/auth.guard';
import { CaixaListComponent } from './list-caixa.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  // Must add in forRoot
  // { path: 'caixa', loadChildren: './modules/financeiro/fluxo_caixa/caixa/caixa.module#CaixaModule' }
  {
    path: '',
    component: CaixaListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'novo',
    component: CaixaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: CaixaComponent,
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

export class CaixaRoutingModule { }
