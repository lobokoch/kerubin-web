/**********************************************************************************************
Code generated with MKL Plug-in version: 3.10.14
Code generated at time stamp: 2019-06-15T21:09:25.059
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { CaixaDiario } from './caixadiario.model';
import { CaixaDiarioService } from './caixadiario.service';
import { FinanceiroFluxoCaixaTranslationService } from './../i18n/financeiro-fluxocaixa-translation.service';

import { CaixaService } from './../caixa/caixa.service';
import { Caixa } from './../caixa/caixa.model';
import { CaixaAutoComplete } from './../caixa/caixa.model';
import * as moment from 'moment';

@Component({
  selector: 'app-crud-caixadiario.component',
  templateUrl: './crud-caixadiario.component.html',
  styleUrls: ['./crud-caixadiario.component.css']
})

export class CaixaDiarioComponent implements OnInit {
	caixaDiario = new CaixaDiario();
	caixaDiarioCaixaAutoCompleteSuggestions: CaixaAutoComplete[];
	
	constructor(
	    private caixaDiarioService: CaixaDiarioService,
	    private financeiroFluxoCaixaTranslationService: FinanceiroFluxoCaixaTranslationService,
	    private caixaService: CaixaService,
	    private route: ActivatedRoute,
	    private messageService: MessageService
	) { 
	}
	
	ngOnInit() {
		this.rulesOnCreate();
	    const id = this.route.snapshot.params['id'];
	    if (id) {
	      this.getCaixaDiarioById(id);
	    }
	}
	
	begin(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
	      this.caixaDiario = new CaixaDiario();
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
	    this.caixaDiarioService.create(this.caixaDiario)
	    .then((caixaDiario) => {
	      this.caixaDiario = caixaDiario;
	      this.showSuccess('Registro criado com sucesso!');
	    }).
	    catch(error => {
	      this.showError('Erro ao criar registro: ' + error);
	    });
	}
	
	update() {
	    this.caixaDiarioService.update(this.caixaDiario)
	    .then((caixaDiario) => {
	      this.caixaDiario = caixaDiario;
	      this.showSuccess('Registro alterado!');
	    })
	    .catch(error => {
	      this.showError('Erro ao atualizar registro: ' + error);
	    });
	}
	
	getCaixaDiarioById(id: string) {
	    this.caixaDiarioService.retrieve(id)
	    .then((caixaDiario) => this.caixaDiario = caixaDiario)
	    .catch(error => {
	      this.showError('Erro ao buscar registro: ' + id);
	    });
	}
	
	get isEditing() {
	    return Boolean(this.caixaDiario.id);
	}
	
	
	
	caixaDiarioCaixaAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.caixaDiario.caixa = null;
	}
	
	caixaDiarioCaixaAutoComplete(event) {
	    const query = event.query;
	    this.caixaService
	      .autoComplete(query)
	      .then((result) => {
	        this.caixaDiarioCaixaAutoCompleteSuggestions = result as CaixaAutoComplete[];
	      })
	      .catch(error => {
	        this.showError('Erro ao buscar registros com o termo: ' + query);
	      });
	}
	
	caixaDiarioCaixaAutoCompleteFieldConverter(caixa: CaixaAutoComplete) {
		if (caixa) {
			return (caixa.nome || '<nulo>');
		} else {
			return null;
		}
	}
	
	
	public showSuccess(msg: string) {
	    this.messageService.add({severity: 'success', summary: 'Successo', detail: msg});
	}
	
	public showError(msg: string) {
	    this.messageService.add({severity: 'error', summary: 'Erro', detail: msg});
	}
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.financeiroFluxoCaixaTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	rulesOnCreate() {
		this.caixaDiario.dataHoraAbertura = moment().toDate();
	}
}
