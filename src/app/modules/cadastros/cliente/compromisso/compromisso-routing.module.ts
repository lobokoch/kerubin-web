/**********************************************************************************************
Code generated by MKL Plug-in
Copyright: Kerubin - kerubin.platform@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { CompromissoComponent } from './crud-compromisso.component';
import { AuthGuard } from '../../../../security/auth.guard';
import { CompromissoListComponent } from './list-compromisso.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  // Must add in forRoot
  // { path: 'compromisso', loadChildren: './modules/cadastros/cliente/compromisso/compromisso.module#CompromissoModule' }
  {
    path: '',
    component: CompromissoListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'novo',
    component: CompromissoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'novo/:source/:dateIni',
    component: CompromissoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: CompromissoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id/:source',
    component: CompromissoComponent,
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

export class CompromissoRoutingModule { }
