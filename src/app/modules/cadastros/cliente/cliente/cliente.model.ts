/**********************************************************************************************
Code generated with MKL Plug-in version: 7.0.0
Code generated at time stamp: 2019-07-22T05:49:59.640
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { TipoPessoa } from './../enums/cadastros-cliente-enums.model';

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
	ieRG: string;
	dataFundacaoNascimento: Date;
	nomeContato: string;
	fone: string;
	celular: string;
	email: string;
	site: string;
	cep: string;
	cidade: string;
	bairro: string;
	endereco: string;
	numero: string;
	complemento: string;
	observacoes: string;
	ativo: boolean = true;
}

export class ClienteAutoComplete {
	id: string;
	nome: string;
}

export class ClienteSumFields {
}
