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

import { CaixaService } from './caixa.service';
import { FinanceiroFluxoCaixaTranslationService } from './../i18n/financeiro-fluxocaixa-translation.service';
import { Caixa } from './caixa.model';
import { CaixaListFilter } from './caixa.model';
import { SortField } from './caixa.model';

@Component({
  selector: 'app-list-caixa',
  templateUrl: './list-caixa.component.html',
  styleUrls: ['./list-caixa.component.css']
})

export class CaixaListComponent implements OnInit {
	tableLoading = false;
	
	caixaListItems: Caixa[];
	caixaListTotalElements = 0;
	caixaListFilter = new CaixaListFilter();
	
	
	
	
	constructor(
	    private caixaService: CaixaService,
	    private financeiroFluxoCaixaTranslationService: FinanceiroFluxoCaixaTranslationService,
	    private confirmation: ConfirmationService,
	    private messageHandler: MessageHandlerService
	) { }
	
	ngOnInit() {
	}
	
	caixaList(pageNumber = 0) {
		this.tableLoading = true;
	    this.caixaListFilter.pageNumber = pageNumber;
	    this.caixaService
	    .caixaList(this.caixaListFilter)
	    .then(result => {
	    	try {
		      	this.caixaListItems = result.items;
		      	this.caixaListTotalElements = result.totalElements;
		      
			} finally {
				this.tableLoading = false;
			}
	    })
	    .catch(e => {
	    	this.tableLoading = false;
	    });
		
	}
	
	
	caixaFilterSearch() {
	    this.caixaList(0);
	}
	
	deleteCaixa(caixa: Caixa) {
	    this.confirmation.confirm({
	      message: 'Confirma a exclusão do registro?',
	      accept: () => {
	        this.caixaService.delete(caixa.id)
	        .then(() => {
	          this.messageHandler.showSuccess('Registro excluído!');
	          this.caixaList(0);
	        })
	        .catch((e) => {
	          this.messageHandler.showError(e);
	        });
	      }
	    });
	}
	
	caixaListOnLazyLoad(event: LazyLoadEvent) {
	    if (event.multiSortMeta) {
	      this.caixaListFilter.sortFields = new Array(event.multiSortMeta.length);
	      event.multiSortMeta.forEach(sortField => {
	      	this.caixaListFilter.sortFields.push(new SortField(sortField.field, sortField.order));
	      });
	    } else {
	    	this.caixaListFilter.sortFields = new Array(1);
	    	this.caixaListFilter.sortFields.push(new SortField('id', 1)); // asc
	    }
	    const pageNumber = event.first / event.rows;
	    this.caixaList(pageNumber);
	}
	
	
	
	
	
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.financeiroFluxoCaixaTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	
	caixaRuleDisableCUD(caixa: Caixa) {
		const expression = caixa.id && (String(caixa.id) === 'bd1e9cb7-e7f6-40da-af5c-1f461dac1d11');
		return expression;
		
	}
}
