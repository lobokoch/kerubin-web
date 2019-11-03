/**********************************************************************************************
Code generated with MKL Plug-in version: 27.0.10
Code generated at time stamp: 2019-11-03T07:57:18.876
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { TipoTransacao } from './../enums/cadastros-banco-enums.model';
import { ConciliacaoBancaria } from './../conciliacaobancaria/conciliacaobancaria.model';
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
  sortField: SortField;

  constructor() {
    this.pageNumber = 0;
    this.pageSize = 10;
  }
}

export class ConciliacaoTransacaoListFilter extends PaginationFilter {
	
	conciliacaoBancariaId: string;
}

export class ConciliacaoTransacao {
	id: string;
	trnData: Date;
	trnHistorico: string;
	trnDocumento: string;
	trnTipo: TipoTransacao;
	trnValor: number;
	conciliacaoBancaria: ConciliacaoBancaria;
	situacaoConciliacaoTrn: SituacaoConciliacaoTrn;
	tituloConciliadoId: string;
	tituloConciliadoDesc: string;
	dataConciliacao: Date;
	conciliadoComErro: boolean = false;
	conciliadoMsg: string;
}

export class ConciliacaoTransacaoAutoComplete {
	id: string;
	trnHistorico: string;
}

export class ConciliacaoTransacaoSumFields {
}
