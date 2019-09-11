/**********************************************************************************************
Code generated with MKL Plug-in version: 22.1.1
Code generated at time stamp: 2019-09-10T21:41:33.371
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { ContaBancaria } from './contabancaria.model';
import { ContaBancariaService } from './contabancaria.service';
import { FinanceiroContasPagarTranslationService } from './../i18n/financeiro-contaspagar-translation.service';
import * as moment from 'moment';

import { AgenciaBancariaService } from './../agenciabancaria/agenciabancaria.service';
import { AgenciaBancaria } from './../agenciabancaria/agenciabancaria.model';
import { AgenciaBancariaAutoComplete } from './../agenciabancaria/agenciabancaria.model';

import { TipoContaBancaria } from './../enums/financeiro-contaspagar-enums.model';
import { MessageHandlerService } from 'src/app/core/message-handler.service';


@Component({
  selector: 'app-crud-contabancaria.component',
  templateUrl: './crud-contabancaria.component.html',
  styleUrls: ['./crud-contabancaria.component.css']
})

export class ContaBancariaComponent implements OnInit {
	
	calendarLocale: any;
	
	contaBancaria = new ContaBancaria();
	contaBancariaAgenciaAutoCompleteSuggestions: AgenciaBancariaAutoComplete[];
	contaBancariaTipoContaBancariaOptions: TipoContaBancaria[];
	
	constructor(
	    private contaBancariaService: ContaBancariaService,
	    private financeiroContasPagarTranslationService: FinanceiroContasPagarTranslationService,
	    private agenciaBancariaService: AgenciaBancariaService,
	    private route: ActivatedRoute,
	    private messageHandler: MessageHandlerService
	) { 
		this.initializeContaBancariaTipoContaBancariaOptions();
	}
	
	ngOnInit() {
		this.initLocaleSettings();
		this.initializeEnumFieldsWithDefault();
	    const id = this.route.snapshot.params['id'];
	    if (id) {
	      this.getContaBancariaById(id);
	    }
	}
	
	begin(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
	      this.contaBancaria = new ContaBancaria();
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
		
	    this.contaBancariaService.create(this.contaBancaria)
	    .then((contaBancaria) => {
	      this.contaBancaria = contaBancaria;
	      this.messageHandler.showSuccess('Registro criado com sucesso!');
	    }).
	    catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	update() {
	    this.contaBancariaService.update(this.contaBancaria)
	    .then((contaBancaria) => {
	      this.contaBancaria = contaBancaria;
	      this.messageHandler.showSuccess('Registro alterado!');
	    })
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	getContaBancariaById(id: string) {
	    this.contaBancariaService.retrieve(id)
	    .then((contaBancaria) => this.contaBancaria = contaBancaria)
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	get isEditing() {
	    return Boolean(this.contaBancaria.id);
	}
	
	initializeEnumFieldsWithDefault() {
		this.contaBancaria.tipoContaBancaria = this.contaBancariaTipoContaBancariaOptions[1].value;
	}
	
	
	contaBancariaAgenciaAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.contaBancaria.agencia = null;
	}
	
	contaBancariaAgenciaAutoCompleteOnBlur(event) {
		// Seems a PrimeNG bug, if clear an autocomplete field, on onBlur event, the null value is empty string.
		// Until PrimeNG version: 7.1.3.
		if (String(this.contaBancaria.agencia) === '') {
			this.contaBancaria.agencia = null;
		}
	}
	
	contaBancariaAgenciaAutoComplete(event) {
	    const query = event.query;
	    this.contaBancariaService
	      .agenciaBancariaAgenciaAutoComplete(query)
	      .then((result) => {
	        this.contaBancariaAgenciaAutoCompleteSuggestions = result as AgenciaBancariaAutoComplete[];
	      })
	      .catch(error => {
	        this.messageHandler.showError(error);
	      });
	}
	
	contaBancariaAgenciaAutoCompleteFieldConverter(agencia: AgenciaBancariaAutoComplete) {
		let text = '';
		if (agencia) {
			if (agencia.numeroAgencia) {
			    if (text !== '') {
			      text += ' - ';
			    }
			    text += agencia.numeroAgencia; 
			}
			
			if (agencia.digitoAgencia) {
			    if (text !== '') {
			      text += ' - ';
			    }
			    text += agencia.digitoAgencia; 
			}
			
			if (agencia.endereco) {
			    if (text !== '') {
			      text += ' - ';
			    }
			    text += agencia.endereco; 
			}
			
		}
		
		if (text === '') {
			text = null;
		}
		return text;
	}
	
	private initializeContaBancariaTipoContaBancariaOptions() {
	    this.contaBancariaTipoContaBancariaOptions = [
	    	{ label: 'Selecione um item', value: null },
	    	{ label: this.getTranslation('financeiro.contas_pagar.contaBancaria_tipoContaBancaria_conta_corrente'), value: 'CONTA_CORRENTE' }, 
	    	{ label: this.getTranslation('financeiro.contas_pagar.contaBancaria_tipoContaBancaria_conta_poupanca'), value: 'CONTA_POUPANCA' }, 
	    	{ label: this.getTranslation('financeiro.contas_pagar.contaBancaria_tipoContaBancaria_conta_salario'), value: 'CONTA_SALARIO' }, 
	    	{ label: this.getTranslation('financeiro.contas_pagar.contaBancaria_tipoContaBancaria_conta_investimento'), value: 'CONTA_INVESTIMENTO' }
	    ];
	}
	  
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.financeiroContasPagarTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	
	
	
	
	initLocaleSettings() {
		this.calendarLocale = this.financeiroContasPagarTranslationService.getCalendarLocaleSettings();
	}
	
	
}
