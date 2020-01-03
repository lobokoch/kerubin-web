/**********************************************************************************************
Code generated with MKL Plug-in version: 40.3.1
Code generated at time stamp: 2020-01-03T07:15:22.295
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import {ConfirmationService, LazyLoadEvent, SelectItem} from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import * as moment from 'moment';
import { MessageHandlerService } from 'src/app/core/message-handler.service';

import { CaixaDiarioService } from './caixadiario.service';
import { FinanceiroFluxoCaixaTranslationService } from './../i18n/financeiro-fluxocaixa-translation.service';
import { CaixaDiario } from './caixadiario.model';
import { CaixaDiarioListFilter } from './caixadiario.model';
import { SortField } from './caixadiario.model';

import { CaixaAutoComplete } from './../caixa/caixa.model';

@Component({
  selector: 'app-list-caixadiario',
  templateUrl: './list-caixadiario.component.html',
  styleUrls: ['./list-caixadiario.component.css']
})

export class CaixaDiarioListComponent implements OnInit {
	
	caixaDiarioListItems: CaixaDiario[];
	caixaDiarioListTotalElements = 0;
	caixaDiarioListFilter = new CaixaDiarioListFilter();
	
	
	
	
	constructor(
	    private caixaDiarioService: CaixaDiarioService,
	    private financeiroFluxoCaixaTranslationService: FinanceiroFluxoCaixaTranslationService,
	    private confirmation: ConfirmationService,
	    private messageHandler: MessageHandlerService
	) { }
	
	ngOnInit() {
	}
	
	caixaDiarioList(pageNumber = 0) {
	    this.caixaDiarioListFilter.pageNumber = pageNumber;
	    this.caixaDiarioService
	    .caixaDiarioList(this.caixaDiarioListFilter)
	    .then(result => {
	      	this.caixaDiarioListItems = result.items;
	      	this.caixaDiarioListTotalElements = result.totalElements;
	      
	    });
		
	}
	
	
	caixaDiarioFilterSearch() {
	    this.caixaDiarioList(0);
	}
	
	deleteCaixaDiario(caixaDiario: CaixaDiario) {
	    this.confirmation.confirm({
	      message: 'Confirma a exclusão do registro?',
	      accept: () => {
	        this.caixaDiarioService.delete(caixaDiario.id)
	        .then(() => {
	          this.messageHandler.showSuccess('Registro excluído!');
	          this.caixaDiarioList(0);
	        })
	        .catch((e) => {
	          this.messageHandler.showError(e);
	        });
	      }
	    });
	}
	
	caixaDiarioListOnLazyLoad(event: LazyLoadEvent) {
	    if (event.multiSortMeta) {
	      this.caixaDiarioListFilter.sortFields = new Array(event.multiSortMeta.length);
	      event.multiSortMeta.forEach(sortField => {
	      	this.caixaDiarioListFilter.sortFields.push(new SortField(sortField.field, sortField.order));
	      });
	    } else {
	    	this.caixaDiarioListFilter.sortFields = new Array(1);
	    	this.caixaDiarioListFilter.sortFields.push(new SortField('id', 1)); // asc
	    }
	    const pageNumber = event.first / event.rows;
	    this.caixaDiarioList(pageNumber);
	}
	
	
	
	caixaDiarioCaixaAutoCompleteFieldConverter(caixa: CaixaAutoComplete) {
		if (caixa) {
			return (caixa.nome || '<nulo>');
		} else {
			return null;
		}
	}
	
	
	
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.financeiroFluxoCaixaTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	
}
