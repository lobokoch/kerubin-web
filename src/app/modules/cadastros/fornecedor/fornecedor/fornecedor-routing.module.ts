import { FornecedorComponent } from './crud-fornecedor.component';
import { AuthGuard } from '../../../../security/auth.guard';
import { FornecedorListComponent } from './list-fornecedor.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
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

export class  FornecedorRoutingModule { }
