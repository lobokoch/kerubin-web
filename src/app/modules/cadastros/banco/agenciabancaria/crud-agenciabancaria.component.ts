/**********************************************************************************************
Code generated by MKL Plug-in
Copyright: Kerubin - kerubin.platform@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { AutoComplete } from 'primeng/autocomplete';
import { ViewChild } from '@angular/core';
import { AgenciaBancaria } from './agenciabancaria.model';
import { AgenciaBancariaService } from './agenciabancaria.service';
import { CadastrosBancoTranslationService } from './../i18n/cadastros-banco-translation.service';
import * as moment from 'moment';

import { BancoService } from './../banco/banco.service';
import { Banco } from './../banco/banco.model';
import { BancoAutoComplete } from './../banco/banco.model';
import { MessageHandlerService } from 'src/app/core/message-handler.service';


@Component({
  selector: 'app-crud-agenciabancaria',
  templateUrl: './crud-agenciabancaria.component.html',
  styleUrls: ['./crud-agenciabancaria.component.css']
})

export class AgenciaBancariaComponent implements OnInit {
	showHideHelp = false; // for show/hide help.
	
	
	calendarLocale: any;
	
	agenciaBancaria = new AgenciaBancaria();
	agenciaBancariaBancoAutoCompleteSuggestions: BancoAutoComplete[];
	
	@ViewChild('agenciaBancaria_banco_elementRef', {static: true}) agenciaBancariaDefaultElementRef: AutoComplete;
	
	constructor(
	    private agenciaBancariaService: AgenciaBancariaService,
	    private cadastrosBancoTranslationService: CadastrosBancoTranslationService,
	    private bancoService: BancoService,
	    private route: ActivatedRoute,
	    private messageHandler: MessageHandlerService
	) { 
	}
	
	ngOnInit() {
		this.initLocaleSettings();
	    const id = this.route.snapshot.params['id'];
	    if (id) {
	      this.getAgenciaBancariaById(id);
	    }
	    setTimeout(function() {
	    	this.agenciaBancariaDefaultElementSetFocus();
	    }.bind(this), 1);
	}
	
	getShowHideHelpLabel(): string {
		return this.showHideHelp ? 'Ocultar ajuda' : 'Mostrar ajuda';
	}
	
	beginFormAgenciaBancaria(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
	      this.agenciaBancaria = new AgenciaBancaria();
		  this.agenciaBancariaDefaultElementSetFocus();
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
	
	saveFormAgenciaBancaria(form: FormGroup) {
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
		
	    this.agenciaBancariaService.create(this.agenciaBancaria)
	    .then((agenciaBancaria) => {
	      this.agenciaBancaria = agenciaBancaria;
	      this.messageHandler.showSuccess('Registro criado com sucesso!');
	      this.agenciaBancariaDefaultElementSetFocus();
	    }).
	    catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	update() {
	    this.agenciaBancariaService.update(this.agenciaBancaria)
	    .then((agenciaBancaria) => {
	      this.agenciaBancaria = agenciaBancaria;
	      this.messageHandler.showSuccess('Registro alterado!');
	      this.agenciaBancariaDefaultElementSetFocus();
	    })
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	getAgenciaBancariaById(id: string) {
	    this.agenciaBancariaService.retrieve(id)
	    .then((agenciaBancaria) => { 
	    	this.agenciaBancaria = agenciaBancaria;
	    })
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	get isEditing() {
	    return Boolean(this.agenciaBancaria.id);
	}
	
	
	
	agenciaBancariaBancoAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.agenciaBancaria.banco = null;
	}
	
	agenciaBancariaBancoAutoCompleteOnBlur(event) {
		// Seems a PrimeNG bug, if clear an autocomplete field, on onBlur event, the null value is empty string.
		// Until PrimeNG version: 7.1.3.
		if (String(this.agenciaBancaria.banco) === '') {
			this.agenciaBancaria.banco = null;
		}
	}
	
	agenciaBancariaBancoAutoComplete(event) {
	    const query = event.query;
	    this.agenciaBancariaService
	      .bancoBancoAutoComplete(query)
	      .then((result) => {
	        this.agenciaBancariaBancoAutoCompleteSuggestions = result as BancoAutoComplete[];
	      })
	      .catch(error => {
	        this.messageHandler.showError(error);
	      });
	}
	
	agenciaBancariaBancoAutoCompleteFieldConverter(banco: BancoAutoComplete) {
		let text = '';
		if (banco) {
			if (banco.numero) {
			    if (text !== '') {
			      text += ' - ';
			    }
			    text += banco.numero; 
			}
			
			if (banco.nome) {
			    if (text !== '') {
			      text += ' - ';
			    }
			    text += banco.nome; 
			}
			
		}
		
		if (text === '') {
			text = null;
		}
		return text;
	}
	
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.cadastrosBancoTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	
	
										
	// Begin RuleWithSlotAppyHiddeComponent 
	
	ruleAgenciaBancaria_EnderecoAppyHiddeComponent() {
		const expression = (this.agenciaBancaria.maisOpcoes === false);
		if (expression) {
			return 'none'; // Will hidde de component.
		} else {
			return 'inline'; // Default css show element value.
		}
	}
	
	ruleAgenciaBancaria_NomeGerenteAppyHiddeComponent() {
		const expression = (this.agenciaBancaria.maisOpcoes === false);
		if (expression) {
			return 'none'; // Will hidde de component.
		} else {
			return 'inline'; // Default css show element value.
		}
	}
	
	ruleAgenciaBancaria_FoneAppyHiddeComponent() {
		const expression = (this.agenciaBancaria.maisOpcoes === false);
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
	
	
	
				
	agenciaBancariaDefaultElementSetFocus() {
		try {
	    	this.agenciaBancariaDefaultElementRef.focusInput();
	    } catch (error) {
	    	console.log('Error setting focus at agenciaBancariaDefaultElementSetFocus:' + error);
	    }
	}
}
