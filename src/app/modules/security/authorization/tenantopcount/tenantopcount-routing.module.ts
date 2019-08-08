/**********************************************************************************************
Code generated with MKL Plug-in version: 7.0.4
Code generated at time stamp: 2019-08-06T07:20:02.873
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { TenantOpCountComponent } from './crud-tenantopcount.component';
import { AuthGuard } from '../../../../security/auth.guard';
import { TenantOpCountListComponent } from './list-tenantopcount.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  // Must add in forRoot
  // { path: 'tenantopcount', loadChildren: './modules/security/authorization/tenantopcount/tenantopcount.module#TenantOpCountModule' }
  {
    path: '',
    component: TenantOpCountListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'novo',
    component: TenantOpCountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: TenantOpCountComponent,
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

export class TenantOpCountRoutingModule { }
