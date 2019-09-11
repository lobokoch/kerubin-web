/**********************************************************************************************
Code generated with MKL Plug-in version: 22.1.1
Code generated at time stamp: 2019-09-10T21:40:39.525
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { ContaBancariaComponent } from './crud-contabancaria.component';
import { AuthGuard } from '../../../../security/auth.guard';
import { ContaBancariaListComponent } from './list-contabancaria.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  // Must add in forRoot
  // { path: 'contabancaria', loadChildren: './modules/financeiro/contas_receber/contabancaria/contabancaria.module#ContaBancariaModule' }
  {
    path: '',
    component: ContaBancariaListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'novo',
    component: ContaBancariaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: ContaBancariaComponent,
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

export class ContaBancariaRoutingModule { }
