/**********************************************************************************************
Code generated with MKL Plug-in version: 22.2.3
Code generated at time stamp: 2019-09-11T06:23:59.879
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { PlanoConta } from './planoconta.model';
import { PlanoContaService } from './planoconta.service';
import { FinanceiroFluxoCaixaTranslationService } from './../i18n/financeiro-fluxocaixa-translation.service';

import { PlanoContaAutoComplete } from './../planoconta/planoconta.model';

import { TipoPlanoContaFinanceiro } from './../enums/financeiro-fluxocaixa-enums.model';

import { TipoReceitaDespesa } from './../enums/financeiro-fluxocaixa-enums.model';
import { MessageHandlerService } from 'src/app/core/message-handler.service';


@Component({
  selector: 'app-crud-planoconta.component',
  templateUrl: './crud-planoconta.component.html',
  styleUrls: ['./crud-planoconta.component.css']
})

export class PlanoContaComponent implements OnInit {
	planoConta = new PlanoConta();
	planoContaPlanoContaPaiAutoCompleteSuggestions: PlanoContaAutoComplete[];
	planoContaTipoFinanceiroOptions: TipoPlanoContaFinanceiro[];
	
	
	planoContaTipoReceitaDespesaOptions: TipoReceitaDespesa[];
	
	constructor(
	    private planoContaService: PlanoContaService,
	    private financeiroFluxoCaixaTranslationService: FinanceiroFluxoCaixaTranslationService,
	    private route: ActivatedRoute,
	    private messageHandler: MessageHandlerService
	) { 
		this.initializePlanoContaTipoFinanceiroOptions();
		
		this.initializePlanoContaTipoReceitaDespesaOptions();
	}
	
	ngOnInit() {
		this.initializeEnumFieldsWithDefault();
	    const id = this.route.snapshot.params['id'];
	    if (id) {
	      this.getPlanoContaById(id);
	    }
	}
	
	begin(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
	      this.planoConta = new PlanoConta();
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
		
	    this.planoContaService.create(this.planoConta)
	    .then((planoConta) => {
	      this.planoConta = planoConta;
	      this.messageHandler.showSuccess('Registro criado com sucesso!');
	    }).
	    catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	update() {
	    this.planoContaService.update(this.planoConta)
	    .then((planoConta) => {
	      this.planoConta = planoConta;
	      this.messageHandler.showSuccess('Registro alterado!');
	    })
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	getPlanoContaById(id: string) {
	    this.planoContaService.retrieve(id)
	    .then((planoConta) => this.planoConta = planoConta)
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	get isEditing() {
	    return Boolean(this.planoConta.id);
	}
	
	initializeEnumFieldsWithDefault() {
		this.planoConta.tipoReceitaDespesa = this.planoContaTipoReceitaDespesaOptions[1].value;
	}
	
	
	planoContaPlanoContaPaiAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.planoConta.planoContaPai = null;
	}
	
	planoContaPlanoContaPaiAutoCompleteOnBlur(event) {
		// Seems a PrimeNG bug, if clear an autocomplete field, on onBlur event, the null value is empty string.
		// Until PrimeNG version: 7.1.3.
		if (String(this.planoConta.planoContaPai) === '') {
			this.planoConta.planoContaPai = null;
		}
	}
	
	planoContaPlanoContaPaiAutoComplete(event) {
	    const query = event.query;
	    this.planoContaService
	      .planoContaPlanoContaPaiAutoComplete(query)
	      .then((result) => {
	        this.planoContaPlanoContaPaiAutoCompleteSuggestions = result as PlanoContaAutoComplete[];
	      })
	      .catch(error => {
	        this.messageHandler.showError(error);
	      });
	}
	
	planoContaPlanoContaPaiAutoCompleteFieldConverter(planoContaPai: PlanoContaAutoComplete) {
		let text = '';
		if (planoContaPai) {
			if (planoContaPai.descricao) {
			    if (text !== '') {
			      text += ' - ';
			    }
			    text += planoContaPai.descricao; 
			}
			
		}
		
		if (text === '') {
			text = null;
		}
		return text;
	}
	
	private initializePlanoContaTipoFinanceiroOptions() {
	    this.planoContaTipoFinanceiroOptions = [
	    	{ label: 'Selecione um item', value: null },
	    	{ label: this.getTranslation('financeiro.fluxo_caixa.planoConta_tipoFinanceiro_receita'), value: 'RECEITA' }, 
	    	{ label: this.getTranslation('financeiro.fluxo_caixa.planoConta_tipoFinanceiro_despesa'), value: 'DESPESA' }
	    ];
	}
	  
	private initializePlanoContaTipoReceitaDespesaOptions() {
	    this.planoContaTipoReceitaDespesaOptions = [
	    	{ label: 'Selecione um item', value: null },
	    	{ label: this.getTranslation('financeiro.fluxo_caixa.planoConta_tipoReceitaDespesa_variavel'), value: 'VARIAVEL' }, 
	    	{ label: this.getTranslation('financeiro.fluxo_caixa.planoConta_tipoReceitaDespesa_fixo'), value: 'FIXO' }
	    ];
	}
	  
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.financeiroFluxoCaixaTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	
	
	
	
}
