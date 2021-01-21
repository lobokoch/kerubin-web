import { ConciliacaoReprocessamentoService } from './../../../custom/conciliacaobancaria/conciliacao-reprocessamento.service';
import { ConciliacaoBancariaService } from './../conciliacaobancaria/conciliacaobancaria.service';
import { PlanoContaAutoComplete } from './conciliacaotransacao.model';
/**********************************************************************************************
Code generated with MKL Plug-in version: 27.0.12
Code generated at time stamp: 2019-11-03T20:17:31.336
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import {ConfirmationService, LazyLoadEvent, SelectItem} from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import * as moment from 'moment';
import { MessageHandlerService } from 'src/app/core/message-handler.service';

import { ConciliacaoTransacaoService } from './conciliacaotransacao.service';
import { CadastrosBancoTranslationService } from './../i18n/cadastros-banco-translation.service';
import { ConciliacaoTransacao } from './conciliacaotransacao.model';
import { ConciliacaoTransacaoListFilter } from './conciliacaotransacao.model';
import { SortField } from './conciliacaotransacao.model';
import { ConciliacaoTransacaoTrnHistoricoAutoComplete } from './conciliacaotransacao.model';
import { ConciliacaoTransacaoTrnDocumentoAutoComplete } from './conciliacaotransacao.model';

import { TipoTransacao } from './../enums/cadastros-banco-enums.model';

import { SituacaoConciliacaoTrn } from './../enums/cadastros-banco-enums.model';

import { ConciliacaoBancariaAutoComplete } from './../conciliacaobancaria/conciliacaobancaria.model';


import { ConciliacaoTransacaoTitulo } from './../conciliacaotransacaotitulo/conciliacaotransacaotitulo.model';
import { ConciliacaoTransacaoTituloAutoComplete } from './../conciliacaotransacaotitulo/conciliacaotransacaotitulo.model';
import { AutoComplete } from 'primeng/autocomplete';
// import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-list-conciliacaotransacao',
  templateUrl: './list-conciliacaotransacao.component.html',
  styleUrls: ['./list-conciliacaotransacao.component.css']
})

export class ConciliacaoTransacaoListComponent implements OnInit {


	tableLoading = false;
  // Begin planoContasDialog
  displayDialogPlanoContas = false;
  planoContasAutoCompleteSuggestions: PlanoContaAutoComplete[];
  // Begin planoContasDialog


	conciliacaoTransacaoListItems: ConciliacaoTransacao[];
	conciliacaoTransacaoListTotalElements = 0;
	conciliacaoTransacaoListTotalPages = 0;
	conciliacaoTransacaoListFilter = new ConciliacaoTransacaoListFilter();


	conciliacaoTransacaoTrnDataIsBetweenOptionsSelected: SelectItem = {label: 'Personalizado', value: '99'};

	conciliacaoTransacaoTrnHistoricoAutoCompleteSuggestions: ConciliacaoTransacaoTrnHistoricoAutoComplete[];
	conciliacaoTransacaoTrnDocumentoAutoCompleteSuggestions: ConciliacaoTransacaoTrnDocumentoAutoComplete[];
	conciliacaoTransacaoTrnTipoOptions: TipoTransacao[];


	conciliacaoTransacaoSituacaoConciliacaoTrnOptions: SituacaoConciliacaoTrn[];



	dateFilterIntervalDropdownItems: SelectItem[];



	// Begin polling reference variables
	pollingRecarregarTransacoesRef: any = null;
  // End polling reference variables

  // Begin Dialog
  displayDialog = false;
  selectedConciliacaoTransacao = new ConciliacaoTransacao();
  conciliacaoTransacaoPlanoContas = new ConciliacaoTransacao();
  // private conciliacaoTransacao = new ConciliacaoTransacao();
  cols: any[];
  selectedConciliacaoTransacaoTitulo: ConciliacaoTransacaoTitulo;
  titulosDialog: ConciliacaoTransacaoTitulo[];
  // End Dialog

  // Begin custom params
  conciliadoComMaisDeUmTitulo = false;
  conciliacaoTransacaoComMesmoTitulo = false;
  // End custom params

  // Definição de um emissor de eventos.
  @Output() transacaoAlterada = new EventEmitter();
  @ViewChild('planoContasAutoCompleteEl') planoContasAutoCompleteElement: AutoComplete;

	constructor(
	    private conciliacaoTransacaoService: ConciliacaoTransacaoService,
	    private cadastrosBancoTranslationService: CadastrosBancoTranslationService,
	    private confirmation: ConfirmationService,
      private messageHandler: MessageHandlerService,
      private conciliacaoBancariaService: ConciliacaoBancariaService,
      private conciliacaoReprocessamentoService: ConciliacaoReprocessamentoService
  ) {
    this.conciliacaoReprocessamentoService.setComponent(this);
    this.conciliacaoReprocessamentoService.setConciliacaoTransacaoService(conciliacaoTransacaoService);
  }

  onEditTransactionCellComplete(event) {
    if (event.field === '\'planoContas\'') {
      return;
    }
    const conciliacaoTransacao = event.data as ConciliacaoTransacao;

    if (conciliacaoTransacao) {
      this.selectedConciliacaoTransacao = conciliacaoTransacao; // É o item selecionado na grid.
      this.atualizarConciliacaoTransacao(conciliacaoTransacao);
    }
  }

  // onRowSelect(event) {
  onRowSelect(conciliacaoTransacao: ConciliacaoTransacao) {
    // this.selectedConciliacaoTransacao = event.data;
    this.selectedConciliacaoTransacao = conciliacaoTransacao;
    this.conciliacaoTransacaoPlanoContas = this.cloneConciliacaoTransacao(conciliacaoTransacao);
    // this.conciliacaoTransacao = this.cloneConciliacaoTransacao(event.data);
    const tituloConciliadoId = this.selectedConciliacaoTransacao.tituloConciliadoId;
    if (tituloConciliadoId) {
      const titulos = this.selectedConciliacaoTransacao.conciliacaoTransacaoTitulos;
      this.titulosDialog = titulos.map(it => this.cloneConciliacaoTransacaoTitulo(it));
      if (this.titulosDialog) {
        this.selectedConciliacaoTransacaoTitulo = this.titulosDialog.find(it => it.tituloConciliadoId === tituloConciliadoId);
      }
    }

    this.displayDialog = true;
  }

  confirmarDialog() {
    if (this.selectedConciliacaoTransacaoTitulo && this.selectedConciliacaoTransacao) {
      // Clone selected data
      const conciliacaoTransacao = this.cloneConciliacaoTransacao(this.selectedConciliacaoTransacao);

      // Update with data in the dialog
      conciliacaoTransacao.tituloConciliadoId = this.selectedConciliacaoTransacaoTitulo.tituloConciliadoId;
      conciliacaoTransacao.tituloConciliadoDesc = this.selectedConciliacaoTransacaoTitulo.tituloConciliadoDesc;
      conciliacaoTransacao.tituloConciliadoValor = this.selectedConciliacaoTransacaoTitulo.tituloConciliadoValor;
      conciliacaoTransacao.tituloConciliadoDataVen = this.selectedConciliacaoTransacaoTitulo.tituloConciliadoDataVen;
      conciliacaoTransacao.tituloConciliadoDataPag = this.selectedConciliacaoTransacaoTitulo.tituloConciliadoDataPag;
      conciliacaoTransacao.dataConciliacao = this.selectedConciliacaoTransacaoTitulo.dataConciliacao;
      conciliacaoTransacao.situacaoConciliacaoTrn = this.selectedConciliacaoTransacaoTitulo.situacaoConciliacaoTrn;
      conciliacaoTransacao.tituloPlanoContas = this.selectedConciliacaoTransacaoTitulo.tituloPlanoContas;
      conciliacaoTransacao.conciliadoComErro = false;
      conciliacaoTransacao.conciliadoMsg = null;


      // Update the titulos list.
      conciliacaoTransacao.conciliacaoTransacaoTitulos = this.titulosDialog;

      // Save in the database
      this.atualizarConciliacaoTransacao(conciliacaoTransacao);

      this.displayDialog = false;
    }
  }

reprocessarConciliacaoTransacao(conciliacaoTransacao: ConciliacaoTransacao) {
  const ids = new Array();
  ids.push(conciliacaoTransacao.id);

  this.conciliacaoBancariaService.reprocessar(ids)
  .then((response) => {
    console.log('Reprocessando...');
    conciliacaoTransacao.reprocessando = true;
    this.conciliacaoReprocessamentoService.track(ids);
  })
  .catch(error => {
    this.messageHandler.showError(error);
  });
}

  atualizarConciliacaoTransacao(conciliacaoTransacao: ConciliacaoTransacao) {
      this.conciliacaoTransacaoService.update(conciliacaoTransacao)
      .then((responseConciliacaoTransacao) => {
        try {
          // Emite o evento
          this.transacaoAlterada.emit(responseConciliacaoTransacao);
        }
        finally {
          const gridItems = [...this.conciliacaoTransacaoListItems];
          const index = this.findItemIndexNaGrid(responseConciliacaoTransacao);
          // const index = this.findItemIndexNaGrid(this.selectedConciliacaoTransacao);
          // const index = this.conciliacaoTransacaoListItems.indexOf(this.selectedConciliacaoTransacao);
          if (index === -1) {
            this.messageHandler.showError('O item foi alterado, porém não foi encontrado na lista.');
            return;
          }
          gridItems[index] = responseConciliacaoTransacao;

          this.conciliacaoTransacaoListItems = gridItems;

          // É legal, mas deixar o item, ajuda a tomar decisões para os itens da mesma conta não analisados ainda.
          // this.conciliacaoTransacaoFilterSearch();

          this.messageHandler.showSuccess('Registro alterado com sucesso!');

        }

      })
      .catch(error => {
        this.messageHandler.showError(error);
      });
  }

  deleteConciliacaoTransacaoTitulo(conciliacaoTransacaoTitulo: ConciliacaoTransacaoTitulo) {
    const titulos = this. titulosDialog;
    if (titulos) {
      const index = titulos.indexOf(conciliacaoTransacaoTitulo);
      // this.selectedConciliacaoTransacao.conciliacaoTransacaoTitulos = titulos.filter((val, i) => i !== index);
      this.titulosDialog.splice(index, 1);
    }
  }

  calcelarDialog() {
    this.displayDialog = false;
    this.selectedConciliacaoTransacao = null;
    this.selectedConciliacaoTransacaoTitulo = null;
    this.titulosDialog = null;
  }

  cloneConciliacaoTransacaoTitulo(source: ConciliacaoTransacaoTitulo): ConciliacaoTransacaoTitulo {
    const target = new ConciliacaoTransacaoTitulo();
    for (const prop in source) {
      if (source.hasOwnProperty(prop)) {
        target[prop] = source[prop];
      }
    }
    return target;
  }

  cloneConciliacaoTransacao(source: ConciliacaoTransacao): ConciliacaoTransacao {
    const target = new ConciliacaoTransacao();
    for (const prop in source) {
      if (source.hasOwnProperty(prop)) {
        target[prop] = source[prop];
      }
    }
    return target;
  }

  montarColunas() {
    this.cols = [
      { field: 'radioSelected', header: '', width: '40px' },
      { field: 'tituloConciliadoId', header: 'Id', width: '100px'},
      { field: 'tituloConciliadoDesc', header: 'Descrição', width: '300px' },
      { field: 'tituloConciliadoValor', header: 'Valor', width: '100px' },
      { field: 'tituloConciliadoDataVen', header: 'Vencimento', width: '100px' },
      { field: 'tituloConciliadoDataPag', header: 'Pagamento', width: '100px' },
      { field: 'tituloPlanoContas', header: 'Plano contas', width: '350px' },
      { field: 'dataConciliacao', header: 'Conciliação', width: '100px' },
      { field: 'situacaoConciliacaoTrn', header: 'Situação', width: '350px' },
      { field: 'situacaoConciliacaoMultiple', header: 'P/R Múl.', width: '100px' },
      { field: 'actions', header: 'Ações', width: '100px' } // slice:0:6, pega da primeira posição, 6 elementos.
  ];
  }

  getColStyle(col: any) {
    return { 'width': col.width};
  }

	ngOnInit() {
		this.conciliacaoTransacaoTrnDataIsBetweenOptionsOnClick(null);
		this.initializeDateFilterIntervalDropdownItems();


		this.initializeConciliacaoTransacaoTrnTipoOptions();


		this.initializeConciliacaoTransacaoSituacaoConciliacaoTrnOptions();

		this.conciliacaoTransacaoListFilter.conciliadoComErroIsNotNull = false;

    this.montarColunas();

	}

	conciliacaoTransacaoList(pageNumber = 0) {
      if (!this.conciliacaoTransacaoListFilter.conciliacaoBancariaId) {
        console.log('Cancelando list devido a this.conciliacaoTransacaoListFilter.conciliacaoBancariaId == null.');
        return;
      }

      this.conciliacaoTransacaoListFilter.pageNumber = pageNumber;
      if (!this.conciliadoComMaisDeUmTitulo) {
        this.conciliadoComMaisDeUmTitulo = false;
      }

      if (!this.conciliacaoTransacaoComMesmoTitulo) {
        this.conciliacaoTransacaoComMesmoTitulo = false;
      }

      this.conciliacaoTransacaoListFilter.customParams = this.conciliacaoTransacaoListFilter
        .customParams.set('conciliadoComMaisDeUmTitulo', this.conciliadoComMaisDeUmTitulo);

      this.conciliacaoTransacaoListFilter.customParams = this.conciliacaoTransacaoListFilter
        .customParams.set('conciliacaoTransacaoComMesmoTitulo', this.conciliacaoTransacaoComMesmoTitulo);

      this.tableLoading = true;
	    this.conciliacaoTransacaoService
	    .conciliacaoTransacaoList(this.conciliacaoTransacaoListFilter)
	    .then(result => {
          try {
            this.conciliacaoTransacaoListItems = result.items;
            this.conciliacaoTransacaoListTotalElements = result.totalElements;
            this.conciliacaoTransacaoListTotalPages = result.totalPages;
          } finally {
            this.tableLoading = false;
          }
        })
        .catch(e => {
          this.tableLoading = false;
      });

	}


	loadTransacoes(conciliacaoBancariaId: string) {
    this.conciliacaoTransacaoListFilter.conciliacaoBancariaId = conciliacaoBancariaId;
    this.conciliacaoTransacaoFilterSearch();
  }

	conciliacaoTransacaoFilterSearch() {
	    this.conciliacaoTransacaoList(0);
	}

  deleteConciliacaoTransacao(conciliacaoTransacao: ConciliacaoTransacao) {
	    this.confirmation.confirm({
	      message: 'Confirma a exclusão do registro?',
	      accept: () => {
	        this.conciliacaoTransacaoService.delete(conciliacaoTransacao.id)
	        .then(() => {
            this.messageHandler.showSuccess('Registro excluído!');

            this.transacaoAlterada.emit(conciliacaoTransacao);
	          this.conciliacaoTransacaoList(0);
	        })
	        .catch((e) => {
	          this.messageHandler.showError(e);
	        });
	      }
	    });
	}

	conciliacaoTransacaoListOnLazyLoad(event: LazyLoadEvent) {
	    if (event.multiSortMeta) {
	      this.conciliacaoTransacaoListFilter.sortFields = new Array(event.multiSortMeta.length);
	      event.multiSortMeta.forEach(sortField => {
	      	this.conciliacaoTransacaoListFilter.sortFields.push(new SortField(sortField.field, sortField.order));
	      });
	    } else {
	    	this.conciliacaoTransacaoListFilter.sortFields = new Array(1);
	    	this.conciliacaoTransacaoListFilter.sortFields.push(new SortField('id', 1)); // asc
	    }
	    const pageNumber = event.first / event.rows;
	    this.conciliacaoTransacaoList(pageNumber);
	}

	conciliacaoTransacaoTrnHistoricoAutoComplete(event) {
	    const query = event.query;
	    this.conciliacaoTransacaoService.conciliacaoTransacaoTrnHistoricoAutoComplete(query)
	    .then((result) => {
	      this.conciliacaoTransacaoTrnHistoricoAutoCompleteSuggestions = result;
	    })
	    .catch(erro => {
	      this.messageHandler.showError('Erro ao buscar registros com o termo: ' + query);
	    });
	}

	conciliacaoTransacaoTrnDocumentoAutoComplete(event) {
	    const query = event.query;
	    this.conciliacaoTransacaoService.conciliacaoTransacaoTrnDocumentoAutoComplete(query)
	    .then((result) => {
	      this.conciliacaoTransacaoTrnDocumentoAutoCompleteSuggestions = result;
	    })
	    .catch(erro => {
	      this.messageHandler.showError('Erro ao buscar registros com o termo: ' + query);
	    });
	}


	private initializeConciliacaoTransacaoTrnTipoOptions() {
	    this.conciliacaoTransacaoTrnTipoOptions = [
	    	{ label: 'Selecione um item', value: null },
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacao_trnTipo_credito'), value: 'CREDITO' },
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacao_trnTipo_debito'), value: 'DEBITO' },
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacao_trnTipo_outros'), value: 'OUTROS' }
	    ];
  }

  loadingSituacaoForPolling(conciliacaoTransacao: ConciliacaoTransacao): boolean {
    const result = conciliacaoTransacao.reprocessando || (
    this.pollingRecarregarTransacoesRef &&
      conciliacaoTransacao && conciliacaoTransacao.situacaoConciliacaoTrn &&
      (String(conciliacaoTransacao.situacaoConciliacaoTrn) === 'NAO_CONCILIADO' ||
      // Aplicando conciliação
      (String(conciliacaoTransacao.situacaoConciliacaoTrn) === 'CONCILIAR_CONTAS_PAGAR' ||
      String(conciliacaoTransacao.situacaoConciliacaoTrn) === 'CONCILIAR_CONTAS_RECEBER' ||
      String(conciliacaoTransacao.situacaoConciliacaoTrn) === 'CONCILIAR_CAIXA')));

    return result;
  }

	private initializeConciliacaoTransacaoSituacaoConciliacaoTrnOptions() {
	    this.conciliacaoTransacaoSituacaoConciliacaoTrnOptions = [
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacao_situacaoConciliacaoTrn_nao_conciliado'), value: 'NAO_CONCILIADO' },
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacao_situacaoConciliacaoTrn_conciliar_contas_pagar'), value: 'CONCILIAR_CONTAS_PAGAR' },
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacao_situacaoConciliacaoTrn_conciliado_contas_pagar'), value: 'CONCILIADO_CONTAS_PAGAR' },
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacao_situacaoConciliacaoTrn_contas_pagar_baixado_sem_conciliacao'), value: 'CONTAS_PAGAR_BAIXADO_SEM_CONCILIACAO' },
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacao_situacaoConciliacaoTrn_conciliar_contas_receber'), value: 'CONCILIAR_CONTAS_RECEBER' },
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacao_situacaoConciliacaoTrn_conciliado_contas_receber'), value: 'CONCILIADO_CONTAS_RECEBER' },
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacao_situacaoConciliacaoTrn_contas_receber_baixado_sem_conciliacao'), value: 'CONTAS_RECEBER_BAIXADO_SEM_CONCILIACAO' },
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacao_situacaoConciliacaoTrn_conciliar_caixa'), value: 'CONCILIAR_CAIXA' },
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacao_situacaoConciliacaoTrn_conciliado_caixa'), value: 'CONCILIADO_CAIXA' },
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacao_situacaoConciliacaoTrn_caixa_baixado_sem_conciliacao'), value: 'CAIXA_BAIXADO_SEM_CONCILIACAO' },
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacao_situacaoConciliacaoTrn_erro'), value: 'ERRO' },
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacao_situacaoConciliacaoTrn_cancelado'), value: 'CANCELADO' }
	    ];
	}


	conciliacaoTransacaoConciliacaoBancariaAutoCompleteFieldConverter(conciliacaoBancaria: ConciliacaoBancariaAutoComplete) {
		if (conciliacaoBancaria) {
			return (conciliacaoBancaria.bancoId || '<nulo>');
		} else {
			return null;
		}
	}

	conciliacaoTransacaoConciliacaoTransacaoTitulosAutoCompleteFieldConverter(conciliacaoTransacaoTitulos: ConciliacaoTransacaoTitulo[]) {
		if (conciliacaoTransacaoTitulos) {
			return (conciliacaoTransacaoTitulos.length);
		} else {
			return 0;
		}
	}


	private initializeDateFilterIntervalDropdownItems() {
		this.dateFilterIntervalDropdownItems = [
		    {label: 'Minha competência', value: '12'},
		    {label: 'Hoje', value: '0'},
		    {label: 'Amanhã', value: '1'},
		    {label: 'Esta semana', value: '2'},
		    {label: 'Semana que vem', value: '3'},
		    {label: 'Este mês', value: '4'},
		    {label: 'Mês que vem', value: '5'},
		    {label: 'Este ano', value: '6'},
		    {label: 'Ano que vem', value: '7'},
		    {label: 'Ontem', value: '8'},
		    {label: 'Semana passada', value: '9'},
		    {label: 'Mês passado', value: '10'},
		    {label: 'Ano passado', value: '11'},
		    {label: 'Personalizado', value: '99'}
		  ];
	}


	conciliacaoTransacaoTrnDataIsBetweenOptionsOnClick(dropdown: Dropdown) {
		this.conciliacaoTransacaoListFilter.trnDataFrom = null;
		this.conciliacaoTransacaoListFilter.trnDataTo = null;

		let dateFrom = null;
		let dateTo = null;

		const valor = Number(this.conciliacaoTransacaoTrnDataIsBetweenOptionsSelected.value);
		switch (valor) {
			case 0: // Hoje
				dateFrom = moment();
				dateTo = moment();
				break;
				//
			case 1: // Amanhã
				dateFrom = moment().add(1, 'day');
				dateTo = moment().add(1, 'day');
				break;
				//
			case 2: // Esta semana
				dateFrom = moment().startOf('week');
				dateTo = moment().endOf('week');
				break;
				//
			case 3: // Semana que vem
				dateFrom = moment().add(1, 'week').startOf('week');
				dateTo = moment().add(1, 'week').endOf('week');
				break;
				//
			case 4: // Este mês
				dateFrom = moment().startOf('month');
				dateTo = moment().endOf('month');
				break;
				//
			case 5: // Mês que vem
				dateFrom = moment().add(1, 'month').startOf('month');
				dateTo = moment().add(1, 'month').endOf('month');
				break;
				//
			case 6: // Este ano
				dateFrom = moment().startOf('year');
				dateTo = moment().endOf('year');
				break;
				//
			case 7: // Ano que vem
				dateFrom = moment().add(1, 'year').startOf('year');
				dateTo = moment().add(1, 'year').endOf('year');
				break;
				// Passado
			case 8: // Ontem
				dateFrom = moment().add(-1, 'day');
				dateTo = moment().add(-1, 'day');
				break;
				//
			case 9: // Semana passada
				dateFrom = moment().add(-1, 'week').startOf('week');
				dateTo = moment().add(-1, 'week').endOf('week');
				break;
				//
			case 10: // Mês passado
				dateFrom = moment().add(-1, 'month').startOf('month');
				dateTo = moment().add(-1, 'month').endOf('month');
				break;
				//
			case 11: // Ano passado
				dateFrom = moment().add(-1, 'year').startOf('year');
				dateTo = moment().add(-1, 'year').endOf('year');
				break;

			case 12: // Minha competência
				dateFrom = moment().startOf('month');
				dateTo = moment().endOf('month').add(5, 'day'); // Five days after and of the month
				break;

			default:
				break;
		} // switch

		if (dateFrom != null) {
		  this.conciliacaoTransacaoListFilter.trnDataFrom = dateFrom.toDate();
		}

		if (dateTo != null) {
		  this.conciliacaoTransacaoListFilter.trnDataTo = dateTo.toDate();
		}

		if (dateFrom != null && dateTo != null) {
		  // this.conciliacaoTransacaoList(0);
		}
	}


	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.cadastrosBancoTranslationService.getTranslation(key);
		return value;

		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}



	// Begin polling methods for: recarregarTransacoes
	startPollingRecarregarTransacoes() {
	  this.pollingRecarregarTransacoesRef = setInterval(() => {
	    this.runPollingRecarregarTransacoes();
	  }, 3000);
	}

	stopPollingRecarregarTransacoes() {
    clearInterval(this.pollingRecarregarTransacoesRef);
    this.pollingRecarregarTransacoesRef = null;
	}

	runPollingRecarregarTransacoes() {
	  // You can replace this code by your code.

	  this.conciliacaoTransacaoFilterSearch();
	}
  // End polling methods for: recarregarTransacoes

  calculateTransacaoRowStyle(conciliacaoTransacao: ConciliacaoTransacao) {
    const mustSyle = conciliacaoTransacao && (conciliacaoTransacao.conciliadoMsg ||
      conciliacaoTransacao.conciliacaoTransacaoTitulos && conciliacaoTransacao.conciliacaoTransacaoTitulos.length > 1);
    if (mustSyle) {
      const style = {
        color: 'red'
      };

      return style;
    }

    return null;
  }

  // Begin displayDialogPlanoContas


  onCellEditPlanoContas(conciliacaoTransacao: ConciliacaoTransacao) {

    this.selectedConciliacaoTransacao = conciliacaoTransacao;
    this.conciliacaoTransacaoPlanoContas = this.cloneConciliacaoTransacao(conciliacaoTransacao);

    this.displayDialogPlanoContas = true;

    // this.onPlanoContasAutoCompleteAfterShow();

  }

  confirmarDialogPlanoContas() {

    this.selectedConciliacaoTransacao = this.conciliacaoTransacaoPlanoContas;
    this.atualizarConciliacaoTransacao(this.conciliacaoTransacaoPlanoContas);

    /*const gridItems = [...this.conciliacaoTransacaoListItems];
    const index = this.findItemIndexNaGrid(this.selectedConciliacaoTransacao);
    if (index === -1) {
      this.messageHandler.showError('O item foi alterado, porém não foi encontrado na lista.');
      return;
    }
    gridItems[index] = this.conciliacaoTransacaoPlanoContas;

    this.conciliacaoTransacaoListItems = gridItems;*/


    this.displayDialogPlanoContas = false;
  }

  findItemIndexNaGrid(conciliacaoTransacaoToFind: ConciliacaoTransacao) {
    const id = conciliacaoTransacaoToFind.id;
    for (let i = 0; i < this.conciliacaoTransacaoListItems.length; i++) {
      const it = this.conciliacaoTransacaoListItems[i];
      if (it.id === id) {
        return i;
      }
    }

    return -1;
  }

  calcelarDialogPlanoContas() {

    this.selectedConciliacaoTransacao = null;
    this.conciliacaoTransacaoPlanoContas = new ConciliacaoTransacao();

    this.displayDialogPlanoContas = false;
  }

  planoContasAutoComplete(event) {
		const conciliacaoTransacao = (JSON.parse(JSON.stringify(this.selectedConciliacaoTransacao)));
		if (String(conciliacaoTransacao.tituloPlanoContas === '')) {
			conciliacaoTransacao.tituloPlanoContas = null;
		}
	    const query = event.query;
	    this.conciliacaoTransacaoService
	      .planoContaPlanoContasAutoComplete(query, conciliacaoTransacao)
	      .then((result) => {
	        this.planoContasAutoCompleteSuggestions = result as PlanoContaAutoComplete[];
	      })
	      .catch(error => {
	        this.messageHandler.showError(error);
	      });
  }

  getTipoTransacaoIconClass(conciliacaoTransacao: ConciliacaoTransacao) {
    if (!conciliacaoTransacao || !conciliacaoTransacao.trnTipo) {
      return null;
    }

    if ( String(conciliacaoTransacao.trnTipo) === 'CREDITO' ) {
      return 'pi pi-plus-circle';
    } else {
      return 'pi pi-minus-circle';

    }

  }

  planoContasAutoCompleteFieldConverter(planoContas: PlanoContaAutoComplete) {
    let text = '';
    if (planoContas) {
      /*if (planoContas.codigo) {
          if (text !== '') {
            text += ' - ';
          }
          text += planoContas.codigo;
      }*/

      if (planoContas.descricao) {
          if (text !== '') {
            text += ' - ';
          }
          text += planoContas.descricao;
      }

    }

    if (text === '') {
      text = null;
    }
    return text;
  }

  planoContasAutoCompleteClear(event) {
    // The autoComplete value has been reseted
    if (this.selectedConciliacaoTransacao) {
      this.selectedConciliacaoTransacao.tituloPlanoContas = null;
    }
	}

	planoContasAutoCompleteOnBlur(event) {
		// Seems a PrimeNG bug, if clear an autocomplete field, on onBlur event, the null value is empty string.
		// Until PrimeNG version: 7.1.3.
		if ( this.selectedConciliacaoTransacao && String(this.selectedConciliacaoTransacao.tituloPlanoContas) === '') {
			this.selectedConciliacaoTransacao.tituloPlanoContas = null;
		}
  }

  onPlanoContasAutoCompleteAfterShow(event) {
    this.planoContasAutoCompleteElement.focusInput();
  }


  // End displayDialogPlanoContas

}
