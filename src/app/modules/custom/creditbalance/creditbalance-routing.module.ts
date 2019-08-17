import { AuthGuard } from './../../../security/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreditBalanceComponent } from './creditbalance.component';

const routes: Routes = [
  {
    path: '',
    component: CreditBalanceComponent,
    canActivate: [ AuthGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditBalanceRoutingModule { }
