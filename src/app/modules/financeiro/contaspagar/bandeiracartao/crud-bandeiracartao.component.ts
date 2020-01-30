/**********************************************************************************************
Code generated with MKL Plug-in version: 60.0.6
Copyright: Kerubin - kerubin.platform@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { BandeiraCartao } from './bandeiracartao.model';
import { BandeiraCartaoService } from './bandeiracartao.service';
import { FinanceiroContasPagarTranslationService } from './../i18n/financeiro-contaspagar-translation.service';
import { MessageHandlerService } from 'src/app/core/message-handler.service';


@Component({
  selector: 'app-crud-bandeiracartao',
  templateUrl: './crud-bandeiracartao.component.html',
  styleUrls: ['./crud-bandeiracartao.component.css']
})

export class BandeiraCartaoComponent implements OnInit {
	bandeiraCartao = new BandeiraCartao();
	
	constructor(
	    private bandeiraCartaoService: BandeiraCartaoService,
	    private financeiroContasPagarTranslationService: FinanceiroContasPagarTranslationService,
	    private route: ActivatedRoute,
	    private messageHandler: MessageHandlerService
	) { 
	}
	
	ngOnInit() {
	    const id = this.route.snapshot.params['id'];
	    if (id) {
	      this.getBandeiraCartaoById(id);
	    }
	}
	
	begin(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
	      this.bandeiraCartao = new BandeiraCartao();
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
		
	    this.bandeiraCartaoService.create(this.bandeiraCartao)
	    .then((bandeiraCartao) => {
	      this.bandeiraCartao = bandeiraCartao;
	      this.messageHandler.showSuccess('Registro criado com sucesso!');
	    }).
	    catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	update() {
	    this.bandeiraCartaoService.update(this.bandeiraCartao)
	    .then((bandeiraCartao) => {
	      this.bandeiraCartao = bandeiraCartao;
	      this.messageHandler.showSuccess('Registro alterado!');
	    })
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	getBandeiraCartaoById(id: string) {
	    this.bandeiraCartaoService.retrieve(id)
	    .then((bandeiraCartao) => this.bandeiraCartao = bandeiraCartao)
	    .catch(error => {
	      this.messageHandler.showError(error);
	    });
	}
	
	get isEditing() {
	    return Boolean(this.bandeiraCartao.id);
	}
	
	
	
	
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.financeiroContasPagarTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	
	
	
	
}
