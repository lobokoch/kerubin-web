/**********************************************************************************************
Code generated with MKL Plug-in version: 40.2.5
Code generated at time stamp: 2019-12-31T10:27:34.608
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { ConciliacaoBancaria } from './conciliacaobancaria.model';
import { ConciliacaoBancariaService } from './conciliacaobancaria.service';
import { CadastrosBancoTranslationService } from './../i18n/cadastros-banco-translation.service';
import * as moment from 'moment';

import { SituacaoConciliacao } from './../enums/cadastros-banco-enums.model';
import { MessageHandlerService } from 'src/app/core/message-handler.service';


@Component({
  selector: 'app-crud-conciliacaobancaria',
  templateUrl: './crud-conciliacaobancaria.component.html',
  styleUrls: ['./crud-conciliacaobancaria.component.css']
})

export class ConciliacaoBancariaComponent implements OnInit {
	
	calendarLocale: any;
	
	conciliacaoBancaria = new ConciliacaoBancaria();
	conciliacaoBancariaSituacaoConciliacaoOptions: SituacaoConciliacao[];
	
	// Begin polling reference variables
	private pollingRecarregarConciliacaoRef: any;
	// End polling reference variables
	
	constructor(
	    private conciliacaoBancariaService: ConciliacaoBancariaService,
	    private cadastrosBancoTranslationService: CadastrosBancoTranslationService,
	    private route: ActivatedRoute,
	    private messageHandler: MessageHandlerService
	) { 
		this.initializeConciliacaoBancariaSituacaoConciliacaoOptions();
	}
	
	ngOnInit() {
		this.initLocaleSettings();
		this.initializeEnumFieldsWithDefault();
	    const id = this.route.snapshot.params['id'];
	    if (id) {
	      this.getConciliacaoBancariaById(id);
	    }
	}
	
	begin(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
	      this.conciliacaoBancaria = new ConciliacaoBancaria();
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
		
	    this.conciliacaoBancariaService.create(this.conciliacaoBancaria)
	    .then((conciliacaoBancaria) => {
	      this.conciliacaoBancaria = conciliacaoBancaria;
	      this.messageHandler.showSuccess('Registro criado com sucesso!');
	    }).
	    catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	update() {
	    this.conciliacaoBancariaService.update(this.conciliacaoBancaria)
	    .then((conciliacaoBancaria) => {
	      this.conciliacaoBancaria = conciliacaoBancaria;
	      this.messageHandler.showSuccess('Registro alterado!');
	    })
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	getConciliacaoBancariaById(id: string) {
	    this.conciliacaoBancariaService.retrieve(id)
	    .then((conciliacaoBancaria) => this.conciliacaoBancaria = conciliacaoBancaria)
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	get isEditing() {
	    return Boolean(this.conciliacaoBancaria.id);
	}
	
	initializeEnumFieldsWithDefault() {
		this.conciliacaoBancaria.situacaoConciliacao = this.conciliacaoBancariaSituacaoConciliacaoOptions[1].value;
	}
	
	
	
	private initializeConciliacaoBancariaSituacaoConciliacaoOptions() {
	    this.conciliacaoBancariaSituacaoConciliacaoOptions = [
	    	{ label: 'Selecione um item', value: null },
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoBancaria_situacaoConciliacao_nao_conciliado'), value: 'NAO_CONCILIADO' }, 
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoBancaria_situacaoConciliacao_analisando_transacoes'), value: 'ANALISANDO_TRANSACOES' }, 
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoBancaria_situacaoConciliacao_transacoes_analisadas'), value: 'TRANSACOES_ANALISADAS' }, 
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoBancaria_situacaoConciliacao_conciliando_transacoes'), value: 'CONCILIANDO_TRANSACOES' }, 
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoBancaria_situacaoConciliacao_conciliado'), value: 'CONCILIADO' }, 
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoBancaria_situacaoConciliacao_conciliado_com_erro'), value: 'CONCILIADO_COM_ERRO' }, 
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoBancaria_situacaoConciliacao_cancelado'), value: 'CANCELADO' }
	    ];
	}
	  
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.cadastrosBancoTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	aplicarConciliacaoWhenCondition(): boolean {
		return this.conciliacaoBancaria.id && (String(this.conciliacaoBancaria.situacaoConciliacao) === 'TRANSACOES_ANALISADAS');
	}
	  
	aplicarConciliacao() {
		this.conciliacaoBancariaRuleFunctionAplicarConciliacaoBancaria();
	}
	
	conciliacaoBancariaRuleFunctionAplicarConciliacaoBancaria() {
	    this.conciliacaoBancariaService.conciliacaoBancariaRuleFunctionAplicarConciliacaoBancaria(this.conciliacaoBancaria)
	    .then((conciliacaoBancaria) => {
	      if (conciliacaoBancaria) { // Can be null
	      	this.conciliacaoBancaria = conciliacaoBancaria;
	      }
	      this.messageHandler.showSuccess('Operação executada com sucesso.');
	    })
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	
	
	
	
	initLocaleSettings() {
		this.calendarLocale = this.cadastrosBancoTranslationService.getCalendarLocaleSettings();
	}
	
	
	
	// Begin polling methods for: recarregarConciliacao
	startPollingRecarregarConciliacao() {
	  this.pollingRecarregarConciliacaoRef = setInterval(() => {
	    this.runPollingRecarregarConciliacao();
	  }, 3000);
	}
	
	stopPollingRecarregarConciliacao() {
	  clearInterval(this.pollingRecarregarConciliacaoRef);
	}
	
	runPollingRecarregarConciliacao() {
	  // You can replace this code by your code.
	  
	  const id = this.route.snapshot.params['id'];
	  if (id) {
	    this.getConciliacaoBancariaById(id);
	  }
	}
	// End polling methods for: recarregarConciliacao
	
}
