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

import { CompromissoService } from './compromisso.service';
import { CadastrosClienteTranslationService } from './../i18n/cadastros-cliente-translation.service';
import { Compromisso } from './compromisso.model';
import { CompromissoListFilter } from './compromisso.model';
import { SortField } from './compromisso.model';
import { CompromissoTituloAutoComplete } from './compromisso.model';

import { ClienteAutoComplete } from './../cliente/cliente.model';

import { RecursoAutoComplete } from './../recurso/recurso.model';

@Component({
  selector: 'app-list-compromisso',
  templateUrl: './list-compromisso.component.html',
  styleUrls: ['./list-compromisso.component.css']
})

export class CompromissoListComponent implements OnInit {
	tableLoading = false;
	
	compromissoListItems: Compromisso[];
	compromissoListTotalElements = 0;
	compromissoListFilter = new CompromissoListFilter();
	
	compromissoTituloAutoCompleteSuggestions: CompromissoTituloAutoComplete[];
	dateFilterIntervalDropdownItems: SelectItem[];
	
	
	
	constructor(
	    private compromissoService: CompromissoService,
	    private cadastrosClienteTranslationService: CadastrosClienteTranslationService,
	    private confirmation: ConfirmationService,
	    private messageHandler: MessageHandlerService
	) { 
	}
	
	ngOnInit() {
	}
	
	compromissoList(pageNumber = 0) {
		this.tableLoading = true;
	    this.compromissoListFilter.pageNumber = pageNumber;
	    this.compromissoService
	    .compromissoList(this.compromissoListFilter)
	    .then(result => {
	    	try {
		      	this.compromissoListItems = result.items;
		      	this.compromissoListTotalElements = result.totalElements;
		      
			} finally {
				this.tableLoading = false;
			}
	    })
	    .catch(e => {
	    	this.tableLoading = false;
	    });
		
	}
	
	
	compromissoFilterSearch() {
	    this.compromissoList(0);
	}
	
	deleteCompromisso(compromisso: Compromisso) {
	    this.confirmation.confirm({
	      message: 'Confirma a exclusão do registro?',
	      accept: () => {
	        this.compromissoService.delete(compromisso.id)
	        .then(() => {
	          this.messageHandler.showSuccess('Registro excluído!');
	          this.compromissoList(0);
	        })
	        .catch((e) => {
	          this.messageHandler.showError(e);
	        });
	      }
	    });
	}
	
	compromissoListOnLazyLoad(event: LazyLoadEvent) {
	    if (event.multiSortMeta) {
	      this.compromissoListFilter.sortFields = new Array(event.multiSortMeta.length);
	      event.multiSortMeta.forEach(sortField => {
	      	this.compromissoListFilter.sortFields.push(new SortField(sortField.field, sortField.order));
	      });
	    } else {
	    	this.compromissoListFilter.sortFields = new Array(4);
	    	this.compromissoListFilter.sortFields.push(new SortField('dataIni', 1));
	    	this.compromissoListFilter.sortFields.push(new SortField('horaIni', 1));
	    	this.compromissoListFilter.sortFields.push(new SortField('dataFim', 1));
	    	this.compromissoListFilter.sortFields.push(new SortField('horaFim', 1));
	    }
	    const pageNumber = event.first / event.rows;
	    this.compromissoListFilter.pageSize = event.rows;
	    this.compromissoList(pageNumber);
	}
	
	compromissoTituloAutoComplete(event) {
	    const query = event.query;
	    this.compromissoService.compromissoTituloAutoComplete(query)
	    .then((result) => {
	      this.compromissoTituloAutoCompleteSuggestions = result;
	    })
	    .catch(erro => {
	      this.messageHandler.showError('Erro ao buscar registros com o termo: ' + query);
	    });
	}
	
	
	
	compromissoClienteAutoCompleteFieldConverter(cliente: ClienteAutoComplete) {
		if (cliente) {
			return (cliente.nome || '<nulo>');
		} else {
			return null;
		}
	}
	
	compromissoRecursosAutoCompleteFieldConverter(recursos: RecursoAutoComplete) {
		if (recursos) {
			return (recursos.nome || '<nulo>') + ' - ' + (recursos.email || '<nulo>');
		} else {
			return null;
		}
	}
	
	
	
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.cadastrosClienteTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	
}
