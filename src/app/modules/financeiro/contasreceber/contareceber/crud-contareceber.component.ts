/**********************************************************************************************
Code generated by MKL Plug-in
Copyright: Kerubin - kerubin.platform@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { ContaReceber } from './contareceber.model';
import { ContaReceberService } from './contareceber.service';
import { CustomContaReceberService } from './custom-contareceber.service';
import { FinanceiroContasReceberTranslationService } from './../i18n/financeiro-contasreceber-translation.service';
import * as moment from 'moment';

import { PlanoContaService } from './../planoconta/planoconta.service';
import { PlanoConta } from './../planoconta/planoconta.model';
import { PlanoContaAutoComplete } from './../planoconta/planoconta.model';

import { ContaBancariaService } from './../contabancaria/contabancaria.service';
import { ContaBancaria } from './../contabancaria/contabancaria.model';
import { ContaBancariaAutoComplete } from './../contabancaria/contabancaria.model';

import { CartaoCreditoService } from './../cartaocredito/cartaocredito.service';
import { CartaoCredito } from './../cartaocredito/cartaocredito.model';
import { CartaoCreditoAutoComplete } from './../cartaocredito/cartaocredito.model';

import { ClienteService } from './../cliente/cliente.service';
import { Cliente } from './../cliente/cliente.model';
import { ClienteAutoComplete } from './../cliente/cliente.model';

import { FormaPagamento } from './../enums/financeiro-contasreceber-enums.model';
import {SelectItem, ConfirmationService} from 'primeng/api';
import { MessageHandlerService } from 'src/app/core/message-handler.service';


@Component({
  selector: 'app-crud-contareceber',
  templateUrl: './crud-contareceber.component.html',
  styleUrls: ['./crud-contareceber.component.css']
})

export class ContaReceberComponent implements OnInit {
	showHideHelp = false; // for show/hide help.
	
	
	calendarLocale: any;
	
	 
	numberOfCopies = 1;
	copiesReferenceFieldInterval = 30;
	
	copiesReferenceFieldOptions: SelectItem[];
	copiesReferenceField: SelectItem = { label: 'Data de vencimento', value: 'dataVencimento' };
	copiesReferenceFieldSelected: SelectItem;
	 
	contaReceber = new ContaReceber();
	contaReceberPlanoContasAutoCompleteSuggestions: PlanoContaAutoComplete[];
	
	
	contaReceberContaBancariaAutoCompleteSuggestions: ContaBancariaAutoComplete[];
	
	
	contaReceberCartaoCreditoAutoCompleteSuggestions: CartaoCreditoAutoComplete[];
	
	
	contaReceberClienteAutoCompleteSuggestions: ClienteAutoComplete[];
	contaReceberFormaPagamentoOptions: FormaPagamento[];
	
	constructor(
	    private contaReceberService: ContaReceberService,
	    private customContaReceberService: CustomContaReceberService,
	    private financeiroContasReceberTranslationService: FinanceiroContasReceberTranslationService,
	    private planoContaService: PlanoContaService,
	    
	    
	    private contaBancariaService: ContaBancariaService,
	    
	    
	    private cartaoCreditoService: CartaoCreditoService,
	    
	    
	    private clienteService: ClienteService,
	    private route: ActivatedRoute,
	    private confirmation: ConfirmationService,
	    private messageHandler: MessageHandlerService
	) { 
		this.customContaReceberService.setComponent(this);
		
		// Begin custom action.
		if (!this.customContaReceberService.beforeConstructor()) {
			return;
		}
		// End custom action.
		
		this.initializeContaReceberFormaPagamentoOptions();
		this.initializeCopiesReferenceFieldOptions();
		
		// Begin custom action.
		if (!this.customContaReceberService.afterConstructor()) {
			return;
		}
		// End custom action.
		
	}
	
	ngOnInit() {
		
		// Begin custom action.
		if (!this.customContaReceberService.beforeOnInit()) {
			return;
		}
		// End custom action.
		
		this.initLocaleSettings();
		this.initializeEnumFieldsWithDefault();
	    const id = this.route.snapshot.params['id'];
	    if (id) {
	      this.getContaReceberById(id);
	    }
	    
	    // Begin custom action.
	    if (!this.customContaReceberService.afterOnInit()) {
	    	return;
	    }
	    // End custom action.
	    
	}
	
	getShowHideHelpLabel(): string {
		return this.showHideHelp ? 'Ocultar ajuda' : 'Mostrar ajuda';
	}
	
	begin(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
	    	
	    	// Begin custom action.
	    	if (!this.customContaReceberService.beforeOnNewRecord()) {
	    		return;
	    	}
	    	// End custom action.
	    	
	      this.contaReceber = new ContaReceber();
	      this.initializeEnumFieldsWithDefault();
		  
		  // Begin custom action.
		  if (!this.customContaReceberService.afterOnNewRecord()) {
		  	return;
		  }
		  // End custom action.
		  
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
		
		if (!this.doRulesFormBeforeSave()) {
			return;
		}
		
		
		// Begin custom action.
		if (!this.customContaReceberService.beforeSave()) {
			return;
		}
		// End custom action.
		
	    if (this.isEditing) {
	      this.update();
	    } else {
	      this.create();
	    }
		this.initializeCopiesReferenceFieldOptions();
		
		// Begin custom action.
		if (!this.customContaReceberService.afterSave()) {
			return;
		}
		// End custom action.
		
	}
	
	// Begin rulesFormBeforeSave
	doRulesFormBeforeSave(): boolean {
		
		if ((this.contaReceber.contaPaga) && !this.contaReceber.dataPagamento) {
			this.messageHandler.showError('A data do recebimento deve ser informada para receber a conta.');
			return false;
		}
		
		
		if ((this.contaReceber.contaPaga) && moment(this.contaReceber.dataPagamento).isAfter(moment({h: 0, m: 0, s: 0, ms: 0}), 'day')) {
			this.messageHandler.showError(`A data do recebimento não pode ser maior do que a data de hoje (${moment().format('DD/MM/YYYY')}).`);
			return false;
		}
		
		
		if ((this.contaReceber.contaPaga) && !this.contaReceber.valorPago) {
			this.messageHandler.showError('O valor total recebido deve ser informado para poder receber a conta.');
			return false;
		}
		
		return true;
	}
	// End rulesFormBeforeSave
	
	create() {
		
		// Begin custom action.
		if (!this.customContaReceberService.beforeCreate()) {
			return;
		}
		// End custom action.
		
		
	    this.contaReceberService.create(this.contaReceber)
	    .then((contaReceber) => {
	      this.contaReceber = contaReceber;
	      this.messageHandler.showSuccess('Registro criado com sucesso!');
	      
	      // Begin custom action.
	      if (!this.customContaReceberService.afterCreate()) {
	      	return;
	      }
	      // End custom action.
	      
	    }).
	    catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	update() {
		
		// Begin custom action.
		if (!this.customContaReceberService.beforeUpdate()) {
			return;
		}
		// End custom action.
		
	    this.contaReceberService.update(this.contaReceber)
	    .then((contaReceber) => {
	      this.contaReceber = contaReceber;
	      this.messageHandler.showSuccess('Registro alterado!');
	      
	      // Begin custom action.
	      if (!this.customContaReceberService.afterUpdate()) {
	      	return;
	      }
	      // End custom action.
	      
	    })
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	getContaReceberById(id: string) {
		
		// Begin custom action.
		if (!this.customContaReceberService.beforeGetById(id)) {
			return;
		}
		// End custom action.
		
	    this.contaReceberService.retrieve(id)
	    .then((contaReceber) => { 
	    	this.contaReceber = contaReceber;
	    	
	    	// Begin custom action.
	    	if (!this.customContaReceberService.afterGetById(id)) {
	    		return;
	    	}
	    	// End custom action.
	    	
	    })
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	get isEditing() {
	    return Boolean(this.contaReceber.id);
	}
	
	initializeEnumFieldsWithDefault() {
		this.contaReceber.formaPagamento = this.contaReceberFormaPagamentoOptions[1].value;
	}
	
	
	contaReceberPlanoContasAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.contaReceber.planoContas = null;
	}
	
	contaReceberPlanoContasAutoCompleteOnBlur(event) {
		// Seems a PrimeNG bug, if clear an autocomplete field, on onBlur event, the null value is empty string.
		// Until PrimeNG version: 7.1.3.
		if (String(this.contaReceber.planoContas) === '') {
			this.contaReceber.planoContas = null;
		}
	}
	
	contaReceberPlanoContasAutoComplete(event) {
	    const query = event.query;
	    this.contaReceberService
	      .planoContaPlanoContasAutoComplete(query)
	      .then((result) => {
	        this.contaReceberPlanoContasAutoCompleteSuggestions = result as PlanoContaAutoComplete[];
	      })
	      .catch(error => {
	        this.messageHandler.showError(error);
	      });
	}
	
	contaReceberPlanoContasAutoCompleteFieldConverter(planoContas: PlanoContaAutoComplete) {
		let text = '';
		if (planoContas) {
			if (planoContas.codigo) {
			    if (text !== '') {
			      text += ' - ';
			    }
			    text += planoContas.codigo; 
			}
			
			if (planoContas.descricao) {
			    if (text !== '') {
			      text += ' - ';
			    }
			    text += planoContas.descricao; 
			}
			
		}
		
		if (text === '') {
			text = null;
		}
		return text;
	}
	
	
	contaReceberContaBancariaAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.contaReceber.contaBancaria = null;
	}
	
	contaReceberContaBancariaAutoCompleteOnBlur(event) {
		// Seems a PrimeNG bug, if clear an autocomplete field, on onBlur event, the null value is empty string.
		// Until PrimeNG version: 7.1.3.
		if (String(this.contaReceber.contaBancaria) === '') {
			this.contaReceber.contaBancaria = null;
		}
	}
	
	contaReceberContaBancariaAutoComplete(event) {
	    const query = event.query;
	    this.contaReceberService
	      .contaBancariaContaBancariaAutoComplete(query)
	      .then((result) => {
	        this.contaReceberContaBancariaAutoCompleteSuggestions = result as ContaBancariaAutoComplete[];
	      })
	      .catch(error => {
	        this.messageHandler.showError(error);
	      });
	}
	
	contaReceberContaBancariaAutoCompleteFieldConverter(contaBancaria: ContaBancariaAutoComplete) {
		let text = '';
		if (contaBancaria) {
			if (contaBancaria.nomeTitular) {
			    if (text !== '') {
			      text += ' - ';
			    }
			    text += contaBancaria.nomeTitular; 
			}
			
			if (contaBancaria.numeroConta) {
			    if (text !== '') {
			      text += ' - ';
			    }
			    text += contaBancaria.numeroConta; 
			}
			
		}
		
		if (text === '') {
			text = null;
		}
		return text;
	}
	
	
	contaReceberCartaoCreditoAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.contaReceber.cartaoCredito = null;
	}
	
	contaReceberCartaoCreditoAutoCompleteOnBlur(event) {
		// Seems a PrimeNG bug, if clear an autocomplete field, on onBlur event, the null value is empty string.
		// Until PrimeNG version: 7.1.3.
		if (String(this.contaReceber.cartaoCredito) === '') {
			this.contaReceber.cartaoCredito = null;
		}
	}
	
	contaReceberCartaoCreditoAutoComplete(event) {
	    const query = event.query;
	    this.contaReceberService
	      .cartaoCreditoCartaoCreditoAutoComplete(query)
	      .then((result) => {
	        this.contaReceberCartaoCreditoAutoCompleteSuggestions = result as CartaoCreditoAutoComplete[];
	      })
	      .catch(error => {
	        this.messageHandler.showError(error);
	      });
	}
	
	contaReceberCartaoCreditoAutoCompleteFieldConverter(cartaoCredito: CartaoCreditoAutoComplete) {
		let text = '';
		if (cartaoCredito) {
			if (cartaoCredito.nomeTitular) {
			    if (text !== '') {
			      text += ' - ';
			    }
			    text += cartaoCredito.nomeTitular; 
			}
			
			if (cartaoCredito.numeroCartao) {
			    if (text !== '') {
			      text += ' - ';
			    }
			    text += cartaoCredito.numeroCartao; 
			}
			
		}
		
		if (text === '') {
			text = null;
		}
		return text;
	}
	
	
	contaReceberClienteAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.contaReceber.cliente = null;
	}
	
	contaReceberClienteAutoCompleteOnBlur(event) {
		// Seems a PrimeNG bug, if clear an autocomplete field, on onBlur event, the null value is empty string.
		// Until PrimeNG version: 7.1.3.
		if (String(this.contaReceber.cliente) === '') {
			this.contaReceber.cliente = null;
		}
	}
	
	contaReceberClienteAutoComplete(event) {
	    const query = event.query;
	    this.contaReceberService
	      .clienteClienteAutoComplete(query)
	      .then((result) => {
	        this.contaReceberClienteAutoCompleteSuggestions = result as ClienteAutoComplete[];
	      })
	      .catch(error => {
	        this.messageHandler.showError(error);
	      });
	}
	
	contaReceberClienteAutoCompleteFieldConverter(cliente: ClienteAutoComplete) {
		let text = '';
		if (cliente) {
			if (cliente.nome) {
			    if (text !== '') {
			      text += ' - ';
			    }
			    text += cliente.nome; 
			}
			
		}
		
		if (text === '') {
			text = null;
		}
		return text;
	}
	
	private initializeContaReceberFormaPagamentoOptions() {
	    this.contaReceberFormaPagamentoOptions = [
	    	{ label: 'Selecione um item', value: null },
	    	{ label: this.getTranslation('financeiro.contas_receber.contaReceber_formaPagamento_dinheiro'), value: 'DINHEIRO' }, 
	    	{ label: this.getTranslation('financeiro.contas_receber.contaReceber_formaPagamento_conta_bancaria'), value: 'CONTA_BANCARIA' }, 
	    	{ label: this.getTranslation('financeiro.contas_receber.contaReceber_formaPagamento_cartao_credito'), value: 'CARTAO_CREDITO' }, 
	    	{ label: this.getTranslation('financeiro.contas_receber.contaReceber_formaPagamento_vale_refeicao'), value: 'VALE_REFEICAO' }, 
	    	{ label: this.getTranslation('financeiro.contas_receber.contaReceber_formaPagamento_vale_alimentacao'), value: 'VALE_ALIMENTACAO' }, 
	    	{ label: this.getTranslation('financeiro.contas_receber.contaReceber_formaPagamento_cheque'), value: 'CHEQUE' }, 
	    	{ label: this.getTranslation('financeiro.contas_receber.contaReceber_formaPagamento_outros'), value: 'OUTROS' }
	    ];
	}
	  
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.financeiroContasReceberTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	
	actionMakeCopiesHiddeWhen(): boolean {
		const expression = ((this.contaReceber.maisOpcoes === false) || (this.contaReceber.contaPaga));
		return expression;
	}
	
	actionFazerCopiasContaReceberHelp(): string {
		return this.customContaReceberService.actionFazerCopiasContaReceberHelp();
	}
	
	actionFazerCopiasContaReceber(form: FormControl) {
	      if (!this.contaReceber.agrupador) {
	        this.messageHandler.showError('Campo \'Identificador para agrupamento da conta\' deve ser informado para gerar cópias.');
	        return;
	      }
	      
	      if (!this.contaReceber.dataVencimento) {
	        this.messageHandler.showError('Campo \'Data de vencimento\' deve ser informado para gerar cópias.');
	        return;
	      }
	      
	      // Begin custom action.
	      if (!this.customContaReceberService.beforeActionFazerCopiasContaReceber()) {
	      	return;
	      }
	      // End custom action.
	      
	      // Begin validation for past dates
	      const dataVencimentoFirstCopy = moment(this.contaReceber.dataVencimento).add(1, 'month');
	      const today = moment();
	      if (dataVencimentoFirstCopy.isBefore(today)) {
			const dataVencimentoFirstCopyStr = dataVencimentoFirstCopy.format('DD/MM/YYYY');
			const dataVencimentoStr = moment(this.contaReceber.dataVencimento).format('DD/MM/YYYY');
			this.confirmation.confirm({
			  message: `Baseado na data de data de vencimento da conta atual (<strong>${dataVencimentoStr}</strong>),
			  a primeira cópia da conta terá data de data de vencimento no passado (<strong>${dataVencimentoFirstCopyStr}</strong>).
			  <br>Deseja continuar mesmo assim?`,
			  accept: () => {
			    ///
			    this.contaReceberService.actionFazerCopiasContaReceber(this.contaReceber.id, this.numberOfCopies,
					this.copiesReferenceFieldInterval, this.contaReceber.agrupador)
			    	.then(() => {
			    		this.messageHandler.showSuccess('Operação realizada com sucesso!');
			    		
			    		// Begin custom action.
			    		if (!this.customContaReceberService.afterActionFazerCopiasContaReceber()) {
			    			return;
			    		}
			    		// End custom action.
			    		
			    	}).
			    	catch(error => {
				    	const message =  JSON.parse(error._body).message || 'Não foi possível realizar a operação';
				    	console.log(error);
				      	this.messageHandler.showError(message);
			  		});
			  }
			});
	      
	      	return;
	      }
	      // End validation
	      this.contaReceberService.actionFazerCopiasContaReceber(this.contaReceber.id, this.numberOfCopies,
	        this.copiesReferenceFieldInterval, this.contaReceber.agrupador)
		    .then(() => {
	        	this.messageHandler.showSuccess('Operação realizada com sucesso!');
		  		
		  		// Begin custom action.
		  		if (!this.customContaReceberService.afterActionFazerCopiasContaReceber()) {
		  			return;
		  		}
		  		// End custom action.
		  		
		    }).
		    catch(error => {
	        	const message =  JSON.parse(error._body).message || 'Não foi possível realizar a operação';
	        	console.log(error);
		      	this.messageHandler.showError(message);
		  });
	}
	 
	initializeCopiesReferenceFieldOptions() {
	    this.copiesReferenceFieldOptions = [
	      this.copiesReferenceField
	    ];
	
	    this.copiesReferenceFieldSelected = this.copiesReferenceField;
	    
	    this.numberOfCopies = 1;
	    this.copiesReferenceFieldInterval = 30;
	}
	
	
										
	// Begin RuleWithSlotAppyHiddeComponent 
	
	ruleNumDocumentoAppyHiddeComponent() {
		const expression = (!this.contaReceber.maisOpcoes);
		if (expression) {
			return 'none'; // Will hidde de component.
		} else {
			return 'inline'; // Default css show element value.
		}
	}
	
	ruleObservacoesAppyHiddeComponent() {
		const expression = (!this.contaReceber.maisOpcoes);
		if (expression) {
			return 'none'; // Will hidde de component.
		} else {
			return 'inline'; // Default css show element value.
		}
	}
	
	ruleAgrupadorAppyHiddeComponent() {
		const expression = (!this.contaReceber.maisOpcoes);
		if (expression) {
			return 'none'; // Will hidde de component.
		} else {
			return 'inline'; // Default css show element value.
		}
	}
	
	ruleDataPagamentoAppyHiddeComponent() {
		const expression = (!this.contaReceber.contaPaga);
		if (expression) {
			return 'none'; // Will hidde de component.
		} else {
			return 'inline'; // Default css show element value.
		}
	}
	
	ruleValorDescontoAppyHiddeComponent() {
		const expression = (!this.contaReceber.contaPaga);
		if (expression) {
			return 'none'; // Will hidde de component.
		} else {
			return 'inline'; // Default css show element value.
		}
	}
	
	ruleValorMultaAppyHiddeComponent() {
		const expression = (!this.contaReceber.contaPaga);
		if (expression) {
			return 'none'; // Will hidde de component.
		} else {
			return 'inline'; // Default css show element value.
		}
	}
	
	ruleValorJurosAppyHiddeComponent() {
		const expression = (!this.contaReceber.contaPaga);
		if (expression) {
			return 'none'; // Will hidde de component.
		} else {
			return 'inline'; // Default css show element value.
		}
	}
	
	ruleValorAcrescimosAppyHiddeComponent() {
		const expression = (!this.contaReceber.contaPaga);
		if (expression) {
			return 'none'; // Will hidde de component.
		} else {
			return 'inline'; // Default css show element value.
		}
	}
	
	ruleValorPagoAppyHiddeComponent() {
		const expression = (!this.contaReceber.contaPaga);
		if (expression) {
			return 'none'; // Will hidde de component.
		} else {
			return 'inline'; // Default css show element value.
		}
	}
	
	ruleContaBancariaAppyHiddeComponent() {
		const expression = (String(this.contaReceber.formaPagamento) !== 'CONTA_BANCARIA');
		if (expression) {
			return 'none'; // Will hidde de component.
		} else {
			return 'inline'; // Default css show element value.
		}
	}
	
	ruleCartaoCreditoAppyHiddeComponent() {
		const expression = (String(this.contaReceber.formaPagamento) !== 'CARTAO_CREDITO');
		if (expression) {
			return 'none'; // Will hidde de component.
		} else {
			return 'inline'; // Default css show element value.
		}
	}
	
	ruleOutrosDescricaoAppyHiddeComponent() {
		const expression = (String(this.contaReceber.formaPagamento) === 'CONTA_BANCARIA') || (String(this.contaReceber.formaPagamento) === 'CARTAO_CREDITO');
		if (expression) {
			return 'none'; // Will hidde de component.
		} else {
			return 'inline'; // Default css show element value.
		}
	}
	
	ruleIdConcBancariaAppyHiddeComponent() {
		const expression = (!this.contaReceber.maisOpcoes) || (!this.contaReceber.idConcBancaria || this.contaReceber.idConcBancaria.trim().length === 0);
		if (expression) {
			return 'none'; // Will hidde de component.
		} else {
			return 'inline'; // Default css show element value.
		}
	}
	
	ruleNumDocConcBancariaAppyHiddeComponent() {
		const expression = (!this.contaReceber.maisOpcoes) || (!this.contaReceber.numDocConcBancaria || this.contaReceber.numDocConcBancaria.trim().length === 0);
		if (expression) {
			return 'none'; // Will hidde de component.
		} else {
			return 'inline'; // Default css show element value.
		}
	}
	
	ruleHistConcBancariaAppyHiddeComponent() {
		const expression = (!this.contaReceber.maisOpcoes) || (!this.contaReceber.numDocConcBancaria || this.contaReceber.numDocConcBancaria.trim().length === 0);
		if (expression) {
			return 'none'; // Will hidde de component.
		} else {
			return 'inline'; // Default css show element value.
		}
	}
	// End Begin RuleWithSlotAppyHiddeComponent
	
	
										
	// Begin RulesWithSlotAppyMathExpression 
	
	ruleContaReceberValorPagoOnAppyMathExpression(event) {
		if (this.contaReceber) {
			const whenExpression = this.contaReceber.dataPagamento;
			if (whenExpression) {
				this.contaReceber.valorPago = ((this.contaReceber.valor || 0) -
				(this.contaReceber.valorDesconto || 0) +
				(this.contaReceber.valorMulta || 0) +
				(this.contaReceber.valorJuros || 0) +
				(this.contaReceber.valorAcrescimos || 0));
			}
		}
	}
	// End Begin RulesWithSlotAppyMathExpression
	
	
	initLocaleSettings() {
		this.calendarLocale = this.financeiroContasReceberTranslationService.getCalendarLocaleSettings();
	}
	
	
	
	contaPagaChange(event: any) {
		
		// Begin custom action.
		this.customContaReceberService.beforeContaPagaChange(event);
		// End custom action.
		
	}
}
