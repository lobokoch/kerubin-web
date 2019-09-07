/**********************************************************************************************
Code generated with MKL Plug-in version: 22.0.6
Code generated at time stamp: 2019-09-07T12:27:36.647
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { Cliente } from './cliente.model';
import { ClienteService } from './cliente.service';
import { FinanceiroContasReceberTranslationService } from './../i18n/financeiro-contasreceber-translation.service';

import { TipoPessoa } from './../enums/financeiro-contasreceber-enums.model';
import { MessageHandlerService } from 'src/app/core/message-handler.service';


@Component({
  selector: 'app-crud-cliente.component',
  templateUrl: './crud-cliente.component.html',
  styleUrls: ['./crud-cliente.component.css']
})

export class ClienteComponent implements OnInit {
	cliente = new Cliente();
	clienteTipoPessoaOptions: TipoPessoa[];
	
	constructor(
	    private clienteService: ClienteService,
	    private financeiroContasReceberTranslationService: FinanceiroContasReceberTranslationService,
	    private route: ActivatedRoute,
	    private messageHandler: MessageHandlerService
	) { 
		this.initializeClienteTipoPessoaOptions();
	}
	
	ngOnInit() {
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
		this.cliente.tipoPessoa = this.clienteTipoPessoaOptions[1].value;
	}
	
	
	
	private initializeClienteTipoPessoaOptions() {
	    this.clienteTipoPessoaOptions = [
	    	{ label: 'Selecione um item', value: null },
	    	{ label: this.getTranslation('financeiro.contas_receber.cliente_tipoPessoa_pessoa_juridica'), value: 'PESSOA_JURIDICA' }, 
	    	{ label: this.getTranslation('financeiro.contas_receber.cliente_tipoPessoa_pessoa_fisica'), value: 'PESSOA_FISICA' }
	    ];
	}
	  
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.financeiroContasReceberTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	
	
	
}
