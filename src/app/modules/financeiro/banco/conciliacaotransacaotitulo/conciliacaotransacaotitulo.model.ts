/**********************************************************************************************
Code generated with MKL Plug-in version: 30.0.4
Code generated at time stamp: 2019-11-20T06:17:24.247
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { ConciliacaoTransacao } from './../conciliacaotransacao/conciliacaotransacao.model';
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
}

export class PlanoContaTituloAutoComplete {
	id: string;
	codigo: string;
	descricao: string;
}

export class ConciliacaoTransacaoTitulo {
	id: string;
	conciliacaoTransacao: ConciliacaoTransacao;
	tituloConciliadoId: string;
	tituloConciliadoDesc: string;
	tituloConciliadoDataVen: Date;
        tituloConciliadoDataPag: Date;
        tituloConciliadoValor: number;
        tituloPlanoContas: PlanoContaTituloAutoComplete;
  	tituloConciliadoMultiple: boolean = false;
	dataConciliacao: Date;
	situacaoConciliacaoTrn: SituacaoConciliacaoTrn;
}

export class ConciliacaoTransacaoTituloAutoComplete {
	id: string;
	tituloConciliadoDesc: string;
}

export class ConciliacaoTransacaoTituloSumFields {
}
