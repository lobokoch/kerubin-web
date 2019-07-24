/**********************************************************************************************
Code generated with MKL Plug-in version: 7.0.3
Code generated at time stamp: 2019-07-24T07:02:34.124
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { CaixaLancamento } from './caixalancamento.model';
import { CaixaLancamentoService } from './caixalancamento.service';
import { FinanceiroFluxoCaixaTranslationService } from './../i18n/financeiro-fluxocaixa-translation.service';
import * as moment from 'moment';

import { CaixaDiarioService } from './../caixadiario/caixadiario.service';
import { CaixaDiario } from './../caixadiario/caixadiario.model';
import { CaixaDiarioAutoComplete } from './../caixadiario/caixadiario.model';

import { ContaBancariaService } from './../contabancaria/contabancaria.service';
import { ContaBancaria } from './../contabancaria/contabancaria.model';
import { ContaBancariaAutoComplete } from './../contabancaria/contabancaria.model';

import { CartaoCreditoService } from './../cartaocredito/cartaocredito.service';
import { CartaoCredito } from './../cartaocredito/cartaocredito.model';
import { CartaoCreditoAutoComplete } from './../cartaocredito/cartaocredito.model';

import { PlanoContaService } from './../planoconta/planoconta.service';
import { PlanoConta } from './../planoconta/planoconta.model';
import { PlanoContaAutoComplete } from './../planoconta/planoconta.model';

import { ClienteService } from './../cliente/cliente.service';
import { Cliente } from './../cliente/cliente.model';
import { ClienteAutoComplete } from './../cliente/cliente.model';

import { FornecedorService } from './../fornecedor/fornecedor.service';
import { Fornecedor } from './../fornecedor/fornecedor.model';
import { FornecedorAutoComplete } from './../fornecedor/fornecedor.model';

import { TipoLancamentoFinanceiro } from './../enums/financeiro-fluxocaixa-enums.model';

import { FormaPagamento } from './../enums/financeiro-fluxocaixa-enums.model';

import { TipoFonteMovimento } from './../enums/financeiro-fluxocaixa-enums.model';
import { MessageHandlerService } from 'src/app/core/message-handler.service';


@Component({
  selector: 'app-crud-caixalancamento.component',
  templateUrl: './crud-caixalancamento.component.html',
  styleUrls: ['./crud-caixalancamento.component.css']
})

export class CaixaLancamentoComponent implements OnInit {
	
	calendarLocale: any;
	
	caixaLancamento = new CaixaLancamento();
	caixaLancamentoCaixaDiarioAutoCompleteSuggestions: CaixaDiarioAutoComplete[];
	
	
	caixaLancamentoContaBancariaAutoCompleteSuggestions: ContaBancariaAutoComplete[];
	
	
	caixaLancamentoCartaoCreditoAutoCompleteSuggestions: CartaoCreditoAutoComplete[];
	
	
	caixaLancamentoPlanoContasAutoCompleteSuggestions: PlanoContaAutoComplete[];
	
	
	caixaLancamentoClienteAutoCompleteSuggestions: ClienteAutoComplete[];
	
	
	caixaLancamentoFornecedorAutoCompleteSuggestions: FornecedorAutoComplete[];
	caixaLancamentoTipoLancamentoFinanceiroOptions: TipoLancamentoFinanceiro[];
	
	
	caixaLancamentoFormaPagamentoOptions: FormaPagamento[];
	
	
	caixaLancamentoTipoFonteMovimentoOptions: TipoFonteMovimento[];
	
	constructor(
	    private caixaLancamentoService: CaixaLancamentoService,
	    private financeiroFluxoCaixaTranslationService: FinanceiroFluxoCaixaTranslationService,
	    private caixaDiarioService: CaixaDiarioService,
	    
	    
	    private contaBancariaService: ContaBancariaService,
	    
	    
	    private cartaoCreditoService: CartaoCreditoService,
	    
	    
	    private planoContaService: PlanoContaService,
	    
	    
	    private clienteService: ClienteService,
	    
	    
	    private fornecedorService: FornecedorService,
	    private route: ActivatedRoute,
	    private messageHandler: MessageHandlerService
	) { 
		this.initializeCaixaLancamentoTipoLancamentoFinanceiroOptions();
		
		this.initializeCaixaLancamentoFormaPagamentoOptions();
		
		this.initializeCaixaLancamentoTipoFonteMovimentoOptions();
	}
	
	ngOnInit() {
		this.initLocaleSettings();
		this.rulesOnInit();
		
		this.initializeEnumFieldsWithDefault();
	    const id = this.route.snapshot.params['id'];
	    if (id) {
	      this.getCaixaLancamentoById(id);
	    }
	}
	
	begin(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
	      this.caixaLancamento = new CaixaLancamento();
	      this.rulesOnInit();
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
		
	    this.caixaLancamentoService.create(this.caixaLancamento)
	    .then((caixaLancamento) => {
	      this.caixaLancamento = caixaLancamento;
	      this.messageHandler.showSuccess('Registro criado com sucesso!');
	    }).
	    catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	update() {
	    this.caixaLancamentoService.update(this.caixaLancamento)
	    .then((caixaLancamento) => {
	      this.caixaLancamento = caixaLancamento;
	      this.messageHandler.showSuccess('Registro alterado!');
	    })
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	getCaixaLancamentoById(id: string) {
	    this.caixaLancamentoService.retrieve(id)
	    .then((caixaLancamento) => this.caixaLancamento = caixaLancamento)
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	get isEditing() {
	    return Boolean(this.caixaLancamento.id);
	}
	
	initializeEnumFieldsWithDefault() {
		this.caixaLancamento.tipoLancamentoFinanceiro = this.caixaLancamentoTipoLancamentoFinanceiroOptions[1].value;
		this.caixaLancamento.formaPagamento = this.caixaLancamentoFormaPagamentoOptions[0].value;
		this.caixaLancamento.tipoFonteMovimento = this.caixaLancamentoTipoFonteMovimentoOptions[0].value;
	}
	
	
	caixaLancamentoCaixaDiarioAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.caixaLancamento.caixaDiario = null;
	}
	
	caixaLancamentoCaixaDiarioAutoCompleteOnBlur(event) {
		// Seems a PrimeNG bug, if clear an autocomplete field, on onBlur event, the null value is empty string.
		// Until PrimeNG version: 7.1.3.
		if (String(this.caixaLancamento.caixaDiario) === '') {
			this.caixaLancamento.caixaDiario = null;
		}
	}
	
	caixaLancamentoCaixaDiarioAutoComplete(event) {
	    const query = event.query;
	    this.caixaLancamentoService
	      .caixaDiarioCaixaDiarioAutoComplete(query)
	      .then((result) => {
	        this.caixaLancamentoCaixaDiarioAutoCompleteSuggestions = result as CaixaDiarioAutoComplete[];
	      })
	      .catch(error => {
	        this.messageHandler.showError(error);
	      });
	}
	
	caixaLancamentoCaixaDiarioAutoCompleteFieldConverter(caixaDiario: CaixaDiarioAutoComplete) {
		let text = '';
		if (caixaDiario) {
			if (caixaDiario.caixa.nome) {
			    if (text !== '') {
			      text += ' - ';
			    }
			    text += caixaDiario.caixa.nome; 
			}
			
			if (caixaDiario.dataHoraAbertura) {
			    if (text !== '') {
			      text += ' - ';
			    }
			    text += moment(caixaDiario.dataHoraAbertura).format('DD/MM/YYYY H:m'); 
			}
			
		}
		
		if (text === '') {
			text = null;
		}
		return text;
	}
	
	
	caixaLancamentoContaBancariaAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.caixaLancamento.contaBancaria = null;
	}
	
	caixaLancamentoContaBancariaAutoCompleteOnBlur(event) {
		// Seems a PrimeNG bug, if clear an autocomplete field, on onBlur event, the null value is empty string.
		// Until PrimeNG version: 7.1.3.
		if (String(this.caixaLancamento.contaBancaria) === '') {
			this.caixaLancamento.contaBancaria = null;
		}
	}
	
	caixaLancamentoContaBancariaAutoComplete(event) {
	    const query = event.query;
	    this.caixaLancamentoService
	      .contaBancariaContaBancariaAutoComplete(query)
	      .then((result) => {
	        this.caixaLancamentoContaBancariaAutoCompleteSuggestions = result as ContaBancariaAutoComplete[];
	      })
	      .catch(error => {
	        this.messageHandler.showError(error);
	      });
	}
	
	caixaLancamentoContaBancariaAutoCompleteFieldConverter(contaBancaria: ContaBancariaAutoComplete) {
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
	
	
	caixaLancamentoCartaoCreditoAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.caixaLancamento.cartaoCredito = null;
	}
	
	caixaLancamentoCartaoCreditoAutoCompleteOnBlur(event) {
		// Seems a PrimeNG bug, if clear an autocomplete field, on onBlur event, the null value is empty string.
		// Until PrimeNG version: 7.1.3.
		if (String(this.caixaLancamento.cartaoCredito) === '') {
			this.caixaLancamento.cartaoCredito = null;
		}
	}
	
	caixaLancamentoCartaoCreditoAutoComplete(event) {
	    const query = event.query;
	    this.caixaLancamentoService
	      .cartaoCreditoCartaoCreditoAutoComplete(query)
	      .then((result) => {
	        this.caixaLancamentoCartaoCreditoAutoCompleteSuggestions = result as CartaoCreditoAutoComplete[];
	      })
	      .catch(error => {
	        this.messageHandler.showError(error);
	      });
	}
	
	caixaLancamentoCartaoCreditoAutoCompleteFieldConverter(cartaoCredito: CartaoCreditoAutoComplete) {
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
	
	
	caixaLancamentoPlanoContasAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.caixaLancamento.planoContas = null;
	}
	
	caixaLancamentoPlanoContasAutoCompleteOnBlur(event) {
		// Seems a PrimeNG bug, if clear an autocomplete field, on onBlur event, the null value is empty string.
		// Until PrimeNG version: 7.1.3.
		if (String(this.caixaLancamento.planoContas) === '') {
			this.caixaLancamento.planoContas = null;
		}
	}
	
	caixaLancamentoPlanoContasAutoComplete(event) {
		const caixaLancamento = (JSON.parse(JSON.stringify(this.caixaLancamento)));
		if (String(caixaLancamento.planoContas === '')) {
			caixaLancamento.planoContas = null;
		}
	    const query = event.query;
	    this.caixaLancamentoService
	      .planoContaPlanoContasAutoComplete(query, caixaLancamento)
	      .then((result) => {
	        this.caixaLancamentoPlanoContasAutoCompleteSuggestions = result as PlanoContaAutoComplete[];
	      })
	      .catch(error => {
	        this.messageHandler.showError(error);
	      });
	}
	
	caixaLancamentoPlanoContasAutoCompleteFieldConverter(planoContas: PlanoContaAutoComplete) {
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
	
	
	caixaLancamentoClienteAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.caixaLancamento.cliente = null;
	}
	
	caixaLancamentoClienteAutoCompleteOnBlur(event) {
		// Seems a PrimeNG bug, if clear an autocomplete field, on onBlur event, the null value is empty string.
		// Until PrimeNG version: 7.1.3.
		if (String(this.caixaLancamento.cliente) === '') {
			this.caixaLancamento.cliente = null;
		}
	}
	
	caixaLancamentoClienteAutoComplete(event) {
	    const query = event.query;
	    this.caixaLancamentoService
	      .clienteClienteAutoComplete(query)
	      .then((result) => {
	        this.caixaLancamentoClienteAutoCompleteSuggestions = result as ClienteAutoComplete[];
	      })
	      .catch(error => {
	        this.messageHandler.showError(error);
	      });
	}
	
	caixaLancamentoClienteAutoCompleteFieldConverter(cliente: ClienteAutoComplete) {
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
	
	
	caixaLancamentoFornecedorAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.caixaLancamento.fornecedor = null;
	}
	
	caixaLancamentoFornecedorAutoCompleteOnBlur(event) {
		// Seems a PrimeNG bug, if clear an autocomplete field, on onBlur event, the null value is empty string.
		// Until PrimeNG version: 7.1.3.
		if (String(this.caixaLancamento.fornecedor) === '') {
			this.caixaLancamento.fornecedor = null;
		}
	}
	
	caixaLancamentoFornecedorAutoComplete(event) {
	    const query = event.query;
	    this.caixaLancamentoService
	      .fornecedorFornecedorAutoComplete(query)
	      .then((result) => {
	        this.caixaLancamentoFornecedorAutoCompleteSuggestions = result as FornecedorAutoComplete[];
	      })
	      .catch(error => {
	        this.messageHandler.showError(error);
	      });
	}
	
	caixaLancamentoFornecedorAutoCompleteFieldConverter(fornecedor: FornecedorAutoComplete) {
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
	
	private initializeCaixaLancamentoTipoLancamentoFinanceiroOptions() {
	    this.caixaLancamentoTipoLancamentoFinanceiroOptions = [
	    	{ label: this.getTranslation('financeiro.fluxo_caixa.caixaLancamento_tipoLancamentoFinanceiro_credito'), value: 'CREDITO' }, 
	    	{ label: this.getTranslation('financeiro.fluxo_caixa.caixaLancamento_tipoLancamentoFinanceiro_debito'), value: 'DEBITO' }
	    ];
	}
	  
	private initializeCaixaLancamentoFormaPagamentoOptions() {
	    this.caixaLancamentoFormaPagamentoOptions = [
	    	{ label: this.getTranslation('financeiro.fluxo_caixa.caixaLancamento_formaPagamento_dinheiro'), value: 'DINHEIRO' }, 
	    	{ label: this.getTranslation('financeiro.fluxo_caixa.caixaLancamento_formaPagamento_conta_bancaria'), value: 'CONTA_BANCARIA' }, 
	    	{ label: this.getTranslation('financeiro.fluxo_caixa.caixaLancamento_formaPagamento_cartao_credito'), value: 'CARTAO_CREDITO' }, 
	    	{ label: this.getTranslation('financeiro.fluxo_caixa.caixaLancamento_formaPagamento_vale_refeicao'), value: 'VALE_REFEICAO' }, 
	    	{ label: this.getTranslation('financeiro.fluxo_caixa.caixaLancamento_formaPagamento_vale_alimentacao'), value: 'VALE_ALIMENTACAO' }, 
	    	{ label: this.getTranslation('financeiro.fluxo_caixa.caixaLancamento_formaPagamento_cheque'), value: 'CHEQUE' }, 
	    	{ label: this.getTranslation('financeiro.fluxo_caixa.caixaLancamento_formaPagamento_outros'), value: 'OUTROS' }
	    ];
	}
	  
	private initializeCaixaLancamentoTipoFonteMovimentoOptions() {
	    this.caixaLancamentoTipoFonteMovimentoOptions = [
	    	{ label: this.getTranslation('financeiro.fluxo_caixa.caixaLancamento_tipoFonteMovimento_lancemento_caixa'), value: 'LANCEMENTO_CAIXA' }, 
	    	{ label: this.getTranslation('financeiro.fluxo_caixa.caixaLancamento_tipoFonteMovimento_contas_pagar'), value: 'CONTAS_PAGAR' }, 
	    	{ label: this.getTranslation('financeiro.fluxo_caixa.caixaLancamento_tipoFonteMovimento_contas_receber'), value: 'CONTAS_RECEBER' }
	    ];
	}
	  
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.financeiroFluxoCaixaTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	rulesOnInit() {
		this.caixaLancamento.dataLancamento = moment().toDate();
	}
	
	
										
	// Begin RuleWithSlotAppyStyleClass 
	ruleContaBancariaAppyStyleClass() {
		const expression = (String(this.caixaLancamento.formaPagamento) !== 'CONTA_BANCARIA');
		if (expression) {
			return 'hidden';
		} else {
			return '';
		}
		
	}
	ruleCartaoCreditoAppyStyleClass() {
		const expression = (String(this.caixaLancamento.formaPagamento) !== 'CARTAO_CREDITO');
		if (expression) {
			return 'hidden';
		} else {
			return '';
		}
		
	}
	ruleOutrosDescricaoAppyStyleClass() {
		const expression = (String(this.caixaLancamento.formaPagamento) === 'CONTA_BANCARIA') || (String(this.caixaLancamento.formaPagamento) === 'CARTAO_CREDITO');
		if (expression) {
			return 'hidden';
		} else {
			return '';
		}
		
	}
	ruleClienteAppyStyleClass() {
		const expression = (String(this.caixaLancamento.tipoLancamentoFinanceiro) !== 'CREDITO');
		if (expression) {
			return 'hidden';
		} else {
			return '';
		}
		
	}
	ruleFornecedorAppyStyleClass() {
		const expression = (String(this.caixaLancamento.tipoLancamentoFinanceiro) !== 'DEBITO');
		if (expression) {
			return 'hidden';
		} else {
			return '';
		}
		
	}
	ruleValorCreditoAppyStyleClass() {
		const expression = (String(this.caixaLancamento.tipoLancamentoFinanceiro) !== 'CREDITO');
		if (expression) {
			return 'hidden';
		} else {
			return '';
		}
		
	}
	ruleValorDebitoAppyStyleClass() {
		const expression = (String(this.caixaLancamento.tipoLancamentoFinanceiro) !== 'DEBITO');
		if (expression) {
			return 'hidden';
		} else {
			return '';
		}
		
	}
	// End Begin RuleWithSlotAppyStyleClass
	
	caixaLancamentoRuleDisableCUD() {
		const expression = this.caixaLancamento.id && (String(this.caixaLancamento.caixaDiario.caixaDiarioSituacao) !== 'ABERTO');
		return expression;
		
	}
	
	initLocaleSettings() {
		this.calendarLocale = this.financeiroFluxoCaixaTranslationService.getCalendarLocaleSettings();
	}
	
}
