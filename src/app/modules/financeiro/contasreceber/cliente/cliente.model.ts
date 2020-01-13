/**********************************************************************************************
Code generated with MKL Plug-in version: 47.7.13
Code generated at time stamp: 2020-01-07T19:01:18.257
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { TipoPessoa } from './../enums/financeiro-contasreceber-enums.model';

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

export class ClienteNomeAutoComplete {
	nome: string;
}

export class ClienteListFilter extends PaginationFilter {
	
	nome: ClienteNomeAutoComplete[];
	
	// Map key=value for developer custom fields parameters. The final parameters map must be a JSON object.
	customParams = new Map<any, any>();
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
