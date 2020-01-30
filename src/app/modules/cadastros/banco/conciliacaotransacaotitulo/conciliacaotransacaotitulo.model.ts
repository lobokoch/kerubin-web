/**********************************************************************************************
Code generated with MKL Plug-in version: 60.0.6
Copyright: Kerubin - kerubin.platform@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { ConciliacaoTransacao } from './../conciliacaotransacao/conciliacaotransacao.model';
import { PlanoConta } from './../planoconta/planoconta.model';
import { SituacaoConciliacaoTrn } from './../enums/cadastros-banco-enums.model';

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

export class ConciliacaoTransacaoTituloListFilter extends PaginationFilter {
	
	situacaoConciliacaoTrn: SituacaoConciliacaoTrn;
	
	// Map key=value for developer custom fields parameters. The final parameters map must be a JSON object.
	customParams = new Map<any, any>();
}

export class ConciliacaoTransacaoTitulo {
	id: string;
	conciliacaoTransacao: ConciliacaoTransacao;
	tituloConciliadoId: string;
	tituloConciliadoDesc: string;
	tituloConciliadoValor: number;
	tituloConciliadoDataVen: Date;
	tituloConciliadoDataPag: Date;
	tituloPlanoContas: PlanoConta;
	dataConciliacao: Date;
	situacaoConciliacaoTrn: SituacaoConciliacaoTrn;
}

export class ConciliacaoTransacaoTituloAutoComplete {
	id: string;
	tituloConciliadoDesc: string;
}

export class ConciliacaoTransacaoTituloSumFields {
}
