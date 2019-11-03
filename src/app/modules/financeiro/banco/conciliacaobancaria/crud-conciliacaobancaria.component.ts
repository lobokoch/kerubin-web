import { ConciliacaoTransacaoListComponent } from './../conciliacaotransacao/list-conciliacaotransacao.component';
/**********************************************************************************************
Code generated with MKL Plug-in version: 26.0.4
Code generated at time stamp: 2019-10-18T05:55:37.138
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { ConciliacaoBancaria } from './conciliacaobancaria.model';
import { ConciliacaoBancariaService } from './conciliacaobancaria.service';
import { CadastrosBancoTranslationService } from './../i18n/cadastros-banco-translation.service';
import * as moment from 'moment';

import { SituacaoConciliacao } from './../enums/cadastros-banco-enums.model';
import { MessageHandlerService } from 'src/app/core/message-handler.service';


@Component({
  selector: 'app-crud-conciliacaobancaria',
  templateUrl: './crud-conciliacaobancaria.component.html',
  styleUrls: ['./crud-conciliacaobancaria.component.css']
})

export class ConciliacaoBancariaComponent implements OnInit {


  arquivoConciliacao: any[] = [];

  calendarLocale: any;

  conciliacaoId: string;

	conciliacaoBancaria = new ConciliacaoBancaria();
  conciliacaoBancariaSituacaoConciliacaoOptions: SituacaoConciliacao[];

  @ViewChild('conciliacaoTransacaoList') conciliacaoTransacaoList: ConciliacaoTransacaoListComponent;

	// Begin polling reference variables
	private pollingRecarregarConciliacaoRef: any;
	// End polling reference variables

	constructor(
	    private conciliacaoBancariaService: ConciliacaoBancariaService,
	    private cadastrosBancoTranslationService: CadastrosBancoTranslationService,
	    private route: ActivatedRoute,
	    private messageHandler: MessageHandlerService
	) {
		this.initializeConciliacaoBancariaSituacaoConciliacaoOptions();
  }

  get urlUploadArquivoConciliacao() {
    return this.conciliacaoBancariaService.getUrlUploadArquivoConciliacao();
  }

  antesUploadAnexo(event) {
    console.log('antesUploadAnexo:' + event);
    event.xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  onUploadError(event) {
    this.conciliacaoId = null;
    console.log('Erro no upload:' + event);
  }

  onUploadCompleted(event) {
    console.log(event.originalEvent.body);
    console.log(event.originalEvent.body.conciliacaoId);

    this.conciliacaoId = null;
    if (event && event.originalEvent && event.originalEvent.body && event.originalEvent.body.conciliacaoId) {
      this.conciliacaoId = event.originalEvent.body.conciliacaoId;
      this.startPollingRecarregarConciliacao();
    }
  }

	ngOnInit() {
		this.initLocaleSettings();
		this.initializeEnumFieldsWithDefault();
	    const id = this.route.snapshot.params['id'];
	    if (id) {
	      this.getConciliacaoBancariaById(id);
	    }
	}

	begin(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
	      this.conciliacaoBancaria = new ConciliacaoBancaria();
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

	    this.conciliacaoBancariaService.create(this.conciliacaoBancaria)
	    .then((conciliacaoBancaria) => {
	      this.conciliacaoBancaria = conciliacaoBancaria;
	      this.messageHandler.showSuccess('Registro criado com sucesso!');
	    }).
	    catch(error => {
	      this.messageHandler.showError(error);
	    });
	}

	update() {
	    this.conciliacaoBancariaService.update(this.conciliacaoBancaria)
	    .then((conciliacaoBancaria) => {
	      this.conciliacaoBancaria = conciliacaoBancaria;
	      this.messageHandler.showSuccess('Registro alterado!');
	    })
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
  }

  getConciliacaoBancariaByIdPolling(id: string) {
    this.conciliacaoBancariaService.retrieve(id)
    .then((conciliacaoBancaria) => {
      this.conciliacaoBancaria = conciliacaoBancaria;
      const situacao = this.conciliacaoBancaria.situacaoConciliacao;
      console.log('situacaoConciliacao:' + situacao);
      if ('TRANSACOES_ANALISADAS' === String(situacao)) {
        this.stopPollingRecarregarConciliacao();
      }
    })
    .catch(error => {
      console.log('Erro obtendo conciliacaobancária via pooling: ' + error);
    });
}

	getConciliacaoBancariaById(id: string) {
	    this.conciliacaoBancariaService.retrieve(id)
      .then((conciliacaoBancaria) => {
        this.conciliacaoBancaria = conciliacaoBancaria;
        this.conciliacaoId = this.conciliacaoBancaria.id;
        this.loadConciliacaoTransacaoList();
        })
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}

	get isEditing() {
	    return Boolean(this.conciliacaoBancaria.id);
	}

	initializeEnumFieldsWithDefault() {
		this.conciliacaoBancaria.situacaoConciliacao = this.conciliacaoBancariaSituacaoConciliacaoOptions[1].value;
	}



	private initializeConciliacaoBancariaSituacaoConciliacaoOptions() {
	    this.conciliacaoBancariaSituacaoConciliacaoOptions = [
	    	{ label: 'Selecione um item', value: null },
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoBancaria_situacaoConciliacao_nao_conciliado'), value: 'NAO_CONCILIADO' },
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoBancaria_situacaoConciliacao_analisando_transacoes'), value: 'ANALISANDO_TRANSACOES' },
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoBancaria_situacaoConciliacao_transacoes_analisadas'), value: 'TRANSACOES_ANALISADAS' },
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoBancaria_situacaoConciliacao_conciliado_transacoes'), value: 'CONCILIADO_TRANSACOES' },
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoBancaria_situacaoConciliacao_conciliado_com_erro'), value: 'CONCILIADO_COM_ERRO' },
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoBancaria_situacaoConciliacao_conciliado'), value: 'CONCILIADO' }
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

  loadConciliacaoTransacaoList() {
    this.conciliacaoTransacaoList.conciliacaoTransacaoListFilter.conciliacaoBancariaId = this.conciliacaoId;
    this.conciliacaoTransacaoList.conciliacaoTransacaoFilterSearch();
  }

	// Begin polling methods for: recarregarConciliacao
	startPollingRecarregarConciliacao() {
    	this.loadConciliacaoTransacaoList();
    	this.conciliacaoTransacaoList.startPollingRecarregarTransacoes();

	  this.pollingRecarregarConciliacaoRef = setInterval(() => {
	    this.runPollingRecarregarConciliacao();
	  }, 3000);
	}

	stopPollingRecarregarConciliacao() {
    this.conciliacaoTransacaoList.stopPollingRecarregarTransacoes();
	  clearInterval(this.pollingRecarregarConciliacaoRef);
	}

	runPollingRecarregarConciliacao() {
	  this.getConciliacaoBancariaByIdPolling(this.conciliacaoId);
	}
	// End polling methods for: recarregarConciliacao

}
