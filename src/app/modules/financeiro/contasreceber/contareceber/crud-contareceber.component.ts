/**********************************************************************************************
Code generated with MKL Plug-in version: 7.0.3
Code generated at time stamp: 2019-07-27T18:58:20.452
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { ContaReceber } from './contareceber.model';
import { ContaReceberService } from './contareceber.service';
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
import {SelectItem} from 'primeng/api';
import { MessageHandlerService } from 'src/app/core/message-handler.service';


@Component({
  selector: 'app-crud-contareceber.component',
  templateUrl: './crud-contareceber.component.html',
  styleUrls: ['./crud-contareceber.component.css']
})

export class ContaReceberComponent implements OnInit {

	calendarLocale: any;


	numberOfCopies = 1;
	copiesReferenceFieldInterval = 30;

	copiesReferenceFieldOptions: SelectItem[];
	copiesReferenceField: SelectItem = { label: 'Vencimento', value: 'dataVencimento' };
	copiesReferenceFieldSelected: SelectItem;

	contaReceber = new ContaReceber();
	contaReceberPlanoContasAutoCompleteSuggestions: PlanoContaAutoComplete[];


	contaReceberContaBancariaAutoCompleteSuggestions: ContaBancariaAutoComplete[];


	contaReceberCartaoCreditoAutoCompleteSuggestions: CartaoCreditoAutoComplete[];


	contaReceberClienteAutoCompleteSuggestions: ClienteAutoComplete[];
	contaReceberFormaPagamentoOptions: FormaPagamento[];

	constructor(
	    private contaReceberService: ContaReceberService,
	    private financeiroContasReceberTranslationService: FinanceiroContasReceberTranslationService,
	    private planoContaService: PlanoContaService,


	    private contaBancariaService: ContaBancariaService,


	    private cartaoCreditoService: CartaoCreditoService,


	    private clienteService: ClienteService,
	    private route: ActivatedRoute,
	    private messageHandler: MessageHandlerService
	) {
		this.initializeContaReceberFormaPagamentoOptions();
		this.initializeCopiesReferenceFieldOptions();
	}

	ngOnInit() {
		this.initLocaleSettings();
		this.initializeEnumFieldsWithDefault();
	    const id = this.route.snapshot.params['id'];
	    if (id) {
	      this.getContaReceberById(id);
	    }
	}

	begin(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
	      this.contaReceber = new ContaReceber();
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

	    this.contaReceberService.create(this.contaReceber)
	    .then((contaReceber) => {
	      this.contaReceber = contaReceber;
	      this.messageHandler.showSuccess('Registro criado com sucesso!');
	    }).
	    catch(error => {
	      this.messageHandler.showError(error);
	    });
	}

	update() {
	    this.contaReceberService.update(this.contaReceber)
	    .then((contaReceber) => {
	      this.contaReceber = contaReceber;
	      this.messageHandler.showSuccess('Registro alterado!');
	    })
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}

	getContaReceberById(id: string) {
	    this.contaReceberService.retrieve(id)
	    .then((contaReceber) => this.contaReceber = contaReceber)
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}

	get isEditing() {
	    return Boolean(this.contaReceber.id);
	}

	initializeEnumFieldsWithDefault() {
		this.contaReceber.formaPagamento = this.contaReceberFormaPagamentoOptions[0].value;
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


	actionFazerCopiasContaReceber(form: FormControl) {
	      if (!this.contaReceber.agrupador) {
	        // this.copiesMustHaveGroup = true;
	        this.messageHandler.showError('Campo \'Agrupador\' deve ser informado para gerar cópias.');
	        return;
	      }
	      // this.copiesMustHaveGroup = false;

	      this.contaReceberService.actionFazerCopiasContaReceber(this.contaReceber.id, this.numberOfCopies,
	        this.copiesReferenceFieldInterval, this.contaReceber.agrupador)
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
		const expression = (String(this.contaReceber.formaPagamento) !== 'CONTA_BANCARIA');
		if (expression) {
			return 'hidden';
		} else {
			return '';
		}

	}
	ruleCartaoCreditoAppyStyleClass() {
		const expression = (String(this.contaReceber.formaPagamento) !== 'CARTAO_CREDITO');
		if (expression) {
			return 'hidden';
		} else {
			return '';
		}

	}
	ruleOutrosDescricaoAppyStyleClass() {
		const expression = (String(this.contaReceber.formaPagamento) === 'CONTA_BANCARIA') || (String(this.contaReceber.formaPagamento) === 'CARTAO_CREDITO');
		if (expression) {
			return 'hidden';
		} else {
			return '';
		}

	}
	// End Begin RuleWithSlotAppyStyleClass


	initLocaleSettings() {
		this.calendarLocale = this.financeiroContasReceberTranslationService.getCalendarLocaleSettings();
  }

  contaReceber_dataPagamento_onBlur(event) {
    console.log('this.contaReceber.dataPagamento:' + this.contaReceber.dataPagamento);
    if (this.contaReceber) {
      if (this.contaReceber.dataPagamento && !this.contaReceber.valorPago) {
        this.contaReceber.valorPago = this.contaReceber.valor;
      } else if (!this.contaReceber.dataPagamento && this.contaReceber.valorPago) {
        this.contaReceber.valorPago = null;
      }
    }
  }

}
