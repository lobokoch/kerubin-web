/**********************************************************************************************
Code generated with MKL Plug-in version: 60.0.6
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
	deleted: boolean = false;
}

export class BandeiraCartaoAutoComplete {
	id: string;
	nomeBandeira: string;
}

export class BandeiraCartaoSumFields {
}
