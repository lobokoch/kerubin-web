/**********************************************************************************************
Code generated by MKL Plug-in
Copyright: Kerubin - kerubin.platform@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { Produto } from './../produto/produto.model';

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

export class FotoListFilter extends PaginationFilter {


	// Map key=value for developer custom fields parameters. The final parameters map must be a JSON object.
	customParams = new Map<any, any>();
}

////////////////////////
export class Foto {
	id: string;
	nome: string;
	descricao: string;
	tamanho: number;
	tipo: string;
  produto: Produto;

  constructor(id: string, descricao: string) {
    this.id = id;
    this.descricao = descricao;

  }
}

export class FotoImage extends Foto {
  imagem: string;
  miniatura: string;
}
////////////////////////

export class FotoAutoComplete {
	id: string;
	nome: string;
}

export class FotoSumFields {
}
