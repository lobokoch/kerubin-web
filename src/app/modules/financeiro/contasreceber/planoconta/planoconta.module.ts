/**********************************************************************************************
Code generated with MKL Plug-in version: 3.9.0
Code generated at time stamp: 2019-06-12T22:47:45.920
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

// Kerubin - BEGIN
import { FinanceiroContasReceberTranslationService } from './../i18n/./../i18n/financeiro-contasreceber-translation.service';
import { PlanoContaService } from './planoconta.service';
import { PlanoContaListComponent } from './list-planoconta.component';
import { PlanoContaComponent } from './crud-planoconta.component';
import { PlanoContaRoutingModule } from './planoconta-routing.module';
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

    // Kerubin
    PlanoContaRoutingModule

  ],

  declarations: [
    PlanoContaComponent,
    PlanoContaListComponent
  ],

  exports: [

  ],

  providers: [
    PlanoContaService,
    FinanceiroContasReceberTranslationService
  ]

})

export class PlanoContaModule { }