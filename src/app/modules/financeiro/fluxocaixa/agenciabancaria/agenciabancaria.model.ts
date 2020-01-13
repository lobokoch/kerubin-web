/**********************************************************************************************
Code generated with MKL Plug-in version: 47.7.13
Code generated at time stamp: 2020-01-07T19:01:49.329
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { Banco } from './../banco/banco.model';

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

export class AgenciaBancariaListFilter extends PaginationFilter {
	
	
	// Map key=value for developer custom fields parameters. The final parameters map must be a JSON object.
	customParams = new Map<any, any>();
}

export class AgenciaBancaria {
	id: string;
	banco: Banco;
	numeroAgencia: string;
	digitoAgencia: string;
	endereco: string;
	deleted: boolean = false;
}

export class AgenciaBancariaAutoComplete {
	id: string;
	numeroAgencia: string;
	digitoAgencia: string;
	endereco: string;
}

export class AgenciaBancariaSumFields {
}
