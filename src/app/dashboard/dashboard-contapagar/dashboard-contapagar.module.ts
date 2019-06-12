import { PanelModule } from 'primeng/panel';
import { DashboardContaPagarService } from './dashboard-contapagar.service';
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import {ChartModule} from 'primeng/chart';

import { DashboardContaPagarRoutingModule } from './dashboard-contapagar-routing.module';
import { DashboardContaPagarComponent } from './dashboard-contapagar.component';
import {CardModule} from 'primeng/card';

@NgModule({
  declarations: [
    DashboardContaPagarComponent
  ],

  imports: [
    CommonModule,
    PanelModule,
    CardModule,
    DashboardContaPagarRoutingModule,

    ChartModule
  ],

  exports: [
    DashboardContaPagarComponent
  ],

  providers: [
    DashboardContaPagarService,
    DecimalPipe
  ]

})
export class DashboardContaPagarModule { }
