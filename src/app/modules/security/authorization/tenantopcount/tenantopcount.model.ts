/**********************************************************************************************
Code generated with MKL Plug-in version: 55.0.3
Copyright: Kerubin - kerubin.platform@gmail.com

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
  sortFields: SortField[];

  constructor() {
    this.pageNumber = 0;
    this.pageSize = 10;
  }
}

export class TenantOpCountListFilter extends PaginationFilter {
	
	
	// Map key=value for developer custom fields parameters. The final parameters map must be a JSON object.
	customParams = new Map<any, any>();
}

export class TenantOpCount {
	id: string;
	description: string;
	tenant: Tenant;
	yearOp: number;
	monthOp: number;
	dayOp: number;
	hourOp: number;
	countGet: number;
	countPost: number;
	countPut: number;
	countDelete: number;
	countList: number;
	countAutoComplete: number;
	countOp: number;
}

export class TenantOpCountAutoComplete {
	id: string;
	description: string;
}

export class TenantOpCountSumFields {
}
