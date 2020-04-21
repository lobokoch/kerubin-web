/**********************************************************************************************
Code generated with MKL Plug-in version: 27.0.10
Code generated at time stamp: 2019-11-03T07:57:18.876
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { TipoTransacao } from './../enums/cadastros-banco-enums.model';
import { ConciliacaoBancaria } from './../conciliacaobancaria/conciliacaobancaria.model';
import { SituacaoConciliacaoTrn } from './../enums/cadastros-banco-enums.model';
import { ConciliacaoTransacaoTitulo } from './../conciliacaotransacaotitulo/conciliacaotransacaotitulo.model';

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

export class ConciliacaoTransacaoTrnHistoricoAutoComplete {
	trnHistorico: string;
}

export class ConciliacaoTransacaoTrnDocumentoAutoComplete {
	trnDocumento: string;
}

export class ConciliacaoTransacaoListFilter extends PaginationFilter {

	trnDataFrom: Date;
	trnDataTo: Date;

	trnHistorico: ConciliacaoTransacaoTrnHistoricoAutoComplete[];

	trnDocumento: ConciliacaoTransacaoTrnDocumentoAutoComplete[];

	trnTipo: TipoTransacao;

	trnValorFrom: number;
	trnValorTo: number;

	conciliacaoBancariaId: string;

	situacaoConciliacaoTrn: SituacaoConciliacaoTrn;

	conciliadoComErroIsNotNull: boolean;

	// Map key=value for developer custom fields parameters. The final parameters map must be a JSON object.
	customParams = new Map<any, any>();
}

export class PlanoContaAutoComplete {
	id: string;
	codigo: string;
	descricao: string;
}

export class PlanoContaDTO {
	id: string;
	codigo: string;
	descricao: string;
}

export class ConciliacaoTransacao {
	id: string;
	trnId: string;
	trnData: Date;
	trnHistorico: string;
	trnDocumento: string;
	trnTipo: TipoTransacao;
	trnValor: number;
	conciliacaoBancaria: ConciliacaoBancaria;
	situacaoConciliacaoTrn: SituacaoConciliacaoTrn;
	tituloConciliadoId: string;
	tituloConciliadoDesc: string;
	tituloConciliadoValor: number;
	tituloConciliadoDataVen: Date;
	tituloConciliadoDataPag: Date;
	tituloPlanoContas: PlanoContaAutoComplete;
	tituloConciliadoMultiple: boolean = false;
	dataConciliacao: Date;
	conciliacaoTransacaoTitulos: ConciliacaoTransacaoTitulo[];
	conciliadoComErro: boolean = false;
	conciliadoMsg: string;
}

export class ConciliacaoTransacaoAutoComplete {
	id: string;
	trnId: string;
}

export class ConciliacaoTransacaoSumFields {
}
