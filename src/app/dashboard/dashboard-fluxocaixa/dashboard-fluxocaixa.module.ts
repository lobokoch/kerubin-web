import { PanelModule } from 'primeng/panel';
import { DashboardFluxoCaixaService } from './dashboard-fluxocaixa.service';
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import {ChartModule} from 'primeng/chart';

import { DashboardFluxoCaixaRoutingModule } from './dashboard-fluxocaixa-routing.module';
import { DashboardFluxoCaixaComponent } from './dashboard-fluxocaixa.component';
import {CardModule} from 'primeng/card';

@NgModule({
  declarations: [
    DashboardFluxoCaixaComponent
  ],

  imports: [
    CommonModule,
    PanelModule,
    CardModule,
    DashboardFluxoCaixaRoutingModule,

    ChartModule
  ],

  exports: [
    DashboardFluxoCaixaComponent
  ],

  providers: [
    DashboardFluxoCaixaService,
    DecimalPipe
  ]

})
export class DashboardFluxoCaixaModule { }
