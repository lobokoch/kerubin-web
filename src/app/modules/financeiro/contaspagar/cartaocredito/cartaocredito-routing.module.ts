/**********************************************************************************************
Code generated with MKL Plug-in version: 7.19.6
Code generated at time stamp: 2019-08-18T11:25:25.413
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
  // { path: 'cartaocredito', loadChildren: './modules/financeiro/contas_pagar/cartaocredito/cartaocredito.module#CartaoCreditoModule' }
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
