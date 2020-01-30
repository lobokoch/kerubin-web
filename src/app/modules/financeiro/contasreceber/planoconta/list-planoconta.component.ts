/**********************************************************************************************
Code generated with MKL Plug-in version: 60.0.6
Copyright: Kerubin - kerubin.platform@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import {ConfirmationService, LazyLoadEvent, SelectItem} from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import * as moment from 'moment';
import { MessageHandlerService } from 'src/app/core/message-handler.service';

import { PlanoContaService } from './planoconta.service';
import { FinanceiroContasReceberTranslationService } from './../i18n/financeiro-contasreceber-translation.service';
import { PlanoConta } from './planoconta.model';
import { PlanoContaListFilter } from './planoconta.model';
import { SortField } from './planoconta.model';
import { PlanoContaCodigoAutoComplete } from './planoconta.model';
import { PlanoContaDescricaoAutoComplete } from './planoconta.model';

import { PlanoContaAutoComplete } from './../planoconta/planoconta.model';

@Component({
  selector: 'app-list-planoconta',
  templateUrl: './list-planoconta.component.html',
  styleUrls: ['./list-planoconta.component.css']
})

export class PlanoContaListComponent implements OnInit {
	tableLoading = false;
	
	planoContaListItems: PlanoConta[];
	planoContaListTotalElements = 0;
	planoContaListFilter = new PlanoContaListFilter();
	
	planoContaCodigoAutoCompleteSuggestions: PlanoContaCodigoAutoComplete[];
	planoContaDescricaoAutoCompleteSuggestions: PlanoContaDescricaoAutoComplete[];
	
	
	
	dateFilterIntervalDropdownItems: SelectItem[];
	
	
	
	constructor(
	    private planoContaService: PlanoContaService,
	    private financeiroContasReceberTranslationService: FinanceiroContasReceberTranslationService,
	    private confirmation: ConfirmationService,
	    private messageHandler: MessageHandlerService
	) { }
	
	ngOnInit() {
		
		this.planoContaListFilter.ativoIsNotNull = true;
		
		this.planoContaListFilter.ativoIsNull = false;
		
	}
	
	planoContaList(pageNumber = 0) {
		this.tableLoading = true;
	    this.planoContaListFilter.pageNumber = pageNumber;
	    this.planoContaService
	    .planoContaList(this.planoContaListFilter)
	    .then(result => {
	    	try {
		      	this.planoContaListItems = result.items;
		      	this.planoContaListTotalElements = result.totalElements;
		      
			} finally {
				this.tableLoading = false;
			}
	    })
	    .catch(e => {
	    	this.tableLoading = false;
	    });
		
	}
	
	
	planoContaFilterSearch() {
	    this.planoContaList(0);
	}
	
	deletePlanoConta(planoConta: PlanoConta) {
	    this.confirmation.confirm({
	      message: 'Confirma a exclusão do registro?',
	      accept: () => {
	        this.planoContaService.delete(planoConta.id)
	        .then(() => {
	          this.messageHandler.showSuccess('Registro excluído!');
	          this.planoContaList(0);
	        })
	        .catch((e) => {
	          this.messageHandler.showError(e);
	        });
	      }
	    });
	}
	
	planoContaListOnLazyLoad(event: LazyLoadEvent) {
	    if (event.multiSortMeta) {
	      this.planoContaListFilter.sortFields = new Array(event.multiSortMeta.length);
	      event.multiSortMeta.forEach(sortField => {
	      	this.planoContaListFilter.sortFields.push(new SortField(sortField.field, sortField.order));
	      });
	    } else {
	    	this.planoContaListFilter.sortFields = new Array(1);
	    	this.planoContaListFilter.sortFields.push(new SortField('id', 1)); // asc
	    }
	    const pageNumber = event.first / event.rows;
	    this.planoContaList(pageNumber);
	}
	
	planoContaCodigoAutoComplete(event) {
	    const query = event.query;
	    this.planoContaService.planoContaCodigoAutoComplete(query)
	    .then((result) => {
	      this.planoContaCodigoAutoCompleteSuggestions = result;
	    })
	    .catch(erro => {
	      this.messageHandler.showError('Erro ao buscar registros com o termo: ' + query);
	    });
	}
	
	planoContaDescricaoAutoComplete(event) {
	    const query = event.query;
	    this.planoContaService.planoContaDescricaoAutoComplete(query)
	    .then((result) => {
	      this.planoContaDescricaoAutoCompleteSuggestions = result;
	    })
	    .catch(erro => {
	      this.messageHandler.showError('Erro ao buscar registros com o termo: ' + query);
	    });
	}
	
	
	
	planoContaPlanoContaPaiAutoCompleteFieldConverter(planoContaPai: PlanoContaAutoComplete) {
		if (planoContaPai) {
			return (planoContaPai.codigo || '<nulo>') + ' - ' + (planoContaPai.descricao || '<nulo>');
		} else {
			return null;
		}
	}
	
	
	
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.financeiroContasReceberTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	
}
