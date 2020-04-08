import { CustomContaPagarMultipleServiceImpl } from './custom-contapagarmultiple-impl.service';
import { CustomContaPagarMultipleService } from './../../financeiro/contaspagar/contapagarmultiple/custom-contapagarmultiple.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomContaPagarService } from '../../financeiro/contaspagar/contapagar/custom-contapagar.service';
import { CustomContaPagarServiceImpl } from './custom-contapagar-impl.service';

import { CustomContaReceberService } from '../../financeiro/contasreceber/contareceber/custom-contareceber.service';
import { CustomContaReceberServiceImpl } from './custom-contareceber-impl.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: CustomContaPagarService,
      useClass: CustomContaPagarServiceImpl
    },
	{
      provide: CustomContaReceberService,
      useClass: CustomContaReceberServiceImpl
    },
	{
      provide: CustomContaPagarMultipleService,
      useClass: CustomContaPagarMultipleServiceImpl
    }

  ]
})
export class CustomServicesModule { }
