/**********************************************************************************************
Code generated with MKL Plug-in version: 47.7.13
Code generated at time stamp: 2020-01-07T19:00:51.829
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
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

import { PlanoContaAutoComplete } from './../planoconta/planoconta.model';

import { ConciliacaoTransacaoTituloAutoComplete } from './../conciliacaotransacaotitulo/conciliacaotransacaotitulo.model';

@Component({
  selector: 'app-list-conciliacaotransacao',
  templateUrl: './list-conciliacaotransacao.component.html',
  styleUrls: ['./list-conciliacaotransacao.component.css']
})

export class ConciliacaoTransacaoListComponent implements OnInit {
	tableLoading = false;
	
	conciliacaoTransacaoListItems: ConciliacaoTransacao[];
	conciliacaoTransacaoListTotalElements = 0;
	conciliacaoTransacaoListFilter = new ConciliacaoTransacaoListFilter();
	
	
	conciliacaoTransacaoTrnDataIsBetweenOptionsSelected: SelectItem = {label: 'Personalizado', value: '99'};
	
	conciliacaoTransacaoTrnHistoricoAutoCompleteSuggestions: ConciliacaoTransacaoTrnHistoricoAutoComplete[];
	conciliacaoTransacaoTrnDocumentoAutoCompleteSuggestions: ConciliacaoTransacaoTrnDocumentoAutoComplete[];
	conciliacaoTransacaoTrnTipoOptions: TipoTransacao[];
	
	
	conciliacaoTransacaoSituacaoConciliacaoTrnOptions: SituacaoConciliacaoTrn[];
	
	
	
	dateFilterIntervalDropdownItems: SelectItem[];
	
	
	
	// Begin polling reference variables
	private pollingRecarregarTransacoesRef: any;
	// End polling reference variables
	
	constructor(
	    private conciliacaoTransacaoService: ConciliacaoTransacaoService,
	    private cadastrosBancoTranslationService: CadastrosBancoTranslationService,
	    private confirmation: ConfirmationService,
	    private messageHandler: MessageHandlerService
	) { }
	
	ngOnInit() {
		this.conciliacaoTransacaoTrnDataIsBetweenOptionsOnClick(null);
		this.initializeDateFilterIntervalDropdownItems();
		
		
		this.initializeConciliacaoTransacaoTrnTipoOptions();
		
		
		this.initializeConciliacaoTransacaoSituacaoConciliacaoTrnOptions();
		
		this.conciliacaoTransacaoListFilter.conciliadoComErroIsNotNull = false;
		
		
	}
	
	conciliacaoTransacaoList(pageNumber = 0) {
		this.tableLoading = true;
	    this.conciliacaoTransacaoListFilter.pageNumber = pageNumber;
	    this.conciliacaoTransacaoService
	    .conciliacaoTransacaoList(this.conciliacaoTransacaoListFilter)
	    .then(result => {
	    	try {
		      	this.conciliacaoTransacaoListItems = result.items;
		      	this.conciliacaoTransacaoListTotalElements = result.totalElements;
		      
			} finally {
				this.tableLoading = false;
			}
	    })
	    .catch(e => {
	    	this.tableLoading = false;
	    });
		
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
	  
	private initializeConciliacaoTransacaoSituacaoConciliacaoTrnOptions() {
	    this.conciliacaoTransacaoSituacaoConciliacaoTrnOptions = [
	    	{ label: 'Selecione um item', value: null },
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
	
	conciliacaoTransacaoTituloPlanoContasAutoCompleteFieldConverter(tituloPlanoContas: PlanoContaAutoComplete) {
		if (tituloPlanoContas) {
			return (tituloPlanoContas.codigo || '<nulo>') + ' - ' + (tituloPlanoContas.descricao || '<nulo>');
		} else {
			return null;
		}
	}
	
	conciliacaoTransacaoConciliacaoTransacaoTitulosAutoCompleteFieldConverter(conciliacaoTransacaoTitulos: ConciliacaoTransacaoTituloAutoComplete) {
		if (conciliacaoTransacaoTitulos) {
			return (conciliacaoTransacaoTitulos.tituloConciliadoDesc || '<nulo>');
		} else {
			return null;
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
	}
	
	runPollingRecarregarTransacoes() {
	  // You can replace this code by your code.
	  
	  this.conciliacaoTransacaoFilterSearch();
	}
	// End polling methods for: recarregarTransacoes
	
}