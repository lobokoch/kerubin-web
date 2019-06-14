/**********************************************************************************************
Code generated with MKL Plug-in version: 3.9.0
Code generated at time stamp: 2019-06-14T00:00:25.670
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { Caixa } from './../caixa/caixa.model';
import { TipoFonteMovimento } from './../enums/financeiro-fluxocaixa-enums.model';
import { TipoPlanoContaFinanceiro } from './../enums/financeiro-fluxocaixa-enums.model';
import { PlanoConta } from './../planoconta/planoconta.model';
import { FormaPagamento } from './../enums/financeiro-fluxocaixa-enums.model';
import { ContaBancaria } from './../contabancaria/contabancaria.model';
import { CartaoCredito } from './../cartaocredito/cartaocredito.model';
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

export class MovimentoCaixaListFilter extends PaginationFilter {
	
}

export class MovimentoCaixa {
	id: string;
	caixa: Caixa;
	tipoFonteMovimento: TipoFonteMovimento;
	tipoMovimentoFinanceiro: TipoPlanoContaFinanceiro;
	planoContas: PlanoConta;
	descricao: string;
	valor: number;
	formaPagamento: FormaPagamento;
	contaBancaria: ContaBancaria;
	cartaoCredito: CartaoCredito;
	cliente: Cliente;
	fornecedor: Fornecedor;
	documento: string;
	observacoes: string;
}

export class MovimentoCaixaAutoComplete {
	id: string;
	descricao: string;
}

export class MovimentoCaixaSumFields {
}
