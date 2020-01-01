/**********************************************************************************************
Code generated with MKL Plug-in version: 40.2.5
Code generated at time stamp: 2019-12-31T10:27:34.608
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { SituacaoConciliacao } from './../enums/cadastros-banco-enums.model';

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

export class ConciliacaoBancariaListFilter extends PaginationFilter {
	
	
	// Map key=value for developer custom fields parameters. The final parameters map must be a JSON object.
	customParams = new Map<any, any>();
}

export class ConciliacaoBancaria {
	id: string;
	bancoId: string;
	agenciaId: string;
	contaId: string;
	dataIni: Date;
	dataFim: Date;
	situacaoConciliacao: SituacaoConciliacao;
}

export class ConciliacaoBancariaAutoComplete {
	id: string;
	bancoId: string;
}

export class ConciliacaoBancariaSumFields {
}
