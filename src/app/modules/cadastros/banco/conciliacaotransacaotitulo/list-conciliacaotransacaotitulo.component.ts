/**********************************************************************************************
Code generated with MKL Plug-in version: 40.2.5
Code generated at time stamp: 2019-12-31T10:27:34.608
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import {ConfirmationService, LazyLoadEvent, SelectItem} from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import * as moment from 'moment';
import { MessageHandlerService } from 'src/app/core/message-handler.service';

import { ConciliacaoTransacaoTituloService } from './conciliacaotransacaotitulo.service';
import { CadastrosBancoTranslationService } from './../i18n/cadastros-banco-translation.service';
import { ConciliacaoTransacaoTitulo } from './conciliacaotransacaotitulo.model';
import { ConciliacaoTransacaoTituloListFilter } from './conciliacaotransacaotitulo.model';
import { SortField } from './conciliacaotransacaotitulo.model';

import { SituacaoConciliacaoTrn } from './../enums/cadastros-banco-enums.model';

import { ConciliacaoTransacaoAutoComplete } from './../conciliacaotransacao/conciliacaotransacao.model';

import { PlanoContaAutoComplete } from './../planoconta/planoconta.model';

@Component({
  selector: 'app-list-conciliacaotransacaotitulo',
  templateUrl: './list-conciliacaotransacaotitulo.component.html',
  styleUrls: ['./list-conciliacaotransacaotitulo.component.css']
})

export class ConciliacaoTransacaoTituloListComponent implements OnInit {
	
	conciliacaoTransacaoTituloListItems: ConciliacaoTransacaoTitulo[];
	conciliacaoTransacaoTituloListTotalElements = 0;
	conciliacaoTransacaoTituloListFilter = new ConciliacaoTransacaoTituloListFilter();
	
	conciliacaoTransacaoTituloSituacaoConciliacaoTrnOptions: SituacaoConciliacaoTrn[];
	dateFilterIntervalDropdownItems: SelectItem[];
	
	
	
	constructor(
	    private conciliacaoTransacaoTituloService: ConciliacaoTransacaoTituloService,
	    private cadastrosBancoTranslationService: CadastrosBancoTranslationService,
	    private confirmation: ConfirmationService,
	    private messageHandler: MessageHandlerService
	) { }
	
	ngOnInit() {
		this.initializeConciliacaoTransacaoTituloSituacaoConciliacaoTrnOptions();
	}
	
	conciliacaoTransacaoTituloList(pageNumber = 0) {
	    this.conciliacaoTransacaoTituloListFilter.pageNumber = pageNumber;
	    this.conciliacaoTransacaoTituloService
	    .conciliacaoTransacaoTituloList(this.conciliacaoTransacaoTituloListFilter)
	    .then(result => {
	      	this.conciliacaoTransacaoTituloListItems = result.items;
	      	this.conciliacaoTransacaoTituloListTotalElements = result.totalElements;
	      
	    });
		
	}
	
	
	conciliacaoTransacaoTituloFilterSearch() {
	    this.conciliacaoTransacaoTituloList(0);
	}
	
	deleteConciliacaoTransacaoTitulo(conciliacaoTransacaoTitulo: ConciliacaoTransacaoTitulo) {
	    this.confirmation.confirm({
	      message: 'Confirma a exclusão do registro?',
	      accept: () => {
	        this.conciliacaoTransacaoTituloService.delete(conciliacaoTransacaoTitulo.id)
	        .then(() => {
	          this.messageHandler.showSuccess('Registro excluído!');
	          this.conciliacaoTransacaoTituloList(0);
	        })
	        .catch((e) => {
	          this.messageHandler.showError(e);
	        });
	      }
	    });
	}
	
	conciliacaoTransacaoTituloListOnLazyLoad(event: LazyLoadEvent) {
	    if (event.sortField) {
	      this.conciliacaoTransacaoTituloListFilter.sortField = new SortField(event.sortField, event.sortOrder);
	    } else {
	      this.conciliacaoTransacaoTituloListFilter.sortField = new SortField('id', 1); // asc
	    }
	    const pageNumber = event.first / event.rows;
	    this.conciliacaoTransacaoTituloList(pageNumber);
	}
	
	
	private initializeConciliacaoTransacaoTituloSituacaoConciliacaoTrnOptions() {
	    this.conciliacaoTransacaoTituloSituacaoConciliacaoTrnOptions = [
	    	{ label: 'Selecione um item', value: null },
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacaoTitulo_situacaoConciliacaoTrn_nao_conciliado'), value: 'NAO_CONCILIADO' }, 
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacaoTitulo_situacaoConciliacaoTrn_conciliar_contas_pagar'), value: 'CONCILIAR_CONTAS_PAGAR' }, 
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacaoTitulo_situacaoConciliacaoTrn_conciliado_contas_pagar'), value: 'CONCILIADO_CONTAS_PAGAR' }, 
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacaoTitulo_situacaoConciliacaoTrn_contas_pagar_baixado_sem_conciliacao'), value: 'CONTAS_PAGAR_BAIXADO_SEM_CONCILIACAO' }, 
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacaoTitulo_situacaoConciliacaoTrn_conciliar_contas_receber'), value: 'CONCILIAR_CONTAS_RECEBER' }, 
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacaoTitulo_situacaoConciliacaoTrn_conciliado_contas_receber'), value: 'CONCILIADO_CONTAS_RECEBER' }, 
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacaoTitulo_situacaoConciliacaoTrn_contas_receber_baixado_sem_conciliacao'), value: 'CONTAS_RECEBER_BAIXADO_SEM_CONCILIACAO' }, 
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacaoTitulo_situacaoConciliacaoTrn_conciliar_caixa'), value: 'CONCILIAR_CAIXA' }, 
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacaoTitulo_situacaoConciliacaoTrn_conciliado_caixa'), value: 'CONCILIADO_CAIXA' }, 
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacaoTitulo_situacaoConciliacaoTrn_caixa_baixado_sem_conciliacao'), value: 'CAIXA_BAIXADO_SEM_CONCILIACAO' }, 
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacaoTitulo_situacaoConciliacaoTrn_erro'), value: 'ERRO' }, 
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacaoTitulo_situacaoConciliacaoTrn_cancelado'), value: 'CANCELADO' }
	    ];
	}
	  
	
	conciliacaoTransacaoTituloConciliacaoTransacaoAutoCompleteFieldConverter(conciliacaoTransacao: ConciliacaoTransacaoAutoComplete) {
		if (conciliacaoTransacao) {
			return (conciliacaoTransacao.trnId || '<nulo>');
		} else {
			return null;
		}
	}
	
	conciliacaoTransacaoTituloTituloPlanoContasAutoCompleteFieldConverter(tituloPlanoContas: PlanoContaAutoComplete) {
		if (tituloPlanoContas) {
			return (tituloPlanoContas.codigo || '<nulo>') + ' - ' + (tituloPlanoContas.descricao || '<nulo>');
		} else {
			return null;
		}
	}
	
	
	
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.cadastrosBancoTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	
}
