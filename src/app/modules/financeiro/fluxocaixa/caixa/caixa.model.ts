/**********************************************************************************************
Code generated with MKL Plug-in version: 40.2.1
Code generated at time stamp: 2019-12-29T08:40:12.255
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
	
	
	// Map key=value for developer custom fields parameters. The final parameters map must be a JSON object.
	customParams = new Map<any, any>();
}

export class Caixa {
	id: string;
	nome: string;
	ativo: boolean = true;
	saldo: number;
	observacoes: string;
	version: number;
}

export class CaixaAutoComplete {
	id: string;
	nome: string;
	version: number;
}

export class CaixaSumFields {
}
