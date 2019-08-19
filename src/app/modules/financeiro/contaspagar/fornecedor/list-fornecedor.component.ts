/**********************************************************************************************
Code generated with MKL Plug-in version: 7.19.6
Code generated at time stamp: 2019-08-18T11:25:25.413
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import {ConfirmationService, LazyLoadEvent, SelectItem} from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import * as moment from 'moment';
import { MessageHandlerService } from 'src/app/core/message-handler.service';

import { FornecedorService } from './fornecedor.service';
import { FinanceiroContasPagarTranslationService } from './../i18n/financeiro-contaspagar-translation.service';
import { Fornecedor } from './fornecedor.model';
import { FornecedorListFilter } from './fornecedor.model';
import { SortField } from './fornecedor.model';
import { FornecedorNomeAutoComplete } from './fornecedor.model';

@Component({
  selector: 'app-list-fornecedor.component',
  templateUrl: './list-fornecedor.component.html',
  styleUrls: ['./list-fornecedor.component.css']
})

export class FornecedorListComponent implements OnInit {
	
	fornecedorListItems: Fornecedor[];
	fornecedorListTotalElements = 0;
	fornecedorListFilter = new FornecedorListFilter();
	
	fornecedorNomeAutoCompleteSuggestions: FornecedorNomeAutoComplete[];
	dateFilterIntervalDropdownItems: SelectItem[];
	
	
	
	constructor(
	    private fornecedorService: FornecedorService,
	    private financeiroContasPagarTranslationService: FinanceiroContasPagarTranslationService,
	    private confirmation: ConfirmationService,
	    private messageHandler: MessageHandlerService
	) { }
	
	ngOnInit() {
	}
	
	fornecedorList(pageNumber = 0) {
	    this.fornecedorListFilter.pageNumber = pageNumber;
	    this.fornecedorService
	    .fornecedorList(this.fornecedorListFilter)
	    .then(result => {
	      	this.fornecedorListItems = result.items;
	      	this.fornecedorListTotalElements = result.totalElements;
	      
	    });
		
	}
	
	
	fornecedorFilterSearch() {
	    this.fornecedorList(0);
	}
	
	deleteFornecedor(fornecedor: Fornecedor) {
	    this.confirmation.confirm({
	      message: 'Confirma a exclusão do registro?',
	      accept: () => {
	        this.fornecedorService.delete(fornecedor.id)
	        .then(() => {
	          this.messageHandler.showSuccess('Registro excluído!');
	          this.fornecedorList(0);
	        })
	        .catch((e) => {
	          this.messageHandler.showError(e);
	        });
	      }
	    });
	}
	
	fornecedorListOnLazyLoad(event: LazyLoadEvent) {
	    if (event.sortField) {
	      this.fornecedorListFilter.sortField = new SortField(event.sortField, event.sortOrder);
	    } else {
	      this.fornecedorListFilter.sortField = new SortField('id', 1); // asc
	    }
	    const pageNumber = event.first / event.rows;
	    this.fornecedorList(pageNumber);
	}
	
	fornecedorNomeAutoComplete(event) {
	    const query = event.query;
	    this.fornecedorService.fornecedorNomeAutoComplete(query)
	    .then((result) => {
	      this.fornecedorNomeAutoCompleteSuggestions = result;
	    })
	    .catch(erro => {
	      this.messageHandler.showError('Erro ao buscar registros com o termo: ' + query);
	    });
	}
	
	
	
	
	
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.financeiroContasPagarTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	
}
