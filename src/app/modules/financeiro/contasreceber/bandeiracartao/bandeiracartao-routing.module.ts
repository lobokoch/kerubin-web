/**********************************************************************************************
Code generated with MKL Plug-in version: 47.7.13
Code generated at time stamp: 2020-01-07T19:01:18.257
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { BandeiraCartaoComponent } from './crud-bandeiracartao.component';
import { AuthGuard } from '../../../../security/auth.guard';
import { BandeiraCartaoListComponent } from './list-bandeiracartao.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  // Must add in forRoot
  // { path: 'bandeiracartao', loadChildren: './modules/financeiro/contas_receber/bandeiracartao/bandeiracartao.module#BandeiraCartaoModule' }
  {
    path: '',
    component: BandeiraCartaoListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'novo',
    component: BandeiraCartaoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: BandeiraCartaoComponent,
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

export class BandeiraCartaoRoutingModule { }
