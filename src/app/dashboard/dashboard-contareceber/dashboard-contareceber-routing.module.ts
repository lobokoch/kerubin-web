import { AuthGuard } from './../../security/auth.guard';
import { DashboardContaReceberComponent } from './dashboard-contareceber.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DashboardContaReceberComponent,
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
export class DashboardContaReceberRoutingModule { }
