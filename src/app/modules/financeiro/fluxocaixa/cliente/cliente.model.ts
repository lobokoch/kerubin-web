/**********************************************************************************************
Code generated with MKL Plug-in version: 7.0.3
Code generated at time stamp: 2019-07-24T07:02:34.124
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

export class ClienteNomeAutoComplete {
	nome: string;
}

export class ClienteListFilter extends PaginationFilter {
	
	nome: ClienteNomeAutoComplete[];
}

export class Cliente {
	id: string;
	tipoPessoa: TipoPessoa;
	nome: string;
	cnpjCPF: string;
	deleted: boolean = false;
}

export class ClienteAutoComplete {
	id: string;
	nome: string;
}

export class ClienteSumFields {
}
