/**********************************************************************************************
Code generated with MKL Plug-in version: 47.7.13
Code generated at time stamp: 2020-01-07T19:00:51.829
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

export class BandeiraCartaoNomeBandeiraAutoComplete {
	nomeBandeira: string;
}

export class BandeiraCartaoListFilter extends PaginationFilter {
	
	nomeBandeira: BandeiraCartaoNomeBandeiraAutoComplete[];
	
	// Map key=value for developer custom fields parameters. The final parameters map must be a JSON object.
	customParams = new Map<any, any>();
}

export class BandeiraCartao {
	id: string;
	nomeBandeira: string;
}

export class BandeiraCartaoAutoComplete {
	id: string;
	nomeBandeira: string;
}

export class BandeiraCartaoSumFields {
}
