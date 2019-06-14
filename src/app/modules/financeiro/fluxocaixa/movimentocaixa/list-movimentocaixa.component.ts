/**********************************************************************************************
Code generated with MKL Plug-in version: 3.9.0
Code generated at time stamp: 2019-06-14T00:00:25.670
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import {ConfirmationService, LazyLoadEvent, SelectItem} from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import * as moment from 'moment';
import { MessageHandlerService } from 'src/app/core/message-handler.service';

import { MovimentoCaixaService } from './movimentocaixa.service';
import { FinanceiroFluxoCaixaTranslationService } from './../i18n/financeiro-fluxocaixa-translation.service';
import { MovimentoCaixa } from './movimentocaixa.model';
import { MovimentoCaixaListFilter } from './movimentocaixa.model';
import { SortField } from './movimentocaixa.model';

import { CaixaAutoComplete } from './../caixa/caixa.model';

import { PlanoContaAutoComplete } from './../planoconta/planoconta.model';

import { ContaBancariaAutoComplete } from './../contabancaria/contabancaria.model';

import { CartaoCreditoAutoComplete } from './../cartaocredito/cartaocredito.model';

import { ClienteAutoComplete } from './../cliente/cliente.model';

import { FornecedorAutoComplete } from './../fornecedor/fornecedor.model';

@Component({
  selector: 'app-list-movimentocaixa.component',
  templateUrl: './list-movimentocaixa.component.html',
  styleUrls: ['./list-movimentocaixa.component.css']
})

export class MovimentoCaixaListComponent implements OnInit {
	
	movimentoCaixaListItems: MovimentoCaixa[];
	movimentoCaixaListTotalElements = 0;
	movimentoCaixaListFilter = new MovimentoCaixaListFilter();
	
	
	
	constructor(
	    private movimentoCaixaService: MovimentoCaixaService,
	    private financeiroFluxoCaixaTranslationService: FinanceiroFluxoCaixaTranslationService,
	    private confirmation: ConfirmationService,
	    private messageHandler: MessageHandlerService
	) { }
	
	ngOnInit() {
	}
	
	movimentoCaixaList(pageNumber = 0) {
	    this.movimentoCaixaListFilter.pageNumber = pageNumber;
	    this.movimentoCaixaService
	    .movimentoCaixaList(this.movimentoCaixaListFilter)
	    .then(result => {
	      	this.movimentoCaixaListItems = result.items;
	      	this.movimentoCaixaListTotalElements = result.totalElements;
	      
	    });
		
	}
	
	
	movimentoCaixaFilterSearch() {
	    this.movimentoCaixaList(0);
	}
	
	deleteMovimentoCaixa(movimentoCaixa: MovimentoCaixa) {
	    this.confirmation.confirm({
	      message: 'Confirma a exclusão do registro?',
	      accept: () => {
	        this.movimentoCaixaService.delete(movimentoCaixa.id)
	        .then(() => {
	          this.messageHandler.showSuccess('Registro excluído!');
	          this.movimentoCaixaList(0);
	        })
	        .catch((e) => {
	          this.messageHandler.showError('Erro ao excluir registro: ' + e);
	        });
	      }
	    });
	}
	
	movimentoCaixaListOnLazyLoad(event: LazyLoadEvent) {
	    if (event.sortField) {
	      this.movimentoCaixaListFilter.sortField = new SortField(event.sortField, event.sortOrder);
	    } else {
	      this.movimentoCaixaListFilter.sortField = new SortField('id', 1); // asc
	    }
	    const pageNumber = event.first / event.rows;
	    this.movimentoCaixaList(pageNumber);
	}
	
	
	movimentoCaixaCaixaAutoCompleteFieldConverter(caixa: CaixaAutoComplete) {
		if (caixa) {
			return caixa.nome;
		} else {
			return null;
		}
	}
	
	movimentoCaixaPlanoContasAutoCompleteFieldConverter(planoContas: PlanoContaAutoComplete) {
		if (planoContas) {
			return planoContas.codigo + ' - ' + planoContas.descricao;
		} else {
			return null;
		}
	}
	
	movimentoCaixaContaBancariaAutoCompleteFieldConverter(contaBancaria: ContaBancariaAutoComplete) {
		if (contaBancaria) {
			return contaBancaria.nomeTitular + ' - ' + contaBancaria.numeroConta;
		} else {
			return null;
		}
	}
	
	movimentoCaixaCartaoCreditoAutoCompleteFieldConverter(cartaoCredito: CartaoCreditoAutoComplete) {
		if (cartaoCredito) {
			return cartaoCredito.nomeTitular + ' - ' + cartaoCredito.numeroCartao;
		} else {
			return null;
		}
	}
	
	movimentoCaixaClienteAutoCompleteFieldConverter(cliente: ClienteAutoComplete) {
		if (cliente) {
			return cliente.nome + ' - ' + cliente.cpfCNPJ;
		} else {
			return null;
		}
	}
	
	movimentoCaixaFornecedorAutoCompleteFieldConverter(fornecedor: FornecedorAutoComplete) {
		if (fornecedor) {
			return fornecedor.nome + ' - ' + fornecedor.cpfCNPJ;
		} else {
			return null;
		}
	}
	
	
	
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.financeiroFluxoCaixaTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
}
