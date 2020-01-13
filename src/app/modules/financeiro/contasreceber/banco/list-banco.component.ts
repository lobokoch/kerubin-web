/**********************************************************************************************
Code generated with MKL Plug-in version: 47.7.13
Code generated at time stamp: 2020-01-07T19:01:18.257
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import {ConfirmationService, LazyLoadEvent, SelectItem} from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import * as moment from 'moment';
import { MessageHandlerService } from 'src/app/core/message-handler.service';

import { BancoService } from './banco.service';
import { FinanceiroContasReceberTranslationService } from './../i18n/financeiro-contasreceber-translation.service';
import { Banco } from './banco.model';
import { BancoListFilter } from './banco.model';
import { SortField } from './banco.model';
import { BancoNomeAutoComplete } from './banco.model';

@Component({
  selector: 'app-list-banco',
  templateUrl: './list-banco.component.html',
  styleUrls: ['./list-banco.component.css']
})

export class BancoListComponent implements OnInit {
	tableLoading = false;
	
	bancoListItems: Banco[];
	bancoListTotalElements = 0;
	bancoListFilter = new BancoListFilter();
	
	bancoNomeAutoCompleteSuggestions: BancoNomeAutoComplete[];
	dateFilterIntervalDropdownItems: SelectItem[];
	
	
	
	constructor(
	    private bancoService: BancoService,
	    private financeiroContasReceberTranslationService: FinanceiroContasReceberTranslationService,
	    private confirmation: ConfirmationService,
	    private messageHandler: MessageHandlerService
	) { }
	
	ngOnInit() {
	}
	
	bancoList(pageNumber = 0) {
		this.tableLoading = true;
	    this.bancoListFilter.pageNumber = pageNumber;
	    this.bancoService
	    .bancoList(this.bancoListFilter)
	    .then(result => {
	    	try {
		      	this.bancoListItems = result.items;
		      	this.bancoListTotalElements = result.totalElements;
		      
			} finally {
				this.tableLoading = false;
			}
	    })
	    .catch(e => {
	    	this.tableLoading = false;
	    });
		
	}
	
	
	bancoFilterSearch() {
	    this.bancoList(0);
	}
	
	deleteBanco(banco: Banco) {
	    this.confirmation.confirm({
	      message: 'Confirma a exclusão do registro?',
	      accept: () => {
	        this.bancoService.delete(banco.id)
	        .then(() => {
	          this.messageHandler.showSuccess('Registro excluído!');
	          this.bancoList(0);
	        })
	        .catch((e) => {
	          this.messageHandler.showError(e);
	        });
	      }
	    });
	}
	
	bancoListOnLazyLoad(event: LazyLoadEvent) {
	    if (event.multiSortMeta) {
	      this.bancoListFilter.sortFields = new Array(event.multiSortMeta.length);
	      event.multiSortMeta.forEach(sortField => {
	      	this.bancoListFilter.sortFields.push(new SortField(sortField.field, sortField.order));
	      });
	    } else {
	    	this.bancoListFilter.sortFields = new Array(1);
	    	this.bancoListFilter.sortFields.push(new SortField('id', 1)); // asc
	    }
	    const pageNumber = event.first / event.rows;
	    this.bancoList(pageNumber);
	}
	
	bancoNomeAutoComplete(event) {
	    const query = event.query;
	    this.bancoService.bancoNomeAutoComplete(query)
	    .then((result) => {
	      this.bancoNomeAutoCompleteSuggestions = result;
	    })
	    .catch(erro => {
	      this.messageHandler.showError('Erro ao buscar registros com o termo: ' + query);
	    });
	}
	
	
	
	
	
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.financeiroContasReceberTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	
}
