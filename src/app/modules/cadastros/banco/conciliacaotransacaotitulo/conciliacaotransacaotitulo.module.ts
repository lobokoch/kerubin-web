/**********************************************************************************************
Code generated with MKL Plug-in version: 47.7.13
Code generated at time stamp: 2020-01-07T19:00:51.829
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
import { CadastrosBancoTranslationService } from './../i18n/./../i18n/cadastros-banco-translation.service';
import { ConciliacaoTransacaoTituloService } from './conciliacaotransacaotitulo.service';
import { ConciliacaoTransacaoTituloListComponent } from './list-conciliacaotransacaotitulo.component';
import { ConciliacaoTransacaoTituloComponent } from './crud-conciliacaotransacaotitulo.component';
import { ConciliacaoTransacaoTituloRoutingModule } from './conciliacaotransacaotitulo-routing.module';
// import { ConciliacaoTransacaoModule } from '../conciliacaotransacao/conciliacaotransacao.module';
import { PlanoContaModule } from '../planoconta/planoconta.module';
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
    ConciliacaoTransacaoTituloRoutingModule,
	// ConciliacaoTransacaoModule,
	PlanoContaModule

  ],

  declarations: [
    ConciliacaoTransacaoTituloComponent,
    ConciliacaoTransacaoTituloListComponent
  ],

  exports: [

  ],

  providers: [
    ConciliacaoTransacaoTituloService,
    CadastrosBancoTranslationService
  ]

})

export class ConciliacaoTransacaoTituloModule { }
