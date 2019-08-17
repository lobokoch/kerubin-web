import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { CreditBalanceComponent } from './creditbalance.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditBalanceRoutingModule } from './creditbalance-routing.module';
import { CreditBalanceService } from './creditbalance.service';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@NgModule({
  declarations: [
    CreditBalanceComponent
  ],

  imports: [
    CommonModule,
    CreditBalanceRoutingModule,
    PanelModule,
    CardModule,
    ProgressSpinnerModule

  ],

  providers: [
    CreditBalanceService
  ]
})
export class CreditBalanceModule { }
