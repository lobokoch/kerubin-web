/**********************************************************************************************
Code generated with MKL Plug-in version: 3.17.1
Code generated at time stamp: 2019-06-20T23:36:05.586
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
import { FinanceiroFluxoCaixaTranslationService } from './../i18n/./../i18n/financeiro-fluxocaixa-translation.service';
import { BancoService } from './banco.service';
import { BancoListComponent } from './list-banco.component';
import { BancoComponent } from './crud-banco.component';
import { BancoRoutingModule } from './banco-routing.module';
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
    BancoRoutingModule

  ],

  declarations: [
    BancoComponent,
    BancoListComponent
  ],

  exports: [

  ],

  providers: [
    BancoService,
    FinanceiroFluxoCaixaTranslationService
  ]

})

export class BancoModule { }
