import { ContaPagarComponent } from '../../financeiro/contaspagar/contapagar/crud-contapagar.component';
import { ConfirmationService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { CustomContaPagarService } from '../../financeiro/contaspagar/contapagar/custom-contapagar.service';
import * as moment from 'moment';

@Injectable()
export class CustomContaPagarServiceImpl extends CustomContaPagarService {

  constructor(
    private confirmation: ConfirmationService
  ) {
    super();
  }


  beforeContaPagaChange(event: any) {

    const querEstornar = !event.checked && this.component.contaPagar && this.component.contaPagar.dataPagamento;
    if (querEstornar) {
      this.confirmation.confirm({
        message: '<p>Os dados de pagamento desta conta (Data do pagamento, Valor total pago, etc) serão apagados.</p>' +
          '<br><p>Caso a conta já tenha sido paga e você clique em <strong>Salvar</strong>, o lançamento do pagamento da conta será <strong>estornado</strong> do caixa.</p>' +
          '<br><p>Você deseja realmente cancelar o pagamento desta conta?</p>',
			  accept: () => {
			    this.component.contaPagar.dataPagamento = null;
			    this.component.contaPagar.valorDesconto = null;
			    this.component.contaPagar.valorMulta = null;
			    this.component.contaPagar.valorJuros = null;
			    this.component.contaPagar.valorAcrescimos = null;
			    this.component.contaPagar.valorPago = null;
        },
        reject: () => {
          this.component.contaPagar.contaPaga = true;
        }
			});
    } else {
      const today =  moment();
      if (moment(this.component.contaPagar.dataVencimento).isBefore(today)) {
        this.component.contaPagar.dataPagamento = this.component.contaPagar.dataVencimento;
      } else {
        this.component.contaPagar.dataPagamento = moment().toDate();
      }
      this.component.contaPagar.valorPago = this.component.contaPagar.valor;
    }


  }

}
