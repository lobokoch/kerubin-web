/**********************************************************************************************
Code generated with MKL Plug-in version: 40.3.1
Code generated at time stamp: 2020-01-03T07:14:21.364
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import {ConfirmationService, LazyLoadEvent, SelectItem} from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import * as moment from 'moment';
import { MessageHandlerService } from 'src/app/core/message-handler.service';

import { AgenciaBancariaService } from './agenciabancaria.service';
import { FinanceiroContasReceberTranslationService } from './../i18n/financeiro-contasreceber-translation.service';
import { AgenciaBancaria } from './agenciabancaria.model';
import { AgenciaBancariaListFilter } from './agenciabancaria.model';
import { SortField } from './agenciabancaria.model';

import { BancoAutoComplete } from './../banco/banco.model';

@Component({
  selector: 'app-list-agenciabancaria',
  templateUrl: './list-agenciabancaria.component.html',
  styleUrls: ['./list-agenciabancaria.component.css']
})

export class AgenciaBancariaListComponent implements OnInit {
	
	agenciaBancariaListItems: AgenciaBancaria[];
	agenciaBancariaListTotalElements = 0;
	agenciaBancariaListFilter = new AgenciaBancariaListFilter();
	
	
	
	
	constructor(
	    private agenciaBancariaService: AgenciaBancariaService,
	    private financeiroContasReceberTranslationService: FinanceiroContasReceberTranslationService,
	    private confirmation: ConfirmationService,
	    private messageHandler: MessageHandlerService
	) { }
	
	ngOnInit() {
	}
	
	agenciaBancariaList(pageNumber = 0) {
	    this.agenciaBancariaListFilter.pageNumber = pageNumber;
	    this.agenciaBancariaService
	    .agenciaBancariaList(this.agenciaBancariaListFilter)
	    .then(result => {
	      	this.agenciaBancariaListItems = result.items;
	      	this.agenciaBancariaListTotalElements = result.totalElements;
	      
	    });
		
	}
	
	
	agenciaBancariaFilterSearch() {
	    this.agenciaBancariaList(0);
	}
	
	deleteAgenciaBancaria(agenciaBancaria: AgenciaBancaria) {
	    this.confirmation.confirm({
	      message: 'Confirma a exclusão do registro?',
	      accept: () => {
	        this.agenciaBancariaService.delete(agenciaBancaria.id)
	        .then(() => {
	          this.messageHandler.showSuccess('Registro excluído!');
	          this.agenciaBancariaList(0);
	        })
	        .catch((e) => {
	          this.messageHandler.showError(e);
	        });
	      }
	    });
	}
	
	agenciaBancariaListOnLazyLoad(event: LazyLoadEvent) {
	    if (event.multiSortMeta) {
	      this.agenciaBancariaListFilter.sortFields = new Array(event.multiSortMeta.length);
	      event.multiSortMeta.forEach(sortField => {
	      	this.agenciaBancariaListFilter.sortFields.push(new SortField(sortField.field, sortField.order));
	      });
	    } else {
	    	this.agenciaBancariaListFilter.sortFields = new Array(1);
	    	this.agenciaBancariaListFilter.sortFields.push(new SortField('id', 1)); // asc
	    }
	    const pageNumber = event.first / event.rows;
	    this.agenciaBancariaList(pageNumber);
	}
	
	
	
	agenciaBancariaBancoAutoCompleteFieldConverter(banco: BancoAutoComplete) {
		if (banco) {
			return (banco.numero || '<nulo>') + ' - ' + (banco.nome || '<nulo>');
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
