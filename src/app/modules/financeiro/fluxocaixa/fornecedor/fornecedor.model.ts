/**********************************************************************************************
Code generated with MKL Plug-in version: 22.1.1
Code generated at time stamp: 2019-09-10T21:40:50.823
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { TipoPessoa } from './../enums/financeiro-fluxocaixa-enums.model';

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

export class FornecedorNomeAutoComplete {
	nome: string;
}

export class FornecedorListFilter extends PaginationFilter {
	
	nome: FornecedorNomeAutoComplete[];
}

export class Fornecedor {
	id: string;
	tipoPessoa: TipoPessoa;
	nome: string;
	cnpjCPF: string;
	deleted: boolean = false;
}

export class FornecedorAutoComplete {
	id: string;
	nome: string;
}

export class FornecedorSumFields {
}
