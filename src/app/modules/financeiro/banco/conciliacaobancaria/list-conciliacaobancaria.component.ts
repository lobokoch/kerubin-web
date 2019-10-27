/**********************************************************************************************
Code generated with MKL Plug-in version: 26.0.4
Code generated at time stamp: 2019-10-18T05:55:37.138
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import {ConfirmationService, LazyLoadEvent, SelectItem} from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import * as moment from 'moment';
import { MessageHandlerService } from 'src/app/core/message-handler.service';

import { ConciliacaoBancariaService } from './conciliacaobancaria.service';
import { CadastrosBancoTranslationService } from './../i18n/cadastros-banco-translation.service';
import { ConciliacaoBancaria } from './conciliacaobancaria.model';
import { ConciliacaoBancariaListFilter } from './conciliacaobancaria.model';
import { SortField } from './conciliacaobancaria.model';

@Component({
  selector: 'app-list-conciliacaobancaria.component',
  templateUrl: './list-conciliacaobancaria.component.html',
  styleUrls: ['./list-conciliacaobancaria.component.css']
})

export class ConciliacaoBancariaListComponent implements OnInit {
	
	conciliacaoBancariaListItems: ConciliacaoBancaria[];
	conciliacaoBancariaListTotalElements = 0;
	conciliacaoBancariaListFilter = new ConciliacaoBancariaListFilter();
	
	
	
	
	constructor(
	    private conciliacaoBancariaService: ConciliacaoBancariaService,
	    private cadastrosBancoTranslationService: CadastrosBancoTranslationService,
	    private confirmation: ConfirmationService,
	    private messageHandler: MessageHandlerService
	) { }
	
	ngOnInit() {
	}
	
	conciliacaoBancariaList(pageNumber = 0) {
	    this.conciliacaoBancariaListFilter.pageNumber = pageNumber;
	    this.conciliacaoBancariaService
	    .conciliacaoBancariaList(this.conciliacaoBancariaListFilter)
	    .then(result => {
	      	this.conciliacaoBancariaListItems = result.items;
	      	this.conciliacaoBancariaListTotalElements = result.totalElements;
	      
	    });
		
	}
	
	
	conciliacaoBancariaFilterSearch() {
	    this.conciliacaoBancariaList(0);
	}
	
	deleteConciliacaoBancaria(conciliacaoBancaria: ConciliacaoBancaria) {
	    this.confirmation.confirm({
	      message: 'Confirma a exclusão do registro?',
	      accept: () => {
	        this.conciliacaoBancariaService.delete(conciliacaoBancaria.id)
	        .then(() => {
	          this.messageHandler.showSuccess('Registro excluído!');
	          this.conciliacaoBancariaList(0);
	        })
	        .catch((e) => {
	          this.messageHandler.showError(e);
	        });
	      }
	    });
	}
	
	conciliacaoBancariaListOnLazyLoad(event: LazyLoadEvent) {
	    if (event.sortField) {
	      this.conciliacaoBancariaListFilter.sortField = new SortField(event.sortField, event.sortOrder);
	    } else {
	      this.conciliacaoBancariaListFilter.sortField = new SortField('id', 1); // asc
	    }
	    const pageNumber = event.first / event.rows;
	    this.conciliacaoBancariaList(pageNumber);
	}
	
	
	
	
	
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.cadastrosBancoTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	
}
