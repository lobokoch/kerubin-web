/**********************************************************************************************
Code generated with MKL Plug-in version: 7.0.3
Code generated at time stamp: 2019-07-27T18:56:29.949
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import {ConfirmationService, LazyLoadEvent, SelectItem} from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import * as moment from 'moment';
import { MessageHandlerService } from 'src/app/core/message-handler.service';

import { CaixaLancamentoService } from './caixalancamento.service';
import { FinanceiroFluxoCaixaTranslationService } from './../i18n/financeiro-fluxocaixa-translation.service';
import { CaixaLancamento } from './caixalancamento.model';
import { CaixaLancamentoListFilter } from './caixalancamento.model';
import { SortField } from './caixalancamento.model';
import { CaixaLancamentoDescricaoAutoComplete } from './caixalancamento.model';

import { CaixaDiarioAutoComplete } from './../caixadiario/caixadiario.model';

import { ContaBancariaAutoComplete } from './../contabancaria/contabancaria.model';

import { CartaoCreditoAutoComplete } from './../cartaocredito/cartaocredito.model';

import { PlanoContaAutoComplete } from './../planoconta/planoconta.model';

import { ClienteAutoComplete } from './../cliente/cliente.model';

import { FornecedorAutoComplete } from './../fornecedor/fornecedor.model';
import { CaixaLancamentoSumFields } from './caixalancamento.model';

@Component({
  selector: 'app-list-caixalancamento.component',
  templateUrl: './list-caixalancamento.component.html',
  styleUrls: ['./list-caixalancamento.component.css']
})

export class CaixaLancamentoListComponent implements OnInit {
	
	caixaLancamentoListItems: CaixaLancamento[];
	caixaLancamentoListTotalElements = 0;
	caixaLancamentoListFilter = new CaixaLancamentoListFilter();
	
	caixaLancamentoDescricaoAutoCompleteSuggestions: CaixaLancamentoDescricaoAutoComplete[];
	
	caixaLancamentoDataLancamentoIsBetweenOptionsSelected: SelectItem = {label: 'Minha competência', value: '12'};
	
	dateFilterIntervalDropdownItems: SelectItem[];
	
	caixaLancamentoSumFields = new CaixaLancamentoSumFields();
	
	constructor(
	    private caixaLancamentoService: CaixaLancamentoService,
	    private financeiroFluxoCaixaTranslationService: FinanceiroFluxoCaixaTranslationService,
	    private confirmation: ConfirmationService,
	    private messageHandler: MessageHandlerService
	) { }
	
	ngOnInit() {
		this.caixaLancamentoDataLancamentoIsBetweenOptionsOnClick(null);
		this.initializeDateFilterIntervalDropdownItems();
		
		
	}
	
	caixaLancamentoList(pageNumber = 0) {
	    this.caixaLancamentoListFilter.pageNumber = pageNumber;
	    this.caixaLancamentoService
	    .caixaLancamentoList(this.caixaLancamentoListFilter)
	    .then(result => {
	      	this.caixaLancamentoListItems = result.items;
	      	this.caixaLancamentoListTotalElements = result.totalElements;
	      
			this.getCaixaLancamentoSumFields();
	    });
		
	}
	
	getCaixaLancamentoSumFields() {
	    this.caixaLancamentoService.getCaixaLancamentoSumFields(this.caixaLancamentoListFilter)
		.then(response => {
		  this.caixaLancamentoSumFields = response;
		})
		.catch(error => {
		  this.messageHandler.showError('Erro ao buscar totais:' + error);
		});
	}
	
	caixaLancamentoFilterSearch() {
	    this.caixaLancamentoList(0);
	}
	
	deleteCaixaLancamento(caixaLancamento: CaixaLancamento) {
	    this.confirmation.confirm({
	      message: 'Confirma a exclusão do registro?',
	      accept: () => {
	        this.caixaLancamentoService.delete(caixaLancamento.id)
	        .then(() => {
	          this.messageHandler.showSuccess('Registro excluído!');
	          this.caixaLancamentoList(0);
	        })
	        .catch((e) => {
	          this.messageHandler.showError('Erro ao excluir registro: ' + e);
	        });
	      }
	    });
	}
	
	caixaLancamentoListOnLazyLoad(event: LazyLoadEvent) {
	    if (event.sortField) {
	      this.caixaLancamentoListFilter.sortField = new SortField(event.sortField, event.sortOrder);
	    } else {
	      this.caixaLancamentoListFilter.sortField = new SortField('dataLancamento', 0); // asc
	    }
	    const pageNumber = event.first / event.rows;
	    this.caixaLancamentoList(pageNumber);
	}
	
	caixaLancamentoDescricaoAutoComplete(event) {
	    const query = event.query;
	    this.caixaLancamentoService.caixaLancamentoDescricaoAutoComplete(query)
	    .then((result) => {
	      this.caixaLancamentoDescricaoAutoCompleteSuggestions = result;
	    })
	    .catch(erro => {
	      this.messageHandler.showError('Erro ao buscar registros com o termo: ' + query);
	    });
	}
	
	
	caixaLancamentoCaixaDiarioAutoCompleteFieldConverter(caixaDiario: CaixaDiarioAutoComplete) {
		if (caixaDiario) {
			return (caixaDiario.caixa.nome || '<nulo>') + ' - ' + (moment(caixaDiario.dataHoraAbertura).format('DD/MM/YYYY H:m') || '<nulo>');
		} else {
			return null;
		}
	}
	
	caixaLancamentoContaBancariaAutoCompleteFieldConverter(contaBancaria: ContaBancariaAutoComplete) {
		if (contaBancaria) {
			return (contaBancaria.nomeTitular || '<nulo>') + ' - ' + (contaBancaria.numeroConta || '<nulo>');
		} else {
			return null;
		}
	}
	
	caixaLancamentoCartaoCreditoAutoCompleteFieldConverter(cartaoCredito: CartaoCreditoAutoComplete) {
		if (cartaoCredito) {
			return (cartaoCredito.nomeTitular || '<nulo>') + ' - ' + (cartaoCredito.numeroCartao || '<nulo>');
		} else {
			return null;
		}
	}
	
	caixaLancamentoPlanoContasAutoCompleteFieldConverter(planoContas: PlanoContaAutoComplete) {
		if (planoContas) {
			return (planoContas.descricao || '<nulo>');
		} else {
			return null;
		}
	}
	
	caixaLancamentoClienteAutoCompleteFieldConverter(cliente: ClienteAutoComplete) {
		if (cliente) {
			return (cliente.nome || '<nulo>');
		} else {
			return null;
		}
	}
	
	caixaLancamentoFornecedorAutoCompleteFieldConverter(fornecedor: FornecedorAutoComplete) {
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
	
	
	caixaLancamentoDataLancamentoIsBetweenOptionsOnClick(dropdown: Dropdown) {
		this.caixaLancamentoListFilter.dataLancamentoFrom = null;
		this.caixaLancamentoListFilter.dataLancamentoTo = null;
		
		let dateFrom = null;
		let dateTo = null;
	
		const valor = Number(this.caixaLancamentoDataLancamentoIsBetweenOptionsSelected.value);
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
		  this.caixaLancamentoListFilter.dataLancamentoFrom = dateFrom.toDate();
		}
		
		if (dateTo != null) {
		  this.caixaLancamentoListFilter.dataLancamentoTo = dateTo.toDate();
		}
		
		if (dateFrom != null && dateTo != null) {
		  // this.caixaLancamentoList(0);
		}
	}
	
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.financeiroFluxoCaixaTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	
	doShowNumberAsNegative(value: any) {
	    if (value) {
	      return value * -1;
	    }
	    return value;
	  }
	  
	
	caixaLancamentoRuleDisableCUD(caixaLancamento: CaixaLancamento) {
		const expression = caixaLancamento.id && (String(caixaLancamento.caixaDiario.caixaDiarioSituacao) !== 'ABERTO');
		return expression;
		
	}
}
