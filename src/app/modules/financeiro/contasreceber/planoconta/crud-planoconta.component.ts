/**********************************************************************************************
Code generated with MKL Plug-in version: 7.0.0
Code generated at time stamp: 2019-07-15T07:31:32.718
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { PlanoConta } from './planoconta.model';
import { PlanoContaService } from './planoconta.service';
import { FinanceiroContasReceberTranslationService } from './../i18n/financeiro-contasreceber-translation.service';

import { PlanoContaAutoComplete } from './../planoconta/planoconta.model';

import { TipoPlanoContaFinanceiro } from './../enums/financeiro-contasreceber-enums.model';

import { TipoReceitaDespesa } from './../enums/financeiro-contasreceber-enums.model';
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
	    private financeiroContasReceberTranslationService: FinanceiroContasReceberTranslationService,
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
		this.planoConta.tipoReceitaDespesa = this.planoContaTipoReceitaDespesaOptions[0].value;
	}
	
	
	planoContaPlanoContaPaiAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.planoConta.planoContaPai = null;
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
		if (planoContaPai) {
			return (planoContaPai.descricao || '<nulo>');
		} else {
			return null;
		}
	}
	
	private initializePlanoContaTipoFinanceiroOptions() {
	    this.planoContaTipoFinanceiroOptions = [
	    	{ label: this.getTranslation('financeiro.contas_receber.planoConta_tipoFinanceiro_receita'), value: 'RECEITA' }, 
	    	{ label: this.getTranslation('financeiro.contas_receber.planoConta_tipoFinanceiro_despesa'), value: 'DESPESA' }
	    ];
	}
	  
	private initializePlanoContaTipoReceitaDespesaOptions() {
	    this.planoContaTipoReceitaDespesaOptions = [
	    	{ label: this.getTranslation('financeiro.contas_receber.planoConta_tipoReceitaDespesa_variavel'), value: 'VARIAVEL' }, 
	    	{ label: this.getTranslation('financeiro.contas_receber.planoConta_tipoReceitaDespesa_fixo'), value: 'FIXO' }
	    ];
	}
	  
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.financeiroContasReceberTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	
	
}
