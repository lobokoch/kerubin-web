/**********************************************************************************************
Code generated with MKL Plug-in version: 40.2.5
Code generated at time stamp: 2019-12-31T10:27:32.825
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import {ConfirmationService, LazyLoadEvent, SelectItem} from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import * as moment from 'moment';
import { MessageHandlerService } from 'src/app/core/message-handler.service';

import { CreditOrderAdminService } from './creditorderadmin.service';
import { SecurityAuthorizationTranslationService } from './../i18n/security-authorization-translation.service';
import { CreditOrderAdmin } from './creditorderadmin.model';
import { CreditOrderAdminListFilter } from './creditorderadmin.model';
import { SortField } from './creditorderadmin.model';
import { CreditOrderAdminOrderUserNameAutoComplete } from './creditorderadmin.model';
import { CreditOrderAdminOrderTenantNameAutoComplete } from './creditorderadmin.model';

import { OrderStatus } from './../enums/security-authorization-enums.model';

import { SysUserAutoComplete } from './../sysuser/sysuser.model';
import { CreditOrderAdminSumFields } from './creditorderadmin.model';

@Component({
  selector: 'app-list-creditorderadmin',
  templateUrl: './list-creditorderadmin.component.html',
  styleUrls: ['./list-creditorderadmin.component.css']
})

export class CreditOrderAdminListComponent implements OnInit {
	
	creditOrderAdminListItems: CreditOrderAdmin[];
	creditOrderAdminListTotalElements = 0;
	creditOrderAdminListFilter = new CreditOrderAdminListFilter();
	
	creditOrderAdminOrderUserNameAutoCompleteSuggestions: CreditOrderAdminOrderUserNameAutoComplete[];
	creditOrderAdminOrderTenantNameAutoCompleteSuggestions: CreditOrderAdminOrderTenantNameAutoComplete[];
	
	creditOrderAdminOrderDateIsBetweenOptionsSelected: SelectItem = {label: 'Minha competência', value: '12'};
	
	
	
	creditOrderAdminOrderStatusOptions: OrderStatus[];
	dateFilterIntervalDropdownItems: SelectItem[];
	
	
	creditOrderAdminSumFields = new CreditOrderAdminSumFields();
	
	constructor(
	    private creditOrderAdminService: CreditOrderAdminService,
	    private securityAuthorizationTranslationService: SecurityAuthorizationTranslationService,
	    private confirmation: ConfirmationService,
	    private messageHandler: MessageHandlerService
	) { }
	
	ngOnInit() {
		this.creditOrderAdminOrderDateIsBetweenOptionsOnClick(null);
		this.initializeDateFilterIntervalDropdownItems();
		
		
		
		
		this.initializeCreditOrderAdminOrderStatusOptions();
	}
	
	creditOrderAdminList(pageNumber = 0) {
	    this.creditOrderAdminListFilter.pageNumber = pageNumber;
	    this.creditOrderAdminService
	    .creditOrderAdminList(this.creditOrderAdminListFilter)
	    .then(result => {
	      	this.creditOrderAdminListItems = result.items;
	      	this.creditOrderAdminListTotalElements = result.totalElements;
	      
			this.getCreditOrderAdminSumFields();
	    });
		
	}
	
	getCreditOrderAdminSumFields() {
	    this.creditOrderAdminService.getCreditOrderAdminSumFields(this.creditOrderAdminListFilter)
		.then(response => {
		  this.creditOrderAdminSumFields = response;
		})
		.catch(e => {
		  this.messageHandler.showError(e);
		});
	}
	
	creditOrderAdminFilterSearch() {
	    this.creditOrderAdminList(0);
	}
	
	deleteCreditOrderAdmin(creditOrderAdmin: CreditOrderAdmin) {
	    this.confirmation.confirm({
	      message: 'Confirma a exclusão do registro?',
	      accept: () => {
	        this.creditOrderAdminService.delete(creditOrderAdmin.id)
	        .then(() => {
	          this.messageHandler.showSuccess('Registro excluído!');
	          this.creditOrderAdminList(0);
	        })
	        .catch((e) => {
	          this.messageHandler.showError(e);
	        });
	      }
	    });
	}
	
	creditOrderAdminListOnLazyLoad(event: LazyLoadEvent) {
	    if (event.sortField) {
	      this.creditOrderAdminListFilter.sortField = new SortField(event.sortField, event.sortOrder);
	    } else {
	      this.creditOrderAdminListFilter.sortField = new SortField('id', 1); // asc
	    }
	    const pageNumber = event.first / event.rows;
	    this.creditOrderAdminList(pageNumber);
	}
	
	creditOrderAdminOrderUserNameAutoComplete(event) {
	    const query = event.query;
	    this.creditOrderAdminService.creditOrderAdminOrderUserNameAutoComplete(query)
	    .then((result) => {
	      this.creditOrderAdminOrderUserNameAutoCompleteSuggestions = result;
	    })
	    .catch(erro => {
	      this.messageHandler.showError('Erro ao buscar registros com o termo: ' + query);
	    });
	}
	
	creditOrderAdminOrderTenantNameAutoComplete(event) {
	    const query = event.query;
	    this.creditOrderAdminService.creditOrderAdminOrderTenantNameAutoComplete(query)
	    .then((result) => {
	      this.creditOrderAdminOrderTenantNameAutoCompleteSuggestions = result;
	    })
	    .catch(erro => {
	      this.messageHandler.showError('Erro ao buscar registros com o termo: ' + query);
	    });
	}
	
	
	private initializeCreditOrderAdminOrderStatusOptions() {
	    this.creditOrderAdminOrderStatusOptions = [
	    	{ label: 'Selecione um item', value: null },
	    	{ label: this.getTranslation('security.authorization.creditOrderAdmin_orderStatus_awaiting_payment'), value: 'AWAITING_PAYMENT' }, 
	    	{ label: this.getTranslation('security.authorization.creditOrderAdmin_orderStatus_paid'), value: 'PAID' }, 
	    	{ label: this.getTranslation('security.authorization.creditOrderAdmin_orderStatus_canceled'), value: 'CANCELED' }
	    ];
	}
	  
	
	creditOrderAdminOrderUserAutoCompleteFieldConverter(orderUser: SysUserAutoComplete) {
		if (orderUser) {
			return (orderUser.name || '<nulo>') + ' - ' + (orderUser.email || '<nulo>');
		} else {
			return null;
		}
	}
	
	
	private initializeDateFilterIntervalDropdownItems() {
		this.dateFilterIntervalDropdownItems = [
		    {label: 'Minha competência', value: '12'},
		    {label: 'Hoje', value: '0'},
		    {label: 'Amanhã', value: '1'},
		    {label: 'Esta semana', value: '2'},
		    {label: 'Semana que vem', value: '3'},
		    {label: 'Este mês', value: '4'},
		    {label: 'Mês que vem', value: '5'},
		    {label: 'Este ano', value: '6'},
		    {label: 'Ano que vem', value: '7'},
		    {label: 'Ontem', value: '8'},
		    {label: 'Semana passada', value: '9'},
		    {label: 'Mês passado', value: '10'},
		    {label: 'Ano passado', value: '11'},
		    {label: 'Personalizado', value: '99'}
		  ];
	}
	
	
	creditOrderAdminOrderDateIsBetweenOptionsOnClick(dropdown: Dropdown) {
		this.creditOrderAdminListFilter.orderDateFrom = null;
		this.creditOrderAdminListFilter.orderDateTo = null;
		
		let dateFrom = null;
		let dateTo = null;
	
		const valor = Number(this.creditOrderAdminOrderDateIsBetweenOptionsSelected.value);
		switch (valor) {
			case 0: // Hoje
				dateFrom = moment();
				dateTo = moment();
				break;
				//
			case 1: // Amanhã
				dateFrom = moment().add(1, 'day');
				dateTo = moment().add(1, 'day');
				break;
				//
			case 2: // Esta semana
				dateFrom = moment().startOf('week');
				dateTo = moment().endOf('week');
				break;
				//
			case 3: // Semana que vem
				dateFrom = moment().add(1, 'week').startOf('week');
				dateTo = moment().add(1, 'week').endOf('week');
				break;
				//
			case 4: // Este mês
				dateFrom = moment().startOf('month');
				dateTo = moment().endOf('month');
				break;
				//
			case 5: // Mês que vem
				dateFrom = moment().add(1, 'month').startOf('month');
				dateTo = moment().add(1, 'month').endOf('month');
				break;
				//
			case 6: // Este ano
				dateFrom = moment().startOf('year');
				dateTo = moment().endOf('year');
				break;
				//
			case 7: // Ano que vem
				dateFrom = moment().add(1, 'year').startOf('year');
				dateTo = moment().add(1, 'year').endOf('year');
				break;
				// Passado
			case 8: // Ontem
				dateFrom = moment().add(-1, 'day');
				dateTo = moment().add(-1, 'day');
				break;
				//
			case 9: // Semana passada
				dateFrom = moment().add(-1, 'week').startOf('week');
				dateTo = moment().add(-1, 'week').endOf('week');
				break;
				//
			case 10: // Mês passado
				dateFrom = moment().add(-1, 'month').startOf('month');
				dateTo = moment().add(-1, 'month').endOf('month');
				break;
				//
			case 11: // Ano passado
				dateFrom = moment().add(-1, 'year').startOf('year');
				dateTo = moment().add(-1, 'year').endOf('year');
				break;
				
			case 12: // Minha competência
				dateFrom = moment().startOf('month');
				dateTo = moment().endOf('month').add(5, 'day'); // Five days after and of the month
				break;
			
			default:
				break;
		} // switch
	
		if (dateFrom != null) {
		  this.creditOrderAdminListFilter.orderDateFrom = dateFrom.toDate();
		}
		
		if (dateTo != null) {
		  this.creditOrderAdminListFilter.orderDateTo = dateTo.toDate();
		}
		
		if (dateFrom != null && dateTo != null) {
		  // this.creditOrderAdminList(0);
		}
	}
	
	applyAndGetRuleGridRowStyleClass(creditOrderAdmin: CreditOrderAdmin): String {
		
		if (creditOrderAdmin.id && creditOrderAdmin.orderPaidDate) {
			return 'kb-conta-paga';
		}
		
		if (creditOrderAdmin.id && creditOrderAdmin.orderCanceledDate) {
			return 'kb-conta-vence-hoje';
		}
	
	    return null;
	}
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.securityAuthorizationTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	
}
