/**********************************************************************************************
Code generated with MKL Plug-in version: 20.1.1
Code generated at time stamp: 2019-08-25T08:11:26.760
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import {ConfirmationService, LazyLoadEvent, SelectItem} from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import * as moment from 'moment';
import { MessageHandlerService } from 'src/app/core/message-handler.service';

import { AgenciaBancariaService } from './agenciabancaria.service';
import { FinanceiroContasPagarTranslationService } from './../i18n/financeiro-contaspagar-translation.service';
import { AgenciaBancaria } from './agenciabancaria.model';
import { AgenciaBancariaListFilter } from './agenciabancaria.model';
import { SortField } from './agenciabancaria.model';

import { BancoAutoComplete } from './../banco/banco.model';

@Component({
  selector: 'app-list-agenciabancaria.component',
  templateUrl: './list-agenciabancaria.component.html',
  styleUrls: ['./list-agenciabancaria.component.css']
})

export class AgenciaBancariaListComponent implements OnInit {
	
	agenciaBancariaListItems: AgenciaBancaria[];
	agenciaBancariaListTotalElements = 0;
	agenciaBancariaListFilter = new AgenciaBancariaListFilter();
	
	
	
	
	constructor(
	    private agenciaBancariaService: AgenciaBancariaService,
	    private financeiroContasPagarTranslationService: FinanceiroContasPagarTranslationService,
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
	    if (event.sortField) {
	      this.agenciaBancariaListFilter.sortField = new SortField(event.sortField, event.sortOrder);
	    } else {
	      this.agenciaBancariaListFilter.sortField = new SortField('id', 1); // asc
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
		const value = this.financeiroContasPagarTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	
}
