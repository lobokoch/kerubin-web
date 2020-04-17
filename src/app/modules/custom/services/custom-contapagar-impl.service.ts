import { MessageHandlerService } from './../../../core/message-handler.service';
import { ContaPagarComponent } from '../../financeiro/contaspagar/contapagar/crud-contapagar.component';
import { ConfirmationService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { CustomContaPagarService } from '../../financeiro/contaspagar/contapagar/custom-contapagar.service';
import * as moment from 'moment';

@Injectable()
export class CustomContaPagarServiceImpl extends CustomContaPagarService {

  constructor(
    private confirmation: ConfirmationService,
    private messageHandler: MessageHandlerService
  ) {
    super();
  }


  beforeContaPagaChange(event: any) {

    const isMultiple = String(this.component.contaPagar.tipoPagamento) === 'MULTIPLE';
    let querEstornar = false;

    if (isMultiple) {
      querEstornar = !event.checked && this.component.contaPagarMultipleList.contaPagarMultipleListItems.length > 0;
    } else {
      querEstornar = !event.checked && (this.component.contaPagar.dataPagamento !== null);
    }

    if (querEstornar) {

      // BEGIN
      if (isMultiple) {
        this.messageHandler.showError('Para remover a marcação de "Conta paga", você deve primeiro excluir os pagamentos já realizados,' +
          ' assim eles serão estornados no caixa.');

        setTimeout(function() {
          this.component.contaPagar.contaPaga = true;
        }.bind(this), 1);
        return false;
      } else { // isMultiple

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

      } // else isMultiple
      /// END

    } else {  // NÃO querEstornar
      // BEGIN
      const today =  moment({h: 0, m: 0, s: 0, ms: 0}).toDate();
      if (isMultiple) {

        if (this.component.contaPagarMultipleList.contaPagarMultipleSumFields) {
          this.component.contaPagar.valorPago = this.component.contaPagarMultipleList.contaPagarMultipleSumFields.sumValorPago;
          this.component.contaPagar.dataPagamento = today;
        } else {
          this.component.contaPagar.valorPago = null;
          console.log('this.component.contaPagarMultipleList.contaPagarMultipleSumFields = NULL');
        }

      } else { // isMultiple
        if (moment(this.component.contaPagar.dataVencimento).isBefore(today)) {
          this.component.contaPagar.dataPagamento = this.component.contaPagar.dataVencimento;
        } else {
          this.component.contaPagar.dataPagamento = today;
        }
        this.component.contaPagar.valorPago = this.component.contaPagar.valor;
      }

    } // else
    // END

  }

}
