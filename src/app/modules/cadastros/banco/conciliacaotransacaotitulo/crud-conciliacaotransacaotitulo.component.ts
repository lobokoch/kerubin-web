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

import { ConciliacaoTransacaoTitulo } from './conciliacaotransacaotitulo.model';
import { ConciliacaoTransacaoTituloService } from './conciliacaotransacaotitulo.service';
import { CadastrosBancoTranslationService } from './../i18n/cadastros-banco-translation.service';
import * as moment from 'moment';

import { ConciliacaoTransacaoService } from './../conciliacaotransacao/conciliacaotransacao.service';
import { ConciliacaoTransacao } from './../conciliacaotransacao/conciliacaotransacao.model';
import { ConciliacaoTransacaoAutoComplete } from './../conciliacaotransacao/conciliacaotransacao.model';

import { PlanoContaService } from './../planoconta/planoconta.service';
import { PlanoConta } from './../planoconta/planoconta.model';
import { PlanoContaAutoComplete } from './../planoconta/planoconta.model';

import { SituacaoConciliacaoTrn } from './../enums/cadastros-banco-enums.model';
import { MessageHandlerService } from 'src/app/core/message-handler.service';


@Component({
  selector: 'app-crud-conciliacaotransacaotitulo',
  templateUrl: './crud-conciliacaotransacaotitulo.component.html',
  styleUrls: ['./crud-conciliacaotransacaotitulo.component.css']
})

export class ConciliacaoTransacaoTituloComponent implements OnInit {
	
	calendarLocale: any;
	
	conciliacaoTransacaoTitulo = new ConciliacaoTransacaoTitulo();
	conciliacaoTransacaoTituloConciliacaoTransacaoAutoCompleteSuggestions: ConciliacaoTransacaoAutoComplete[];
	
	
	conciliacaoTransacaoTituloTituloPlanoContasAutoCompleteSuggestions: PlanoContaAutoComplete[];
	conciliacaoTransacaoTituloSituacaoConciliacaoTrnOptions: SituacaoConciliacaoTrn[];
	
	constructor(
	    private conciliacaoTransacaoTituloService: ConciliacaoTransacaoTituloService,
	    private cadastrosBancoTranslationService: CadastrosBancoTranslationService,
	    private conciliacaoTransacaoService: ConciliacaoTransacaoService,
	    
	    
	    private planoContaService: PlanoContaService,
	    private route: ActivatedRoute,
	    private messageHandler: MessageHandlerService
	) { 
		this.initializeConciliacaoTransacaoTituloSituacaoConciliacaoTrnOptions();
	}
	
	ngOnInit() {
		this.initLocaleSettings();
		this.initializeEnumFieldsWithDefault();
	    const id = this.route.snapshot.params['id'];
	    if (id) {
	      this.getConciliacaoTransacaoTituloById(id);
	    }
	}
	
	begin(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
	      this.conciliacaoTransacaoTitulo = new ConciliacaoTransacaoTitulo();
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
		
	    this.conciliacaoTransacaoTituloService.create(this.conciliacaoTransacaoTitulo)
	    .then((conciliacaoTransacaoTitulo) => {
	      this.conciliacaoTransacaoTitulo = conciliacaoTransacaoTitulo;
	      this.messageHandler.showSuccess('Registro criado com sucesso!');
	    }).
	    catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	update() {
	    this.conciliacaoTransacaoTituloService.update(this.conciliacaoTransacaoTitulo)
	    .then((conciliacaoTransacaoTitulo) => {
	      this.conciliacaoTransacaoTitulo = conciliacaoTransacaoTitulo;
	      this.messageHandler.showSuccess('Registro alterado!');
	    })
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	getConciliacaoTransacaoTituloById(id: string) {
	    this.conciliacaoTransacaoTituloService.retrieve(id)
	    .then((conciliacaoTransacaoTitulo) => this.conciliacaoTransacaoTitulo = conciliacaoTransacaoTitulo)
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	get isEditing() {
	    return Boolean(this.conciliacaoTransacaoTitulo.id);
	}
	
	initializeEnumFieldsWithDefault() {
		this.conciliacaoTransacaoTitulo.situacaoConciliacaoTrn = this.conciliacaoTransacaoTituloSituacaoConciliacaoTrnOptions[1].value;
	}
	
	
	conciliacaoTransacaoTituloConciliacaoTransacaoAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.conciliacaoTransacaoTitulo.conciliacaoTransacao = null;
	}
	
	conciliacaoTransacaoTituloConciliacaoTransacaoAutoCompleteOnBlur(event) {
		// Seems a PrimeNG bug, if clear an autocomplete field, on onBlur event, the null value is empty string.
		// Until PrimeNG version: 7.1.3.
		if (String(this.conciliacaoTransacaoTitulo.conciliacaoTransacao) === '') {
			this.conciliacaoTransacaoTitulo.conciliacaoTransacao = null;
		}
	}
	
	conciliacaoTransacaoTituloConciliacaoTransacaoAutoComplete(event) {
	    const query = event.query;
	    this.conciliacaoTransacaoTituloService
	      .conciliacaoTransacaoConciliacaoTransacaoAutoComplete(query)
	      .then((result) => {
	        this.conciliacaoTransacaoTituloConciliacaoTransacaoAutoCompleteSuggestions = result as ConciliacaoTransacaoAutoComplete[];
	      })
	      .catch(error => {
	        this.messageHandler.showError(error);
	      });
	}
	
	conciliacaoTransacaoTituloConciliacaoTransacaoAutoCompleteFieldConverter(conciliacaoTransacao: ConciliacaoTransacaoAutoComplete) {
		let text = '';
		if (conciliacaoTransacao) {
			if (conciliacaoTransacao.trnId) {
			    if (text !== '') {
			      text += ' - ';
			    }
			    text += conciliacaoTransacao.trnId; 
			}
			
		}
		
		if (text === '') {
			text = null;
		}
		return text;
	}
	
	
	conciliacaoTransacaoTituloTituloPlanoContasAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.conciliacaoTransacaoTitulo.tituloPlanoContas = null;
	}
	
	conciliacaoTransacaoTituloTituloPlanoContasAutoCompleteOnBlur(event) {
		// Seems a PrimeNG bug, if clear an autocomplete field, on onBlur event, the null value is empty string.
		// Until PrimeNG version: 7.1.3.
		if (String(this.conciliacaoTransacaoTitulo.tituloPlanoContas) === '') {
			this.conciliacaoTransacaoTitulo.tituloPlanoContas = null;
		}
	}
	
	conciliacaoTransacaoTituloTituloPlanoContasAutoComplete(event) {
	    const query = event.query;
	    this.conciliacaoTransacaoTituloService
	      .planoContaTituloPlanoContasAutoComplete(query)
	      .then((result) => {
	        this.conciliacaoTransacaoTituloTituloPlanoContasAutoCompleteSuggestions = result as PlanoContaAutoComplete[];
	      })
	      .catch(error => {
	        this.messageHandler.showError(error);
	      });
	}
	
	conciliacaoTransacaoTituloTituloPlanoContasAutoCompleteFieldConverter(tituloPlanoContas: PlanoContaAutoComplete) {
		let text = '';
		if (tituloPlanoContas) {
			if (tituloPlanoContas.codigo) {
			    if (text !== '') {
			      text += ' - ';
			    }
			    text += tituloPlanoContas.codigo; 
			}
			
			if (tituloPlanoContas.descricao) {
			    if (text !== '') {
			      text += ' - ';
			    }
			    text += tituloPlanoContas.descricao; 
			}
			
		}
		
		if (text === '') {
			text = null;
		}
		return text;
	}
	
	private initializeConciliacaoTransacaoTituloSituacaoConciliacaoTrnOptions() {
	    this.conciliacaoTransacaoTituloSituacaoConciliacaoTrnOptions = [
	    	{ label: 'Selecione um item', value: null },
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacaoTitulo_situacaoConciliacaoTrn_nao_conciliado'), value: 'NAO_CONCILIADO' }, 
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacaoTitulo_situacaoConciliacaoTrn_conciliar_contas_pagar'), value: 'CONCILIAR_CONTAS_PAGAR' }, 
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacaoTitulo_situacaoConciliacaoTrn_conciliado_contas_pagar'), value: 'CONCILIADO_CONTAS_PAGAR' }, 
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacaoTitulo_situacaoConciliacaoTrn_contas_pagar_baixado_sem_conciliacao'), value: 'CONTAS_PAGAR_BAIXADO_SEM_CONCILIACAO' }, 
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacaoTitulo_situacaoConciliacaoTrn_conciliar_contas_receber'), value: 'CONCILIAR_CONTAS_RECEBER' }, 
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacaoTitulo_situacaoConciliacaoTrn_conciliado_contas_receber'), value: 'CONCILIADO_CONTAS_RECEBER' }, 
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacaoTitulo_situacaoConciliacaoTrn_contas_receber_baixado_sem_conciliacao'), value: 'CONTAS_RECEBER_BAIXADO_SEM_CONCILIACAO' }, 
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacaoTitulo_situacaoConciliacaoTrn_conciliar_caixa'), value: 'CONCILIAR_CAIXA' }, 
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacaoTitulo_situacaoConciliacaoTrn_conciliado_caixa'), value: 'CONCILIADO_CAIXA' }, 
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacaoTitulo_situacaoConciliacaoTrn_caixa_baixado_sem_conciliacao'), value: 'CAIXA_BAIXADO_SEM_CONCILIACAO' }, 
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacaoTitulo_situacaoConciliacaoTrn_erro'), value: 'ERRO' }, 
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacaoTitulo_situacaoConciliacaoTrn_cancelado'), value: 'CANCELADO' }
	    ];
	}
	  
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.cadastrosBancoTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	
	
	
	
	initLocaleSettings() {
		this.calendarLocale = this.cadastrosBancoTranslationService.getCalendarLocaleSettings();
	}
	
	
}
