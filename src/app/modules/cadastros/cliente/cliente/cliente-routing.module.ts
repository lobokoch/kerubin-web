/**********************************************************************************************
Code generated with MKL Plug-in version: 7.0.3
Code generated at time stamp: 2019-07-28T18:58:30.722
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { ClienteComponent } from './crud-cliente.component';
import { AuthGuard } from '../../../../security/auth.guard';
import { ClienteListComponent } from './list-cliente.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  // Must add in forRoot
  // { path: 'cliente', loadChildren: './modules/cadastros/cliente/cliente/cliente.module#ClienteModule' }
  {
    path: '',
    component: ClienteListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'novo',
    component: ClienteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: ClienteComponent,
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

export class ClienteRoutingModule { }
