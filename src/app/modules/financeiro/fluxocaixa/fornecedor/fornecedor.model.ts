/**********************************************************************************************
Code generated with MKL Plug-in version: 3.11.1
Code generated at time stamp: 2019-06-16T23:35:31.119
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

export class FornecedorListFilter extends PaginationFilter {
	
}

export class Fornecedor {
	id: string;
	nome: string;
	cpfCNPJ: string;
	deleted: boolean = false;
}

export class FornecedorAutoComplete {
	id: string;
	nome: string;
	cpfCNPJ: string;
}

export class FornecedorSumFields {
}
