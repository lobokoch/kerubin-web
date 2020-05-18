
import { Injectable } from '@angular/core';
import { ContaReceber } from './../../financeiro/contasreceber/contareceber/contareceber.model';
import { ContaReceberListComponent } from './../../financeiro/contasreceber/contareceber/list-contareceber.component';

import * as moment from 'moment';

@Injectable()
export class CustomContaReceberListServiceImpl {

  component: ContaReceberListComponent;

  setComponent(component: ContaReceberListComponent) {
    this.component = component;
  }


  applyRuleGridColumnsStyleClass_SituacaoConta(contaReceber: ContaReceber): String {
  	// This method can be overridden.
  	return null;
  }


  applyRuleAddColumnSituacaoContaGetValue(contaReceber: ContaReceber): String {
  	if ((contaReceber.contaPaga === false) && moment(contaReceber.dataVencimento).isBefore(moment({h: 0, m: 0, s: 0, ms: 0}), 'day')) {
      const diff1 = Math.abs( moment({h: 0, m: 0, s: 0, ms: 0}).diff(moment(contaReceber.dataVencimento), 'days'));
      let str = 'Vencida (' + diff1 + ' dia';
      if (diff1 > 1) {
        str += 's';
      }
      str += ')';
      return str;
		}

		if ((contaReceber.contaPaga === false) && moment(contaReceber.dataVencimento).isSame(moment({h: 0, m: 0, s: 0, ms: 0}), 'day')) {
			return 'Vence hoje';
		}

		if ((contaReceber.contaPaga === false) && moment(contaReceber.dataVencimento).isSame(moment({h: 0, m: 0, s: 0, ms: 0}).add(1, 'day'), 'day')) {
			return 'Vence amanhã';
		}

    if ((contaReceber.contaPaga === false) &&
      moment(contaReceber.dataVencimento).isBetween(moment({h: 0, m: 0, s: 0, ms: 0}), moment({h: 0, m: 0, s: 0, ms: 0}).add(4, 'day'))) {
			return 'Vence próximos 3 dias';
		}

    if ((contaReceber.contaPaga === false) &&
      moment(contaReceber.dataVencimento).isBetween(moment({h: 0, m: 0, s: 0, ms: 0}), moment({h: 0, m: 0, s: 0, ms: 0}).endOf('week'))) {
			return 'Vence esta semana';
		}

		if ((contaReceber.contaPaga)) {
      return 'Recebida';
		}

    const diff2 = moment(contaReceber.dataVencimento).diff(moment({h: 0, m: 0, s: 0, ms: 0}), 'days');
	  return 'Vende em ' + diff2  + ' dias';
	}

}

