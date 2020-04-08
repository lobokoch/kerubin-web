/**********************************************************************************************
Code generated by MKL Plug-in
Copyright: Kerubin - kerubin.platform@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { Fornecedor } from './../fornecedor/fornecedor.model';
import { FormaPagamento } from './../enums/financeiro-contaspagar-enums.model';
import { ContaBancaria } from './../contabancaria/contabancaria.model';
import { CartaoCredito } from './../cartaocredito/cartaocredito.model';
import { PlanoConta } from './../planoconta/planoconta.model';
import { ContaPagar } from './../contapagar/contapagar.model';

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

export class ContaPagarMultipleListFilter extends PaginationFilter {
	
	
	// Map key=value for developer custom fields parameters. The final parameters map must be a JSON object.
	customParams = new Map<any, any>();
}

export class ContaPagarMultiple {
	id: string;
	dataPagamento: Date;
	valorPago: number;
	fornecedor: Fornecedor;
	maisOpcoes: boolean = false;
	descricao: string;
	formaPagamento: FormaPagamento;
	contaBancaria: ContaBancaria;
	cartaoCredito: CartaoCredito;
	outrosDescricao: string;
	planoContas: PlanoConta;
	contaPagar: ContaPagar;
}

export class ContaPagarMultipleAutoComplete {
	id: string;
	descricao: string;
}

export class ContaPagarMultipleSumFields {
	sumValorPago: number;
}
