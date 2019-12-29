/**********************************************************************************************
Code generated with MKL Plug-in version: 40.2.1
Code generated at time stamp: 2019-12-29T08:40:12.255
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { CaixaDiario } from './caixadiario.model';
import { CaixaDiarioService } from './caixadiario.service';
import { FinanceiroFluxoCaixaTranslationService } from './../i18n/financeiro-fluxocaixa-translation.service';
import * as moment from 'moment';

import { CaixaService } from './../caixa/caixa.service';
import { Caixa } from './../caixa/caixa.model';
import { CaixaAutoComplete } from './../caixa/caixa.model';

import { CaixaDiarioSituacao } from './../enums/financeiro-fluxocaixa-enums.model';
import { MessageHandlerService } from 'src/app/core/message-handler.service';


@Component({
  selector: 'app-crud-caixadiario',
  templateUrl: './crud-caixadiario.component.html',
  styleUrls: ['./crud-caixadiario.component.css']
})

export class CaixaDiarioComponent implements OnInit {
	
	calendarLocale: any;
	
	caixaDiario = new CaixaDiario();
	caixaDiarioCaixaAutoCompleteSuggestions: CaixaAutoComplete[];
	caixaDiarioCaixaDiarioSituacaoOptions: CaixaDiarioSituacao[];
	
	constructor(
	    private caixaDiarioService: CaixaDiarioService,
	    private financeiroFluxoCaixaTranslationService: FinanceiroFluxoCaixaTranslationService,
	    private caixaService: CaixaService,
	    private route: ActivatedRoute,
	    private messageHandler: MessageHandlerService
	) { 
		this.initializeCaixaDiarioCaixaDiarioSituacaoOptions();
	}
	
	ngOnInit() {
		this.initLocaleSettings();
		this.initializeEnumFieldsWithDefault();
	    const id = this.route.snapshot.params['id'];
	    if (id) {
	      this.getCaixaDiarioById(id);
	    }
	}
	
	begin(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
	      this.caixaDiario = new CaixaDiario();
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
		
	    this.caixaDiarioService.create(this.caixaDiario)
	    .then((caixaDiario) => {
	      this.caixaDiario = caixaDiario;
	      this.messageHandler.showSuccess('Registro criado com sucesso!');
	    }).
	    catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	update() {
	    this.caixaDiarioService.update(this.caixaDiario)
	    .then((caixaDiario) => {
	      this.caixaDiario = caixaDiario;
	      this.messageHandler.showSuccess('Registro alterado!');
	    })
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	getCaixaDiarioById(id: string) {
	    this.caixaDiarioService.retrieve(id)
	    .then((caixaDiario) => this.caixaDiario = caixaDiario)
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	get isEditing() {
	    return Boolean(this.caixaDiario.id);
	}
	
	initializeEnumFieldsWithDefault() {
		this.caixaDiario.caixaDiarioSituacao = this.caixaDiarioCaixaDiarioSituacaoOptions[1].value;
	}
	
	
	caixaDiarioCaixaAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.caixaDiario.caixa = null;
	}
	
	caixaDiarioCaixaAutoCompleteOnBlur(event) {
		// Seems a PrimeNG bug, if clear an autocomplete field, on onBlur event, the null value is empty string.
		// Until PrimeNG version: 7.1.3.
		if (String(this.caixaDiario.caixa) === '') {
			this.caixaDiario.caixa = null;
		}
	}
	
	caixaDiarioCaixaAutoComplete(event) {
	    const query = event.query;
	    this.caixaDiarioService
	      .caixaCaixaAutoComplete(query)
	      .then((result) => {
	        this.caixaDiarioCaixaAutoCompleteSuggestions = result as CaixaAutoComplete[];
	      })
	      .catch(error => {
	        this.messageHandler.showError(error);
	      });
	}
	
	caixaDiarioCaixaAutoCompleteFieldConverter(caixa: CaixaAutoComplete) {
		let text = '';
		if (caixa) {
			if (caixa.nome) {
			    if (text !== '') {
			      text += ' - ';
			    }
			    text += caixa.nome; 
			}
			
		}
		
		if (text === '') {
			text = null;
		}
		return text;
	}
	
	private initializeCaixaDiarioCaixaDiarioSituacaoOptions() {
	    this.caixaDiarioCaixaDiarioSituacaoOptions = [
	    	{ label: 'Selecione um item', value: null },
	    	{ label: this.getTranslation('financeiro.fluxo_caixa.caixaDiario_caixaDiarioSituacao_nao_iniciado'), value: 'NAO_INICIADO' }, 
	    	{ label: this.getTranslation('financeiro.fluxo_caixa.caixaDiario_caixaDiarioSituacao_aberto'), value: 'ABERTO' }, 
	    	{ label: this.getTranslation('financeiro.fluxo_caixa.caixaDiario_caixaDiarioSituacao_fechado'), value: 'FECHADO' }
	    ];
	}
	  
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.financeiroFluxoCaixaTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	abrirCaixaWhenCondition(): boolean {
		return this.caixaDiario.id && (String(this.caixaDiario.caixaDiarioSituacao) === 'NAO_INICIADO');
	}
	  
	abrirCaixa() {
		this.caixaDiarioRuleFunctionAbrirCaixa();
	}
	
	caixaDiarioRuleFunctionAbrirCaixa() {
	    this.caixaDiarioService.caixaDiarioRuleFunctionAbrirCaixa(this.caixaDiario)
	    .then((caixaDiario) => {
	      if (caixaDiario) { // Can be null
	      	this.caixaDiario = caixaDiario;
	      }
	      this.messageHandler.showSuccess('Operação executada com sucesso.');
	    })
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	fecharCaixaWhenCondition(): boolean {
		return this.caixaDiario.id && (String(this.caixaDiario.caixaDiarioSituacao) === 'ABERTO');
	}
	  
	fecharCaixa() {
		this.caixaDiarioRuleFunctionFecharCaixa();
	}
	
	caixaDiarioRuleFunctionFecharCaixa() {
	    this.caixaDiarioService.caixaDiarioRuleFunctionFecharCaixa(this.caixaDiario)
	    .then((caixaDiario) => {
	      if (caixaDiario) { // Can be null
	      	this.caixaDiario = caixaDiario;
	      }
	      this.messageHandler.showSuccess('Operação executada com sucesso.');
	    })
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	
	
	
	
	initLocaleSettings() {
		this.calendarLocale = this.financeiroFluxoCaixaTranslationService.getCalendarLocaleSettings();
	}
	
	
}
