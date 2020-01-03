/**********************************************************************************************
Code generated with MKL Plug-in version: 40.3.1
Code generated at time stamp: 2020-01-03T07:15:22.295
Copyright: Kerubin - logokoch@gmail.com

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

export class BandeiraCartaoListFilter extends PaginationFilter {
	
	
	// Map key=value for developer custom fields parameters. The final parameters map must be a JSON object.
	customParams = new Map<any, any>();
}

export class BandeiraCartao {
	id: string;
	nomeBandeira: string;
	deleted: boolean = false;
}

export class BandeiraCartaoAutoComplete {
	id: string;
	nomeBandeira: string;
}

export class BandeiraCartaoSumFields {
}
