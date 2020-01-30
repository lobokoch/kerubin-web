/**********************************************************************************************
Code generated with MKL Plug-in version: 60.0.6
Copyright: Kerubin - kerubin.platform@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { Banco } from './../banco/banco.model';
import { BandeiraCartao } from './../bandeiracartao/bandeiracartao.model';

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

export class CartaoCreditoListFilter extends PaginationFilter {
	
	
	// Map key=value for developer custom fields parameters. The final parameters map must be a JSON object.
	customParams = new Map<any, any>();
}

export class CartaoCredito {
	id: string;
	banco: Banco;
	nomeTitular: string;
	numeroCartao: string;
	validade: Date;
	valorLimite: number;
	bandeiraCartao: BandeiraCartao;
	ativo: boolean = true;
	deleted: boolean = false;
}

export class CartaoCreditoAutoComplete {
	id: string;
	nomeTitular: string;
	numeroCartao: string;
}

export class CartaoCreditoSumFields {
}
