/**********************************************************************************************
Code generated with MKL Plug-in version: 7.13.0
Code generated at time stamp: 2019-08-08T07:21:02.036
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { CreditOrder } from './creditorder.model';
import { CreditOrderService } from './creditorder.service';
import { SecurityAuthorizationTranslationService } from './../i18n/security-authorization-translation.service';
import * as moment from 'moment';

import { SysUserService } from './../sysuser/sysuser.service';
import { SysUser } from './../sysuser/sysuser.model';
import { SysUserAutoComplete } from './../sysuser/sysuser.model';

import { PaymentMethod } from './../enums/security-authorization-enums.model';

import { OrderStatus } from './../enums/security-authorization-enums.model';
import { MessageHandlerService } from 'src/app/core/message-handler.service';


@Component({
  selector: 'app-crud-creditorder.component',
  templateUrl: './crud-creditorder.component.html',
  styleUrls: ['./crud-creditorder.component.css']
})

export class CreditOrderComponent implements OnInit {
	
	calendarLocale: any;
	
	creditOrder = new CreditOrder();
	creditOrderOrderUserAutoCompleteSuggestions: SysUserAutoComplete[];
	creditOrderPaymentMethodOptions: PaymentMethod[];
	
	
	creditOrderOrderStatusOptions: OrderStatus[];
	
	constructor(
	    private creditOrderService: CreditOrderService,
	    private securityAuthorizationTranslationService: SecurityAuthorizationTranslationService,
	    private sysUserService: SysUserService,
	    private route: ActivatedRoute,
	    private messageHandler: MessageHandlerService
	) { 
		this.initializeCreditOrderPaymentMethodOptions();
		
		this.initializeCreditOrderOrderStatusOptions();
	}
	
	ngOnInit() {
		this.initLocaleSettings();
		this.initializeEnumFieldsWithDefault();
	    const id = this.route.snapshot.params['id'];
	    if (id) {
	      this.getCreditOrderById(id);
	    }
	}
	
	begin(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
	      this.creditOrder = new CreditOrder();
	      this.initializeEnumFieldsWithDefault();
	    }.bind(this), 1);
	}
	
	validateAllFormFields(form: FormGroup) {
	    Object.keys(form.controls).forEach(field => {
	      const control = form.get(field);
	
	      if (control instanceof FormControl) {
	        control.markAsDirty({ onlySelf: true });
	      } else if (control instanceof FormGroup) {
	        this.validateAllFormFields(control);
	      }
	    });
	}
	
	save(form: FormGroup) {
		if (!form.valid) {
	      this.validateAllFormFields(form);
	      return;
	    }
		    
	    if (this.isEditing) {
	      this.update();
	    } else {
	      this.create();
	    }
	}
	
	create() {
		
	    this.creditOrderService.create(this.creditOrder)
	    .then((creditOrder) => {
	      this.creditOrder = creditOrder;
	      this.messageHandler.showSuccess('Registro criado com sucesso!');
	    }).
	    catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	update() {
	    this.creditOrderService.update(this.creditOrder)
	    .then((creditOrder) => {
	      this.creditOrder = creditOrder;
	      this.messageHandler.showSuccess('Registro alterado!');
	    })
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	getCreditOrderById(id: string) {
	    this.creditOrderService.retrieve(id)
	    .then((creditOrder) => this.creditOrder = creditOrder)
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	get isEditing() {
	    return Boolean(this.creditOrder.id);
	}
	
	initializeEnumFieldsWithDefault() {
		this.creditOrder.paymentMethod = this.creditOrderPaymentMethodOptions[0].value;
		this.creditOrder.orderStatus = this.creditOrderOrderStatusOptions[0].value;
	}
	
	
	creditOrderOrderUserAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.creditOrder.orderUser = null;
	}
	
	creditOrderOrderUserAutoCompleteOnBlur(event) {
		// Seems a PrimeNG bug, if clear an autocomplete field, on onBlur event, the null value is empty string.
		// Until PrimeNG version: 7.1.3.
		if (String(this.creditOrder.orderUser) === '') {
			this.creditOrder.orderUser = null;
		}
	}
	
	creditOrderOrderUserAutoComplete(event) {
	    const query = event.query;
	    this.creditOrderService
	      .sysUserOrderUserAutoComplete(query)
	      .then((result) => {
	        this.creditOrderOrderUserAutoCompleteSuggestions = result as SysUserAutoComplete[];
	      })
	      .catch(error => {
	        this.messageHandler.showError(error);
	      });
	}
	
	creditOrderOrderUserAutoCompleteFieldConverter(orderUser: SysUserAutoComplete) {
		let text = '';
		if (orderUser) {
			if (orderUser.name) {
			    if (text !== '') {
			      text += ' - ';
			    }
			    text += orderUser.name; 
			}
			
			if (orderUser.email) {
			    if (text !== '') {
			      text += ' - ';
			    }
			    text += orderUser.email; 
			}
			
			if (orderUser.accountType) {
			    if (text !== '') {
			      text += ' - ';
			    }
			    text += orderUser.accountType; 
			}
			
		}
		
		if (text === '') {
			text = null;
		}
		return text;
	}
	
	private initializeCreditOrderPaymentMethodOptions() {
	    this.creditOrderPaymentMethodOptions = [
	    	{ label: this.getTranslation('security.authorization.creditOrder_paymentMethod_cash'), value: 'CASH' }, 
	    	{ label: this.getTranslation('security.authorization.creditOrder_paymentMethod_bank_account'), value: 'BANK_ACCOUNT' }, 
	    	{ label: this.getTranslation('security.authorization.creditOrder_paymentMethod_credit_card'), value: 'CREDIT_CARD' }, 
	    	{ label: this.getTranslation('security.authorization.creditOrder_paymentMethod_bank_slip'), value: 'BANK_SLIP' }
	    ];
	}
	  
	private initializeCreditOrderOrderStatusOptions() {
	    this.creditOrderOrderStatusOptions = [
	    	{ label: this.getTranslation('security.authorization.creditOrder_orderStatus_awaiting_payment'), value: 'AWAITING_PAYMENT' }, 
	    	{ label: this.getTranslation('security.authorization.creditOrder_orderStatus_paid'), value: 'PAID' }, 
	    	{ label: this.getTranslation('security.authorization.creditOrder_orderStatus_canceled'), value: 'CANCELED' }
	    ];
	}
	  
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.securityAuthorizationTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	
	
	
	initLocaleSettings() {
		this.calendarLocale = this.securityAuthorizationTranslationService.getCalendarLocaleSettings();
	}
	
}