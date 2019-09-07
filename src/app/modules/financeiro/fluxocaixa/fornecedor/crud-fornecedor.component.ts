/**********************************************************************************************
Code generated with MKL Plug-in version: 22.0.6
Code generated at time stamp: 2019-09-07T12:27:13.685
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { Fornecedor } from './fornecedor.model';
import { FornecedorService } from './fornecedor.service';
import { FinanceiroFluxoCaixaTranslationService } from './../i18n/financeiro-fluxocaixa-translation.service';

import { TipoPessoa } from './../enums/financeiro-fluxocaixa-enums.model';
import { MessageHandlerService } from 'src/app/core/message-handler.service';


@Component({
  selector: 'app-crud-fornecedor.component',
  templateUrl: './crud-fornecedor.component.html',
  styleUrls: ['./crud-fornecedor.component.css']
})

export class FornecedorComponent implements OnInit {
	fornecedor = new Fornecedor();
	fornecedorTipoPessoaOptions: TipoPessoa[];
	
	constructor(
	    private fornecedorService: FornecedorService,
	    private financeiroFluxoCaixaTranslationService: FinanceiroFluxoCaixaTranslationService,
	    private route: ActivatedRoute,
	    private messageHandler: MessageHandlerService
	) { 
		this.initializeFornecedorTipoPessoaOptions();
	}
	
	ngOnInit() {
		this.initializeEnumFieldsWithDefault();
	    const id = this.route.snapshot.params['id'];
	    if (id) {
	      this.getFornecedorById(id);
	    }
	}
	
	begin(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
	      this.fornecedor = new Fornecedor();
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
		
	    this.fornecedorService.create(this.fornecedor)
	    .then((fornecedor) => {
	      this.fornecedor = fornecedor;
	      this.messageHandler.showSuccess('Registro criado com sucesso!');
	    }).
	    catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	update() {
	    this.fornecedorService.update(this.fornecedor)
	    .then((fornecedor) => {
	      this.fornecedor = fornecedor;
	      this.messageHandler.showSuccess('Registro alterado!');
	    })
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	getFornecedorById(id: string) {
	    this.fornecedorService.retrieve(id)
	    .then((fornecedor) => this.fornecedor = fornecedor)
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	get isEditing() {
	    return Boolean(this.fornecedor.id);
	}
	
	initializeEnumFieldsWithDefault() {
		this.fornecedor.tipoPessoa = this.fornecedorTipoPessoaOptions[1].value;
	}
	
	
	
	private initializeFornecedorTipoPessoaOptions() {
	    this.fornecedorTipoPessoaOptions = [
	    	{ label: 'Selecione um item', value: null },
	    	{ label: this.getTranslation('financeiro.fluxo_caixa.fornecedor_tipoPessoa_pessoa_juridica'), value: 'PESSOA_JURIDICA' }, 
	    	{ label: this.getTranslation('financeiro.fluxo_caixa.fornecedor_tipoPessoa_pessoa_fisica'), value: 'PESSOA_FISICA' }
	    ];
	}
	  
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.financeiroFluxoCaixaTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	
	
	
}
