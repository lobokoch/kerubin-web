import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FornecedorService } from './fornecedor.service';
import { FornecedorListComponent } from './list-fornecedor.component';
import { FornecedorComponent } from './crud-fornecedor.component';
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
import { FornecedorRoutingModule } from './fornecedor-routing.module';

// Kerubin - BEGIN
import { CadastrosFornecedorTranslationService } from './../i18n/cadastros-fornecedor-translation.service';
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

    // Kerubin
    FornecedorRoutingModule

  ],

  declarations: [
    FornecedorComponent,
    FornecedorListComponent
  ],

  exports: [

  ],

  providers: [
    FornecedorService,
    CadastrosFornecedorTranslationService
  ]

})

export class FornecedorModule { }
