/**********************************************************************************************
Code generated with MKL Plug-in version: 47.7.13
Code generated at time stamp: 2020-01-07T20:34:08.364
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { TenantOpCount } from './tenantopcount.model';
import { TenantOpCountService } from './tenantopcount.service';
import { SecurityAuthorizationTranslationService } from './../i18n/security-authorization-translation.service';

import { TenantService } from './../tenant/tenant.service';
import { Tenant } from './../tenant/tenant.model';
import { TenantAutoComplete } from './../tenant/tenant.model';
import { MessageHandlerService } from 'src/app/core/message-handler.service';


@Component({
  selector: 'app-crud-tenantopcount',
  templateUrl: './crud-tenantopcount.component.html',
  styleUrls: ['./crud-tenantopcount.component.css']
})

export class TenantOpCountComponent implements OnInit {
	tenantOpCount = new TenantOpCount();
	tenantOpCountTenantAutoCompleteSuggestions: TenantAutoComplete[];
	
	constructor(
	    private tenantOpCountService: TenantOpCountService,
	    private securityAuthorizationTranslationService: SecurityAuthorizationTranslationService,
	    private tenantService: TenantService,
	    private route: ActivatedRoute,
	    private messageHandler: MessageHandlerService
	) { 
	}
	
	ngOnInit() {
	    const id = this.route.snapshot.params['id'];
	    if (id) {
	      this.getTenantOpCountById(id);
	    }
	}
	
	begin(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
	      this.tenantOpCount = new TenantOpCount();
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
		
	    this.tenantOpCountService.create(this.tenantOpCount)
	    .then((tenantOpCount) => {
	      this.tenantOpCount = tenantOpCount;
	      this.messageHandler.showSuccess('Registro criado com sucesso!');
	    }).
	    catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	update() {
	    this.tenantOpCountService.update(this.tenantOpCount)
	    .then((tenantOpCount) => {
	      this.tenantOpCount = tenantOpCount;
	      this.messageHandler.showSuccess('Registro alterado!');
	    })
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	getTenantOpCountById(id: string) {
	    this.tenantOpCountService.retrieve(id)
	    .then((tenantOpCount) => this.tenantOpCount = tenantOpCount)
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	get isEditing() {
	    return Boolean(this.tenantOpCount.id);
	}
	
	
	
	tenantOpCountTenantAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.tenantOpCount.tenant = null;
	}
	
	tenantOpCountTenantAutoCompleteOnBlur(event) {
		// Seems a PrimeNG bug, if clear an autocomplete field, on onBlur event, the null value is empty string.
		// Until PrimeNG version: 7.1.3.
		if (String(this.tenantOpCount.tenant) === '') {
			this.tenantOpCount.tenant = null;
		}
	}
	
	tenantOpCountTenantAutoComplete(event) {
	    const query = event.query;
	    this.tenantOpCountService
	      .tenantTenantAutoComplete(query)
	      .then((result) => {
	        this.tenantOpCountTenantAutoCompleteSuggestions = result as TenantAutoComplete[];
	      })
	      .catch(error => {
	        this.messageHandler.showError(error);
	      });
	}
	
	tenantOpCountTenantAutoCompleteFieldConverter(tenant: TenantAutoComplete) {
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
	
	
	
	
	
}
