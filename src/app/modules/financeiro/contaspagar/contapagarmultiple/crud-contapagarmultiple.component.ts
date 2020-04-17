import { Output, EventEmitter, Input } from '@angular/core';
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
import { ContaPagarMultiple } from './contapagarmultiple.model';
import { ContaPagarMultipleService } from './contapagarmultiple.service';
import { CustomContaPagarMultipleService } from './custom-contapagarmultiple.service';
import { FinanceiroContasPagarTranslationService } from './../i18n/financeiro-contaspagar-translation.service';
import * as moment from 'moment';

import { FornecedorService } from './../fornecedor/fornecedor.service';
import { Fornecedor } from './../fornecedor/fornecedor.model';
import { FornecedorAutoComplete } from './../fornecedor/fornecedor.model';

import { ContaBancariaService } from './../contabancaria/contabancaria.service';
import { ContaBancaria } from './../contabancaria/contabancaria.model';
import { ContaBancariaAutoComplete } from './../contabancaria/contabancaria.model';

import { CartaoCreditoService } from './../cartaocredito/cartaocredito.service';
import { CartaoCredito } from './../cartaocredito/cartaocredito.model';
import { CartaoCreditoAutoComplete } from './../cartaocredito/cartaocredito.model';

import { PlanoContaService } from './../planoconta/planoconta.service';
import { PlanoConta } from './../planoconta/planoconta.model';
import { PlanoContaAutoComplete } from './../planoconta/planoconta.model';

import { ContaPagarService } from './../contapagar/contapagar.service';
import { ContaPagar } from './../contapagar/contapagar.model';
import { ContaPagarAutoComplete } from './../contapagar/contapagar.model';

import { FormaPagamento } from './../enums/financeiro-contaspagar-enums.model';
import { MessageHandlerService } from 'src/app/core/message-handler.service';


@Component({
  selector: 'app-crud-contapagarmultiple',
  templateUrl: './crud-contapagarmultiple.component.html',
  styleUrls: ['./crud-contapagarmultiple.component.css']
})

export class ContaPagarMultipleComponent implements OnInit {
	showHideHelp = false; // for show/hide help.


	calendarLocale: any;

  contaPagarMultiple = new ContaPagarMultiple();


	contaPagarMultipleFornecedorAutoCompleteSuggestions: FornecedorAutoComplete[];


	contaPagarMultipleContaBancariaAutoCompleteSuggestions: ContaBancariaAutoComplete[];


	contaPagarMultipleCartaoCreditoAutoCompleteSuggestions: CartaoCreditoAutoComplete[];


	contaPagarMultiplePlanoContasAutoCompleteSuggestions: PlanoContaAutoComplete[];


	contaPagarMultipleContaPagarAutoCompleteSuggestions: ContaPagarAutoComplete[];
	contaPagarMultipleFormaPagamentoOptions: FormaPagamento[];

  // Listeners
  @Output() contaPagarMultipleSaved = new EventEmitter();
  @Output() contaPagarMultipleCanceled = new EventEmitter();

  @Input() disableLoadOnInit = false;

	@ViewChild('contaPagarMultiple_valorPago_elementRef'/*, {static: true}*/) contaPagarMultipleDefaultElementRef: ElementRef;
	@ViewChild('formContaPagarMultipleRef'/*, {static: true}*/) formContaPagarMultipleRef: ElementRef;

	constructor(
	    private contaPagarMultipleService: ContaPagarMultipleService,
	    private customContaPagarMultipleService: CustomContaPagarMultipleService,
	    private financeiroContasPagarTranslationService: FinanceiroContasPagarTranslationService,
	    private fornecedorService: FornecedorService,


	    private contaBancariaService: ContaBancariaService,


	    private cartaoCreditoService: CartaoCreditoService,


	    private planoContaService: PlanoContaService,


	    private contaPagarService: ContaPagarService,
	    private route: ActivatedRoute,
	    private messageHandler: MessageHandlerService
	) {
		this.customContaPagarMultipleService.setComponent(this);

		// Begin custom action.
		if (!this.customContaPagarMultipleService.beforeConstructor()) {
			return;
		}
		// End custom action.

		this.initializeContaPagarMultipleFormaPagamentoOptions();

		// Begin custom action.
		if (!this.customContaPagarMultipleService.afterConstructor()) {
			return;
		}
		// End custom action.

	}

	ngOnInit() {

		// Begin custom action.
		if (!this.customContaPagarMultipleService.beforeOnInit()) {
			return;
		}
		// End custom action.

		this.initLocaleSettings();
    this.initializeEnumFieldsWithDefault();

    // Tem que gerar código ainda
    if (!this.disableLoadOnInit) {
	    const id = this.route.snapshot.params['id'];
	    if (id) {
	      this.getContaPagarMultipleById(id);
	    }
    }

	    // Begin custom action.
	    if (!this.customContaPagarMultipleService.afterOnInit()) {
	    	return;
	    }
	    // End custom action.

      if (!this.disableLoadOnInit) {
        this.contaPagarMultipleDefaultElementSetFocus();
      }
	}

	getShowHideHelpLabel(): string {
		return this.showHideHelp ? 'Ocultar ajuda' : 'Mostrar ajuda';
	}

	beginFormContaPagarMultipleRef(contaPagarMultiple: ContaPagarMultiple) {
    this.beginFormContaPagarMultiple(this.formContaPagarMultipleRef.nativeElement, contaPagarMultiple);
  }

	beginFormContaPagarMultiple(form: FormControl, contaPagarMultiple: ContaPagarMultiple = null) {
	    form.reset();
	    setTimeout(function() {

	    	// Begin custom action.
	    	if (!this.customContaPagarMultipleService.beforeOnNewRecord()) {
	    		return;
	    	}
	    	// End custom action.

        if (contaPagarMultiple) {
          this.contaPagarMultiple = contaPagarMultiple;
        } else {
          this.contaPagarMultiple = new ContaPagarMultiple();
        }

	      this.initializeEnumFieldsWithDefault();

		  // Begin custom action.
		  if (!this.customContaPagarMultipleService.afterOnNewRecord()) {
		  	return;
		  }
		  // End custom action.

		  this.contaPagarMultipleDefaultElementSetFocus();
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

  cancelFormContaPagarMultiple(event) {
    this.contaPagarMultipleCanceled.emit(this.contaPagarMultiple);
  }

	saveFormContaPagarMultiple(form: FormGroup) {
		if (!form.valid) {
        this.validateAllFormFields(form);
	      return;
	    }
		
		if (!this.doRulesFormBeforeSave()) {
			return;
		}
		
		
		// Begin custom action.
		if (!this.customContaPagarMultipleService.beforeSave()) {
			return;
		}
		// End custom action.

	    if (this.isEditing) {
	      this.update();
	    } else {
	      this.create();
	    }

		// Begin custom action.
		if (!this.customContaPagarMultipleService.afterSave()) {
			return;
		}
		// End custom action.

	}
	
	// Begin rulesFormBeforeSave
	doRulesFormBeforeSave(): boolean {
		
		if (!this.contaPagarMultiple.contaPagar || !this.contaPagarMultiple.contaPagar.id) {
			this.messageHandler.showError('A conta pai não existe ainda ou não possui um identificador válido.');
			return false;
		}
		
		return true;
	}
	// End rulesFormBeforeSave
	
	
	create() {

		// Begin custom action.
		if (!this.customContaPagarMultipleService.beforeCreate()) {
			return;
		}
		// End custom action.


	    this.contaPagarMultipleService.create(this.contaPagarMultiple)
	    .then((contaPagarMultiple) => {
	      this.contaPagarMultiple = contaPagarMultiple;
	      this.messageHandler.showSuccess('Registro criado com sucesso!');

	      // Begin custom action.
	      if (!this.customContaPagarMultipleService.afterCreate()) {
	      	return;
	      }
	      // End custom action.

        this.contaPagarMultipleDefaultElementSetFocus();
	      if (this.contaPagarMultipleSaved) {
          this.contaPagarMultipleSaved.emit(this.contaPagarMultiple);
        }
	    }).
	    catch(error => {
	      this.messageHandler.showError(error);
	    });
	}

	update() {

		// Begin custom action.
		if (!this.customContaPagarMultipleService.beforeUpdate()) {
			return;
		}
		// End custom action.

	    this.contaPagarMultipleService.update(this.contaPagarMultiple)
	    .then((contaPagarMultiple) => {
	      this.contaPagarMultiple = contaPagarMultiple;
	      this.messageHandler.showSuccess('Registro alterado!');

	      // Begin custom action.
	      if (!this.customContaPagarMultipleService.afterUpdate()) {
	      	return;
	      }
	      // End custom action.

        this.contaPagarMultipleDefaultElementSetFocus();
        if (this.contaPagarMultipleSaved) {
          this.contaPagarMultipleSaved.emit(this.contaPagarMultiple);
        }

	    })
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}

	getContaPagarMultipleById(id: string) {

		// Begin custom action.
		if (!this.customContaPagarMultipleService.beforeGetById(id)) {
			return;
		}
		// End custom action.

	    this.contaPagarMultipleService.retrieve(id)
	    .then((contaPagarMultiple) => {
	    	this.contaPagarMultiple = contaPagarMultiple;

	    	// Begin custom action.
	    	if (!this.customContaPagarMultipleService.afterGetById(id)) {
	    		return;
	    	}
	    	// End custom action.

	    })
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}

	get isEditing() {
	    return Boolean(this.contaPagarMultiple.id);
	}

	initializeEnumFieldsWithDefault() {
		this.contaPagarMultiple.formaPagamento = this.contaPagarMultipleFormaPagamentoOptions[1].value;
	}


	contaPagarMultipleFornecedorAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.contaPagarMultiple.fornecedor = null;
	}

	contaPagarMultipleFornecedorAutoCompleteOnBlur(event) {
		// Seems a PrimeNG bug, if clear an autocomplete field, on onBlur event, the null value is empty string.
		// Until PrimeNG version: 7.1.3.
		if (String(this.contaPagarMultiple.fornecedor) === '') {
			this.contaPagarMultiple.fornecedor = null;
		}
	}

	contaPagarMultipleFornecedorAutoComplete(event) {
	    const query = event.query;
	    this.contaPagarMultipleService
	      .fornecedorFornecedorAutoComplete(query)
	      .then((result) => {
	        this.contaPagarMultipleFornecedorAutoCompleteSuggestions = result as FornecedorAutoComplete[];
	      })
	      .catch(error => {
	        this.messageHandler.showError(error);
	      });
	}

	contaPagarMultipleFornecedorAutoCompleteFieldConverter(fornecedor: FornecedorAutoComplete) {
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


	contaPagarMultipleContaBancariaAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.contaPagarMultiple.contaBancaria = null;
	}

	contaPagarMultipleContaBancariaAutoCompleteOnBlur(event) {
		// Seems a PrimeNG bug, if clear an autocomplete field, on onBlur event, the null value is empty string.
		// Until PrimeNG version: 7.1.3.
		if (String(this.contaPagarMultiple.contaBancaria) === '') {
			this.contaPagarMultiple.contaBancaria = null;
		}
	}

	contaPagarMultipleContaBancariaAutoComplete(event) {
	    const query = event.query;
	    this.contaPagarMultipleService
	      .contaBancariaContaBancariaAutoComplete(query)
	      .then((result) => {
	        this.contaPagarMultipleContaBancariaAutoCompleteSuggestions = result as ContaBancariaAutoComplete[];
	      })
	      .catch(error => {
	        this.messageHandler.showError(error);
	      });
	}

	contaPagarMultipleContaBancariaAutoCompleteFieldConverter(contaBancaria: ContaBancariaAutoComplete) {
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


	contaPagarMultipleCartaoCreditoAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.contaPagarMultiple.cartaoCredito = null;
	}

	contaPagarMultipleCartaoCreditoAutoCompleteOnBlur(event) {
		// Seems a PrimeNG bug, if clear an autocomplete field, on onBlur event, the null value is empty string.
		// Until PrimeNG version: 7.1.3.
		if (String(this.contaPagarMultiple.cartaoCredito) === '') {
			this.contaPagarMultiple.cartaoCredito = null;
		}
	}

	contaPagarMultipleCartaoCreditoAutoComplete(event) {
	    const query = event.query;
	    this.contaPagarMultipleService
	      .cartaoCreditoCartaoCreditoAutoComplete(query)
	      .then((result) => {
	        this.contaPagarMultipleCartaoCreditoAutoCompleteSuggestions = result as CartaoCreditoAutoComplete[];
	      })
	      .catch(error => {
	        this.messageHandler.showError(error);
	      });
	}

	contaPagarMultipleCartaoCreditoAutoCompleteFieldConverter(cartaoCredito: CartaoCreditoAutoComplete) {
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


	contaPagarMultiplePlanoContasAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.contaPagarMultiple.planoContas = null;
	}

	contaPagarMultiplePlanoContasAutoCompleteOnBlur(event) {
		// Seems a PrimeNG bug, if clear an autocomplete field, on onBlur event, the null value is empty string.
		// Until PrimeNG version: 7.1.3.
		if (String(this.contaPagarMultiple.planoContas) === '') {
			this.contaPagarMultiple.planoContas = null;
		}
	}

	contaPagarMultiplePlanoContasAutoComplete(event) {
	    const query = event.query;
	    this.contaPagarMultipleService
	      .planoContaPlanoContasAutoComplete(query)
	      .then((result) => {
	        this.contaPagarMultiplePlanoContasAutoCompleteSuggestions = result as PlanoContaAutoComplete[];
	      })
	      .catch(error => {
	        this.messageHandler.showError(error);
	      });
	}

	contaPagarMultiplePlanoContasAutoCompleteFieldConverter(planoContas: PlanoContaAutoComplete) {
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


	contaPagarMultipleContaPagarAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.contaPagarMultiple.contaPagar = null;
	}

	contaPagarMultipleContaPagarAutoCompleteOnBlur(event) {
		// Seems a PrimeNG bug, if clear an autocomplete field, on onBlur event, the null value is empty string.
		// Until PrimeNG version: 7.1.3.
		if (String(this.contaPagarMultiple.contaPagar) === '') {
			this.contaPagarMultiple.contaPagar = null;
		}
	}

	contaPagarMultipleContaPagarAutoComplete(event) {
	    const query = event.query;
	    this.contaPagarMultipleService
	      .contaPagarContaPagarAutoComplete(query)
	      .then((result) => {
	        this.contaPagarMultipleContaPagarAutoCompleteSuggestions = result as ContaPagarAutoComplete[];
	      })
	      .catch(error => {
	        this.messageHandler.showError(error);
	      });
	}

	contaPagarMultipleContaPagarAutoCompleteFieldConverter(contaPagar: ContaPagarAutoComplete) {
		let text = '';
		if (contaPagar) {
			if (contaPagar.descricao) {
			    if (text !== '') {
			      text += ' - ';
			    }
			    text += contaPagar.descricao;
			}

		}

		if (text === '') {
			text = null;
		}
		return text;
	}

	private initializeContaPagarMultipleFormaPagamentoOptions() {
	    this.contaPagarMultipleFormaPagamentoOptions = [
	    	{ label: 'Selecione um item', value: null },
	    	{ label: this.getTranslation('financeiro.contas_pagar.contaPagarMultiple_formaPagamento_dinheiro'), value: 'DINHEIRO' },
	    	{ label: this.getTranslation('financeiro.contas_pagar.contaPagarMultiple_formaPagamento_conta_bancaria'), value: 'CONTA_BANCARIA' },
	    	{ label: this.getTranslation('financeiro.contas_pagar.contaPagarMultiple_formaPagamento_cartao_credito'), value: 'CARTAO_CREDITO' },
	    	{ label: this.getTranslation('financeiro.contas_pagar.contaPagarMultiple_formaPagamento_vale_refeicao'), value: 'VALE_REFEICAO' },
	    	{ label: this.getTranslation('financeiro.contas_pagar.contaPagarMultiple_formaPagamento_vale_alimentacao'), value: 'VALE_ALIMENTACAO' },
	    	{ label: this.getTranslation('financeiro.contas_pagar.contaPagarMultiple_formaPagamento_cheque'), value: 'CHEQUE' },
	    	{ label: this.getTranslation('financeiro.contas_pagar.contaPagarMultiple_formaPagamento_outros'), value: 'OUTROS' }
	    ];
	}


	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.financeiroContasPagarTranslationService.getTranslation(key);
		return value;

		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}




	// Begin RuleWithSlotAppyHiddeComponent

	ruleContaPagarMultiple_DescricaoAppyHiddeComponent() {
		const expression = (this.contaPagarMultiple.maisOpcoes === false);
		if (expression) {
			return 'none'; // Will hidde de component.
		} else {
			return 'inline'; // Default css show element value.
		}
	}

	ruleContaPagarMultiple_FormaPagamentoAppyHiddeComponent() {
		const expression = (this.contaPagarMultiple.maisOpcoes === false);
		if (expression) {
			return 'none'; // Will hidde de component.
		} else {
			return 'inline'; // Default css show element value.
		}
	}

	ruleContaPagarMultiple_ContaBancariaAppyHiddeComponent() {
		const expression = (this.contaPagarMultiple.maisOpcoes === false) || (String(this.contaPagarMultiple.formaPagamento) !== 'CONTA_BANCARIA');
		if (expression) {
			return 'none'; // Will hidde de component.
		} else {
			return 'inline'; // Default css show element value.
		}
	}

	ruleContaPagarMultiple_CartaoCreditoAppyHiddeComponent() {
		const expression = (this.contaPagarMultiple.maisOpcoes === false) || (String(this.contaPagarMultiple.formaPagamento) !== 'CARTAO_CREDITO');
		if (expression) {
			return 'none'; // Will hidde de component.
		} else {
			return 'inline'; // Default css show element value.
		}
	}

	ruleContaPagarMultiple_OutrosDescricaoAppyHiddeComponent() {
		const expression = (this.contaPagarMultiple.maisOpcoes === false) || (String(this.contaPagarMultiple.formaPagamento) === 'CONTA_BANCARIA') || (String(this.contaPagarMultiple.formaPagamento) === 'CARTAO_CREDITO');
		if (expression) {
			return 'none'; // Will hidde de component.
		} else {
			return 'inline'; // Default css show element value.
		}
	}

	ruleContaPagarMultiple_PlanoContasAppyHiddeComponent() {
		const expression = (this.contaPagarMultiple.maisOpcoes === false);
		if (expression) {
			return 'none'; // Will hidde de component.
		} else {
			return 'inline'; // Default css show element value.
		}
	}
	// End Begin RuleWithSlotAppyHiddeComponent




	initLocaleSettings() {
		this.calendarLocale = this.financeiroContasPagarTranslationService.getCalendarLocaleSettings();
	}




	contaPagarMultipleDefaultElementSetFocus() {
		try {
         // setTimeout(function() {
          this.contaPagarMultipleDefaultElementRef.nativeElement.focus();
        // }.bind(this), 1);
	    } catch (error) {
	    	console.log('Error setting focus at contaPagarMultipleDefaultElementSetFocus:' + error);
	    }
	}
}
