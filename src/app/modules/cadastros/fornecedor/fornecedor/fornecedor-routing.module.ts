/**********************************************************************************************
Code generated with MKL Plug-in version: 60.0.6
Copyright: Kerubin - kerubin.platform@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { FornecedorComponent } from './crud-fornecedor.component';
import { AuthGuard } from '../../../../security/auth.guard';
import { FornecedorListComponent } from './list-fornecedor.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  // Must add in forRoot
  // { path: 'fornecedor', loadChildren: './modules/cadastros/fornecedor/fornecedor/fornecedor.module#FornecedorModule' }
  {
    path: '',
    component: FornecedorListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'novo',
    component: FornecedorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: FornecedorComponent,
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

export class FornecedorRoutingModule { }
