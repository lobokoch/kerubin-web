/**********************************************************************************************
Code generated with MKL Plug-in version: 20.1.1
Code generated at time stamp: 2019-08-25T08:11:26.760
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
import { FinanceiroContasPagarTranslationService } from './../i18n/./../i18n/financeiro-contaspagar-translation.service';
import { BandeiraCartaoService } from './bandeiracartao.service';
import { BandeiraCartaoListComponent } from './list-bandeiracartao.component';
import { BandeiraCartaoComponent } from './crud-bandeiracartao.component';
import { BandeiraCartaoRoutingModule } from './bandeiracartao-routing.module';
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
    BandeiraCartaoRoutingModule

  ],

  declarations: [
    BandeiraCartaoComponent,
    BandeiraCartaoListComponent
  ],

  exports: [

  ],

  providers: [
    BandeiraCartaoService,
    FinanceiroContasPagarTranslationService
  ]

})

export class BandeiraCartaoModule { }
