/**********************************************************************************************
Code generated with MKL Plug-in version: 26.0.4
Code generated at time stamp: 2019-10-17T21:44:20.610
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
import {ProgressSpinnerModule} from 'primeng/progressspinner';

// Kerubin - BEGIN
import { CadastrosBancoTranslationService } from './../i18n/./../i18n/cadastros-banco-translation.service';
import { ConciliacaoTransacaoService } from './conciliacaotransacao.service';
import { ConciliacaoTransacaoListComponent } from './list-conciliacaotransacao.component';
import { ConciliacaoTransacaoComponent } from './crud-conciliacaotransacao.component';
import { ConciliacaoTransacaoRoutingModule } from './conciliacaotransacao-routing.module';
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
  ProgressSpinnerModule,

    // Kerubin
    ConciliacaoTransacaoRoutingModule
	// , ConciliacaoBancariaModule

  ],

  declarations: [
    ConciliacaoTransacaoListComponent,
    ConciliacaoTransacaoComponent
  ],

  exports: [
    ConciliacaoTransacaoListComponent,
    ConciliacaoTransacaoComponent
  ],

  providers: [
    ConciliacaoTransacaoService/*,
    CadastrosBancoTranslationService*/
  ]

})

export class ConciliacaoTransacaoModule { }
