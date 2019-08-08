/**********************************************************************************************
Code generated with MKL Plug-in version: 7.13.0
Code generated at time stamp: 2019-08-08T00:01:06.900
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import {ConfirmationService, LazyLoadEvent, SelectItem} from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import * as moment from 'moment';
import { MessageHandlerService } from 'src/app/core/message-handler.service';

import { CreditOrderService } from './creditorder.service';
import { SecurityAuthorizationTranslationService } from './../i18n/security-authorization-translation.service';
import { CreditOrder } from './creditorder.model';
import { CreditOrderListFilter } from './creditorder.model';
import { SortField } from './creditorder.model';

import { SysUserAutoComplete } from './../sysuser/sysuser.model';
import { CreditOrderSumFields } from './creditorder.model';

@Component({
  selector: 'app-list-creditorder.component',
  templateUrl: './list-creditorder.component.html',
  styleUrls: ['./list-creditorder.component.css']
})

export class CreditOrderListComponent implements OnInit {
	
	creditOrderListItems: CreditOrder[];
	creditOrderListTotalElements = 0;
	creditOrderListFilter = new CreditOrderListFilter();
	
	
	creditOrderSumFields = new CreditOrderSumFields();
	
	constructor(
	    private creditOrderService: CreditOrderService,
	    private securityAuthorizationTranslationService: SecurityAuthorizationTranslationService,
	    private confirmation: ConfirmationService,
	    private messageHandler: MessageHandlerService
	) { }
	
	ngOnInit() {
	}
	
	creditOrderList(pageNumber = 0) {
	    this.creditOrderListFilter.pageNumber = pageNumber;
	    this.creditOrderService
	    .creditOrderList(this.creditOrderListFilter)
	    .then(result => {
	      	this.creditOrderListItems = result.items;
	      	this.creditOrderListTotalElements = result.totalElements;
	      
			this.getCreditOrderSumFields();
	    });
		
	}
	
	getCreditOrderSumFields() {
	    this.creditOrderService.getCreditOrderSumFields(this.creditOrderListFilter)
		.then(response => {
		  this.creditOrderSumFields = response;
		})
		.catch(e => {
		  this.messageHandler.showError(e);
		});
	}
	
	creditOrderFilterSearch() {
	    this.creditOrderList(0);
	}
	
	deleteCreditOrder(creditOrder: CreditOrder) {
	    this.confirmation.confirm({
	      message: 'Confirma a exclusão do registro?',
	      accept: () => {
	        this.creditOrderService.delete(creditOrder.id)
	        .then(() => {
	          this.messageHandler.showSuccess('Registro excluído!');
	          this.creditOrderList(0);
	        })
	        .catch((e) => {
	          this.messageHandler.showError(e);
	        });
	      }
	    });
	}
	
	creditOrderListOnLazyLoad(event: LazyLoadEvent) {
	    if (event.sortField) {
	      this.creditOrderListFilter.sortField = new SortField(event.sortField, event.sortOrder);
	    } else {
	      this.creditOrderListFilter.sortField = new SortField('id', 1); // asc
	    }
	    const pageNumber = event.first / event.rows;
	    this.creditOrderList(pageNumber);
	}
	
	
	creditOrderOrderUserAutoCompleteFieldConverter(orderUser: SysUserAutoComplete) {
		if (orderUser) {
			return (orderUser.name || '<nulo>') + ' - ' + (orderUser.email || '<nulo>');
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
