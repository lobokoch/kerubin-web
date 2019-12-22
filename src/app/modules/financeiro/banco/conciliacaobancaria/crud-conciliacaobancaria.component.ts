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

const instrucoes_header = 'Tudo pronto para aplicar a conciliação, clique aqui caso precise de mais instruções.';

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
	private pollingRecarregarConciliacaoRef: any = null;
  // End polling reference variables


  instrucoesHeader = '';
  instrucoesHeader1 = '';
  instrucoesHeader2 = '';
  private countConciliacaoTransacaoComMaisDeUmTitulo = -1;

	constructor(
	    private conciliacaoBancariaService: ConciliacaoBancariaService,
	    private cadastrosBancoTranslationService: CadastrosBancoTranslationService,
	    private route: ActivatedRoute,
	    private messageHandler: MessageHandlerService
	) {
		this.initializeConciliacaoBancariaSituacaoConciliacaoOptions();
  }

  onTransacaoAlterada(conciliacaoTransacao) {
    this.getInstrucoesHeader();
  }

  getInstrucoesHeader() {

    this.instrucoesHeader = '';
    this.instrucoesHeader1 = '';
    this.instrucoesHeader2 = '';

    this.instrucoesHeader = 'Processando, aguarde...';
    this.conciliacaoBancariaService.getCountConciliacaoTransacaoComMaisDeUmTitulo(this.conciliacaoId).then(count => {
      this.instrucoesHeader = instrucoes_header;
      this.countConciliacaoTransacaoComMaisDeUmTitulo = count;
      if (count > 0) {
        this.instrucoesHeader1 = ` (transações com mais de 1 título associado: ${count})`;
        this.instrucoesHeader = 'Quase pronto, clique aqui para ver as instruções' + this.instrucoesHeader1 + this.instrucoesHeader2;
      }
    })
    .then(() => {
      this.conciliacaoBancariaService.getCountConciliacaoTransacaoComTitulosRepetidos(this.conciliacaoId).then(count => {
        if (count > 0) {
          this.instrucoesHeader2 = ` (Títulos associados a mais de 1 transação: ${count})`;
          this.instrucoesHeader = 'Quase pronto, clique aqui para ver as instruções' + this.instrucoesHeader1 + this.instrucoesHeader2;
        }
      });
    })
    .catch(error => {
      console.log('Erro em getInstrucoesHeader:' + error);
      this.instrucoesHeader = 'Ops! Ocorreu um erro.';
    });

  }

  get urlUploadArquivoConciliacao() {
    return this.conciliacaoBancariaService.getUrlUploadArquivoConciliacao();
  }

  antesUploadAnexo(event) {
    event.xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  onUploadError(event) {
    this.conciliacaoId = null;
    console.log('Erro no upload:' + event);
  }

  onUploadCompleted(event) {

    this.conciliacaoId = null;
    if (event && event.originalEvent && event.originalEvent.body && event.originalEvent.body.conciliacaoId) {
      this.conciliacaoId = event.originalEvent.body.conciliacaoId;

      this.startPollingRecarregarConciliacao();
    }
  }

	ngOnInit() {
    this.countConciliacaoTransacaoComMaisDeUmTitulo = -1;
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
      console.log('RECEBEU conciliacaoBancaria - id:' + conciliacaoBancaria);
      this.conciliacaoBancaria = conciliacaoBancaria;
      const situacao = this.conciliacaoBancaria.situacaoConciliacao;
      console.log('situacaoConciliacao:' + situacao);
      const sit = String(situacao);
      const stopPolling = ('TRANSACOES_ANALISADAS' === sit || 'CONCILIADO' === sit || 'CONCILIADO_COM_ERRO' === sit || 'CANCELADO' === sit);
      if (stopPolling) {
        this.stopPollingRecarregarConciliacao();
      }
    })
    .catch(error => {
      console.log('Erro obtendo conciliacaobancária via pooling: ' + error);
      console.log('Vai para o polling.');
      this.stopPollingRecarregarConciliacao();
    });
}

	getConciliacaoBancariaById(id: string) {
	    this.conciliacaoBancariaService.retrieve(id)
      .then((conciliacaoBancaria) => {
        this.conciliacaoBancaria = conciliacaoBancaria;
        this.conciliacaoId = this.conciliacaoBancaria.id;

        this.getInstrucoesHeader();
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
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoBancaria_situacaoConciliacao_conciliando_transacoes'), value: 'CONCILIANDO_TRANSACOES' },
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoBancaria_situacaoConciliacao_conciliado'), value: 'CONCILIADO' },
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoBancaria_situacaoConciliacao_conciliado_com_erro'), value: 'CONCILIADO_COM_ERRO' },
	    	{ label: this.getTranslation('cadastros.banco.conciliacaoBancaria_situacaoConciliacao_cancelado'), value: 'CANCELADO' }
	    ];
	}


	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.cadastrosBancoTranslationService.getTranslation(key);
		return value;

		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}

	aplicarConciliacaoWhenCondition(): boolean {
		return this.conciliacaoBancaria.id && (String(this.conciliacaoBancaria.situacaoConciliacao) === 'TRANSACOES_ANALISADAS');
  }

  showInstrucoesHeader(): boolean {
    return this.conciliacaoId && !this.pollingRecarregarConciliacaoRef &&
    (String(this.conciliacaoBancaria.situacaoConciliacao) !== 'CONCILIADO') &&
    (String(this.conciliacaoBancaria.situacaoConciliacao) !== 'CONCILIADO_COM_ERRO') &&
    (String(this.conciliacaoBancaria.situacaoConciliacao) !== 'CANCELADO');
  }


	aplicarConciliacao() {
		this.conciliacaoBancariaRuleFunctionAplicarConciliacaoBancaria();
	}

	conciliacaoBancariaRuleFunctionAplicarConciliacaoBancaria() {
	    this.conciliacaoBancariaService.conciliacaoBancariaRuleFunctionAplicarConciliacaoBancaria(this.conciliacaoBancaria)
	    .then((conciliacaoBancaria) => {
	      if (conciliacaoBancaria) { // Can be null
          this.conciliacaoBancaria = conciliacaoBancaria;
          // Starta o polling de monitormento.
          this.startPollingRecarregarConciliacao();
	      }
	      this.messageHandler.showSuccess('Operação executada com sucesso.');
	    })
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}

	conciliacaoBancariaRuleDisableCUD() {
		const expression = this.conciliacaoBancaria.id;
		return expression;

	}

	initLocaleSettings() {
		this.calendarLocale = this.cadastrosBancoTranslationService.getCalendarLocaleSettings();
  }

  loadConciliacaoTransacaoList() {
    if (this.conciliacaoTransacaoList) {
      this.conciliacaoTransacaoList.loadTransacoes(this.conciliacaoId);
    }
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
    this.pollingRecarregarConciliacaoRef = null;
    this.getInstrucoesHeader();
	}

	runPollingRecarregarConciliacao() {
	  this.getConciliacaoBancariaByIdPolling(this.conciliacaoId);
	}
	// End polling methods for: recarregarConciliacao

}
