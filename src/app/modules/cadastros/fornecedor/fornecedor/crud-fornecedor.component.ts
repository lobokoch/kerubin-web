/**********************************************************************************************
Code generated with MKL Plug-in version: 47.7.13
Code generated at time stamp: 2020-01-07T19:01:50.602
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { Fornecedor } from './fornecedor.model';
import { FornecedorService } from './fornecedor.service';
import { CadastrosFornecedorTranslationService } from './../i18n/cadastros-fornecedor-translation.service';
import * as moment from 'moment';

import { TipoPessoa } from './../enums/cadastros-fornecedor-enums.model';

import { UF } from './../enums/cadastros-fornecedor-enums.model';
import { MessageHandlerService } from 'src/app/core/message-handler.service';


@Component({
  selector: 'app-crud-fornecedor',
  templateUrl: './crud-fornecedor.component.html',
  styleUrls: ['./crud-fornecedor.component.css']
})

export class FornecedorComponent implements OnInit {
	
	calendarLocale: any;
	
	fornecedor = new Fornecedor();
	fornecedorTipoPessoaOptions: TipoPessoa[];
	
	
	fornecedorUfOptions: UF[];
	
	constructor(
	    private fornecedorService: FornecedorService,
	    private cadastrosFornecedorTranslationService: CadastrosFornecedorTranslationService,
	    private route: ActivatedRoute,
	    private messageHandler: MessageHandlerService
	) { 
		this.initializeFornecedorTipoPessoaOptions();
		
		this.initializeFornecedorUfOptions();
	}
	
	ngOnInit() {
		this.initLocaleSettings();
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
		this.fornecedor.uf = this.fornecedorUfOptions[24].value;
	}
	
	
	
	private initializeFornecedorTipoPessoaOptions() {
	    this.fornecedorTipoPessoaOptions = [
	    	{ label: 'Selecione um item', value: null },
	    	{ label: this.getTranslation('cadastros.fornecedor.fornecedor_tipoPessoa_pessoa_juridica'), value: 'PESSOA_JURIDICA' }, 
	    	{ label: this.getTranslation('cadastros.fornecedor.fornecedor_tipoPessoa_pessoa_fisica'), value: 'PESSOA_FISICA' }
	    ];
	}
	  
	private initializeFornecedorUfOptions() {
	    this.fornecedorUfOptions = [
	    	{ label: 'Selecione um item', value: null },
	    	{ label: this.getTranslation('cadastros.fornecedor.fornecedor_uf_ac'), value: 'AC' }, 
	    	{ label: this.getTranslation('cadastros.fornecedor.fornecedor_uf_al'), value: 'AL' }, 
	    	{ label: this.getTranslation('cadastros.fornecedor.fornecedor_uf_ap'), value: 'AP' }, 
	    	{ label: this.getTranslation('cadastros.fornecedor.fornecedor_uf_am'), value: 'AM' }, 
	    	{ label: this.getTranslation('cadastros.fornecedor.fornecedor_uf_ba'), value: 'BA' }, 
	    	{ label: this.getTranslation('cadastros.fornecedor.fornecedor_uf_ce'), value: 'CE' }, 
	    	{ label: this.getTranslation('cadastros.fornecedor.fornecedor_uf_df'), value: 'DF' }, 
	    	{ label: this.getTranslation('cadastros.fornecedor.fornecedor_uf_es'), value: 'ES' }, 
	    	{ label: this.getTranslation('cadastros.fornecedor.fornecedor_uf_go'), value: 'GO' }, 
	    	{ label: this.getTranslation('cadastros.fornecedor.fornecedor_uf_ma'), value: 'MA' }, 
	    	{ label: this.getTranslation('cadastros.fornecedor.fornecedor_uf_mt'), value: 'MT' }, 
	    	{ label: this.getTranslation('cadastros.fornecedor.fornecedor_uf_ms'), value: 'MS' }, 
	    	{ label: this.getTranslation('cadastros.fornecedor.fornecedor_uf_mg'), value: 'MG' }, 
	    	{ label: this.getTranslation('cadastros.fornecedor.fornecedor_uf_pa'), value: 'PA' }, 
	    	{ label: this.getTranslation('cadastros.fornecedor.fornecedor_uf_pb'), value: 'PB' }, 
	    	{ label: this.getTranslation('cadastros.fornecedor.fornecedor_uf_pr'), value: 'PR' }, 
	    	{ label: this.getTranslation('cadastros.fornecedor.fornecedor_uf_pe'), value: 'PE' }, 
	    	{ label: this.getTranslation('cadastros.fornecedor.fornecedor_uf_pi'), value: 'PI' }, 
	    	{ label: this.getTranslation('cadastros.fornecedor.fornecedor_uf_rj'), value: 'RJ' }, 
	    	{ label: this.getTranslation('cadastros.fornecedor.fornecedor_uf_rn'), value: 'RN' }, 
	    	{ label: this.getTranslation('cadastros.fornecedor.fornecedor_uf_rs'), value: 'RS' }, 
	    	{ label: this.getTranslation('cadastros.fornecedor.fornecedor_uf_ro'), value: 'RO' }, 
	    	{ label: this.getTranslation('cadastros.fornecedor.fornecedor_uf_rr'), value: 'RR' }, 
	    	{ label: this.getTranslation('cadastros.fornecedor.fornecedor_uf_sc'), value: 'SC' }, 
	    	{ label: this.getTranslation('cadastros.fornecedor.fornecedor_uf_sp'), value: 'SP' }, 
	    	{ label: this.getTranslation('cadastros.fornecedor.fornecedor_uf_se'), value: 'SE' }, 
	    	{ label: this.getTranslation('cadastros.fornecedor.fornecedor_uf_to'), value: 'TO' }
	    ];
	}
	  
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.cadastrosFornecedorTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	
	
	
	
	initLocaleSettings() {
		this.calendarLocale = this.cadastrosFornecedorTranslationService.getCalendarLocaleSettings();
	}
	
	
}
