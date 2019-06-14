/**********************************************************************************************
Code generated with MKL Plug-in version: 3.9.0
Code generated at time stamp: 2019-06-14T00:00:25.670
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { MovimentoCaixa } from './movimentocaixa.model';
import { MovimentoCaixaService } from './movimentocaixa.service';
import { FinanceiroFluxoCaixaTranslationService } from './../i18n/financeiro-fluxocaixa-translation.service';

import { CaixaService } from './../caixa/caixa.service';
import { Caixa } from './../caixa/caixa.model';
import { CaixaAutoComplete } from './../caixa/caixa.model';

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

import { FornecedorService } from './../fornecedor/fornecedor.service';
import { Fornecedor } from './../fornecedor/fornecedor.model';
import { FornecedorAutoComplete } from './../fornecedor/fornecedor.model';

import { TipoFonteMovimento } from './../enums/financeiro-fluxocaixa-enums.model';

import { TipoPlanoContaFinanceiro } from './../enums/financeiro-fluxocaixa-enums.model';

import { FormaPagamento } from './../enums/financeiro-fluxocaixa-enums.model';

@Component({
  selector: 'app-crud-movimentocaixa.component',
  templateUrl: './crud-movimentocaixa.component.html',
  styleUrls: ['./crud-movimentocaixa.component.css']
})

export class MovimentoCaixaComponent implements OnInit {
	movimentoCaixa = new MovimentoCaixa();
	movimentoCaixaCaixaAutoCompleteSuggestions: CaixaAutoComplete[];


	movimentoCaixaPlanoContasAutoCompleteSuggestions: PlanoContaAutoComplete[];


	movimentoCaixaContaBancariaAutoCompleteSuggestions: ContaBancariaAutoComplete[];


	movimentoCaixaCartaoCreditoAutoCompleteSuggestions: CartaoCreditoAutoComplete[];


	movimentoCaixaClienteAutoCompleteSuggestions: ClienteAutoComplete[];


	movimentoCaixaFornecedorAutoCompleteSuggestions: FornecedorAutoComplete[];
	movimentoCaixaTipoFonteMovimentoOptions: TipoFonteMovimento[];


	movimentoCaixaTipoMovimentoFinanceiroOptions: TipoPlanoContaFinanceiro[];


	movimentoCaixaFormaPagamentoOptions: FormaPagamento[];

	constructor(
	    private movimentoCaixaService: MovimentoCaixaService,
	    private financeiroFluxoCaixaTranslationService: FinanceiroFluxoCaixaTranslationService,
	    private caixaService: CaixaService,


	    private planoContaService: PlanoContaService,


	    private contaBancariaService: ContaBancariaService,


	    private cartaoCreditoService: CartaoCreditoService,


	    private clienteService: ClienteService,


	    private fornecedorService: FornecedorService,
	    private route: ActivatedRoute,
	    private messageService: MessageService
	) {
		this.initializeMovimentoCaixaTipoFonteMovimentoOptions();

		this.initializeMovimentoCaixaTipoMovimentoFinanceiroOptions();

		this.initializeMovimentoCaixaFormaPagamentoOptions();
	}

	ngOnInit() {
		this.initializeEnumFieldsWithDefault();
	    const id = this.route.snapshot.params['id'];
	    if (id) {
	      this.getMovimentoCaixaById(id);
	    }
	}

	begin(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
	      this.movimentoCaixa = new MovimentoCaixa();
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
	    this.movimentoCaixaService.create(this.movimentoCaixa)
	    .then((movimentoCaixa) => {
	      this.movimentoCaixa = movimentoCaixa;
	      this.showSuccess('Registro criado com sucesso!');
	    }).
	    catch(error => {
	      this.showError('Erro ao criar registro: ' + error);
	    });
	}

	update() {
	    this.movimentoCaixaService.update(this.movimentoCaixa)
	    .then((movimentoCaixa) => {
	      this.movimentoCaixa = movimentoCaixa;
	      this.showSuccess('Registro alterado!');
	    })
	    .catch(error => {
	      this.showError('Erro ao atualizar registro: ' + error);
	    });
	}

	getMovimentoCaixaById(id: string) {
	    this.movimentoCaixaService.retrieve(id)
	    .then((movimentoCaixa) => this.movimentoCaixa = movimentoCaixa)
	    .catch(error => {
	      this.showError('Erro ao buscar registro: ' + id);
	    });
	}

	get isEditing() {
	    return Boolean(this.movimentoCaixa.id);
	}

	initializeEnumFieldsWithDefault() {
		this.movimentoCaixa.tipoFonteMovimento = this.movimentoCaixaTipoFonteMovimentoOptions[0].value;
		this.movimentoCaixa.tipoMovimentoFinanceiro = this.movimentoCaixaTipoMovimentoFinanceiroOptions[0].value;
		this.movimentoCaixa.formaPagamento = this.movimentoCaixaFormaPagamentoOptions[0].value;
	}


	movimentoCaixaCaixaAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.movimentoCaixa.caixa = null;
	}

	movimentoCaixaCaixaAutoComplete(event) {
	    const query = event.query;
	    this.caixaService
	      .autoComplete(query)
	      .then((result) => {
	        this.movimentoCaixaCaixaAutoCompleteSuggestions = result as CaixaAutoComplete[];
	      })
	      .catch(error => {
	        this.showError('Erro ao buscar registros com o termo: ' + query);
	      });
	}

	movimentoCaixaCaixaAutoCompleteFieldConverter(caixa: CaixaAutoComplete) {
		if (caixa) {
			return caixa.nome;
		} else {
			return null;
		}
	}


	movimentoCaixaPlanoContasAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.movimentoCaixa.planoContas = null;
	}

	movimentoCaixaPlanoContasAutoComplete(event) {
	    const query = event.query;
	    this.planoContaService
	      .autoComplete(query)
	      .then((result) => {
	        this.movimentoCaixaPlanoContasAutoCompleteSuggestions = result as PlanoContaAutoComplete[];
	      })
	      .catch(error => {
	        this.showError('Erro ao buscar registros com o termo: ' + query);
	      });
	}

	movimentoCaixaPlanoContasAutoCompleteFieldConverter(planoContas: PlanoContaAutoComplete) {
		if (planoContas) {
			return planoContas.codigo + ' - ' + planoContas.descricao;
		} else {
			return null;
		}
	}


	movimentoCaixaContaBancariaAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.movimentoCaixa.contaBancaria = null;
	}

	movimentoCaixaContaBancariaAutoComplete(event) {
	    const query = event.query;
	    this.contaBancariaService
	      .autoComplete(query)
	      .then((result) => {
	        this.movimentoCaixaContaBancariaAutoCompleteSuggestions = result as ContaBancariaAutoComplete[];
	      })
	      .catch(error => {
	        this.showError('Erro ao buscar registros com o termo: ' + query);
	      });
	}

	movimentoCaixaContaBancariaAutoCompleteFieldConverter(contaBancaria: ContaBancariaAutoComplete) {
		if (contaBancaria) {
			return contaBancaria.nomeTitular + ' - ' + contaBancaria.numeroConta;
		} else {
			return null;
		}
	}


	movimentoCaixaCartaoCreditoAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.movimentoCaixa.cartaoCredito = null;
	}

	movimentoCaixaCartaoCreditoAutoComplete(event) {
	    const query = event.query;
	    this.cartaoCreditoService
	      .autoComplete(query)
	      .then((result) => {
	        this.movimentoCaixaCartaoCreditoAutoCompleteSuggestions = result as CartaoCreditoAutoComplete[];
	      })
	      .catch(error => {
	        this.showError('Erro ao buscar registros com o termo: ' + query);
	      });
	}

	movimentoCaixaCartaoCreditoAutoCompleteFieldConverter(cartaoCredito: CartaoCreditoAutoComplete) {
		if (cartaoCredito) {
			return cartaoCredito.nomeTitular + ' - ' + cartaoCredito.numeroCartao;
		} else {
			return null;
		}
	}


	movimentoCaixaClienteAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.movimentoCaixa.cliente = null;
	}

	movimentoCaixaClienteAutoComplete(event) {
	    const query = event.query;
	    this.clienteService
	      .autoComplete(query)
	      .then((result) => {
	        this.movimentoCaixaClienteAutoCompleteSuggestions = result as ClienteAutoComplete[];
	      })
	      .catch(error => {
	        this.showError('Erro ao buscar registros com o termo: ' + query);
	      });
	}

	movimentoCaixaClienteAutoCompleteFieldConverter(cliente: ClienteAutoComplete) {
		if (cliente) {
			return cliente.nome + ' - ' + cliente.cpfCNPJ;
		} else {
			return null;
		}
	}


	movimentoCaixaFornecedorAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.movimentoCaixa.fornecedor = null;
	}

	movimentoCaixaFornecedorAutoComplete(event) {
	    const query = event.query;
	    this.fornecedorService
	      .autoComplete(query)
	      .then((result) => {
	        this.movimentoCaixaFornecedorAutoCompleteSuggestions = result as FornecedorAutoComplete[];
	      })
	      .catch(error => {
	        this.showError('Erro ao buscar registros com o termo: ' + query);
	      });
	}

	movimentoCaixaFornecedorAutoCompleteFieldConverter(fornecedor: FornecedorAutoComplete) {
		if (fornecedor) {
      const value = fornecedor.nome + ' - ' + (fornecedor.cpfCNPJ || '<nullo>');
			return value;
			// return fornecedor.nome + ' - ' + fornecedor.cpfCNPJ;
		} else {
			return null;
		}
  }

  public defVal(value: any): any {
    return value ? value : '<nulo>';
  }

	private initializeMovimentoCaixaTipoFonteMovimentoOptions() {
	    this.movimentoCaixaTipoFonteMovimentoOptions = [
	    	{ label: this.getTranslation('financeiro.fluxo_caixa.movimentoCaixa_tipoFonteMovimento_lancemento_caixa'), value: 'LANCEMENTO_CAIXA' },
	    	{ label: this.getTranslation('financeiro.fluxo_caixa.movimentoCaixa_tipoFonteMovimento_contas_pagar'), value: 'CONTAS_PAGAR' },
	    	{ label: this.getTranslation('financeiro.fluxo_caixa.movimentoCaixa_tipoFonteMovimento_contas_receber'), value: 'CONTAS_RECEBER' }
	    ];
	}

	private initializeMovimentoCaixaTipoMovimentoFinanceiroOptions() {
	    this.movimentoCaixaTipoMovimentoFinanceiroOptions = [
	    	{ label: this.getTranslation('financeiro.fluxo_caixa.movimentoCaixa_tipoMovimentoFinanceiro_receita'), value: 'RECEITA' },
	    	{ label: this.getTranslation('financeiro.fluxo_caixa.movimentoCaixa_tipoMovimentoFinanceiro_despesa'), value: 'DESPESA' }
	    ];
	}

	private initializeMovimentoCaixaFormaPagamentoOptions() {
	    this.movimentoCaixaFormaPagamentoOptions = [
	    	{ label: this.getTranslation('financeiro.fluxo_caixa.movimentoCaixa_formaPagamento_dinheiro'), value: 'DINHEIRO' },
	    	{ label: this.getTranslation('financeiro.fluxo_caixa.movimentoCaixa_formaPagamento_conta_bancaria'), value: 'CONTA_BANCARIA' },
	    	{ label: this.getTranslation('financeiro.fluxo_caixa.movimentoCaixa_formaPagamento_cartao_credito'), value: 'CARTAO_CREDITO' },
	    	{ label: this.getTranslation('financeiro.fluxo_caixa.movimentoCaixa_formaPagamento_cheque'), value: 'CHEQUE' },
	    	{ label: this.getTranslation('financeiro.fluxo_caixa.movimentoCaixa_formaPagamento_outros'), value: 'OUTROS' }
	    ];
	}


	public showSuccess(msg: string) {
	    this.messageService.add({severity: 'success', summary: 'Successo', detail: msg});
	}

	public showError(msg: string) {
	    this.messageService.add({severity: 'error', summary: 'Erro', detail: msg});
	}

	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.financeiroFluxoCaixaTranslationService.getTranslation(key);
		return value;

		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}

}
