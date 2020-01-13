/**********************************************************************************************
Code generated with MKL Plug-in version: 47.7.13
Code generated at time stamp: 2020-01-07T20:34:08.364
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import {ConfirmationService, LazyLoadEvent, SelectItem} from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import * as moment from 'moment';
import { MessageHandlerService } from 'src/app/core/message-handler.service';

import { SysUserService } from './sysuser.service';
import { SecurityAuthorizationTranslationService } from './../i18n/security-authorization-translation.service';
import { SysUser } from './sysuser.model';
import { SysUserListFilter } from './sysuser.model';
import { SortField } from './sysuser.model';
import { SysUserNameAutoComplete } from './sysuser.model';

import { TenantAutoComplete } from './../tenant/tenant.model';

@Component({
  selector: 'app-list-sysuser',
  templateUrl: './list-sysuser.component.html',
  styleUrls: ['./list-sysuser.component.css']
})

export class SysUserListComponent implements OnInit {
	tableLoading = false;
	
	sysUserListItems: SysUser[];
	sysUserListTotalElements = 0;
	sysUserListFilter = new SysUserListFilter();
	
	sysUserNameAutoCompleteSuggestions: SysUserNameAutoComplete[];
	dateFilterIntervalDropdownItems: SelectItem[];
	
	
	
	constructor(
	    private sysUserService: SysUserService,
	    private securityAuthorizationTranslationService: SecurityAuthorizationTranslationService,
	    private confirmation: ConfirmationService,
	    private messageHandler: MessageHandlerService
	) { }
	
	ngOnInit() {
	}
	
	sysUserList(pageNumber = 0) {
		this.tableLoading = true;
	    this.sysUserListFilter.pageNumber = pageNumber;
	    this.sysUserService
	    .sysUserList(this.sysUserListFilter)
	    .then(result => {
	    	try {
		      	this.sysUserListItems = result.items;
		      	this.sysUserListTotalElements = result.totalElements;
		      
			} finally {
				this.tableLoading = false;
			}
	    })
	    .catch(e => {
	    	this.tableLoading = false;
	    });
		
	}
	
	
	sysUserFilterSearch() {
	    this.sysUserList(0);
	}
	
	deleteSysUser(sysUser: SysUser) {
	    this.confirmation.confirm({
	      message: 'Confirma a exclusão do registro?',
	      accept: () => {
	        this.sysUserService.delete(sysUser.id)
	        .then(() => {
	          this.messageHandler.showSuccess('Registro excluído!');
	          this.sysUserList(0);
	        })
	        .catch((e) => {
	          this.messageHandler.showError(e);
	        });
	      }
	    });
	}
	
	sysUserListOnLazyLoad(event: LazyLoadEvent) {
	    if (event.multiSortMeta) {
	      this.sysUserListFilter.sortFields = new Array(event.multiSortMeta.length);
	      event.multiSortMeta.forEach(sortField => {
	      	this.sysUserListFilter.sortFields.push(new SortField(sortField.field, sortField.order));
	      });
	    } else {
	    	this.sysUserListFilter.sortFields = new Array(1);
	    	this.sysUserListFilter.sortFields.push(new SortField('id', 1)); // asc
	    }
	    const pageNumber = event.first / event.rows;
	    this.sysUserList(pageNumber);
	}
	
	sysUserNameAutoComplete(event) {
	    const query = event.query;
	    this.sysUserService.sysUserNameAutoComplete(query)
	    .then((result) => {
	      this.sysUserNameAutoCompleteSuggestions = result;
	    })
	    .catch(erro => {
	      this.messageHandler.showError('Erro ao buscar registros com o termo: ' + query);
	    });
	}
	
	
	
	sysUserTenantAutoCompleteFieldConverter(tenant: TenantAutoComplete) {
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
