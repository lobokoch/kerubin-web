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

import { BandeiraCartaoService } from './bandeiracartao.service';
import { FinanceiroFluxoCaixaTranslationService } from './../i18n/financeiro-fluxocaixa-translation.service';
import { BandeiraCartao } from './bandeiracartao.model';
import { BandeiraCartaoListFilter } from './bandeiracartao.model';
import { SortField } from './bandeiracartao.model';

@Component({
  selector: 'app-list-bandeiracartao',
  templateUrl: './list-bandeiracartao.component.html',
  styleUrls: ['./list-bandeiracartao.component.css']
})

export class BandeiraCartaoListComponent implements OnInit {
	
	bandeiraCartaoListItems: BandeiraCartao[];
	bandeiraCartaoListTotalElements = 0;
	bandeiraCartaoListFilter = new BandeiraCartaoListFilter();
	
	
	
	
	constructor(
	    private bandeiraCartaoService: BandeiraCartaoService,
	    private financeiroFluxoCaixaTranslationService: FinanceiroFluxoCaixaTranslationService,
	    private confirmation: ConfirmationService,
	    private messageHandler: MessageHandlerService
	) { }
	
	ngOnInit() {
	}
	
	bandeiraCartaoList(pageNumber = 0) {
	    this.bandeiraCartaoListFilter.pageNumber = pageNumber;
	    this.bandeiraCartaoService
	    .bandeiraCartaoList(this.bandeiraCartaoListFilter)
	    .then(result => {
	      	this.bandeiraCartaoListItems = result.items;
	      	this.bandeiraCartaoListTotalElements = result.totalElements;
	      
	    });
		
	}
	
	
	bandeiraCartaoFilterSearch() {
	    this.bandeiraCartaoList(0);
	}
	
	deleteBandeiraCartao(bandeiraCartao: BandeiraCartao) {
	    this.confirmation.confirm({
	      message: 'Confirma a exclusão do registro?',
	      accept: () => {
	        this.bandeiraCartaoService.delete(bandeiraCartao.id)
	        .then(() => {
	          this.messageHandler.showSuccess('Registro excluído!');
	          this.bandeiraCartaoList(0);
	        })
	        .catch((e) => {
	          this.messageHandler.showError(e);
	        });
	      }
	    });
	}
	
	bandeiraCartaoListOnLazyLoad(event: LazyLoadEvent) {
	    if (event.multiSortMeta) {
	      this.bandeiraCartaoListFilter.sortFields = new Array(event.multiSortMeta.length);
	      event.multiSortMeta.forEach(sortField => {
	      	this.bandeiraCartaoListFilter.sortFields.push(new SortField(sortField.field, sortField.order));
	      });
	    } else {
	    	this.bandeiraCartaoListFilter.sortFields = new Array(1);
	    	this.bandeiraCartaoListFilter.sortFields.push(new SortField('id', 1)); // asc
	    }
	    const pageNumber = event.first / event.rows;
	    this.bandeiraCartaoList(pageNumber);
	}
	
	
	
	
	
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.financeiroFluxoCaixaTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	
}
