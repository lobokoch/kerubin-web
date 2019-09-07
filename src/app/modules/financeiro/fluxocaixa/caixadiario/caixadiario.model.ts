/**********************************************************************************************
Code generated with MKL Plug-in version: 22.0.6
Code generated at time stamp: 2019-09-07T12:27:13.685
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { Caixa } from './../caixa/caixa.model';
import { CaixaDiarioSituacao } from './../enums/financeiro-fluxocaixa-enums.model';
import { CaixaAutoComplete } from './../caixa/caixa.model';

export class SortField {
  field: string;
  order: number;

  constructor(field: string, order: number) {
    this.field = field;
    this.order = order;
  }
}

export class PaginationFilter {
  pageNumber: number;
  pageSize: number;
  sortField: SortField;

  constructor() {
    this.pageNumber = 0;
    this.pageSize = 10;
  }
}

export class CaixaDiarioListFilter extends PaginationFilter {
	
}

export class CaixaDiario {
	id: string;
	caixa: Caixa;
	caixaDiarioSituacao: CaixaDiarioSituacao;
	dataHoraAbertura: Date;
	saldoInicial: number;
	dataHoraFechamento: Date;
	saldoFinal: number;
	observacoes: string;
	version: number;
}

export class CaixaDiarioAutoComplete {
	id: string;
	caixa: CaixaAutoComplete;
	caixaDiarioSituacao: CaixaDiarioSituacao;
	dataHoraAbertura: Date;
	version: number;
}

export class CaixaDiarioSumFields {
}
