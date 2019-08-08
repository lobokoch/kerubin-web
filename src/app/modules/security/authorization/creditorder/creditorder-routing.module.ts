/**********************************************************************************************
Code generated with MKL Plug-in version: 7.13.0
Code generated at time stamp: 2019-08-08T00:01:06.900
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { CreditOrderComponent } from './crud-creditorder.component';
import { AuthGuard } from '../../../../security/auth.guard';
import { CreditOrderListComponent } from './list-creditorder.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  // Must add in forRoot
  // { path: 'creditorder', loadChildren: './modules/security/authorization/creditorder/creditorder.module#CreditOrderModule' }
  {
    path: '',
    component: CreditOrderListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'novo',
    component: CreditOrderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: CreditOrderComponent,
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

export class CreditOrderRoutingModule { }
