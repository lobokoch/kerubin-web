import { RouterModule } from '@angular/router';
/**********************************************************************************************
Code generated with MKL Plug-in version: 3.6.2
Code generated at time stamp: 2019-06-05T06:41:33.812
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

// Angular
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// PrimeMG
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {DialogModule} from 'primeng/dialog';

// Kerubin
import { NewAccountComponent } from './newaccount/newaccount.component';
import { ConfirmAccountComponent } from './confirmaccount/confirmaccount.component';
import { ConfigNewAccountComponent } from './confignewaccount/confignewaccount.component';
import { ForgotPasswordComponent } from './forgotpassword/forgotpassword.component';
import { ChangePasswordComponent } from './changepassword/changepassword.component';
import { ChangePasswordForgottenComponent } from './changepasswordforgotten/changepasswordforgotten.component';

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    RouterModule,
    DialogModule
  ],

  declarations: [
    ConfigNewAccountComponent,
    ConfirmAccountComponent,
    NewAccountComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    ChangePasswordForgottenComponent
  ],

  exports: [
    ConfigNewAccountComponent,
    ConfirmAccountComponent,
    NewAccountComponent
  ]

})

export class KerubinAccountModule {  }

