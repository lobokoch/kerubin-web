/**********************************************************************************************
Code generated with MKL Plug-in version: 7.0.4
Code generated at time stamp: 2019-08-06T07:20:02.873
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { Tenant } from './../tenant/tenant.model';

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

export class TenantSaldoListFilter extends PaginationFilter {
	
}

export class TenantSaldo {
	id: string;
	nomeTenant: string;
	tenant: Tenant;
	descricao: string;
	saldoInicial: number;
	valorCredito: number;
	saldo: number;
}

export class TenantSaldoAutoComplete {
	id: string;
	nomeTenant: string;
}

export class TenantSaldoSumFields {
	sumValorCredito: number;
}
