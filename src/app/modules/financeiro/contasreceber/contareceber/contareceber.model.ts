/**********************************************************************************************
Code generated with MKL Plug-in version: 47.8.0
Code generated at time stamp: 2020-01-23T06:46:25.086
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { PlanoConta } from './../planoconta/planoconta.model';
import { FormaPagamento } from './../enums/financeiro-contasreceber-enums.model';
import { ContaBancaria } from './../contabancaria/contabancaria.model';
import { CartaoCredito } from './../cartaocredito/cartaocredito.model';
import { Cliente } from './../cliente/cliente.model';

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

export class ContaReceberDescricaoAutoComplete {
	descricao: string;
}

export class ContaReceberHistConcBancariaAutoComplete {
	histConcBancaria: string;
}

export class ContaReceberAgrupadorAutoComplete {
	agrupador: string;
}

export class ContaReceberListFilter extends PaginationFilter {
	
	descricao: ContaReceberDescricaoAutoComplete[];
	
	dataVencimentoFrom: Date;
	dataVencimentoTo: Date;
	
	valorFrom: number;
	valorTo: number;
	
	formaPagamento: FormaPagamento;
	
	dataPagamentoIsNotNull: boolean;
	dataPagamentoIsNull: boolean;
	
	idConcBancariaIsNotNull: boolean;
	
	histConcBancaria: ContaReceberHistConcBancariaAutoComplete[];
	
	agrupador: ContaReceberAgrupadorAutoComplete[];
	
	// Map key=value for developer custom fields parameters. The final parameters map must be a JSON object.
	customParams = new Map<any, any>();
}

export class ContaReceber {
	id: string;
	planoContas: PlanoConta;
	descricao: string;
	dataVencimento: Date;
	valor: number;
	formaPagamento: FormaPagamento;
	contaBancaria: ContaBancaria;
	cartaoCredito: CartaoCredito;
	outrosDescricao: string;
	dataPagamento: Date;
	valorDesconto: number;
	valorMulta: number;
	valorJuros: number;
	valorAcrescimos: number;
	valorPago: number;
	cliente: Cliente;
	numDocumento: string;
	idConcBancaria: string;
	histConcBancaria: string;
	numDocConcBancaria: string;
	observacoes: string;
	agrupador: string;
}

export class ContaReceberAutoComplete {
	id: string;
	descricao: string;
}

export class ContaReceberSumFields {
	sumValor: number;
	sumValorDesconto: number;
	sumValorMulta: number;
	sumValorJuros: number;
	sumValorAcrescimos: number;
	sumValorPago: number;
}
