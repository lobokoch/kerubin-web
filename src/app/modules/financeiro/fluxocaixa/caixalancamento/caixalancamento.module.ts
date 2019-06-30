/**********************************************************************************************
Code generated with MKL Plug-in version: 6.0.4
Code generated at time stamp: 2019-06-30T08:22:37.371
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
import { FinanceiroFluxoCaixaTranslationService } from './../i18n/./../i18n/financeiro-fluxocaixa-translation.service';
import { CaixaLancamentoService } from './caixalancamento.service';
import { CaixaLancamentoListComponent } from './list-caixalancamento.component';
import { CaixaLancamentoComponent } from './crud-caixalancamento.component';
import { CaixaLancamentoRoutingModule } from './caixalancamento-routing.module';
import { CaixaDiarioModule } from '../caixadiario/caixadiario.module';
import { ContaBancariaModule } from '../contabancaria/contabancaria.module';
import { CartaoCreditoModule } from '../cartaocredito/cartaocredito.module';
import { PlanoContaModule } from '../planoconta/planoconta.module';
import { ClienteModule } from '../cliente/cliente.module';
import { FornecedorModule } from '../fornecedor/fornecedor.module';
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
    CaixaLancamentoRoutingModule,
	CaixaDiarioModule,
	ContaBancariaModule,
	CartaoCreditoModule,
	PlanoContaModule,
	ClienteModule,
	FornecedorModule

  ],

  declarations: [
    CaixaLancamentoComponent,
    CaixaLancamentoListComponent
  ],

  exports: [

  ],

  providers: [
    CaixaLancamentoService,
    FinanceiroFluxoCaixaTranslationService
  ]

})

export class CaixaLancamentoModule { }
