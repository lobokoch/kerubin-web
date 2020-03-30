import { ContaReceberComponent } from '../../financeiro/contasreceber/contareceber/crud-contareceber.component';
import { ConfirmationService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { CustomContaReceberService } from './../../financeiro/contasreceber/contareceber/custom-contareceber.service';
import * as moment from 'moment';

@Injectable()
export class CustomContaReceberServiceImpl extends CustomContaReceberService {

  constructor(
    private confirmation: ConfirmationService
  ) {
    super();
  }


  beforeContaPagaChange(event: any) {

    const querEstornar = !event.checked && this.component.contaReceber && this.component.contaReceber.dataPagamento;
    if (querEstornar) {
      this.confirmation.confirm({
        message: '<p>Os dados de recebimento desta conta (Data do recebimento, Valor total recebido, etc) serão apagados.</p>' +
          '<br><p>Caso a conta já tenha sido recebida e você clique em <strong>Salvar</strong>, o lançamento do recebimento da conta será <strong>estornado</strong> do caixa.</p>' +
          '<br><p>Você deseja realmente cancelar o recebimento desta conta?</p>',
			  accept: () => {
			    this.component.contaReceber.dataPagamento = null;
			    this.component.contaReceber.valorDesconto = null;
			    this.component.contaReceber.valorMulta = null;
			    this.component.contaReceber.valorJuros = null;
			    this.component.contaReceber.valorAcrescimos = null;
			    this.component.contaReceber.valorPago = null;
        },
        reject: () => {
          this.component.contaReceber.contaPaga = true;
        }
			});
    } else {
      const today =  moment();
      if (moment(this.component.contaReceber.dataVencimento).isBefore(today)) {
        this.component.contaReceber.dataPagamento = this.component.contaReceber.dataVencimento;
      } else {
        this.component.contaReceber.dataPagamento = moment().toDate();
      }
      this.component.contaReceber.valorPago = this.component.contaReceber.valor;
    }


  }

}
