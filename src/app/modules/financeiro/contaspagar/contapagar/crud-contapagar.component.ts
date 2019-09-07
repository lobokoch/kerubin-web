/**********************************************************************************************
Code generated with MKL Plug-in version: 22.0.6
Code generated at time stamp: 2019-09-07T12:25:54.827
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { ContaPagar } from './contapagar.model';
import { ContaPagarService } from './contapagar.service';
import { FinanceiroContasPagarTranslationService } from './../i18n/financeiro-contaspagar-translation.service';
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

import { FornecedorService } from './../fornecedor/fornecedor.service';
import { Fornecedor } from './../fornecedor/fornecedor.model';
import { FornecedorAutoComplete } from './../fornecedor/fornecedor.model';

import { FormaPagamento } from './../enums/financeiro-contaspagar-enums.model';
import {SelectItem} from 'primeng/api';
import { MessageHandlerService } from 'src/app/core/message-handler.service';


@Component({
  selector: 'app-crud-contapagar.component',
  templateUrl: './crud-contapagar.component.html',
  styleUrls: ['./crud-contapagar.component.css']
})

export class ContaPagarComponent implements OnInit {
	
	calendarLocale: any;
	
	 
	numberOfCopies = 1;
	copiesReferenceFieldInterval = 30;
	
	copiesReferenceFieldOptions: SelectItem[];
	copiesReferenceField: SelectItem = { label: 'Vencimento', value: 'dataVencimento' };
	copiesReferenceFieldSelected: SelectItem;
	 
	contaPagar = new ContaPagar();
	contaPagarPlanoContasAutoCompleteSuggestions: PlanoContaAutoComplete[];
	
	
	contaPagarContaBancariaAutoCompleteSuggestions: ContaBancariaAutoComplete[];
	
	
	contaPagarCartaoCreditoAutoCompleteSuggestions: CartaoCreditoAutoComplete[];
	
	
	contaPagarFornecedorAutoCompleteSuggestions: FornecedorAutoComplete[];
	contaPagarFormaPagamentoOptions: FormaPagamento[];
	
	constructor(
	    private contaPagarService: ContaPagarService,
	    private financeiroContasPagarTranslationService: FinanceiroContasPagarTranslationService,
	    private planoContaService: PlanoContaService,
	    
	    
	    private contaBancariaService: ContaBancariaService,
	    
	    
	    private cartaoCreditoService: CartaoCreditoService,
	    
	    
	    private fornecedorService: FornecedorService,
	    private route: ActivatedRoute,
	    private messageHandler: MessageHandlerService
	) { 
		this.initializeContaPagarFormaPagamentoOptions();
		this.initializeCopiesReferenceFieldOptions();
	}
	
	ngOnInit() {
		this.initLocaleSettings();
		this.initializeEnumFieldsWithDefault();
	    const id = this.route.snapshot.params['id'];
	    if (id) {
	      this.getContaPagarById(id);
	    }
	}
	
	begin(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
	      this.contaPagar = new ContaPagar();
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
		this.initializeCopiesReferenceFieldOptions();
	}
	
	create() {
		
	    this.contaPagarService.create(this.contaPagar)
	    .then((contaPagar) => {
	      this.contaPagar = contaPagar;
	      this.messageHandler.showSuccess('Registro criado com sucesso!');
	    }).
	    catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	update() {
	    this.contaPagarService.update(this.contaPagar)
	    .then((contaPagar) => {
	      this.contaPagar = contaPagar;
	      this.messageHandler.showSuccess('Registro alterado!');
	    })
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	getContaPagarById(id: string) {
	    this.contaPagarService.retrieve(id)
	    .then((contaPagar) => this.contaPagar = contaPagar)
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	get isEditing() {
	    return Boolean(this.contaPagar.id);
	}
	
	initializeEnumFieldsWithDefault() {
		this.contaPagar.formaPagamento = this.contaPagarFormaPagamentoOptions[1].value;
	}
	
	
	contaPagarPlanoContasAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.contaPagar.planoContas = null;
	}
	
	contaPagarPlanoContasAutoCompleteOnBlur(event) {
		// Seems a PrimeNG bug, if clear an autocomplete field, on onBlur event, the null value is empty string.
		// Until PrimeNG version: 7.1.3.
		if (String(this.contaPagar.planoContas) === '') {
			this.contaPagar.planoContas = null;
		}
	}
	
	contaPagarPlanoContasAutoComplete(event) {
	    const query = event.query;
	    this.contaPagarService
	      .planoContaPlanoContasAutoComplete(query)
	      .then((result) => {
	        this.contaPagarPlanoContasAutoCompleteSuggestions = result as PlanoContaAutoComplete[];
	      })
	      .catch(error => {
	        this.messageHandler.showError(error);
	      });
	}
	
	contaPagarPlanoContasAutoCompleteFieldConverter(planoContas: PlanoContaAutoComplete) {
		let text = '';
		if (planoContas) {
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
	
	
	contaPagarContaBancariaAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.contaPagar.contaBancaria = null;
	}
	
	contaPagarContaBancariaAutoCompleteOnBlur(event) {
		// Seems a PrimeNG bug, if clear an autocomplete field, on onBlur event, the null value is empty string.
		// Until PrimeNG version: 7.1.3.
		if (String(this.contaPagar.contaBancaria) === '') {
			this.contaPagar.contaBancaria = null;
		}
	}
	
	contaPagarContaBancariaAutoComplete(event) {
	    const query = event.query;
	    this.contaPagarService
	      .contaBancariaContaBancariaAutoComplete(query)
	      .then((result) => {
	        this.contaPagarContaBancariaAutoCompleteSuggestions = result as ContaBancariaAutoComplete[];
	      })
	      .catch(error => {
	        this.messageHandler.showError(error);
	      });
	}
	
	contaPagarContaBancariaAutoCompleteFieldConverter(contaBancaria: ContaBancariaAutoComplete) {
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
	
	
	contaPagarCartaoCreditoAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.contaPagar.cartaoCredito = null;
	}
	
	contaPagarCartaoCreditoAutoCompleteOnBlur(event) {
		// Seems a PrimeNG bug, if clear an autocomplete field, on onBlur event, the null value is empty string.
		// Until PrimeNG version: 7.1.3.
		if (String(this.contaPagar.cartaoCredito) === '') {
			this.contaPagar.cartaoCredito = null;
		}
	}
	
	contaPagarCartaoCreditoAutoComplete(event) {
	    const query = event.query;
	    this.contaPagarService
	      .cartaoCreditoCartaoCreditoAutoComplete(query)
	      .then((result) => {
	        this.contaPagarCartaoCreditoAutoCompleteSuggestions = result as CartaoCreditoAutoComplete[];
	      })
	      .catch(error => {
	        this.messageHandler.showError(error);
	      });
	}
	
	contaPagarCartaoCreditoAutoCompleteFieldConverter(cartaoCredito: CartaoCreditoAutoComplete) {
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
	
	
	contaPagarFornecedorAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.contaPagar.fornecedor = null;
	}
	
	contaPagarFornecedorAutoCompleteOnBlur(event) {
		// Seems a PrimeNG bug, if clear an autocomplete field, on onBlur event, the null value is empty string.
		// Until PrimeNG version: 7.1.3.
		if (String(this.contaPagar.fornecedor) === '') {
			this.contaPagar.fornecedor = null;
		}
	}
	
	contaPagarFornecedorAutoComplete(event) {
	    const query = event.query;
	    this.contaPagarService
	      .fornecedorFornecedorAutoComplete(query)
	      .then((result) => {
	        this.contaPagarFornecedorAutoCompleteSuggestions = result as FornecedorAutoComplete[];
	      })
	      .catch(error => {
	        this.messageHandler.showError(error);
	      });
	}
	
	contaPagarFornecedorAutoCompleteFieldConverter(fornecedor: FornecedorAutoComplete) {
		let text = '';
		if (fornecedor) {
			if (fornecedor.nome) {
			    if (text !== '') {
			      text += ' - ';
			    }
			    text += fornecedor.nome; 
			}
			
		}
		
		if (text === '') {
			text = null;
		}
		return text;
	}
	
	private initializeContaPagarFormaPagamentoOptions() {
	    this.contaPagarFormaPagamentoOptions = [
	    	{ label: 'Selecione um item', value: null },
	    	{ label: this.getTranslation('financeiro.contas_pagar.contaPagar_formaPagamento_dinheiro'), value: 'DINHEIRO' }, 
	    	{ label: this.getTranslation('financeiro.contas_pagar.contaPagar_formaPagamento_conta_bancaria'), value: 'CONTA_BANCARIA' }, 
	    	{ label: this.getTranslation('financeiro.contas_pagar.contaPagar_formaPagamento_cartao_credito'), value: 'CARTAO_CREDITO' }, 
	    	{ label: this.getTranslation('financeiro.contas_pagar.contaPagar_formaPagamento_vale_refeicao'), value: 'VALE_REFEICAO' }, 
	    	{ label: this.getTranslation('financeiro.contas_pagar.contaPagar_formaPagamento_vale_alimentacao'), value: 'VALE_ALIMENTACAO' }, 
	    	{ label: this.getTranslation('financeiro.contas_pagar.contaPagar_formaPagamento_cheque'), value: 'CHEQUE' }, 
	    	{ label: this.getTranslation('financeiro.contas_pagar.contaPagar_formaPagamento_outros'), value: 'OUTROS' }
	    ];
	}
	  
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.financeiroContasPagarTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	
	actionFazerCopiasContaPagar(form: FormControl) {
	      if (!this.contaPagar.agrupador) {
	        // this.copiesMustHaveGroup = true;
	        this.messageHandler.showError('Campo \'Agrupador\' deve ser informado para gerar cópias.');
	        return;
	      }
	      // this.copiesMustHaveGroup = false;
	
	      this.contaPagarService.actionFazerCopiasContaPagar(this.contaPagar.id, this.numberOfCopies,
	        this.copiesReferenceFieldInterval, this.contaPagar.agrupador)
		    .then(() => {
	        // this.copiesMustHaveGroup = false;
	        this.messageHandler.showSuccess('Operação realizada com sucesso!');
		    }).
		    catch(error => {
	        // this.copiesMustHaveGroup = false;
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
	
										
	// Begin RuleWithSlotAppyStyleClass 
	ruleContaBancariaAppyStyleClass() {
		const expression = (String(this.contaPagar.formaPagamento) !== 'CONTA_BANCARIA');
		if (expression) {
			return 'hidden';
		} else {
			return '';
		}
		
	}
	ruleCartaoCreditoAppyStyleClass() {
		const expression = (String(this.contaPagar.formaPagamento) !== 'CARTAO_CREDITO');
		if (expression) {
			return 'hidden';
		} else {
			return '';
		}
		
	}
	ruleOutrosDescricaoAppyStyleClass() {
		const expression = (String(this.contaPagar.formaPagamento) === 'CONTA_BANCARIA') || (String(this.contaPagar.formaPagamento) === 'CARTAO_CREDITO');
		if (expression) {
			return 'hidden';
		} else {
			return '';
		}
		
	}
	// End Begin RuleWithSlotAppyStyleClass
	
										
	// Begin RulesWithSlotAppyMathExpression 
	ruleContaPagarValorPagoOnAppyMathExpression(event) {
		if (this.contaPagar) {
			const whenExpression = this.contaPagar.dataPagamento !== null;
			if (whenExpression) {
				this.contaPagar.valorPago = (Number(this.contaPagar.valor) -
				Number(this.contaPagar.valorDesconto) +
				Number(this.contaPagar.valorMulta) +
				Number(this.contaPagar.valorJuros) +
				Number(this.contaPagar.valorAcrescimos));
			}
		}
		
	}
	// End Begin RulesWithSlotAppyMathExpression
	
	
	initLocaleSettings() {
		this.calendarLocale = this.financeiroContasPagarTranslationService.getCalendarLocaleSettings();
	}
	
}
