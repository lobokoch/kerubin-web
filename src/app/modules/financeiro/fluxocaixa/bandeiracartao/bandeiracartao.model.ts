/**********************************************************************************************
Code generated with MKL Plug-in version: 7.0.3
Code generated at time stamp: 2019-07-24T07:02:34.124
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
  sortField: SortField;

  constructor() {
    this.pageNumber = 0;
    this.pageSize = 10;
  }
}

export class BandeiraCartaoListFilter extends PaginationFilter {
	
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
