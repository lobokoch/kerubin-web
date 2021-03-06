/**********************************************************************************************
Code generated by MKL Plug-in
Copyright: Kerubin - kerubin.platform@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { ElementRef, ViewChild } from '@angular/core';
import { ContaBancaria } from './contabancaria.model';
import { ContaBancariaService } from './contabancaria.service';
import { CadastrosBancoTranslationService } from './../i18n/cadastros-banco-translation.service';
import * as moment from 'moment';

import { AgenciaBancariaService } from './../agenciabancaria/agenciabancaria.service';
import { AgenciaBancaria } from './../agenciabancaria/agenciabancaria.model';
import { AgenciaBancariaAutoComplete } from './../agenciabancaria/agenciabancaria.model';

import { BandeiraCartaoService } from './../bandeiracartao/bandeiracartao.service';
import { BandeiraCartao } from './../bandeiracartao/bandeiracartao.model';
import { BandeiraCartaoAutoComplete } from './../bandeiracartao/bandeiracartao.model';

import { TipoContaBancaria } from './../enums/cadastros-banco-enums.model';
import { MessageHandlerService } from 'src/app/core/message-handler.service';


@Component({
  selector: 'app-crud-contabancaria',
  templateUrl: './crud-contabancaria.component.html',
  styleUrls: ['./crud-contabancaria.component.css']
})

export class ContaBancariaComponent implements OnInit {
	showHideHelp = false; // for show/hide help.
	
	
	calendarLocale: any;
	
	contaBancaria = new ContaBancaria();
	contaBancariaAgenciaAutoCompleteSuggestions: AgenciaBancariaAutoComplete[];
	
	
	contaBancariaBandeiraCartaoAutoCompleteSuggestions: BandeiraCartaoAutoComplete[];
	contaBancariaTipoContaBancariaOptions: TipoContaBancaria[];
	
	@ViewChild('contaBancaria_nomeTitular_elementRef', {static: true}) contaBancariaDefaultElementRef: ElementRef;
	
	constructor(
	    private contaBancariaService: ContaBancariaService,
	    private cadastrosBancoTranslationService: CadastrosBancoTranslationService,
	    private agenciaBancariaService: AgenciaBancariaService,
	    
	    
	    private bandeiraCartaoService: BandeiraCartaoService,
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
	    this.contaBancariaDefaultElementSetFocus();
	}
	
	getShowHideHelpLabel(): string {
		return this.showHideHelp ? 'Ocultar ajuda' : 'Mostrar ajuda';
	}
	
	beginFormContaBancaria(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
	      this.contaBancaria = new ContaBancaria();
	      this.initializeEnumFieldsWithDefault();
		  this.contaBancariaDefaultElementSetFocus();
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
	
	saveFormContaBancaria(form: FormGroup) {
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
	      this.contaBancariaDefaultElementSetFocus();
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
	      this.contaBancariaDefaultElementSetFocus();
	    })
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	getContaBancariaById(id: string) {
	    this.contaBancariaService.retrieve(id)
	    .then((contaBancaria) => { 
	    	this.contaBancaria = contaBancaria;
	    })
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
	
	
	contaBancariaBandeiraCartaoAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.contaBancaria.bandeiraCartao = null;
	}
	
	contaBancariaBandeiraCartaoAutoCompleteOnBlur(event) {
		// Seems a PrimeNG bug, if clear an autocomplete field, on onBlur event, the null value is empty string.
		// Until PrimeNG version: 7.1.3.
		if (String(this.contaBancaria.bandeiraCartao) === '') {
			this.contaBancaria.bandeiraCartao = null;
		}
	}
	
	contaBancariaBandeiraCartaoAutoComplete(event) {
	    const query = event.query;
	    this.contaBancariaService
	      .bandeiraCartaoBandeiraCartaoAutoComplete(query)
	      .then((result) => {
	        this.contaBancariaBandeiraCartaoAutoCompleteSuggestions = result as BandeiraCartaoAutoComplete[];
	      })
	      .catch(error => {
	        this.messageHandler.showError(error);
	      });
	}
	
	contaBancariaBandeiraCartaoAutoCompleteFieldConverter(bandeiraCartao: BandeiraCartaoAutoComplete) {
		let text = '';
		if (bandeiraCartao) {
			if (bandeiraCartao.nomeBandeira) {
			    if (text !== '') {
			      text += ' - ';
			    }
			    text += bandeiraCartao.nomeBandeira; 
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
	    	{ label: this.getTranslation('cadastros.banco.contaBancaria_tipoContaBancaria_conta_corrente'), value: 'CONTA_CORRENTE' }, 
	    	{ label: this.getTranslation('cadastros.banco.contaBancaria_tipoContaBancaria_conta_poupanca'), value: 'CONTA_POUPANCA' }, 
	    	{ label: this.getTranslation('cadastros.banco.contaBancaria_tipoContaBancaria_conta_salario'), value: 'CONTA_SALARIO' }, 
	    	{ label: this.getTranslation('cadastros.banco.contaBancaria_tipoContaBancaria_conta_investimento'), value: 'CONTA_INVESTIMENTO' }
	    ];
	}
	  
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.cadastrosBancoTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	
	
										
	// Begin RuleWithSlotAppyHiddeComponent 
	
	ruleContaBancaria_AtivoAppyHiddeComponent() {
		const expression = (this.contaBancaria.maisOpcoes === false);
		if (expression) {
			return 'none'; // Will hidde de component.
		} else {
			return 'inline'; // Default css show element value.
		}
	}
	
	ruleContaBancaria_DataValidadeAppyHiddeComponent() {
		const expression = (this.contaBancaria.maisOpcoes === false);
		if (expression) {
			return 'none'; // Will hidde de component.
		} else {
			return 'inline'; // Default css show element value.
		}
	}
	
	ruleContaBancaria_NumeroCartaoAppyHiddeComponent() {
		const expression = (this.contaBancaria.maisOpcoes === false);
		if (expression) {
			return 'none'; // Will hidde de component.
		} else {
			return 'inline'; // Default css show element value.
		}
	}
	
	ruleContaBancaria_CodigoSegurancaAppyHiddeComponent() {
		const expression = (this.contaBancaria.maisOpcoes === false);
		if (expression) {
			return 'none'; // Will hidde de component.
		} else {
			return 'inline'; // Default css show element value.
		}
	}
	
	ruleContaBancaria_BandeiraCartaoAppyHiddeComponent() {
		const expression = (this.contaBancaria.maisOpcoes === false);
		if (expression) {
			return 'none'; // Will hidde de component.
		} else {
			return 'inline'; // Default css show element value.
		}
	}
	// End Begin RuleWithSlotAppyHiddeComponent
	
	
	
	
	initLocaleSettings() {
		this.calendarLocale = this.cadastrosBancoTranslationService.getCalendarLocaleSettings();
	}
	
	
	
				
	contaBancariaDefaultElementSetFocus() {
		try {
	    	this.contaBancariaDefaultElementRef.nativeElement.focus();
	    } catch (error) {
	    	console.log('Error setting focus at contaBancariaDefaultElementSetFocus:' + error);
	    }
	}
}
