import { PanelModule } from 'primeng/panel';
import { DashboardContaPagarModule } from './dashboard-contapagar/dashboard-contapagar.module';
import { DashboardService } from './dashboard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent
  ],

  imports: [
    CommonModule,
    PanelModule,
    DashboardRoutingModule,
    DashboardContaPagarModule
  ],

  providers: [
    DashboardService
  ]

})
export class DashboardModule { }
