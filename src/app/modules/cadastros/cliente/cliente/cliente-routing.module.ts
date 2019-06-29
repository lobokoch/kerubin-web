/**********************************************************************************************
Code generated with MKL Plug-in version: 6.0.2
Code generated at time stamp: 2019-06-29T10:11:35.889
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
