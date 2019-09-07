/**********************************************************************************************
Code generated with MKL Plug-in version: 22.0.6
Code generated at time stamp: 2019-09-07T12:27:13.685
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { CaixaDiario } from './../caixadiario/caixadiario.model';
import { TipoLancamentoFinanceiro } from './../enums/financeiro-fluxocaixa-enums.model';
import { FormaPagamento } from './../enums/financeiro-fluxocaixa-enums.model';
import { ContaBancaria } from './../contabancaria/contabancaria.model';
import { CartaoCredito } from './../cartaocredito/cartaocredito.model';
import { PlanoConta } from './../planoconta/planoconta.model';
import { TipoFonteMovimento } from './../enums/financeiro-fluxocaixa-enums.model';
import { Cliente } from './../cliente/cliente.model';
import { Fornecedor } from './../fornecedor/fornecedor.model';

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

export class CaixaLancamentoDescricaoAutoComplete {
	descricao: string;
}

export class CaixaLancamentoListFilter extends PaginationFilter {
	
	descricao: CaixaLancamentoDescricaoAutoComplete[];
	
	dataLancamentoFrom: Date;
	dataLancamentoTo: Date;
	
	tipoLancamentoFinanceiro: TipoLancamentoFinanceiro;
	
	valorCreditoFrom: number;
	valorCreditoTo: number;
	
	valorDebitoFrom: number;
	valorDebitoTo: number;
	
	formaPagamento: FormaPagamento;
	
	tipoFonteMovimento: TipoFonteMovimento;
}

export class CaixaLancamento {
	id: string;
	caixaDiario: CaixaDiario;
	descricao: string;
	dataLancamento: Date;
	tipoLancamentoFinanceiro: TipoLancamentoFinanceiro;
	valorCredito: number;
	valorDebito: number;
	formaPagamento: FormaPagamento;
	contaBancaria: ContaBancaria;
	cartaoCredito: CartaoCredito;
	outrosDescricao: string;
	planoContas: PlanoConta;
	tipoFonteMovimento: TipoFonteMovimento;
	cliente: Cliente;
	fornecedor: Fornecedor;
	documento: string;
	observacoes: string;
	version: number;
}

export class CaixaLancamentoAutoComplete {
	id: string;
	descricao: string;
	version: number;
}

export class CaixaLancamentoSumFields {
	sumValorCredito: number;
	sumValorDebito: number;
}
