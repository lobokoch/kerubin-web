/**********************************************************************************************
Code generated with MKL Plug-in version: 7.0.4
Code generated at time stamp: 2019-08-06T07:20:02.873
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { TenantSaldoComponent } from './crud-tenantsaldo.component';
import { AuthGuard } from '../../../../security/auth.guard';
import { TenantSaldoListComponent } from './list-tenantsaldo.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  // Must add in forRoot
  // { path: 'tenantsaldo', loadChildren: './modules/security/authorization/tenantsaldo/tenantsaldo.module#TenantSaldoModule' }
  {
    path: '',
    component: TenantSaldoListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'novo',
    component: TenantSaldoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: TenantSaldoComponent,
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

export class TenantSaldoRoutingModule { }
