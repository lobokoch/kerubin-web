/**********************************************************************************************
Code generated with MKL Plug-in version: 7.18.1
Code generated at time stamp: 2019-08-13T23:21:07.772
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PanelModule } from 'primeng/panel';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AccordionModule } from 'primeng/accordion';
import { SpinnerModule } from 'primeng/spinner';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import {CardModule} from 'primeng/card';

// Kerubin - BEGIN
import { SecurityAuthorizationTranslationService } from './../i18n/./../i18n/security-authorization-translation.service';
import { CreditOrderService } from './creditorder.service';
import { CreditOrderListComponent } from './list-creditorder.component';
import { CreditOrderComponent } from './crud-creditorder.component';
import { CreditOrderRoutingModule } from './creditorder-routing.module';
import { SysUserModule } from '../sysuser/sysuser.module';
// Kerubin - END

@NgModule({

  imports: [
    // PrimeNG
    CommonModule,
	FormsModule,
	InputTextModule,
	ButtonModule,
	InputTextareaModule,
	TableModule,
	TooltipModule,
	ToastModule,
	ConfirmDialogModule,
	AutoCompleteModule,
	PanelModule,
	InputSwitchModule,
	AccordionModule,
	SpinnerModule,
	DialogModule,
	DropdownModule,
	CalendarModule,
	CurrencyMaskModule,
	CardModule,

    // Kerubin
    CreditOrderRoutingModule,
	SysUserModule

  ],

  declarations: [
    CreditOrderComponent,
    CreditOrderListComponent
  ],

  exports: [

  ],

  providers: [
    CreditOrderService,
    SecurityAuthorizationTranslationService
  ]

})

export class CreditOrderModule { }
