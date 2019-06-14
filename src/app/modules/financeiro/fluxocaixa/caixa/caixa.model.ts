/**********************************************************************************************
Code generated with MKL Plug-in version: 3.9.0
Code generated at time stamp: 2019-06-14T00:00:25.670
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


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

export class CaixaListFilter extends PaginationFilter {
	
}

export class Caixa {
	id: string;
	nome: string;
	dataHoraAbertura: Date;
	saldoInicial: number;
	dataHoraFechamento: Date;
	saldoFinal: number;
	observacoes: string;
}

export class CaixaAutoComplete {
	id: string;
	nome: string;
}

export class CaixaSumFields {
}
