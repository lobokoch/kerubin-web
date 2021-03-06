import { AuthGuard } from './../../security/auth.guard';
import { DashboardContaPagarComponent } from './dashboard-contapagar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DashboardContaPagarComponent,
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
export class DashboardContaPagarRoutingModule { }
