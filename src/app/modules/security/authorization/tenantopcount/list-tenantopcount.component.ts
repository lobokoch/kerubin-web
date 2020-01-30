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

import { TenantOpCountService } from './tenantopcount.service';
import { SecurityAuthorizationTranslationService } from './../i18n/security-authorization-translation.service';
import { TenantOpCount } from './tenantopcount.model';
import { TenantOpCountListFilter } from './tenantopcount.model';
import { SortField } from './tenantopcount.model';

import { TenantAutoComplete } from './../tenant/tenant.model';

@Component({
  selector: 'app-list-tenantopcount',
  templateUrl: './list-tenantopcount.component.html',
  styleUrls: ['./list-tenantopcount.component.css']
})

export class TenantOpCountListComponent implements OnInit {
	tableLoading = false;
	
	tenantOpCountListItems: TenantOpCount[];
	tenantOpCountListTotalElements = 0;
	tenantOpCountListFilter = new TenantOpCountListFilter();
	
	
	
	
	constructor(
	    private tenantOpCountService: TenantOpCountService,
	    private securityAuthorizationTranslationService: SecurityAuthorizationTranslationService,
	    private confirmation: ConfirmationService,
	    private messageHandler: MessageHandlerService
	) { }
	
	ngOnInit() {
	}
	
	tenantOpCountList(pageNumber = 0) {
		this.tableLoading = true;
	    this.tenantOpCountListFilter.pageNumber = pageNumber;
	    this.tenantOpCountService
	    .tenantOpCountList(this.tenantOpCountListFilter)
	    .then(result => {
	    	try {
		      	this.tenantOpCountListItems = result.items;
		      	this.tenantOpCountListTotalElements = result.totalElements;
		      
			} finally {
				this.tableLoading = false;
			}
	    })
	    .catch(e => {
	    	this.tableLoading = false;
	    });
		
	}
	
	
	tenantOpCountFilterSearch() {
	    this.tenantOpCountList(0);
	}
	
	deleteTenantOpCount(tenantOpCount: TenantOpCount) {
	    this.confirmation.confirm({
	      message: 'Confirma a exclusão do registro?',
	      accept: () => {
	        this.tenantOpCountService.delete(tenantOpCount.id)
	        .then(() => {
	          this.messageHandler.showSuccess('Registro excluído!');
	          this.tenantOpCountList(0);
	        })
	        .catch((e) => {
	          this.messageHandler.showError(e);
	        });
	      }
	    });
	}
	
	tenantOpCountListOnLazyLoad(event: LazyLoadEvent) {
	    if (event.multiSortMeta) {
	      this.tenantOpCountListFilter.sortFields = new Array(event.multiSortMeta.length);
	      event.multiSortMeta.forEach(sortField => {
	      	this.tenantOpCountListFilter.sortFields.push(new SortField(sortField.field, sortField.order));
	      });
	    } else {
	    	this.tenantOpCountListFilter.sortFields = new Array(1);
	    	this.tenantOpCountListFilter.sortFields.push(new SortField('id', 1)); // asc
	    }
	    const pageNumber = event.first / event.rows;
	    this.tenantOpCountList(pageNumber);
	}
	
	
	
	tenantOpCountTenantAutoCompleteFieldConverter(tenant: TenantAutoComplete) {
		if (tenant) {
			return (tenant.name || '<nulo>');
		} else {
			return null;
		}
	}
	
	
	
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.securityAuthorizationTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	
}
