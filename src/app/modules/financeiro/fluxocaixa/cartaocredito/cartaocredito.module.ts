/**********************************************************************************************
Code generated with MKL Plug-in version: 60.0.6
Copyright: Kerubin - kerubin.platform@gmail.com

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
import { CartaoCreditoService } from './cartaocredito.service';
import { CartaoCreditoListComponent } from './list-cartaocredito.component';
import { CartaoCreditoComponent } from './crud-cartaocredito.component';
import { CartaoCreditoRoutingModule } from './cartaocredito-routing.module';
import { BancoModule } from '../banco/banco.module';
import { BandeiraCartaoModule } from '../bandeiracartao/bandeiracartao.module';
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
    CartaoCreditoRoutingModule,
	BancoModule,
	BandeiraCartaoModule

  ],

  declarations: [
    CartaoCreditoComponent,
    CartaoCreditoListComponent
  ],

  exports: [

  ],

  providers: [
    CartaoCreditoService,
    FinanceiroFluxoCaixaTranslationService
  ]

})

export class CartaoCreditoModule { }
