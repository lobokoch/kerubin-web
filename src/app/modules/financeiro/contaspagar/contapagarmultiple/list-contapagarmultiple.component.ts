/**********************************************************************************************
Code generated by MKL Plug-in
Copyright: Kerubin - kerubin.platform@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import {ConfirmationService, LazyLoadEvent, SelectItem} from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import * as moment from 'moment';
import { MessageHandlerService } from 'src/app/core/message-handler.service';

import { ContaPagarMultipleService } from './contapagarmultiple.service';
import { FinanceiroContasPagarTranslationService } from './../i18n/financeiro-contaspagar-translation.service';
import { ContaPagarMultiple } from './contapagarmultiple.model';
import { ContaPagarMultipleListFilter } from './contapagarmultiple.model';
import { SortField } from './contapagarmultiple.model';

import { FornecedorAutoComplete } from './../fornecedor/fornecedor.model';

import { ContaBancariaAutoComplete } from './../contabancaria/contabancaria.model';

import { CartaoCreditoAutoComplete } from './../cartaocredito/cartaocredito.model';

import { PlanoContaAutoComplete } from './../planoconta/planoconta.model';

import { ContaPagarAutoComplete } from './../contapagar/contapagar.model';
import { ContaPagarMultipleSumFields } from './contapagarmultiple.model';

@Component({
  selector: 'app-list-contapagarmultiple',
  templateUrl: './list-contapagarmultiple.component.html',
  styleUrls: ['./list-contapagarmultiple.component.css']
})

export class ContaPagarMultipleListComponent implements OnInit {
	tableLoading = false;
	
	contaPagarMultipleListItems: ContaPagarMultiple[];
	contaPagarMultipleListTotalElements = 0;
	contaPagarMultipleListFilter = new ContaPagarMultipleListFilter();
	
	
	
	contaPagarMultipleSumFields = new ContaPagarMultipleSumFields();
	
	constructor(
	    private contaPagarMultipleService: ContaPagarMultipleService,
	    private financeiroContasPagarTranslationService: FinanceiroContasPagarTranslationService,
	    private confirmation: ConfirmationService,
	    private messageHandler: MessageHandlerService
	) { }
	
	ngOnInit() {
	}
	
	contaPagarMultipleList(pageNumber = 0) {
		this.tableLoading = true;
	    this.contaPagarMultipleListFilter.pageNumber = pageNumber;
	    this.contaPagarMultipleService
	    .contaPagarMultipleList(this.contaPagarMultipleListFilter)
	    .then(result => {
	    	try {
		      	this.contaPagarMultipleListItems = result.items;
		      	this.contaPagarMultipleListTotalElements = result.totalElements;
		      
				this.getContaPagarMultipleSumFields();
			} finally {
				this.tableLoading = false;
			}
	    })
	    .catch(e => {
	    	this.tableLoading = false;
	    });
		
	}
	
	getContaPagarMultipleSumFields() {
		this.tableLoading = true;
	    this.contaPagarMultipleService.getContaPagarMultipleSumFields(this.contaPagarMultipleListFilter)
		.then(response => {
			try {
				this.contaPagarMultipleSumFields = response;
			} finally {
				this.tableLoading = false;
			}
		})
		.catch(e => {
			this.tableLoading = false;
			this.messageHandler.showError(e);
		});
	}
	
	contaPagarMultipleFilterSearch() {
	    this.contaPagarMultipleList(0);
	}
	
	deleteContaPagarMultiple(contaPagarMultiple: ContaPagarMultiple) {
	    this.confirmation.confirm({
	      message: 'Confirma a exclusão do registro?',
	      accept: () => {
	        this.contaPagarMultipleService.delete(contaPagarMultiple.id)
	        .then(() => {
	          this.messageHandler.showSuccess('Registro excluído!');
	          this.contaPagarMultipleList(0);
	        })
	        .catch((e) => {
	          this.messageHandler.showError(e);
	        });
	      }
	    });
	}
	
	contaPagarMultipleListOnLazyLoad(event: LazyLoadEvent) {
	    if (event.multiSortMeta) {
	      this.contaPagarMultipleListFilter.sortFields = new Array(event.multiSortMeta.length);
	      event.multiSortMeta.forEach(sortField => {
	      	this.contaPagarMultipleListFilter.sortFields.push(new SortField(sortField.field, sortField.order));
	      });
	    } else {
	    	this.contaPagarMultipleListFilter.sortFields = new Array(1);
	    	this.contaPagarMultipleListFilter.sortFields.push(new SortField('id', 1)); // asc
	    }
	    const pageNumber = event.first / event.rows;
	    this.contaPagarMultipleList(pageNumber);
	}
	
	
	
	contaPagarMultipleFornecedorAutoCompleteFieldConverter(fornecedor: FornecedorAutoComplete) {
		if (fornecedor) {
			return (fornecedor.nome || '<nulo>');
		} else {
			return null;
		}
	}
	
	contaPagarMultipleContaBancariaAutoCompleteFieldConverter(contaBancaria: ContaBancariaAutoComplete) {
		if (contaBancaria) {
			return (contaBancaria.nomeTitular || '<nulo>') + ' - ' + (contaBancaria.numeroConta || '<nulo>');
		} else {
			return null;
		}
	}
	
	contaPagarMultipleCartaoCreditoAutoCompleteFieldConverter(cartaoCredito: CartaoCreditoAutoComplete) {
		if (cartaoCredito) {
			return (cartaoCredito.nomeTitular || '<nulo>') + ' - ' + (cartaoCredito.numeroCartao || '<nulo>');
		} else {
			return null;
		}
	}
	
	contaPagarMultiplePlanoContasAutoCompleteFieldConverter(planoContas: PlanoContaAutoComplete) {
		if (planoContas) {
			return (planoContas.codigo || '<nulo>') + ' - ' + (planoContas.descricao || '<nulo>');
		} else {
			return null;
		}
	}
	
	contaPagarMultipleContaPagarAutoCompleteFieldConverter(contaPagar: ContaPagarAutoComplete) {
		if (contaPagar) {
			return (contaPagar.descricao || '<nulo>');
		} else {
			return null;
		}
	}
	
	
	
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.financeiroContasPagarTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	
}
