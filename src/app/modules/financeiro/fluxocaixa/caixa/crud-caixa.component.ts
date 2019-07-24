/**********************************************************************************************
Code generated with MKL Plug-in version: 7.0.3
Code generated at time stamp: 2019-07-24T07:02:34.124
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { Caixa } from './caixa.model';
import { CaixaService } from './caixa.service';
import { FinanceiroFluxoCaixaTranslationService } from './../i18n/financeiro-fluxocaixa-translation.service';
import * as moment from 'moment';
import { MessageHandlerService } from 'src/app/core/message-handler.service';


@Component({
  selector: 'app-crud-caixa.component',
  templateUrl: './crud-caixa.component.html',
  styleUrls: ['./crud-caixa.component.css']
})

export class CaixaComponent implements OnInit {
	
	calendarLocale: any;
	
	caixa = new Caixa();
	
	constructor(
	    private caixaService: CaixaService,
	    private financeiroFluxoCaixaTranslationService: FinanceiroFluxoCaixaTranslationService,
	    private route: ActivatedRoute,
	    private messageHandler: MessageHandlerService
	) { 
	}
	
	ngOnInit() {
		this.initLocaleSettings();
		this.rulesOnCreate();
		
	    const id = this.route.snapshot.params['id'];
	    if (id) {
	      this.getCaixaById(id);
	    }
	}
	
	begin(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
	      this.caixa = new Caixa();
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
		this.rulesOnCreate();
		
	    this.caixaService.create(this.caixa)
	    .then((caixa) => {
	      this.caixa = caixa;
	      this.messageHandler.showSuccess('Registro criado com sucesso!');
	    }).
	    catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	update() {
	    this.caixaService.update(this.caixa)
	    .then((caixa) => {
	      this.caixa = caixa;
	      this.messageHandler.showSuccess('Registro alterado!');
	    })
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	getCaixaById(id: string) {
	    this.caixaService.retrieve(id)
	    .then((caixa) => this.caixa = caixa)
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	get isEditing() {
	    return Boolean(this.caixa.id);
	}
	
	
	
	
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.financeiroFluxoCaixaTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	rulesOnCreate() {
		this.caixa.saldo = 0.0;
	}
	
	
	
	caixaRuleDisableCUD() {
		const expression = this.caixa.id && (String(this.caixa.id) === 'bd1e9cb7-e7f6-40da-af5c-1f461dac1d11');
		return expression;
		
	}
	
	initLocaleSettings() {
		this.calendarLocale = this.financeiroFluxoCaixaTranslationService.getCalendarLocaleSettings();
	}
	
}
