/**********************************************************************************************
Code generated with MKL Plug-in version: 6.11.0
Code generated at time stamp: 2019-07-06T11:24:40.670
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { SysUser } from './sysuser.model';
import { SysUserService } from './sysuser.service';
import { SecurityAuthorizationTranslationService } from './../i18n/security-authorization-translation.service';
import * as moment from 'moment';

import { TenantService } from './../tenant/tenant.service';
import { Tenant } from './../tenant/tenant.model';
import { TenantAutoComplete } from './../tenant/tenant.model';

import { AccountType } from './../enums/security-authorization-enums.model';
import { MessageHandlerService } from 'src/app/core/message-handler.service';


@Component({
  selector: 'app-crud-sysuser.component',
  templateUrl: './crud-sysuser.component.html',
  styleUrls: ['./crud-sysuser.component.css']
})

export class SysUserComponent implements OnInit {
	
	calendarLocale: any;
	
	sysUser = new SysUser();
	sysUserTenantAutoCompleteSuggestions: TenantAutoComplete[];
	sysUserAccountTypeOptions: AccountType[];
	
	constructor(
	    private sysUserService: SysUserService,
	    private securityAuthorizationTranslationService: SecurityAuthorizationTranslationService,
	    private tenantService: TenantService,
	    private route: ActivatedRoute,
	    private messageHandler: MessageHandlerService
	) { 
		this.initializeSysUserAccountTypeOptions();
	}
	
	ngOnInit() {
		this.initLocaleSettings();
		this.initializeEnumFieldsWithDefault();
	    const id = this.route.snapshot.params['id'];
	    if (id) {
	      this.getSysUserById(id);
	    }
	}
	
	begin(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
	      this.sysUser = new SysUser();
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
		
	    this.sysUserService.create(this.sysUser)
	    .then((sysUser) => {
	      this.sysUser = sysUser;
	      this.messageHandler.showSuccess('Registro criado com sucesso!');
	    }).
	    catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	update() {
	    this.sysUserService.update(this.sysUser)
	    .then((sysUser) => {
	      this.sysUser = sysUser;
	      this.messageHandler.showSuccess('Registro alterado!');
	    })
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	getSysUserById(id: string) {
	    this.sysUserService.retrieve(id)
	    .then((sysUser) => this.sysUser = sysUser)
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	get isEditing() {
	    return Boolean(this.sysUser.id);
	}
	
	initializeEnumFieldsWithDefault() {
		this.sysUser.accountType = this.sysUserAccountTypeOptions[0].value;
	}
	
	
	sysUserTenantAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.sysUser.tenant = null;
	}
	
	sysUserTenantAutoComplete(event) {
	    const query = event.query;
	    this.sysUserService
	      .tenantTenantAutoComplete(query)
	      .then((result) => {
	        this.sysUserTenantAutoCompleteSuggestions = result as TenantAutoComplete[];
	      })
	      .catch(error => {
	        this.messageHandler.showError(error);
	      });
	}
	
	sysUserTenantAutoCompleteFieldConverter(tenant: TenantAutoComplete) {
		if (tenant) {
			return (tenant.name || '<nulo>');
		} else {
			return null;
		}
	}
	
	private initializeSysUserAccountTypeOptions() {
	    this.sysUserAccountTypeOptions = [
	    	{ label: this.getTranslation('security.authorization.sysUser_accountType_personal'), value: 'PERSONAL' }, 
	    	{ label: this.getTranslation('security.authorization.sysUser_accountType_corporate'), value: 'CORPORATE' }
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
