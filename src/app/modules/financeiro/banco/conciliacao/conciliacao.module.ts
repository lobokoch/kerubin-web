import { ConciliacaoBancariaModule } from './../conciliacaobancaria/conciliacaobancaria.module';
import { ConciliacaoTransacaoModule } from './../conciliacaotransacao/conciliacaotransacao.module';
import { ConciliacaoComponent } from './conciliacao.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ConciliacaoComponent
  ],
  imports: [
    CommonModule,
    ConciliacaoBancariaModule/*,
    ConciliacaoTransacaoModule*/
  ]
})
export class ConciliacaoModule { }
