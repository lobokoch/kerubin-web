/**********************************************************************************************
Code generated by MKL Plug-in
Copyright: Kerubin - kerubin.platform@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


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

export class TenantNameAutoComplete {
	name: string;
}

export class TenantListFilter extends PaginationFilter {
	
	name: TenantNameAutoComplete[];
	
	// Map key=value for developer custom fields parameters. The final parameters map must be a JSON object.
	customParams = new Map<any, any>();
}

export class Tenant {
	id: string;
	name: string;
	maxUsers: number;
	balance: number;
	active: boolean = false;
}

export class TenantAutoComplete {
	id: string;
	name: string;
}

export class TenantSumFields {
}
