import { FormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { PaymentPlanComponent } from './payment-plan/payment-plan.component';
import { CardModule } from 'primeng/card';
import {RadioButtonModule} from 'primeng/radiobutton';
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import {StepsModule} from 'primeng/steps';
import {SelectButtonModule} from 'primeng/selectbutton';

import { PaymentRoutingModule } from './payment-routing.module';

@NgModule({
  declarations: [
    PaymentPlanComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    PanelModule,
    RadioButtonModule,
    ButtonModule,
    SelectButtonModule,
    PaymentRoutingModule,
    StepsModule
  ],

  providers: [
    DecimalPipe
  ]
})
export class PaymentModule { }
