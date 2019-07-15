/**********************************************************************************************
Code generated with MKL Plug-in version: 7.0.0
Code generated at time stamp: 2019-07-15T07:31:32.718
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { AgenciaBancaria } from './agenciabancaria.model';
import { AgenciaBancariaService } from './agenciabancaria.service';
import { FinanceiroContasReceberTranslationService } from './../i18n/financeiro-contasreceber-translation.service';

import { BancoService } from './../banco/banco.service';
import { Banco } from './../banco/banco.model';
import { BancoAutoComplete } from './../banco/banco.model';
import { MessageHandlerService } from 'src/app/core/message-handler.service';


@Component({
  selector: 'app-crud-agenciabancaria.component',
  templateUrl: './crud-agenciabancaria.component.html',
  styleUrls: ['./crud-agenciabancaria.component.css']
})

export class AgenciaBancariaComponent implements OnInit {
	agenciaBancaria = new AgenciaBancaria();
	agenciaBancariaBancoAutoCompleteSuggestions: BancoAutoComplete[];
	
	constructor(
	    private agenciaBancariaService: AgenciaBancariaService,
	    private financeiroContasReceberTranslationService: FinanceiroContasReceberTranslationService,
	    private bancoService: BancoService,
	    private route: ActivatedRoute,
	    private messageHandler: MessageHandlerService
	) { 
	}
	
	ngOnInit() {
	    const id = this.route.snapshot.params['id'];
	    if (id) {
	      this.getAgenciaBancariaById(id);
	    }
	}
	
	begin(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
	      this.agenciaBancaria = new AgenciaBancaria();
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
		
	    this.agenciaBancariaService.create(this.agenciaBancaria)
	    .then((agenciaBancaria) => {
	      this.agenciaBancaria = agenciaBancaria;
	      this.messageHandler.showSuccess('Registro criado com sucesso!');
	    }).
	    catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	update() {
	    this.agenciaBancariaService.update(this.agenciaBancaria)
	    .then((agenciaBancaria) => {
	      this.agenciaBancaria = agenciaBancaria;
	      this.messageHandler.showSuccess('Registro alterado!');
	    })
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	getAgenciaBancariaById(id: string) {
	    this.agenciaBancariaService.retrieve(id)
	    .then((agenciaBancaria) => this.agenciaBancaria = agenciaBancaria)
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	get isEditing() {
	    return Boolean(this.agenciaBancaria.id);
	}
	
	
	
	agenciaBancariaBancoAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.agenciaBancaria.banco = null;
	}
	
	agenciaBancariaBancoAutoComplete(event) {
	    const query = event.query;
	    this.agenciaBancariaService
	      .bancoBancoAutoComplete(query)
	      .then((result) => {
	        this.agenciaBancariaBancoAutoCompleteSuggestions = result as BancoAutoComplete[];
	      })
	      .catch(error => {
	        this.messageHandler.showError(error);
	      });
	}
	
	agenciaBancariaBancoAutoCompleteFieldConverter(banco: BancoAutoComplete) {
		if (banco) {
			return (banco.numero || '<nulo>') + ' - ' + (banco.nome || '<nulo>');
		} else {
			return null;
		}
	}
	
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.financeiroContasReceberTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	
	
}
