/**********************************************************************************************
Code generated with MKL Plug-in version: 26.0.4
Code generated at time stamp: 2019-10-17T21:44:20.610
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { ConciliacaoTransacao } from './conciliacaotransacao.model';
import { ConciliacaoTransacaoService } from './conciliacaotransacao.service';
import { CadastrosBancoTranslationService } from './../i18n/cadastros-banco-translation.service';
import * as moment from 'moment';

import { ConciliacaoBancariaService } from './../conciliacaobancaria/conciliacaobancaria.service';
import { ConciliacaoBancaria } from './../conciliacaobancaria/conciliacaobancaria.model';
import { ConciliacaoBancariaAutoComplete } from './../conciliacaobancaria/conciliacaobancaria.model';

import { TipoTransacao } from './../enums/cadastros-banco-enums.model';

import { SituacaoConciliacaoTrn } from './../enums/cadastros-banco-enums.model';
import { MessageHandlerService } from 'src/app/core/message-handler.service';


@Component({
  selector: 'app-crud-conciliacaotransacao',
  templateUrl: './crud-conciliacaotransacao.component.html',
  styleUrls: ['./crud-conciliacaotransacao.component.css']
})

export class ConciliacaoTransacaoComponent implements OnInit {

	calendarLocale: any;

	conciliacaoTransacao = new ConciliacaoTransacao();
	conciliacaoTransacaoConciliacaoBancariaAutoCompleteSuggestions: ConciliacaoBancariaAutoComplete[];
	conciliacaoTransacaoTrnTipoOptions: TipoTransacao[];


	conciliacaoTransacaoSituacaoConciliacaoTrnOptions: SituacaoConciliacaoTrn[];

	constructor(
	    private conciliacaoTransacaoService: ConciliacaoTransacaoService,
	    private cadastrosBancoTranslationService: CadastrosBancoTranslationService,
	    private conciliacaoBancariaService: ConciliacaoBancariaService,
	    private route: ActivatedRoute,
	    private messageHandler: MessageHandlerService
	) {
		this.initializeConciliacaoTransacaoTrnTipoOptions();

		this.initializeConciliacaoTransacaoSituacaoConciliacaoTrnOptions();
	}

	ngOnInit() {
		this.initLocaleSettings();
		this.initializeEnumFieldsWithDefault();
	    const id = this.route.snapshot.params['id'];
	    if (id) {
	      this.getConciliacaoTransacaoById(id);
	    }
	}

	begin(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
	      this.conciliacaoTransacao = new ConciliacaoTransacao();
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

	    this.conciliacaoTransacaoService.create(this.conciliacaoTransacao)
	    .then((conciliacaoTransacao) => {
	      this.conciliacaoTransacao = conciliacaoTransacao;
	      this.messageHandler.showSuccess('Registro criado com sucesso!');
	    }).
	    catch(error => {
	      this.messageHandler.showError(error);
	    });
	}

	update() {
	    this.conciliacaoTransacaoService.update(this.conciliacaoTransacao)
	    .then((conciliacaoTransacao) => {
	      this.conciliacaoTransacao = conciliacaoTransacao;
	      this.messageHandler.showSuccess('Registro alterado!');
	    })
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}

	getConciliacaoTransacaoById(id: string) {
	    this.conciliacaoTransacaoService.retrieve(id)
	    .then((conciliacaoTransacao) => this.conciliacaoTransacao = conciliacaoTransacao)
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}

	get isEditing() {
	    return Boolean(this.conciliacaoTransacao.id);
	}

	initializeEnumFieldsWithDefault() {
		this.conciliacaoTransacao.trnTipo = this.conciliacaoTransacaoTrnTipoOptions[1].value;
		this.conciliacaoTransacao.situacaoConciliacaoTrn = this.conciliacaoTransacaoSituacaoConciliacaoTrnOptions[1].value;
	}


	conciliacaoTransacaoConciliacaoBancariaAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.conciliacaoTransacao.conciliacaoBancaria = null;
	}

	conciliacaoTransacaoConciliacaoBancariaAutoCompleteOnBlur(event) {
		// Seems a PrimeNG bug, if clear an autocomplete field, on onBlur event, the null value is empty string.
		// Until PrimeNG version: 7.1.3.
		if (String(this.conciliacaoTransacao.conciliacaoBancaria) === '') {
			this.conciliacaoTransacao.conciliacaoBancaria = null;
		}
	}

	conciliacaoTransacaoConciliacaoBancariaAutoComplete(event) {
	    const query = event.query;
	    this.conciliacaoTransacaoService
	      .conciliacaoBancariaConciliacaoBancariaAutoComplete(query)
	      .then((result) => {
	        this.conciliacaoTransacaoConciliacaoBancariaAutoCompleteSuggestions = result as ConciliacaoBancariaAutoComplete[];
	      })
	      .catch(error => {
	        this.messageHandler.showError(error);
	      });
	}

	conciliacaoTransacaoConciliacaoBancariaAutoCompleteFieldConverter(conciliacaoBancaria: ConciliacaoBancariaAutoComplete) {
		let text = '';
		if (conciliacaoBancaria) {
			if (conciliacaoBancaria.bancoId) {
			    if (text !== '') {
			      text += ' - ';
			    }
			    text += conciliacaoBancaria.bancoId;
			}

		}

		if (text === '') {
			text = null;
		}
		return text;
	}

	private initializeConciliacaoTransacaoTrnTipoOptions() {
	    this.conciliacaoTransacaoTrnTipoOptions = [
	    	{ label: 'Selecione um item', value: null },
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacao_trnTipo_credito'), value: 'CREDITO' },
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacao_trnTipo_debito'), value: 'DEBITO' }
	    ];
	}

	private initializeConciliacaoTransacaoSituacaoConciliacaoTrnOptions() {
	    this.conciliacaoTransacaoSituacaoConciliacaoTrnOptions = [
	    	{ label: 'Selecione um item', value: null },
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacao_situacaoConciliacaoTrn_nao_conciliado'), value: 'NAO_CONCILIADO' },
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacao_situacaoConciliacaoTrn_conciliar_contas_pagar'), value: 'CONCILIAR_CONTAS_PAGAR' },
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacao_situacaoConciliacaoTrn_conciliado_contas_pagar'), value: 'CONCILIADO_CONTAS_PAGAR' },
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacao_situacaoConciliacaoTrn_conciliar_contas_receber'), value: 'CONCILIAR_CONTAS_RECEBER' },
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacao_situacaoConciliacaoTrn_conciliado_contas_receber'), value: 'CONCILIADO_CONTAS_RECEBER' },
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacao_situacaoConciliacaoTrn_conciliar_caixa'), value: 'CONCILIAR_CAIXA' },
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacao_situacaoConciliacaoTrn_conciliado_caixa'), value: 'CONCILIADO_CAIXA' },
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoTransacao_situacaoConciliacaoTrn_cancelado'), value: 'CANCELADO' }
	    ];
	}


	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.cadastrosBancoTranslationService.getTranslation(key);
		return value;

		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}





	initLocaleSettings() {
		this.calendarLocale = this.cadastrosBancoTranslationService.getCalendarLocaleSettings();
	}


}
