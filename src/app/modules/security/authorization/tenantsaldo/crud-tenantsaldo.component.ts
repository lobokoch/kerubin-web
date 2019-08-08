/**********************************************************************************************
Code generated with MKL Plug-in version: 7.0.4
Code generated at time stamp: 2019-08-06T07:20:02.873
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { TenantSaldo } from './tenantsaldo.model';
import { TenantSaldoService } from './tenantsaldo.service';
import { SecurityAuthorizationTranslationService } from './../i18n/security-authorization-translation.service';
import * as moment from 'moment';

import { TenantService } from './../tenant/tenant.service';
import { Tenant } from './../tenant/tenant.model';
import { TenantAutoComplete } from './../tenant/tenant.model';
import { MessageHandlerService } from 'src/app/core/message-handler.service';


@Component({
  selector: 'app-crud-tenantsaldo.component',
  templateUrl: './crud-tenantsaldo.component.html',
  styleUrls: ['./crud-tenantsaldo.component.css']
})

export class TenantSaldoComponent implements OnInit {
	
	calendarLocale: any;
	
	tenantSaldo = new TenantSaldo();
	tenantSaldoTenantAutoCompleteSuggestions: TenantAutoComplete[];
	
	constructor(
	    private tenantSaldoService: TenantSaldoService,
	    private securityAuthorizationTranslationService: SecurityAuthorizationTranslationService,
	    private tenantService: TenantService,
	    private route: ActivatedRoute,
	    private messageHandler: MessageHandlerService
	) { 
	}
	
	ngOnInit() {
		this.initLocaleSettings();
	    const id = this.route.snapshot.params['id'];
	    if (id) {
	      this.getTenantSaldoById(id);
	    }
	}
	
	begin(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
	      this.tenantSaldo = new TenantSaldo();
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
		
	    this.tenantSaldoService.create(this.tenantSaldo)
	    .then((tenantSaldo) => {
	      this.tenantSaldo = tenantSaldo;
	      this.messageHandler.showSuccess('Registro criado com sucesso!');
	    }).
	    catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	update() {
	    this.tenantSaldoService.update(this.tenantSaldo)
	    .then((tenantSaldo) => {
	      this.tenantSaldo = tenantSaldo;
	      this.messageHandler.showSuccess('Registro alterado!');
	    })
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	getTenantSaldoById(id: string) {
	    this.tenantSaldoService.retrieve(id)
	    .then((tenantSaldo) => this.tenantSaldo = tenantSaldo)
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	get isEditing() {
	    return Boolean(this.tenantSaldo.id);
	}
	
	
	
	tenantSaldoTenantAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.tenantSaldo.tenant = null;
	}
	
	tenantSaldoTenantAutoCompleteOnBlur(event) {
		// Seems a PrimeNG bug, if clear an autocomplete field, on onBlur event, the null value is empty string.
		// Until PrimeNG version: 7.1.3.
		if (String(this.tenantSaldo.tenant) === '') {
			this.tenantSaldo.tenant = null;
		}
	}
	
	tenantSaldoTenantAutoComplete(event) {
	    const query = event.query;
	    this.tenantSaldoService
	      .tenantTenantAutoComplete(query)
	      .then((result) => {
	        this.tenantSaldoTenantAutoCompleteSuggestions = result as TenantAutoComplete[];
	      })
	      .catch(error => {
	        this.messageHandler.showError(error);
	      });
	}
	
	tenantSaldoTenantAutoCompleteFieldConverter(tenant: TenantAutoComplete) {
		let text = '';
		if (tenant) {
			if (tenant.name) {
			    if (text !== '') {
			      text += ' - ';
			    }
			    text += tenant.name; 
			}
			
		}
		
		if (text === '') {
			text = null;
		}
		return text;
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
