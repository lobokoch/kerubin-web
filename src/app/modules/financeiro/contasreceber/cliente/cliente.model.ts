/**********************************************************************************************
Code generated with MKL Plug-in version: 6.0.2
Code generated at time stamp: 2019-06-29T09:26:17.814
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

export class ClienteNomeAutoComplete {
	nome: string;
}

export class ClienteListFilter extends PaginationFilter {
	
	nome: ClienteNomeAutoComplete[];
}

export class Cliente {
	id: string;
	nome: string;
	cpfCNPJ: string;
	deleted: boolean = false;
}

export class ClienteAutoComplete {
	id: string;
	nome: string;
}

export class ClienteSumFields {
}
