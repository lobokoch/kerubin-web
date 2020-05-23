/**********************************************************************************************
Code generated by MKL Plug-in
Copyright: Kerubin - kerubin.platform@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import {ConfirmationService, LazyLoadEvent, SelectItem} from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import * as moment from 'moment';
import { MessageHandlerService } from 'src/app/core/message-handler.service';

import { RecursoService } from './recurso.service';
import { CadastrosClienteTranslationService } from './../i18n/cadastros-cliente-translation.service';
import { Recurso } from './recurso.model';
import { RecursoListFilter } from './recurso.model';
import { SortField } from './recurso.model';
import { RecursoNomeAutoComplete } from './recurso.model';

@Component({
  selector: 'app-list-recurso',
  templateUrl: './list-recurso.component.html',
  styleUrls: ['./list-recurso.component.css']
})

export class RecursoListComponent implements OnInit {
	tableLoading = false;
	
	recursoListItems: Recurso[];
	recursoListTotalElements = 0;
	recursoListFilter = new RecursoListFilter();
	
	recursoNomeAutoCompleteSuggestions: RecursoNomeAutoComplete[];
	dateFilterIntervalDropdownItems: SelectItem[];
	
	
	
	constructor(
	    private recursoService: RecursoService,
	    private cadastrosClienteTranslationService: CadastrosClienteTranslationService,
	    private confirmation: ConfirmationService,
	    private messageHandler: MessageHandlerService
	) { 
	}
	
	ngOnInit() {
	}
	
	recursoList(pageNumber = 0) {
		this.tableLoading = true;
	    this.recursoListFilter.pageNumber = pageNumber;
	    this.recursoService
	    .recursoList(this.recursoListFilter)
	    .then(result => {
	    	try {
		      	this.recursoListItems = result.items;
		      	this.recursoListTotalElements = result.totalElements;
		      
			} finally {
				this.tableLoading = false;
			}
	    })
	    .catch(e => {
	    	this.tableLoading = false;
	    });
		
	}
	
	
	recursoFilterSearch() {
	    this.recursoList(0);
	}
	
	deleteRecurso(recurso: Recurso) {
	    this.confirmation.confirm({
	      message: 'Confirma a exclusão do registro?',
	      accept: () => {
	        this.recursoService.delete(recurso.id)
	        .then(() => {
	          this.messageHandler.showSuccess('Registro excluído!');
	          this.recursoList(0);
	        })
	        .catch((e) => {
	          this.messageHandler.showError(e);
	        });
	      }
	    });
	}
	
	recursoListOnLazyLoad(event: LazyLoadEvent) {
	    if (event.multiSortMeta) {
	      this.recursoListFilter.sortFields = new Array(event.multiSortMeta.length);
	      event.multiSortMeta.forEach(sortField => {
	      	this.recursoListFilter.sortFields.push(new SortField(sortField.field, sortField.order));
	      });
	    } else {
	    	this.recursoListFilter.sortFields = new Array(1);
	    	this.recursoListFilter.sortFields.push(new SortField('id', 1)); // asc
	    }
	    const pageNumber = event.first / event.rows;
	    this.recursoListFilter.pageSize = event.rows;
	    this.recursoList(pageNumber);
	}
	
	recursoNomeAutoComplete(event) {
	    const query = event.query;
	    this.recursoService.recursoNomeAutoComplete(query)
	    .then((result) => {
	      this.recursoNomeAutoCompleteSuggestions = result;
	    })
	    .catch(erro => {
	      this.messageHandler.showError('Erro ao buscar registros com o termo: ' + query);
	    });
	}
	
	
	
	
	
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.cadastrosClienteTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	
}
