/**********************************************************************************************
Code generated with MKL Plug-in version: 40.2.5
Code generated at time stamp: 2019-12-31T10:27:51.742
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { CartaoCreditoComponent } from './crud-cartaocredito.component';
import { AuthGuard } from '../../../../security/auth.guard';
import { CartaoCreditoListComponent } from './list-cartaocredito.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  // Must add in forRoot
  // { path: 'cartaocredito', loadChildren: './modules/financeiro/contas_receber/cartaocredito/cartaocredito.module#CartaoCreditoModule' }
  {
    path: '',
    component: CartaoCreditoListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'novo',
    component: CartaoCreditoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: CartaoCreditoComponent,
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

export class CartaoCreditoRoutingModule { }
