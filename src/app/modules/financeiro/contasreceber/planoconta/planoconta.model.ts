/**********************************************************************************************
Code generated with MKL Plug-in version: 40.3.1
Code generated at time stamp: 2020-01-03T07:14:21.364
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { TipoPlanoContaFinanceiro } from './../enums/financeiro-contasreceber-enums.model';
import { TipoReceitaDespesa } from './../enums/financeiro-contasreceber-enums.model';

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

export class PlanoContaCodigoAutoComplete {
	codigo: string;
}

export class PlanoContaDescricaoAutoComplete {
	descricao: string;
}

export class PlanoContaListFilter extends PaginationFilter {
	
	codigo: PlanoContaCodigoAutoComplete[];
	
	descricao: PlanoContaDescricaoAutoComplete[];
	
	ativoIsNotNull: boolean;
	ativoIsNull: boolean;
	
	// Map key=value for developer custom fields parameters. The final parameters map must be a JSON object.
	customParams = new Map<any, any>();
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
