import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import {TreeModule} from 'primeng/tree';
import { PanelModule } from 'primeng/panel';

// Mask
// import { CurrencyMaskModule } from 'ng2-currency-mask';

// Kerubin
import { FinanceiroPlanoContasTranslationService } from './../i18n/financeiro-planocontas-translation.service';
import { PlanoContasTreeService } from './planocontas-tree.service';
import { PlanoContaTreeComponent } from './crud-planoconta-tree.component';
import { PlanocontasTreeRoutingModule } from './planocontas-tree-routing.module';
import { PlanoContaService } from '../planoconta/planoconta.service';
import {CardModule} from 'primeng/card';

@NgModule({
  imports: [
    // PrimeNG
    // InputTextareaModule,
    // TableModule,
    // PanelModule,
    // AccordionModule,
    // SpinnerModule,
    // CalendarModule,
    // CurrencyMaskModule,
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TooltipModule,
    ToastModule,
    ConfirmDialogModule,
    AutoCompleteModule,
    InputSwitchModule,
    DialogModule,
    DropdownModule,
    TreeModule,
    PanelModule,
    CardModule,

    PlanocontasTreeRoutingModule
  ],

  declarations: [
    PlanoContaTreeComponent
  ],

  providers: [
    PlanoContasTreeService,
    PlanoContaService,
    FinanceiroPlanoContasTranslationService
  ]
})
export class PlanoContasTreeModule { }
