/**********************************************************************************************
Code generated with MKL Plug-in version: 47.7.13
Code generated at time stamp: 2020-01-07T19:00:51.829
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
  // { path: 'planoconta', loadChildren: './modules/cadastros/banco/planoconta/planoconta.module#PlanoContaModule' }
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