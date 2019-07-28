/**********************************************************************************************
Code generated with MKL Plug-in version: 7.0.3
Code generated at time stamp: 2019-07-28T18:58:30.722
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { Cliente } from './cliente.model';
import { ClienteService } from './cliente.service';
import { CadastrosClienteTranslationService } from './../i18n/cadastros-cliente-translation.service';
import * as moment from 'moment';

import { TipoPessoa } from './../enums/cadastros-cliente-enums.model';

import { UF } from './../enums/cadastros-cliente-enums.model';
import { MessageHandlerService } from 'src/app/core/message-handler.service';

// Begin_Code_Not_Generated
import { CepSearchService } from './../../../../helper/cepsearch.service';
// End_Code_Not_Generated

@Component({
  selector: 'app-crud-cliente.component',
  templateUrl: './crud-cliente.component.html',
  styleUrls: ['./crud-cliente.component.css']
})

export class ClienteComponent implements OnInit {

	calendarLocale: any;

	cliente = new Cliente();
	clienteTipoPessoaOptions: TipoPessoa[];


	clienteUfOptions: UF[];

	constructor(
	    private clienteService: ClienteService,
	    private cadastrosClienteTranslationService: CadastrosClienteTranslationService,
	    private route: ActivatedRoute,
      private messageHandler: MessageHandlerService,
      private cepSearchService: CepSearchService
	) {
		this.initializeClienteTipoPessoaOptions();

		this.initializeClienteUfOptions();
	}

	ngOnInit() {
		this.initLocaleSettings();
		this.initializeEnumFieldsWithDefault();
	    const id = this.route.snapshot.params['id'];
	    if (id) {
	      this.getClienteById(id);
	    }
	}

	begin(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
	      this.cliente = new Cliente();
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

	    this.clienteService.create(this.cliente)
	    .then((cliente) => {
	      this.cliente = cliente;
	      this.messageHandler.showSuccess('Registro criado com sucesso!');
	    }).
	    catch(error => {
	      this.messageHandler.showError(error);
	    });
	}

	update() {
	    this.clienteService.update(this.cliente)
	    .then((cliente) => {
	      this.cliente = cliente;
	      this.messageHandler.showSuccess('Registro alterado!');
	    })
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}

	getClienteById(id: string) {
	    this.clienteService.retrieve(id)
	    .then((cliente) => this.cliente = cliente)
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}

	get isEditing() {
	    return Boolean(this.cliente.id);
	}

	initializeEnumFieldsWithDefault() {
		this.cliente.tipoPessoa = this.clienteTipoPessoaOptions[0].value;
		this.cliente.uf = this.clienteUfOptions[23].value;
	}



	private initializeClienteTipoPessoaOptions() {
	    this.clienteTipoPessoaOptions = [
	    	{ label: this.getTranslation('cadastros.cliente.cliente_tipoPessoa_pessoa_juridica'), value: 'PESSOA_JURIDICA' },
	    	{ label: this.getTranslation('cadastros.cliente.cliente_tipoPessoa_pessoa_fisica'), value: 'PESSOA_FISICA' }
	    ];
	}

	private initializeClienteUfOptions() {
	    this.clienteUfOptions = [
	    	{ label: this.getTranslation('cadastros.cliente.cliente_uf_ac'), value: 'AC' },
	    	{ label: this.getTranslation('cadastros.cliente.cliente_uf_al'), value: 'AL' },
	    	{ label: this.getTranslation('cadastros.cliente.cliente_uf_ap'), value: 'AP' },
	    	{ label: this.getTranslation('cadastros.cliente.cliente_uf_am'), value: 'AM' },
	    	{ label: this.getTranslation('cadastros.cliente.cliente_uf_ba'), value: 'BA' },
	    	{ label: this.getTranslation('cadastros.cliente.cliente_uf_ce'), value: 'CE' },
	    	{ label: this.getTranslation('cadastros.cliente.cliente_uf_df'), value: 'DF' },
	    	{ label: this.getTranslation('cadastros.cliente.cliente_uf_es'), value: 'ES' },
	    	{ label: this.getTranslation('cadastros.cliente.cliente_uf_go'), value: 'GO' },
	    	{ label: this.getTranslation('cadastros.cliente.cliente_uf_ma'), value: 'MA' },
	    	{ label: this.getTranslation('cadastros.cliente.cliente_uf_mt'), value: 'MT' },
	    	{ label: this.getTranslation('cadastros.cliente.cliente_uf_ms'), value: 'MS' },
	    	{ label: this.getTranslation('cadastros.cliente.cliente_uf_mg'), value: 'MG' },
	    	{ label: this.getTranslation('cadastros.cliente.cliente_uf_pa'), value: 'PA' },
	    	{ label: this.getTranslation('cadastros.cliente.cliente_uf_pb'), value: 'PB' },
	    	{ label: this.getTranslation('cadastros.cliente.cliente_uf_pr'), value: 'PR' },
	    	{ label: this.getTranslation('cadastros.cliente.cliente_uf_pe'), value: 'PE' },
	    	{ label: this.getTranslation('cadastros.cliente.cliente_uf_pi'), value: 'PI' },
	    	{ label: this.getTranslation('cadastros.cliente.cliente_uf_rj'), value: 'RJ' },
	    	{ label: this.getTranslation('cadastros.cliente.cliente_uf_rn'), value: 'RN' },
	    	{ label: this.getTranslation('cadastros.cliente.cliente_uf_rs'), value: 'RS' },
	    	{ label: this.getTranslation('cadastros.cliente.cliente_uf_ro'), value: 'RO' },
	    	{ label: this.getTranslation('cadastros.cliente.cliente_uf_rr'), value: 'RR' },
	    	{ label: this.getTranslation('cadastros.cliente.cliente_uf_sc'), value: 'SC' },
	    	{ label: this.getTranslation('cadastros.cliente.cliente_uf_sp'), value: 'SP' },
	    	{ label: this.getTranslation('cadastros.cliente.cliente_uf_se'), value: 'SE' },
	    	{ label: this.getTranslation('cadastros.cliente.cliente_uf_to'), value: 'TO' }
	    ];
	}


	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.cadastrosClienteTranslationService.getTranslation(key);
		return value;

		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}




	initLocaleSettings() {
		this.calendarLocale = this.cadastrosClienteTranslationService.getCalendarLocaleSettings();
  }

  // Begin_Code_Not_Generated
  searchCEP() {
    let cep = this.cliente.cep;
    if (cep) {
      cep = cep.trim().replace('-', '');
    }

    if (!cep || cep.length !== 8) {
      this.messageHandler.showError('CEP inválido para busca.');
      return;
    }

    this.cepSearchService.searchCEP(cep)
    .then(result => {
      console.log('CEP result:' + JSON.stringify(result));
      this.clearEndereco();
      if (result.erro) {
        this.messageHandler.showError('CEP não encontrado.');
        return;
      }
      this.cliente.cep = result.cep;
      const uf = this.clienteUfOptions.find(it => it.value === result.uf);

      console.log('UF:' + uf.value);

      this.cliente.uf = uf ? uf.value : null;
      this.cliente.cidade = result.localidade;
      this.cliente.bairro = result.bairro;
      this.cliente.endereco = result.logradouro;
      this.cliente.complemento = result.complemento;
    })
    .catch(e => {
      console.log(e);
      this.clearEndereco();
      this.messageHandler.showError('Erro ao buscar CEP. Verifique se você informou um CEP válido.');
    });

  }

  clearEndereco() {
    this.cliente.uf = null;
    this.cliente.cidade = null;
    this.cliente.bairro = null;
    this.cliente.endereco = null;
    this.cliente.complemento = null;
  }

  // End_Code_Not_Generated

}
