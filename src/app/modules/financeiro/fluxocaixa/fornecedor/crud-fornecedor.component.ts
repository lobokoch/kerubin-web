/**********************************************************************************************
Code generated by MKL Plug-in
Copyright: Kerubin - kerubin.platform@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { ElementRef, ViewChild } from '@angular/core';
import { Fornecedor } from './fornecedor.model';
import { FornecedorService } from './fornecedor.service';
import { FinanceiroFluxoCaixaTranslationService } from './../i18n/financeiro-fluxocaixa-translation.service';

import { TipoPessoa } from './../enums/financeiro-fluxocaixa-enums.model';
import { MessageHandlerService } from 'src/app/core/message-handler.service';


@Component({
  selector: 'app-crud-fornecedor',
  templateUrl: './crud-fornecedor.component.html',
  styleUrls: ['./crud-fornecedor.component.css']
})

export class FornecedorComponent implements OnInit {
	showHideHelp = false; // for show/hide help.
	
	fornecedor = new Fornecedor();
	fornecedorTipoPessoaOptions: TipoPessoa[];
	
	@ViewChild('fornecedor_tipoPessoa_elementRef', {static: true}) fornecedorDefaultElementRef: ElementRef;
	
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
	    this.fornecedorDefaultElementSetFocus();
	}
	
	getShowHideHelpLabel(): string {
		return this.showHideHelp ? 'Ocultar ajuda' : 'Mostrar ajuda';
	}
	
	beginFormFornecedor(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
	      this.fornecedor = new Fornecedor();
	      this.initializeEnumFieldsWithDefault();
		  this.fornecedorDefaultElementSetFocus();
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
	
	saveFormFornecedor(form: FormGroup) {
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
	      this.fornecedorDefaultElementSetFocus();
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
	      this.fornecedorDefaultElementSetFocus();
	    })
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	getFornecedorById(id: string) {
	    this.fornecedorService.retrieve(id)
	    .then((fornecedor) => { 
	    	this.fornecedor = fornecedor;
	    })
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
	
	
	
	
	
	
	
	
				
	fornecedorDefaultElementSetFocus() {
		try {
	    	this.fornecedorDefaultElementRef.nativeElement.focus();
	    } catch (error) {
	    	console.log('Error setting focus at fornecedorDefaultElementSetFocus:' + error);
	    }
	}
}
