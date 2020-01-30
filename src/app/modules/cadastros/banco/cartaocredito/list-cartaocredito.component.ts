/**********************************************************************************************
Code generated with MKL Plug-in version: 60.0.6
Copyright: Kerubin - kerubin.platform@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import {ConfirmationService, LazyLoadEvent, SelectItem} from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import * as moment from 'moment';
import { MessageHandlerService } from 'src/app/core/message-handler.service';

import { CartaoCreditoService } from './cartaocredito.service';
import { CadastrosBancoTranslationService } from './../i18n/cadastros-banco-translation.service';
import { CartaoCredito } from './cartaocredito.model';
import { CartaoCreditoListFilter } from './cartaocredito.model';
import { SortField } from './cartaocredito.model';

import { BancoAutoComplete } from './../banco/banco.model';

import { BandeiraCartaoAutoComplete } from './../bandeiracartao/bandeiracartao.model';

@Component({
  selector: 'app-list-cartaocredito',
  templateUrl: './list-cartaocredito.component.html',
  styleUrls: ['./list-cartaocredito.component.css']
})

export class CartaoCreditoListComponent implements OnInit {
	tableLoading = false;
	
	cartaoCreditoListItems: CartaoCredito[];
	cartaoCreditoListTotalElements = 0;
	cartaoCreditoListFilter = new CartaoCreditoListFilter();
	
	
	
	
	constructor(
	    private cartaoCreditoService: CartaoCreditoService,
	    private cadastrosBancoTranslationService: CadastrosBancoTranslationService,
	    private confirmation: ConfirmationService,
	    private messageHandler: MessageHandlerService
	) { }
	
	ngOnInit() {
	}
	
	cartaoCreditoList(pageNumber = 0) {
		this.tableLoading = true;
	    this.cartaoCreditoListFilter.pageNumber = pageNumber;
	    this.cartaoCreditoService
	    .cartaoCreditoList(this.cartaoCreditoListFilter)
	    .then(result => {
	    	try {
		      	this.cartaoCreditoListItems = result.items;
		      	this.cartaoCreditoListTotalElements = result.totalElements;
		      
			} finally {
				this.tableLoading = false;
			}
	    })
	    .catch(e => {
	    	this.tableLoading = false;
	    });
		
	}
	
	
	cartaoCreditoFilterSearch() {
	    this.cartaoCreditoList(0);
	}
	
	deleteCartaoCredito(cartaoCredito: CartaoCredito) {
	    this.confirmation.confirm({
	      message: 'Confirma a exclusão do registro?',
	      accept: () => {
	        this.cartaoCreditoService.delete(cartaoCredito.id)
	        .then(() => {
	          this.messageHandler.showSuccess('Registro excluído!');
	          this.cartaoCreditoList(0);
	        })
	        .catch((e) => {
	          this.messageHandler.showError(e);
	        });
	      }
	    });
	}
	
	cartaoCreditoListOnLazyLoad(event: LazyLoadEvent) {
	    if (event.multiSortMeta) {
	      this.cartaoCreditoListFilter.sortFields = new Array(event.multiSortMeta.length);
	      event.multiSortMeta.forEach(sortField => {
	      	this.cartaoCreditoListFilter.sortFields.push(new SortField(sortField.field, sortField.order));
	      });
	    } else {
	    	this.cartaoCreditoListFilter.sortFields = new Array(1);
	    	this.cartaoCreditoListFilter.sortFields.push(new SortField('id', 1)); // asc
	    }
	    const pageNumber = event.first / event.rows;
	    this.cartaoCreditoList(pageNumber);
	}
	
	
	
	cartaoCreditoBancoAutoCompleteFieldConverter(banco: BancoAutoComplete) {
		if (banco) {
			return (banco.numero || '<nulo>') + ' - ' + (banco.nome || '<nulo>');
		} else {
			return null;
		}
	}
	
	cartaoCreditoBandeiraCartaoAutoCompleteFieldConverter(bandeiraCartao: BandeiraCartaoAutoComplete) {
		if (bandeiraCartao) {
			return (bandeiraCartao.nomeBandeira || '<nulo>');
		} else {
			return null;
		}
	}
	
	
	
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.cadastrosBancoTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	
}
