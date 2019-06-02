import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NewAccountComponent } from './newaccount/newaccount.component';
import { ConfirmAccountComponent } from './confirmaccount/confirmaccount.component';
import { ConfigNewAccountComponent } from './confignewaccount/confignewaccount.component';
import { NgModule } from '@angular/core';

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DropdownModule
  ],

  declarations: [
    ConfigNewAccountComponent,
    ConfirmAccountComponent,
    NewAccountComponent
  ],

  exports: [
    ConfigNewAccountComponent,
    ConfirmAccountComponent,
    NewAccountComponent
  ]

})

export class KerubinAccountModule {  }
