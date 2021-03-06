/**********************************************************************************************
Code generated by MKL Plug-in
Copyright: Kerubin - kerubin.platform@gmail.com

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
  sortFields: SortField[];

  constructor() {
    this.pageNumber = 0;
    this.pageSize = 10;
  }
}

export class CaixaDiarioListFilter extends PaginationFilter {
	
	
	// Map key=value for developer custom fields parameters. The final parameters map must be a JSON object.
	customParams = new Map<any, any>();
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
