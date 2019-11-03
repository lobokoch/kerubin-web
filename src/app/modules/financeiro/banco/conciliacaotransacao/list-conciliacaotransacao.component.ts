/**********************************************************************************************
Code generated with MKL Plug-in version: 27.0.12
Code generated at time stamp: 2019-11-03T20:17:31.336
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

import { ConciliacaoBancariaAutoComplete } from './../conciliacaobancaria/conciliacaobancaria.model';

@Component({
  selector: 'app-list-conciliacaotransacao',
  templateUrl: './list-conciliacaotransacao.component.html',
  styleUrls: ['./list-conciliacaotransacao.component.css']
})

export class ConciliacaoTransacaoListComponent implements OnInit {
	
	conciliacaoTransacaoListItems: ConciliacaoTransacao[];
	conciliacaoTransacaoListTotalElements = 0;
	conciliacaoTransacaoListFilter = new ConciliacaoTransacaoListFilter();
	
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
	}
	
	conciliacaoTransacaoList(pageNumber = 0) {
	    this.conciliacaoTransacaoListFilter.pageNumber = pageNumber;
	    this.conciliacaoTransacaoService
	    .conciliacaoTransacaoList(this.conciliacaoTransacaoListFilter)
	    .then(result => {
	      	this.conciliacaoTransacaoListItems = result.items;
	      	this.conciliacaoTransacaoListTotalElements = result.totalElements;
	      
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
	    if (event.sortField) {
	      this.conciliacaoTransacaoListFilter.sortField = new SortField(event.sortField, event.sortOrder);
	    } else {
	      this.conciliacaoTransacaoListFilter.sortField = new SortField('id', 1); // asc
	    }
	    const pageNumber = event.first / event.rows;
	    this.conciliacaoTransacaoList(pageNumber);
	}
	
	
	
	conciliacaoTransacaoConciliacaoBancariaAutoCompleteFieldConverter(conciliacaoBancaria: ConciliacaoBancariaAutoComplete) {
		if (conciliacaoBancaria) {
			return (conciliacaoBancaria.bancoId || '<nulo>');
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
	  // You can replace this code for your code.
	  this.conciliacaoTransacaoFilterSearch();
	}
	// End polling methods for: recarregarTransacoes
	
}
