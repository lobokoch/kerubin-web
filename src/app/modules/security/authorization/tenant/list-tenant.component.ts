/**********************************************************************************************
Code generated with MKL Plug-in version: 55.0.3
Copyright: Kerubin - kerubin.platform@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import {ConfirmationService, LazyLoadEvent, SelectItem} from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import * as moment from 'moment';
import { MessageHandlerService } from 'src/app/core/message-handler.service';

import { TenantService } from './tenant.service';
import { SecurityAuthorizationTranslationService } from './../i18n/security-authorization-translation.service';
import { Tenant } from './tenant.model';
import { TenantListFilter } from './tenant.model';
import { SortField } from './tenant.model';
import { TenantNameAutoComplete } from './tenant.model';

@Component({
  selector: 'app-list-tenant',
  templateUrl: './list-tenant.component.html',
  styleUrls: ['./list-tenant.component.css']
})

export class TenantListComponent implements OnInit {
	tableLoading = false;
	
	tenantListItems: Tenant[];
	tenantListTotalElements = 0;
	tenantListFilter = new TenantListFilter();
	
	tenantNameAutoCompleteSuggestions: TenantNameAutoComplete[];
	dateFilterIntervalDropdownItems: SelectItem[];
	
	
	
	constructor(
	    private tenantService: TenantService,
	    private securityAuthorizationTranslationService: SecurityAuthorizationTranslationService,
	    private confirmation: ConfirmationService,
	    private messageHandler: MessageHandlerService
	) { }
	
	ngOnInit() {
	}
	
	tenantList(pageNumber = 0) {
		this.tableLoading = true;
	    this.tenantListFilter.pageNumber = pageNumber;
	    this.tenantService
	    .tenantList(this.tenantListFilter)
	    .then(result => {
	    	try {
		      	this.tenantListItems = result.items;
		      	this.tenantListTotalElements = result.totalElements;
		      
			} finally {
				this.tableLoading = false;
			}
	    })
	    .catch(e => {
	    	this.tableLoading = false;
	    });
		
	}
	
	
	tenantFilterSearch() {
	    this.tenantList(0);
	}
	
	deleteTenant(tenant: Tenant) {
	    this.confirmation.confirm({
	      message: 'Confirma a exclusão do registro?',
	      accept: () => {
	        this.tenantService.delete(tenant.id)
	        .then(() => {
	          this.messageHandler.showSuccess('Registro excluído!');
	          this.tenantList(0);
	        })
	        .catch((e) => {
	          this.messageHandler.showError(e);
	        });
	      }
	    });
	}
	
	tenantListOnLazyLoad(event: LazyLoadEvent) {
	    if (event.multiSortMeta) {
	      this.tenantListFilter.sortFields = new Array(event.multiSortMeta.length);
	      event.multiSortMeta.forEach(sortField => {
	      	this.tenantListFilter.sortFields.push(new SortField(sortField.field, sortField.order));
	      });
	    } else {
	    	this.tenantListFilter.sortFields = new Array(1);
	    	this.tenantListFilter.sortFields.push(new SortField('id', 1)); // asc
	    }
	    const pageNumber = event.first / event.rows;
	    this.tenantList(pageNumber);
	}
	
	tenantNameAutoComplete(event) {
	    const query = event.query;
	    this.tenantService.tenantNameAutoComplete(query)
	    .then((result) => {
	      this.tenantNameAutoCompleteSuggestions = result;
	    })
	    .catch(erro => {
	      this.messageHandler.showError('Erro ao buscar registros com o termo: ' + query);
	    });
	}
	
	
	
	
	
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.securityAuthorizationTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	
}
