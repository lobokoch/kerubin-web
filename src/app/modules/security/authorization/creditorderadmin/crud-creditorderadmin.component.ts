/**********************************************************************************************
Code generated with MKL Plug-in version: 7.18.7
Code generated at time stamp: 2019-08-15T06:20:44.459
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { CreditOrderAdmin } from './creditorderadmin.model';
import { CreditOrderAdminService } from './creditorderadmin.service';
import { SecurityAuthorizationTranslationService } from './../i18n/security-authorization-translation.service';
import * as moment from 'moment';

import { SysUserService } from './../sysuser/sysuser.service';
import { SysUser } from './../sysuser/sysuser.model';
import { SysUserAutoComplete } from './../sysuser/sysuser.model';

import { PaymentMethod } from './../enums/security-authorization-enums.model';

import { OrderStatus } from './../enums/security-authorization-enums.model';
import { MessageHandlerService } from 'src/app/core/message-handler.service';


@Component({
  selector: 'app-crud-creditorderadmin.component',
  templateUrl: './crud-creditorderadmin.component.html',
  styleUrls: ['./crud-creditorderadmin.component.css']
})

export class CreditOrderAdminComponent implements OnInit {
	
	calendarLocale: any;
	
	creditOrderAdmin = new CreditOrderAdmin();
	creditOrderAdminOrderUserAutoCompleteSuggestions: SysUserAutoComplete[];
	creditOrderAdminPaymentMethodOptions: PaymentMethod[];
	
	
	creditOrderAdminOrderStatusOptions: OrderStatus[];
	
	constructor(
	    private creditOrderAdminService: CreditOrderAdminService,
	    private securityAuthorizationTranslationService: SecurityAuthorizationTranslationService,
	    private sysUserService: SysUserService,
	    private route: ActivatedRoute,
	    private messageHandler: MessageHandlerService
	) { 
		this.initializeCreditOrderAdminPaymentMethodOptions();
		
		this.initializeCreditOrderAdminOrderStatusOptions();
	}
	
	ngOnInit() {
		this.initLocaleSettings();
		this.initializeEnumFieldsWithDefault();
	    const id = this.route.snapshot.params['id'];
	    if (id) {
	      this.getCreditOrderAdminById(id);
	    }
	}
	
	begin(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
	      this.creditOrderAdmin = new CreditOrderAdmin();
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
		
	    this.creditOrderAdminService.create(this.creditOrderAdmin)
	    .then((creditOrderAdmin) => {
	      this.creditOrderAdmin = creditOrderAdmin;
	      this.messageHandler.showSuccess('Registro criado com sucesso!');
	    }).
	    catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	update() {
	    this.creditOrderAdminService.update(this.creditOrderAdmin)
	    .then((creditOrderAdmin) => {
	      this.creditOrderAdmin = creditOrderAdmin;
	      this.messageHandler.showSuccess('Registro alterado!');
	    })
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	getCreditOrderAdminById(id: string) {
	    this.creditOrderAdminService.retrieve(id)
	    .then((creditOrderAdmin) => this.creditOrderAdmin = creditOrderAdmin)
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	get isEditing() {
	    return Boolean(this.creditOrderAdmin.id);
	}
	
	initializeEnumFieldsWithDefault() {
		this.creditOrderAdmin.paymentMethod = this.creditOrderAdminPaymentMethodOptions[0].value;
		this.creditOrderAdmin.orderStatus = this.creditOrderAdminOrderStatusOptions[0].value;
	}
	
	
	creditOrderAdminOrderUserAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.creditOrderAdmin.orderUser = null;
	}
	
	creditOrderAdminOrderUserAutoCompleteOnBlur(event) {
		// Seems a PrimeNG bug, if clear an autocomplete field, on onBlur event, the null value is empty string.
		// Until PrimeNG version: 7.1.3.
		if (String(this.creditOrderAdmin.orderUser) === '') {
			this.creditOrderAdmin.orderUser = null;
		}
	}
	
	creditOrderAdminOrderUserAutoComplete(event) {
	    const query = event.query;
	    this.creditOrderAdminService
	      .sysUserOrderUserAutoComplete(query)
	      .then((result) => {
	        this.creditOrderAdminOrderUserAutoCompleteSuggestions = result as SysUserAutoComplete[];
	      })
	      .catch(error => {
	        this.messageHandler.showError(error);
	      });
	}
	
	creditOrderAdminOrderUserAutoCompleteFieldConverter(orderUser: SysUserAutoComplete) {
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
	
	private initializeCreditOrderAdminPaymentMethodOptions() {
	    this.creditOrderAdminPaymentMethodOptions = [
	    	{ label: 'Selecione um item', value: null },
	    	{ label: this.getTranslation('security.authorization.creditOrderAdmin_paymentMethod_cash'), value: 'CASH' }, 
	    	{ label: this.getTranslation('security.authorization.creditOrderAdmin_paymentMethod_bank_account'), value: 'BANK_ACCOUNT' }, 
	    	{ label: this.getTranslation('security.authorization.creditOrderAdmin_paymentMethod_credit_card'), value: 'CREDIT_CARD' }, 
	    	{ label: this.getTranslation('security.authorization.creditOrderAdmin_paymentMethod_bank_slip'), value: 'BANK_SLIP' }
	    ];
	}
	  
	private initializeCreditOrderAdminOrderStatusOptions() {
	    this.creditOrderAdminOrderStatusOptions = [
	    	{ label: 'Selecione um item', value: null },
	    	{ label: this.getTranslation('security.authorization.creditOrderAdmin_orderStatus_awaiting_payment'), value: 'AWAITING_PAYMENT' }, 
	    	{ label: this.getTranslation('security.authorization.creditOrderAdmin_orderStatus_paid'), value: 'PAID' }, 
	    	{ label: this.getTranslation('security.authorization.creditOrderAdmin_orderStatus_canceled'), value: 'CANCELED' }
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