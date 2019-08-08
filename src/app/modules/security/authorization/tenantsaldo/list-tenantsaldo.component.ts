/**********************************************************************************************
Code generated with MKL Plug-in version: 7.0.4
Code generated at time stamp: 2019-08-06T07:20:02.873
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import {ConfirmationService, LazyLoadEvent, SelectItem} from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import * as moment from 'moment';
import { MessageHandlerService } from 'src/app/core/message-handler.service';

import { TenantSaldoService } from './tenantsaldo.service';
import { SecurityAuthorizationTranslationService } from './../i18n/security-authorization-translation.service';
import { TenantSaldo } from './tenantsaldo.model';
import { TenantSaldoListFilter } from './tenantsaldo.model';
import { SortField } from './tenantsaldo.model';

import { TenantAutoComplete } from './../tenant/tenant.model';
import { TenantSaldoSumFields } from './tenantsaldo.model';

@Component({
  selector: 'app-list-tenantsaldo.component',
  templateUrl: './list-tenantsaldo.component.html',
  styleUrls: ['./list-tenantsaldo.component.css']
})

export class TenantSaldoListComponent implements OnInit {
	
	tenantSaldoListItems: TenantSaldo[];
	tenantSaldoListTotalElements = 0;
	tenantSaldoListFilter = new TenantSaldoListFilter();
	
	
	tenantSaldoSumFields = new TenantSaldoSumFields();
	
	constructor(
	    private tenantSaldoService: TenantSaldoService,
	    private securityAuthorizationTranslationService: SecurityAuthorizationTranslationService,
	    private confirmation: ConfirmationService,
	    private messageHandler: MessageHandlerService
	) { }
	
	ngOnInit() {
	}
	
	tenantSaldoList(pageNumber = 0) {
	    this.tenantSaldoListFilter.pageNumber = pageNumber;
	    this.tenantSaldoService
	    .tenantSaldoList(this.tenantSaldoListFilter)
	    .then(result => {
	      	this.tenantSaldoListItems = result.items;
	      	this.tenantSaldoListTotalElements = result.totalElements;
	      
			this.getTenantSaldoSumFields();
	    });
		
	}
	
	getTenantSaldoSumFields() {
	    this.tenantSaldoService.getTenantSaldoSumFields(this.tenantSaldoListFilter)
		.then(response => {
		  this.tenantSaldoSumFields = response;
		})
		.catch(e => {
		  this.messageHandler.showError(e);
		});
	}
	
	tenantSaldoFilterSearch() {
	    this.tenantSaldoList(0);
	}
	
	deleteTenantSaldo(tenantSaldo: TenantSaldo) {
	    this.confirmation.confirm({
	      message: 'Confirma a exclusão do registro?',
	      accept: () => {
	        this.tenantSaldoService.delete(tenantSaldo.id)
	        .then(() => {
	          this.messageHandler.showSuccess('Registro excluído!');
	          this.tenantSaldoList(0);
	        })
	        .catch((e) => {
	          this.messageHandler.showError(e);
	        });
	      }
	    });
	}
	
	tenantSaldoListOnLazyLoad(event: LazyLoadEvent) {
	    if (event.sortField) {
	      this.tenantSaldoListFilter.sortField = new SortField(event.sortField, event.sortOrder);
	    } else {
	      this.tenantSaldoListFilter.sortField = new SortField('id', 1); // asc
	    }
	    const pageNumber = event.first / event.rows;
	    this.tenantSaldoList(pageNumber);
	}
	
	
	tenantSaldoTenantAutoCompleteFieldConverter(tenant: TenantAutoComplete) {
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
