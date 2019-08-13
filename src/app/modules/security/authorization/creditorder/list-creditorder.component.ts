/**********************************************************************************************
Code generated with MKL Plug-in version: 7.17.6
Code generated at time stamp: 2019-08-13T19:22:27.942
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
import { CreditOrderOrderUserNameAutoComplete } from './creditorder.model';

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
	
	creditOrderOrderUserNameAutoCompleteSuggestions: CreditOrderOrderUserNameAutoComplete[];
	
	creditOrderOrderDateIsBetweenOptionsSelected: SelectItem = {label: 'Minha competência', value: '12'};
	
	
	
	dateFilterIntervalDropdownItems: SelectItem[];
	
	creditOrderSumFields = new CreditOrderSumFields();
	
	constructor(
	    private creditOrderService: CreditOrderService,
	    private securityAuthorizationTranslationService: SecurityAuthorizationTranslationService,
	    private confirmation: ConfirmationService,
	    private messageHandler: MessageHandlerService
	) { }
	
	ngOnInit() {
		this.creditOrderOrderDateIsBetweenOptionsOnClick(null);
		this.initializeDateFilterIntervalDropdownItems();
		
		
		
		
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
	
	creditOrderOrderUserNameAutoComplete(event) {
	    const query = event.query;
	    this.creditOrderService.creditOrderOrderUserNameAutoComplete(query)
	    .then((result) => {
	      this.creditOrderOrderUserNameAutoCompleteSuggestions = result;
	    })
	    .catch(erro => {
	      this.messageHandler.showError('Erro ao buscar registros com o termo: ' + query);
	    });
	}
	
	
	creditOrderOrderUserAutoCompleteFieldConverter(orderUser: SysUserAutoComplete) {
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
		    // Passado
		    {label: 'Ontem', value: '8'},
		    {label: 'Semana passada', value: '9'},
		    {label: 'Mês passado', value: '10'},
		    {label: 'Ano passado', value: '11'},
		    {label: 'Personalizado', value: '99'}
		  ];
	}
	
	
	creditOrderOrderDateIsBetweenOptionsOnClick(dropdown: Dropdown) {
		this.creditOrderListFilter.orderDateFrom = null;
		this.creditOrderListFilter.orderDateTo = null;
		
		let dateFrom = null;
		let dateTo = null;
	
		const valor = Number(this.creditOrderOrderDateIsBetweenOptionsSelected.value);
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
		  this.creditOrderListFilter.orderDateFrom = dateFrom.toDate();
		}
		
		if (dateTo != null) {
		  this.creditOrderListFilter.orderDateTo = dateTo.toDate();
		}
		
		if (dateFrom != null && dateTo != null) {
		  // this.creditOrderList(0);
		}
	}
	
	applyAndGetRuleGridRowStyleClass(creditOrder: CreditOrder): String {
		
		if (creditOrder.id && creditOrder.orderPaidDate) {
			return 'kb-conta-paga';
		}
		
		if (creditOrder.id && creditOrder.orderCanceledDate) {
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
