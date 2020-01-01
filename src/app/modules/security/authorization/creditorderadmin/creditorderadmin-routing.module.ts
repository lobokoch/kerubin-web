/**********************************************************************************************
Code generated with MKL Plug-in version: 40.2.5
Code generated at time stamp: 2019-12-31T10:27:32.825
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { CreditOrderAdminComponent } from './crud-creditorderadmin.component';
import { AuthGuard } from '../../../../security/auth.guard';
import { CreditOrderAdminListComponent } from './list-creditorderadmin.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  // Must add in forRoot
  // { path: 'creditorderadmin', loadChildren: './modules/security/authorization/creditorderadmin/creditorderadmin.module#CreditOrderAdminModule' }
  {
    path: '',
    component: CreditOrderAdminListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'novo',
    component: CreditOrderAdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: CreditOrderAdminComponent,
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

export class CreditOrderAdminRoutingModule { }
