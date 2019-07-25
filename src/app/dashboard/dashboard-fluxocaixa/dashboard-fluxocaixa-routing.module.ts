import { AuthGuard } from './../../security/auth.guard';
import { DashboardFluxoCaixaComponent } from './dashboard-fluxocaixa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DashboardFluxoCaixaComponent,
    canActivate: [ AuthGuard ]
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
export class DashboardFluxoCaixaRoutingModule { }
