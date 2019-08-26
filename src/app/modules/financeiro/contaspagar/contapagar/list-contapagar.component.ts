/**********************************************************************************************
Code generated with MKL Plug-in version: 20.1.1
Code generated at time stamp: 2019-08-25T08:11:26.760
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import {ConfirmationService, LazyLoadEvent, SelectItem} from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import * as moment from 'moment';
import { MessageHandlerService } from 'src/app/core/message-handler.service';

import { ContaPagarService } from './contapagar.service';
import { FinanceiroContasPagarTranslationService } from './../i18n/financeiro-contaspagar-translation.service';
import { ContaPagar } from './contapagar.model';
import { ContaPagarListFilter } from './contapagar.model';
import { SortField } from './contapagar.model';
import { ContaPagarDescricaoAutoComplete } from './contapagar.model';
import { ContaPagarAgrupadorAutoComplete } from './contapagar.model';

import { FormaPagamento } from './../enums/financeiro-contaspagar-enums.model';

import { PlanoContaAutoComplete } from './../planoconta/planoconta.model';

import { ContaBancariaAutoComplete } from './../contabancaria/contabancaria.model';

import { CartaoCreditoAutoComplete } from './../cartaocredito/cartaocredito.model';

import { FornecedorAutoComplete } from './../fornecedor/fornecedor.model';
import { ContaPagarSumFields } from './contapagar.model';

@Component({
  selector: 'app-list-contapagar.component',
  templateUrl: './list-contapagar.component.html',
  styleUrls: ['./list-contapagar.component.css']
})

export class ContaPagarListComponent implements OnInit {
	
	contaPagarListItems: ContaPagar[];
	contaPagarListTotalElements = 0;
	contaPagarListFilter = new ContaPagarListFilter();
	
	contaPagarDescricaoAutoCompleteSuggestions: ContaPagarDescricaoAutoComplete[];
	
	contaPagarDataVencimentoIsBetweenOptionsSelected: SelectItem = {label: 'Minha competência', value: '12'};
	
	
	
	contaPagarFormaPagamentoOptions: FormaPagamento[];
	
	
	
	contaPagarAgrupadorAutoCompleteSuggestions: ContaPagarAgrupadorAutoComplete[];
	dateFilterIntervalDropdownItems: SelectItem[];
	
	
	contaPagarSumFields = new ContaPagarSumFields();
	
	constructor(
	    private contaPagarService: ContaPagarService,
	    private financeiroContasPagarTranslationService: FinanceiroContasPagarTranslationService,
	    private confirmation: ConfirmationService,
	    private messageHandler: MessageHandlerService
	) { }
	
	ngOnInit() {
		this.contaPagarDataVencimentoIsBetweenOptionsOnClick(null);
		this.initializeDateFilterIntervalDropdownItems();
		
		
		
		
		this.initializeContaPagarFormaPagamentoOptions();
		
		this.contaPagarListFilter.dataPagamentoIsNotNull = false;
		
		this.contaPagarListFilter.dataPagamentoIsNull = true;
		
	}
	
	contaPagarList(pageNumber = 0) {
	    this.contaPagarListFilter.pageNumber = pageNumber;
	    this.contaPagarService
	    .contaPagarList(this.contaPagarListFilter)
	    .then(result => {
	      	this.contaPagarListItems = result.items;
	      	this.contaPagarListTotalElements = result.totalElements;
	      
			this.getContaPagarSumFields();
	    });
		
	}
	
	getContaPagarSumFields() {
	    this.contaPagarService.getContaPagarSumFields(this.contaPagarListFilter)
		.then(response => {
		  this.contaPagarSumFields = response;
		})
		.catch(e => {
		  this.messageHandler.showError(e);
		});
	}
	
	contaPagarFilterSearch() {
	    this.contaPagarList(0);
	}
	
	deleteContaPagar(contaPagar: ContaPagar) {
	    this.confirmation.confirm({
	      message: 'Confirma a exclusão do registro?',
	      accept: () => {
	        this.contaPagarService.delete(contaPagar.id)
	        .then(() => {
	          this.messageHandler.showSuccess('Registro excluído!');
	          this.contaPagarList(0);
	        })
	        .catch((e) => {
	          this.messageHandler.showError(e);
	        });
	      }
	    });
	}
	
	contaPagarListOnLazyLoad(event: LazyLoadEvent) {
	    if (event.sortField) {
	      this.contaPagarListFilter.sortField = new SortField(event.sortField, event.sortOrder);
	    } else {
	      this.contaPagarListFilter.sortField = new SortField('dataVencimento', 1); // asc
	    }
	    const pageNumber = event.first / event.rows;
	    this.contaPagarList(pageNumber);
	}
	
	contaPagarDescricaoAutoComplete(event) {
	    const query = event.query;
	    this.contaPagarService.contaPagarDescricaoAutoComplete(query)
	    .then((result) => {
	      this.contaPagarDescricaoAutoCompleteSuggestions = result;
	    })
	    .catch(erro => {
	      this.messageHandler.showError('Erro ao buscar registros com o termo: ' + query);
	    });
	}
	
	contaPagarAgrupadorAutoComplete(event) {
	    const query = event.query;
	    this.contaPagarService.contaPagarAgrupadorAutoComplete(query)
	    .then((result) => {
	      this.contaPagarAgrupadorAutoCompleteSuggestions = result;
	    })
	    .catch(erro => {
	      this.messageHandler.showError('Erro ao buscar registros com o termo: ' + query);
	    });
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
	  
	
	contaPagarPlanoContasAutoCompleteFieldConverter(planoContas: PlanoContaAutoComplete) {
		if (planoContas) {
			return (planoContas.descricao || '<nulo>');
		} else {
			return null;
		}
	}
	
	contaPagarContaBancariaAutoCompleteFieldConverter(contaBancaria: ContaBancariaAutoComplete) {
		if (contaBancaria) {
			return (contaBancaria.nomeTitular || '<nulo>') + ' - ' + (contaBancaria.numeroConta || '<nulo>');
		} else {
			return null;
		}
	}
	
	contaPagarCartaoCreditoAutoCompleteFieldConverter(cartaoCredito: CartaoCreditoAutoComplete) {
		if (cartaoCredito) {
			return (cartaoCredito.nomeTitular || '<nulo>') + ' - ' + (cartaoCredito.numeroCartao || '<nulo>');
		} else {
			return null;
		}
	}
	
	contaPagarFornecedorAutoCompleteFieldConverter(fornecedor: FornecedorAutoComplete) {
		if (fornecedor) {
			return (fornecedor.nome || '<nulo>');
		} else {
			return null;
		}
	}
	
	
	private initializeDateFilterIntervalDropdownItems() {
		this.dateFilterIntervalDropdownItems = [
		    {label: 'Minha competência', value: '12'},
		    {label: 'Hoje', value: '0'},
		    {label: 'Amanhã', value: '1'},
		    {label: 'Esta semana', value: '2'},
		    {label: 'Semana que vem', value: '3'},
		    {label: 'Este mês', value: '4'},
		    {label: 'Mês que vem', value: '5'},
		    {label: 'Este ano', value: '6'},
		    {label: 'Ano que vem', value: '7'},
		    // Passado
		    {label: 'Ontem', value: '8'},
		    {label: 'Semana passada', value: '9'},
		    {label: 'Mês passado', value: '10'},
		    {label: 'Ano passado', value: '11'},
		    {label: 'Personalizado', value: '99'}
		  ];
	}
	
	
	contaPagarDataVencimentoIsBetweenOptionsOnClick(dropdown: Dropdown) {
		this.contaPagarListFilter.dataVencimentoFrom = null;
		this.contaPagarListFilter.dataVencimentoTo = null;
		
		let dateFrom = null;
		let dateTo = null;
	
		const valor = Number(this.contaPagarDataVencimentoIsBetweenOptionsSelected.value);
		switch (valor) {
			case 0: // Hoje
				dateFrom = moment();
				dateTo = moment();
				break;
				//
			case 1: // Amanhã
				dateFrom = moment().add(1, 'day');
				dateTo = moment().add(1, 'day');
				break;
				//
			case 2: // Esta semana
				dateFrom = moment().startOf('week');
				dateTo = moment().endOf('week');
				break;
				//
			case 3: // Semana que vem
				dateFrom = moment().add(1, 'week').startOf('week');
				dateTo = moment().add(1, 'week').endOf('week');
				break;
				//
			case 4: // Este mês
				dateFrom = moment().startOf('month');
				dateTo = moment().endOf('month');
				break;
				//
			case 5: // Mês que vem
				dateFrom = moment().add(1, 'month').startOf('month');
				dateTo = moment().add(1, 'month').endOf('month');
				break;
				//
			case 6: // Este ano
				dateFrom = moment().startOf('year');
				dateTo = moment().endOf('year');
				break;
				//
			case 7: // Ano que vem
				dateFrom = moment().add(1, 'year').startOf('year');
				dateTo = moment().add(1, 'year').endOf('year');
				break;
				// Passado
			case 8: // Ontem
				dateFrom = moment().add(-1, 'day');
				dateTo = moment().add(-1, 'day');
				break;
				//
			case 9: // Semana passada
				dateFrom = moment().add(-1, 'week').startOf('week');
				dateTo = moment().add(-1, 'week').endOf('week');
				break;
				//
			case 10: // Mês passado
				dateFrom = moment().add(-1, 'month').startOf('month');
				dateTo = moment().add(-1, 'month').endOf('month');
				break;
				//
			case 11: // Ano passado
				dateFrom = moment().add(-1, 'year').startOf('year');
				dateTo = moment().add(-1, 'year').endOf('year');
				break;
				
			case 12: // Minha competência
				dateFrom = moment().startOf('month');
				dateTo = moment().endOf('month').add(5, 'day'); // Five days after and of the month
				break;
			
			default:
				break;
		} // switch
	
		if (dateFrom != null) {
		  this.contaPagarListFilter.dataVencimentoFrom = dateFrom.toDate();
		}
		
		if (dateTo != null) {
		  this.contaPagarListFilter.dataVencimentoTo = dateTo.toDate();
		}
		
		if (dateFrom != null && dateTo != null) {
		  // this.contaPagarList(0);
		}
	}
	
	applyAndGetRuleGridRowStyleClass(contaPagar: ContaPagar): String {
		
		if (!contaPagar.dataPagamento && moment(contaPagar.dataVencimento).isBefore(moment(), 'day')) {
			return 'kb-conta-vencida';
		}
		
		if (!contaPagar.dataPagamento && moment(contaPagar.dataVencimento).isSame(moment(), 'day')) {
			return 'kb-conta-vence-hoje';
		}
		
		if (!contaPagar.dataPagamento && moment(contaPagar.dataVencimento).isSame(moment().add(1, 'day'), 'day')) {
			return 'kb-conta-vence-amanha';
		}
		
		if (!contaPagar.dataPagamento && moment(contaPagar.dataVencimento).isBetween(moment(), moment().add(3, 'day'))) {
			return 'kb-conta-vence-proximos-3-dias';
		}
		
		if (!contaPagar.dataPagamento && moment(contaPagar.dataVencimento).isBetween(moment(), moment().endOf('week'))) {
			return 'kb-conta-vence-esta-semana';
		}
		
		if (contaPagar.dataPagamento) {
			return 'kb-conta-paga';
		}
	
	    return null;
	}
	
	actionBaixarContaComDataPagamentoHojeWhen(contaPagar: ContaPagar) {
		return !contaPagar.dataPagamento;
	}
	
	actionBaixarContaComDataPagamentoHoje(contaPagar: ContaPagar) {
		this.contaPagarService.actionBaixarContaComDataPagamentoHoje(contaPagar.id)
			.then(() => {
			  this.messageHandler.showSuccess('Ação executada com sucesso!');
			  this.contaPagarList(0);
			})
			.catch((e) => {
				console.log('Erro ao executar a ação actionBaixarContaComDataPagamentoHoje: ' + e);
			  	this.messageHandler.showError('Não foi possível executar a ação.');
			});
	}
	
	actionBaixarContaComDataPagamentoIgualDataVencientoWhen(contaPagar: ContaPagar) {
		return !contaPagar.dataPagamento && moment(contaPagar.dataVencimento).isBefore(moment(), 'day');
	}
	
	actionBaixarContaComDataPagamentoIgualDataVenciento(contaPagar: ContaPagar) {
		this.contaPagarService.actionBaixarContaComDataPagamentoIgualDataVenciento(contaPagar.id)
			.then(() => {
			  this.messageHandler.showSuccess('Ação executada com sucesso!');
			  this.contaPagarList(0);
			})
			.catch((e) => {
				console.log('Erro ao executar a ação actionBaixarContaComDataPagamentoIgualDataVenciento: ' + e);
			  	this.messageHandler.showError('Não foi possível executar a ação.');
			});
	}
	
	actionEstornarPagamentoContaComUmCliqueWhen(contaPagar: ContaPagar) {
		return contaPagar.dataPagamento;
	}
	
	actionEstornarPagamentoContaComUmClique(contaPagar: ContaPagar) {
		this.contaPagarService.actionEstornarPagamentoContaComUmClique(contaPagar.id)
			.then(() => {
			  this.messageHandler.showSuccess('Ação executada com sucesso!');
			  this.contaPagarList(0);
			})
			.catch((e) => {
				console.log('Erro ao executar a ação actionEstornarPagamentoContaComUmClique: ' + e);
			  	this.messageHandler.showError('Não foi possível executar a ação.');
			});
	}
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.financeiroContasPagarTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	
}
