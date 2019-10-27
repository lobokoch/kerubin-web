import { ConciliacaoTransacaoListComponent } from './../conciliacaotransacao/list-conciliacaotransacao.component';

/**********************************************************************************************
Code generated with MKL Plug-in version: 26.0.4
Code generated at time stamp: 2019-10-18T05:55:37.138
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
import {FileUploadModule} from 'primeng/fileupload';


// Kerubin - BEGIN
import { CadastrosBancoTranslationService } from './../i18n/./../i18n/cadastros-banco-translation.service';
import { ConciliacaoBancariaService } from './conciliacaobancaria.service';
import { ConciliacaoBancariaListComponent } from './list-conciliacaobancaria.component';
import { ConciliacaoBancariaComponent } from './crud-conciliacaobancaria.component';
import { ConciliacaoBancariaRoutingModule } from './conciliacaobancaria-routing.module';

import { ConciliacaoTransacaoModule } from './../conciliacaotransacao/conciliacaotransacao.module';
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
  FileUploadModule,

    // Kerubin
    ConciliacaoBancariaRoutingModule
    , ConciliacaoTransacaoModule
  ],

  declarations: [
    ConciliacaoBancariaComponent,
    ConciliacaoBancariaListComponent
  ],

  exports: [
    ConciliacaoBancariaComponent,
    ConciliacaoBancariaListComponent,
    ConciliacaoTransacaoListComponent
  ],

  providers: [
    ConciliacaoBancariaService,
    CadastrosBancoTranslationService
  ]

})

export class ConciliacaoBancariaModule { }
