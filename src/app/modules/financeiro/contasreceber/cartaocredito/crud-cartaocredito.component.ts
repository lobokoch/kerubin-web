/**********************************************************************************************
Code generated with MKL Plug-in version: 40.3.1
Code generated at time stamp: 2020-01-03T07:14:21.364
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { CartaoCredito } from './cartaocredito.model';
import { CartaoCreditoService } from './cartaocredito.service';
import { FinanceiroContasReceberTranslationService } from './../i18n/financeiro-contasreceber-translation.service';
import * as moment from 'moment';

import { BancoService } from './../banco/banco.service';
import { Banco } from './../banco/banco.model';
import { BancoAutoComplete } from './../banco/banco.model';

import { BandeiraCartaoService } from './../bandeiracartao/bandeiracartao.service';
import { BandeiraCartao } from './../bandeiracartao/bandeiracartao.model';
import { BandeiraCartaoAutoComplete } from './../bandeiracartao/bandeiracartao.model';
import { MessageHandlerService } from 'src/app/core/message-handler.service';


@Component({
  selector: 'app-crud-cartaocredito',
  templateUrl: './crud-cartaocredito.component.html',
  styleUrls: ['./crud-cartaocredito.component.css']
})

export class CartaoCreditoComponent implements OnInit {
	
	calendarLocale: any;
	
	cartaoCredito = new CartaoCredito();
	cartaoCreditoBancoAutoCompleteSuggestions: BancoAutoComplete[];
	
	
	cartaoCreditoBandeiraCartaoAutoCompleteSuggestions: BandeiraCartaoAutoComplete[];
	
	constructor(
	    private cartaoCreditoService: CartaoCreditoService,
	    private financeiroContasReceberTranslationService: FinanceiroContasReceberTranslationService,
	    private bancoService: BancoService,
	    
	    
	    private bandeiraCartaoService: BandeiraCartaoService,
	    private route: ActivatedRoute,
	    private messageHandler: MessageHandlerService
	) { 
	}
	
	ngOnInit() {
		this.initLocaleSettings();
	    const id = this.route.snapshot.params['id'];
	    if (id) {
	      this.getCartaoCreditoById(id);
	    }
	}
	
	begin(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
	      this.cartaoCredito = new CartaoCredito();
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
		
	    this.cartaoCreditoService.create(this.cartaoCredito)
	    .then((cartaoCredito) => {
	      this.cartaoCredito = cartaoCredito;
	      this.messageHandler.showSuccess('Registro criado com sucesso!');
	    }).
	    catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	update() {
	    this.cartaoCreditoService.update(this.cartaoCredito)
	    .then((cartaoCredito) => {
	      this.cartaoCredito = cartaoCredito;
	      this.messageHandler.showSuccess('Registro alterado!');
	    })
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	getCartaoCreditoById(id: string) {
	    this.cartaoCreditoService.retrieve(id)
	    .then((cartaoCredito) => this.cartaoCredito = cartaoCredito)
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	get isEditing() {
	    return Boolean(this.cartaoCredito.id);
	}
	
	
	
	cartaoCreditoBancoAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.cartaoCredito.banco = null;
	}
	
	cartaoCreditoBancoAutoCompleteOnBlur(event) {
		// Seems a PrimeNG bug, if clear an autocomplete field, on onBlur event, the null value is empty string.
		// Until PrimeNG version: 7.1.3.
		if (String(this.cartaoCredito.banco) === '') {
			this.cartaoCredito.banco = null;
		}
	}
	
	cartaoCreditoBancoAutoComplete(event) {
	    const query = event.query;
	    this.cartaoCreditoService
	      .bancoBancoAutoComplete(query)
	      .then((result) => {
	        this.cartaoCreditoBancoAutoCompleteSuggestions = result as BancoAutoComplete[];
	      })
	      .catch(error => {
	        this.messageHandler.showError(error);
	      });
	}
	
	cartaoCreditoBancoAutoCompleteFieldConverter(banco: BancoAutoComplete) {
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
	
	
	cartaoCreditoBandeiraCartaoAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.cartaoCredito.bandeiraCartao = null;
	}
	
	cartaoCreditoBandeiraCartaoAutoCompleteOnBlur(event) {
		// Seems a PrimeNG bug, if clear an autocomplete field, on onBlur event, the null value is empty string.
		// Until PrimeNG version: 7.1.3.
		if (String(this.cartaoCredito.bandeiraCartao) === '') {
			this.cartaoCredito.bandeiraCartao = null;
		}
	}
	
	cartaoCreditoBandeiraCartaoAutoComplete(event) {
	    const query = event.query;
	    this.cartaoCreditoService
	      .bandeiraCartaoBandeiraCartaoAutoComplete(query)
	      .then((result) => {
	        this.cartaoCreditoBandeiraCartaoAutoCompleteSuggestions = result as BandeiraCartaoAutoComplete[];
	      })
	      .catch(error => {
	        this.messageHandler.showError(error);
	      });
	}
	
	cartaoCreditoBandeiraCartaoAutoCompleteFieldConverter(bandeiraCartao: BandeiraCartaoAutoComplete) {
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
	
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.financeiroContasReceberTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	
	
	
	
	initLocaleSettings() {
		this.calendarLocale = this.financeiroContasReceberTranslationService.getCalendarLocaleSettings();
	}
	
	
}
