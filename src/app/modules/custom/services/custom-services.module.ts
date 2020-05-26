import { AgendaService } from './../agenda/agenda.service';
import { CustomContaReceberListServiceImpl } from './custom-list-contareceber-impl.service';
import { CustomContaReceberListService } from './../../financeiro/contasreceber/contareceber/custom-list-contareceber.service';
import { CustomContaPagarListServiceImpl } from './custom-list-contapagar-impl.service';
import { CustomContaPagarListService } from './../../financeiro/contaspagar/contapagar/custom-list-contapagar.service';
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
      provide: CustomContaPagarListService,
      useClass: CustomContaPagarListServiceImpl
    },
	  {
      provide: CustomContaReceberService,
      useClass: CustomContaReceberServiceImpl
    },
	  {
      provide: CustomContaReceberListService,
      useClass: CustomContaReceberListServiceImpl
    },
	  {
      provide: CustomContaPagarMultipleService,
      useClass: CustomContaPagarMultipleServiceImpl
    },
    AgendaService

  ]
})
export class CustomServicesModule { }
