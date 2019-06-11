import { DashboardService } from './dashboard.service';
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import {ChartModule} from 'primeng/chart';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent
  ],

  imports: [
    CommonModule,
    DashboardRoutingModule,

    ChartModule
  ],

  providers: [
    DashboardService,
    DecimalPipe
  ]

})
export class DashboardModule { }
