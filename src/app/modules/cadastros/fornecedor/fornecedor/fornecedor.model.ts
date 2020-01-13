/**********************************************************************************************
Code generated with MKL Plug-in version: 47.7.13
Code generated at time stamp: 2020-01-07T19:01:50.602
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { TipoPessoa } from './../enums/cadastros-fornecedor-enums.model';
import { UF } from './../enums/cadastros-fornecedor-enums.model';

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

export class FornecedorNomeAutoComplete {
	nome: string;
}

export class FornecedorListFilter extends PaginationFilter {
	
	nome: FornecedorNomeAutoComplete[];
	
	// Map key=value for developer custom fields parameters. The final parameters map must be a JSON object.
	customParams = new Map<any, any>();
}

export class Fornecedor {
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
	uf: UF;
	cidade: string;
	bairro: string;
	endereco: string;
	numero: string;
	complemento: string;
	observacoes: string;
	ativo: boolean = true;
}

export class FornecedorAutoComplete {
	id: string;
	nome: string;
}

export class FornecedorSumFields {
}
