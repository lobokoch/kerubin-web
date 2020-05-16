
import { Injectable } from '@angular/core';

import { ContaPagar } from './../../financeiro/contaspagar/contapagar/contapagar.model';
import { ContaPagarListComponent } from './../../financeiro/contaspagar/contapagar/list-contapagar.component';

import * as moment from 'moment';

@Injectable()
export class CustomContaPagarListServiceImpl {

  component: ContaPagarListComponent;

  setComponent(component: ContaPagarListComponent) {
    this.component = component;
  }


  applyRuleGridColumnsStyleClass_SituacaoConta(contaPagar: ContaPagar): String {
    // This method can be overridden.
    return null;
  }


  applyRuleAddColumnSituacaoContaGetValue(contaPagar: ContaPagar): String {
    if ((contaPagar.contaPaga === false) && moment(contaPagar.dataVencimento).isBefore(moment({ h: 0, m: 0, s: 0, ms: 0 }), 'day')) {
      const diff1 = Math.abs(moment({ h: 0, m: 0, s: 0, ms: 0 }).diff(moment(contaPagar.dataVencimento), 'days'));
      let str = 'Vencida (' + diff1 + ' dia';
      if (diff1 > 1) {
        str += 's';
      }
      str += ')';
      return str;
    }

    if ((contaPagar.contaPaga === false) && moment(contaPagar.dataVencimento).isSame(moment({ h: 0, m: 0, s: 0, ms: 0 }), 'day')) {
      return 'Vence hoje';
    }

    if ((contaPagar.contaPaga === false) && moment(contaPagar.dataVencimento).isSame(moment({ h: 0, m: 0, s: 0, ms: 0 }).add(1, 'day'), 'day')) {
      return 'Vence amanhã';
    }

    if ((contaPagar.contaPaga === false) &&
      moment(contaPagar.dataVencimento).isBetween(moment({ h: 0, m: 0, s: 0, ms: 0 }), moment({ h: 0, m: 0, s: 0, ms: 0 }).add(4, 'day'))) {
      return 'Vence próximos 3 dias';
    }

    if ((contaPagar.contaPaga === false) &&
      moment(contaPagar.dataVencimento).isBetween(moment({ h: 0, m: 0, s: 0, ms: 0 }), moment({ h: 0, m: 0, s: 0, ms: 0 }).endOf('week'))) {
      return 'Vence esta semana';
    }

    if ((contaPagar.contaPaga)) {
      return 'Paga';
    }

    const diff2 = moment(contaPagar.dataVencimento).diff(moment({ h: 0, m: 0, s: 0, ms: 0 }), 'days');
    return 'Vende em ' + diff2 + ' dias';
  }


}

