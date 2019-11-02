/**********************************************************************************************
Code generated with MKL Plug-in version: 26.0.4
Code generated at time stamp: 2019-10-17T21:44:20.610
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit, Input } from '@angular/core';
import {ConfirmationService, LazyLoadEvent, SelectItem} from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import * as moment from 'moment';
import { MessageHandlerService } from 'src/app/core/message-handler.service';

import { ConciliacaoTransacaoService } from './conciliacaotransacao.service';
import { CadastrosBancoTranslationService } from './../i18n/cadastros-banco-translation.service';
import { ConciliacaoTransacao } from './conciliacaotransacao.model';
import { ConciliacaoTransacaoListFilter } from './conciliacaotransacao.model';
import { SortField } from './conciliacaotransacao.model';

import { ConciliacaoBancariaAutoComplete } from './../conciliacaobancaria/conciliacaobancaria.model';

@Component({
  selector: 'app-list-conciliacaotransacao',
  templateUrl: './list-conciliacaotransacao.component.html',
  styleUrls: ['./list-conciliacaotransacao.component.css']
})

export class ConciliacaoTransacaoListComponent implements OnInit {

	conciliacaoTransacaoListItems: ConciliacaoTransacao[];
	conciliacaoTransacaoListTotalElements = 0;
	conciliacaoTransacaoListFilter = new ConciliacaoTransacaoListFilter();

  @Input() conciliacaoBancariaId: string;


	constructor(
	    private conciliacaoTransacaoService: ConciliacaoTransacaoService,
	    private cadastrosBancoTranslationService: CadastrosBancoTranslationService,
	    private confirmation: ConfirmationService,
	    private messageHandler: MessageHandlerService
	) { }

	ngOnInit() {
    console.log('ConciliacaoTransacaoListComponent.ngOnInit');
    this.conciliacaoTransacaoList(0);
  }

	conciliacaoTransacaoList(pageNumber = 0) {
      if (!this.conciliacaoBancariaId) {
        console.log('SKIP conciliacaoTransacaoList');
        return;
      } else {
        console.log('WILL CALL conciliacaoTransacaoList');
      }

      this.conciliacaoTransacaoListFilter.pageNumber = pageNumber;

      /*if (!this.conciliacaoBancariaId) {
        this.conciliacaoBancariaId = '61ebbc2b-b1df-45a6-adc4-cd880f9b794f';
      }*/

      console.log('Chamou conciliacaoTransacaoList, this.conciliacaoBancariaId=' + this.conciliacaoBancariaId);

	    this.conciliacaoTransacaoListFilter.conciliacaoBancariaId = this.conciliacaoBancariaId;
	    this.conciliacaoTransacaoService
	    .conciliacaoTransacaoList(this.conciliacaoTransacaoListFilter)
	    .then(result => {
	      	this.conciliacaoTransacaoListItems = result.items;
	      	this.conciliacaoTransacaoListTotalElements = result.totalElements;

	    });

	}


	conciliacaoTransacaoFilterSearchByConciliacaoId(id: string) {
    this.conciliacaoBancariaId = id;
    this.conciliacaoTransacaoFilterSearch();
  }

	conciliacaoTransacaoFilterSearch() {
      this.conciliacaoTransacaoList(0);

	    this.conciliacaoTransacaoList(0);
	}

	deleteConciliacaoTransacao(conciliacaoTransacao: ConciliacaoTransacao) {
	    this.confirmation.confirm({
	      message: 'Confirma a exclusão do registro?',
	      accept: () => {
	        this.conciliacaoTransacaoService.delete(conciliacaoTransacao.id)
	        .then(() => {
	          this.messageHandler.showSuccess('Registro excluído!');
	          this.conciliacaoTransacaoList(0);
	        })
	        .catch((e) => {
	          this.messageHandler.showError(e);
	        });
	      }
	    });
	}

	conciliacaoTransacaoListOnLazyLoad(event: LazyLoadEvent) {
	    if (event.sortField) {
	      this.conciliacaoTransacaoListFilter.sortField = new SortField(event.sortField, event.sortOrder);
	    } else {
	      this.conciliacaoTransacaoListFilter.sortField = new SortField('id', 1); // asc
	    }
	    const pageNumber = event.first / event.rows;
	    this.conciliacaoTransacaoList(pageNumber);
	}



	conciliacaoTransacaoConciliacaoBancariaAutoCompleteFieldConverter(conciliacaoBancaria: ConciliacaoBancariaAutoComplete) {
		if (conciliacaoBancaria) {
			return (conciliacaoBancaria.bancoId || '<nulo>');
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
