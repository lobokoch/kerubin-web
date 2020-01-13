/**********************************************************************************************
Code generated with MKL Plug-in version: 47.7.13
Code generated at time stamp: 2020-01-07T19:01:17.325
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import {ConfirmationService, LazyLoadEvent, SelectItem} from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import * as moment from 'moment';
import { MessageHandlerService } from 'src/app/core/message-handler.service';

import { ContaBancariaService } from './contabancaria.service';
import { FinanceiroContasPagarTranslationService } from './../i18n/financeiro-contaspagar-translation.service';
import { ContaBancaria } from './contabancaria.model';
import { ContaBancariaListFilter } from './contabancaria.model';
import { SortField } from './contabancaria.model';
import { ContaBancariaNumeroContaAutoComplete } from './contabancaria.model';

import { AgenciaBancariaAutoComplete } from './../agenciabancaria/agenciabancaria.model';

@Component({
  selector: 'app-list-contabancaria',
  templateUrl: './list-contabancaria.component.html',
  styleUrls: ['./list-contabancaria.component.css']
})

export class ContaBancariaListComponent implements OnInit {
	tableLoading = false;
	
	contaBancariaListItems: ContaBancaria[];
	contaBancariaListTotalElements = 0;
	contaBancariaListFilter = new ContaBancariaListFilter();
	
	contaBancariaNumeroContaAutoCompleteSuggestions: ContaBancariaNumeroContaAutoComplete[];
	dateFilterIntervalDropdownItems: SelectItem[];
	
	
	
	constructor(
	    private contaBancariaService: ContaBancariaService,
	    private financeiroContasPagarTranslationService: FinanceiroContasPagarTranslationService,
	    private confirmation: ConfirmationService,
	    private messageHandler: MessageHandlerService
	) { }
	
	ngOnInit() {
	}
	
	contaBancariaList(pageNumber = 0) {
		this.tableLoading = true;
	    this.contaBancariaListFilter.pageNumber = pageNumber;
	    this.contaBancariaService
	    .contaBancariaList(this.contaBancariaListFilter)
	    .then(result => {
	    	try {
		      	this.contaBancariaListItems = result.items;
		      	this.contaBancariaListTotalElements = result.totalElements;
		      
			} finally {
				this.tableLoading = false;
			}
	    })
	    .catch(e => {
	    	this.tableLoading = false;
	    });
		
	}
	
	
	contaBancariaFilterSearch() {
	    this.contaBancariaList(0);
	}
	
	deleteContaBancaria(contaBancaria: ContaBancaria) {
	    this.confirmation.confirm({
	      message: 'Confirma a exclusão do registro?',
	      accept: () => {
	        this.contaBancariaService.delete(contaBancaria.id)
	        .then(() => {
	          this.messageHandler.showSuccess('Registro excluído!');
	          this.contaBancariaList(0);
	        })
	        .catch((e) => {
	          this.messageHandler.showError(e);
	        });
	      }
	    });
	}
	
	contaBancariaListOnLazyLoad(event: LazyLoadEvent) {
	    if (event.multiSortMeta) {
	      this.contaBancariaListFilter.sortFields = new Array(event.multiSortMeta.length);
	      event.multiSortMeta.forEach(sortField => {
	      	this.contaBancariaListFilter.sortFields.push(new SortField(sortField.field, sortField.order));
	      });
	    } else {
	    	this.contaBancariaListFilter.sortFields = new Array(1);
	    	this.contaBancariaListFilter.sortFields.push(new SortField('id', 1)); // asc
	    }
	    const pageNumber = event.first / event.rows;
	    this.contaBancariaList(pageNumber);
	}
	
	contaBancariaNumeroContaAutoComplete(event) {
	    const query = event.query;
	    this.contaBancariaService.contaBancariaNumeroContaAutoComplete(query)
	    .then((result) => {
	      this.contaBancariaNumeroContaAutoCompleteSuggestions = result;
	    })
	    .catch(erro => {
	      this.messageHandler.showError('Erro ao buscar registros com o termo: ' + query);
	    });
	}
	
	
	
	contaBancariaAgenciaAutoCompleteFieldConverter(agencia: AgenciaBancariaAutoComplete) {
		if (agencia) {
			return (agencia.numeroAgencia || '<nulo>') + ' - ' + (agencia.digitoAgencia || '<nulo>') + ' - ' + (agencia.endereco || '<nulo>');
		} else {
			return null;
		}
	}
	
	
	
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.financeiroContasPagarTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	
}
