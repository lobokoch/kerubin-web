/**********************************************************************************************
Code generated with MKL Plug-in version: 3.6.3
Code generated at time stamp: 2019-06-05T23:18:07.487
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
import { CadastrosBancoTranslationService } from './../i18n/./../i18n/cadastros-banco-translation.service';
import { AgenciaBancariaService } from './agenciabancaria.service';
import { AgenciaBancariaListComponent } from './list-agenciabancaria.component';
import { AgenciaBancariaComponent } from './crud-agenciabancaria.component';
import { AgenciaBancariaRoutingModule } from './agenciabancaria-routing.module';
import { BancoModule } from '../banco/banco.module';
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
    AgenciaBancariaRoutingModule,
	BancoModule

  ],

  declarations: [
    AgenciaBancariaComponent,
    AgenciaBancariaListComponent
  ],

  exports: [

  ],

  providers: [
    AgenciaBancariaService,
    CadastrosBancoTranslationService
  ]

})

export class AgenciaBancariaModule { }
