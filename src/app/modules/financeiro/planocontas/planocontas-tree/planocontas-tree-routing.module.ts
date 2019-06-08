import { AuthGuard } from './../../../../security/auth.guard';
import { PlanoContaTreeComponent } from './crud-planoconta-tree.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // Must add in forRoot
  // { path: 'planoconta', loadChildren: './modules/financeiro/plano_contas/planoconta/planoconta.module#PlanoContaModule' }
  {
    path: '',
    component: PlanoContaTreeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'novo',
    component: PlanoContaTreeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: PlanoContaTreeComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanocontasTreeRoutingModule { }
