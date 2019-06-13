import { PanelModule } from 'primeng/panel';
import { DashboardContaReceberService } from './dashboard-contareceber.service';
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import {ChartModule} from 'primeng/chart';

import { DashboardContaReceberRoutingModule } from './dashboard-contareceber-routing.module';
import { DashboardContaReceberComponent } from './dashboard-contareceber.component';
import {CardModule} from 'primeng/card';

@NgModule({
  declarations: [
    DashboardContaReceberComponent
  ],

  imports: [
    CommonModule,
    PanelModule,
    CardModule,
    DashboardContaReceberRoutingModule,

    ChartModule
  ],

  exports: [
    DashboardContaReceberComponent
  ],

  providers: [
    DashboardContaReceberService,
    DecimalPipe
  ]

})
export class DashboardContaReceberModule { }
