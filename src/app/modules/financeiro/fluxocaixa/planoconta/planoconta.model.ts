/**********************************************************************************************
Code generated with MKL Plug-in version: 3.20.3
Code generated at time stamp: 2019-06-22T18:21:47.106
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { TipoPlanoContaFinanceiro } from './../enums/financeiro-fluxocaixa-enums.model';
import { TipoReceitaDespesa } from './../enums/financeiro-fluxocaixa-enums.model';

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

export class PlanoContaListFilter extends PaginationFilter {
	
}

export class PlanoConta {
	id: string;
	codigo: string;
	descricao: string;
	tipoFinanceiro: TipoPlanoContaFinanceiro;
	tipoReceitaDespesa: TipoReceitaDespesa;
	planoContaPai: PlanoConta;
	ativo: boolean = true;
	deleted: boolean = false;
}

export class PlanoContaAutoComplete {
	id: string;
	codigo: string;
	descricao: string;
}

export class PlanoContaSumFields {
}
