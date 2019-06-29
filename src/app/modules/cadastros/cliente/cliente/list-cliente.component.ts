/**********************************************************************************************
Code generated with MKL Plug-in version: 6.0.2
Code generated at time stamp: 2019-06-29T10:11:35.889
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import {ConfirmationService, LazyLoadEvent, SelectItem} from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import * as moment from 'moment';
import { MessageHandlerService } from 'src/app/core/message-handler.service';

import { ClienteService } from './cliente.service';
import { CadastrosClienteTranslationService } from './../i18n/cadastros-cliente-translation.service';
import { Cliente } from './cliente.model';
import { ClienteListFilter } from './cliente.model';
import { SortField } from './cliente.model';
import { ClienteNomeAutoComplete } from './cliente.model';

@Component({
  selector: 'app-list-cliente.component',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.css']
})

export class ClienteListComponent implements OnInit {
	
	clienteListItems: Cliente[];
	clienteListTotalElements = 0;
	clienteListFilter = new ClienteListFilter();
	
	clienteNomeAutoCompleteSuggestions: ClienteNomeAutoComplete[];
	dateFilterIntervalDropdownItems: SelectItem[];
	
	
	constructor(
	    private clienteService: ClienteService,
	    private cadastrosClienteTranslationService: CadastrosClienteTranslationService,
	    private confirmation: ConfirmationService,
	    private messageHandler: MessageHandlerService
	) { }
	
	ngOnInit() {
	}
	
	clienteList(pageNumber = 0) {
	    this.clienteListFilter.pageNumber = pageNumber;
	    this.clienteService
	    .clienteList(this.clienteListFilter)
	    .then(result => {
	      	this.clienteListItems = result.items;
	      	this.clienteListTotalElements = result.totalElements;
	      
	    });
		
	}
	
	
	clienteFilterSearch() {
	    this.clienteList(0);
	}
	
	deleteCliente(cliente: Cliente) {
	    this.confirmation.confirm({
	      message: 'Confirma a exclusão do registro?',
	      accept: () => {
	        this.clienteService.delete(cliente.id)
	        .then(() => {
	          this.messageHandler.showSuccess('Registro excluído!');
	          this.clienteList(0);
	        })
	        .catch((e) => {
	          this.messageHandler.showError('Erro ao excluir registro: ' + e);
	        });
	      }
	    });
	}
	
	clienteListOnLazyLoad(event: LazyLoadEvent) {
	    if (event.sortField) {
	      this.clienteListFilter.sortField = new SortField(event.sortField, event.sortOrder);
	    } else {
	      this.clienteListFilter.sortField = new SortField('id', 1); // asc
	    }
	    const pageNumber = event.first / event.rows;
	    this.clienteList(pageNumber);
	}
	
	clienteNomeAutoComplete(event) {
	    const query = event.query;
	    this.clienteService.clienteNomeAutoComplete(query)
	    .then((result) => {
	      this.clienteNomeAutoCompleteSuggestions = result;
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
