/**********************************************************************************************
Code generated with MKL Plug-in version: 7.0.4
Code generated at time stamp: 2019-08-03T06:27:20.116
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';

import { HttpClientWithToken } from '../../../../security/http-client-token';

import { ContaPagar } from './contapagar.model';
import { ContaPagarAutoComplete } from './contapagar.model';
import { PlanoConta } from './../planoconta/planoconta.model';
import { ContaBancaria } from './../contabancaria/contabancaria.model';
import { CartaoCredito } from './../cartaocredito/cartaocredito.model';
import { Fornecedor } from './../fornecedor/fornecedor.model';
import { ContaPagarListFilter } from './contapagar.model';
import { ContaPagarDescricaoAutoComplete } from './contapagar.model';
import { ContaPagarAgrupadorAutoComplete } from './contapagar.model';
import { ContaPagarSumFields } from './contapagar.model';
import { environment } from 'src/environments/environment';
import { PlanoContaAutoComplete } from './../planoconta/planoconta.model';
import { ContaBancariaAutoComplete } from './../contabancaria/contabancaria.model';
import { CartaoCreditoAutoComplete } from './../cartaocredito/cartaocredito.model';
import { FornecedorAutoComplete } from './../fornecedor/fornecedor.model';

@Injectable()
export class ContaPagarService {
	
	url = environment.apiUrl + '/financeiro/contas_pagar/entities/contaPagar';
	
	constructor(private http: HttpClientWithToken) { }
	
	// TODO: Provisório
	private getHeaders(): Headers {
		const headers = new Headers();
	    
	    headers.append('Content-Type', 'application/json');
	    return headers;
	}
	
	create(contaPagar: ContaPagar): Promise<ContaPagar> {
		const headers = this.getHeaders();    
	
	    return this.http.post(this.url, contaPagar, { headers })
	    .toPromise()
	    .then(response => {
	      const created = response as ContaPagar;
	      this.adjustNullEntitySlots([created]);
	      this.adjustEntityDates([created]);
	      return created;
	    });
	}
	
	update(contaPagar: ContaPagar): Promise<ContaPagar> {
	    const headers = this.getHeaders();
	
	    return this.http.put(`${this.url}/${contaPagar.id}`, contaPagar, { headers })
	    .toPromise()
	    .then(response => {
	      const updated = response as ContaPagar;
	      this.adjustNullEntitySlots([updated]);
	      this.adjustEntityDates([updated]);
	      return updated;
	    });
	}
	
	delete(id: string): Promise<void> {
	    return this.http.delete(`${this.url}/${id}`)
	    .toPromise()
	    .then(() => null);
	}
	
	retrieve(id: string): Promise<ContaPagar> {
	    const headers = this.getHeaders();
	    return this.http.get<ContaPagar>(`${this.url}/${id}`, { headers })
	    .toPromise()
	    .then(response => {
	      const contaPagar = response as ContaPagar;
	      this.adjustNullEntitySlots([contaPagar]);
	      this.adjustEntityDates([contaPagar]);
	      return contaPagar;
	    });
	}
	
	 
	actionBaixarContaComDataPagamentoHoje(id: string): Promise<void> {
		const headers = this.getHeaders();
		
		return this.http.put(`${this.url}/actionBaixarContaComDataPagamentoHoje/${id}`, { headers })
		.toPromise()
		.then(() => null);
	}
	 
	actionBaixarContaComDataPagamentoIgualDataVenciento(id: string): Promise<void> {
		const headers = this.getHeaders();
		
		return this.http.put(`${this.url}/actionBaixarContaComDataPagamentoIgualDataVenciento/${id}`, { headers })
		.toPromise()
		.then(() => null);
	}
	 
	actionEstornarPagamentoContaComUmClique(id: string): Promise<void> {
		const headers = this.getHeaders();
		
		return this.http.put(`${this.url}/actionEstornarPagamentoContaComUmClique/${id}`, { headers })
		.toPromise()
		.then(() => null);
	}
	 
	actionFazerCopiasContaPagar(id: string, numberOfCopies: Number, referenceFieldInterval: Number, agrupador: String): Promise<void> {
	    const headers = this.getHeaders();
	      const entityCopy = { id, numberOfCopies, referenceFieldInterval, agrupador };
		    return this.http.post(`${this.url}/actionFazerCopiasContaPagar`, entityCopy, { headers })
		    .toPromise()
		    .then( () => null);
	}
	
	private adjustEntityDates(entityList: ContaPagar[]) {
		entityList.forEach(contaPagar => {
		      if (contaPagar.dataVencimento) {
		        contaPagar.dataVencimento = moment(contaPagar.dataVencimento, 'YYYY-MM-DD').toDate();
		      }
		      	
		      
		      if (contaPagar.dataPagamento) {
		        contaPagar.dataPagamento = moment(contaPagar.dataPagamento, 'YYYY-MM-DD').toDate();
		      }
		      	
		});
	}
	
	private adjustNullEntitySlots(entityList: ContaPagar[]) {
		/*entityList.forEach(contaPagar => {
		      if (!contaPagar.planoContas) {
		        contaPagar.planoContas = new PlanoConta();
		      }
		      	
		      
		      if (!contaPagar.contaBancaria) {
		        contaPagar.contaBancaria = new ContaBancaria();
		      }
		      	
		      
		      if (!contaPagar.cartaoCredito) {
		        contaPagar.cartaoCredito = new CartaoCredito();
		      }
		      	
		      
		      if (!contaPagar.fornecedor) {
		        contaPagar.fornecedor = new Fornecedor();
		      }
		      	
		});*/
	}
	
	autoComplete(query: string): Promise<ContaPagarAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<ContaPagarAutoComplete[]>(`${this.url}/autoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as ContaPagarAutoComplete[];
	        return result;
	      });
	
	}
	
							
	// Begin relationships autoComplete 
	
	planoContaPlanoContasAutoComplete(query: string): Promise<PlanoContaAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<PlanoContaAutoComplete[]>(`${this.url}/planoContaPlanoContasAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as PlanoContaAutoComplete[];
	        return result;
	      });
	
	}
	
	
	contaBancariaContaBancariaAutoComplete(query: string): Promise<ContaBancariaAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<ContaBancariaAutoComplete[]>(`${this.url}/contaBancariaContaBancariaAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as ContaBancariaAutoComplete[];
	        return result;
	      });
	
	}
	
	
	cartaoCreditoCartaoCreditoAutoComplete(query: string): Promise<CartaoCreditoAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<CartaoCreditoAutoComplete[]>(`${this.url}/cartaoCreditoCartaoCreditoAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as CartaoCreditoAutoComplete[];
	        return result;
	      });
	
	}
	
	
	fornecedorFornecedorAutoComplete(query: string): Promise<FornecedorAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<FornecedorAutoComplete[]>(`${this.url}/fornecedorFornecedorAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as FornecedorAutoComplete[];
	        return result;
	      });
	
	}
	
	// End relationships autoComplete
	
				
	
	contaPagarDescricaoAutoComplete(query: string): Promise<any> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<any>(`${this.url}/contaPagarDescricaoAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as ContaPagarDescricaoAutoComplete[];
	        return result;
	      });
	
	}
	
	contaPagarAgrupadorAutoComplete(query: string): Promise<any> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<any>(`${this.url}/contaPagarAgrupadorAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as ContaPagarAgrupadorAutoComplete[];
	        return result;
	      });
	
	}
	
	contaPagarList(contaPagarListFilter: ContaPagarListFilter): Promise<any> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(contaPagarListFilter);
	
	    return this.http.get<any>(this.url, { headers, params })
	      .toPromise()
	      .then(response => {
	        const data = response;
	        const items = data.content; /* array of ContaPagar */
	        const totalElements = data.totalElements;
	
	        this.adjustNullEntitySlots(items);
	        this.adjustEntityDates(items);
	
	        const result = {
	          items,
	          totalElements
	        };
	
	        return result;
	      });
	}
	
	
	getContaPagarSumFields(contaPagarListFilter: ContaPagarListFilter): Promise<ContaPagarSumFields> {
	    const headers = this.getHeaders();
	    
		const params = this.mountAndGetSearchParams(contaPagarListFilter);
		return this.http.get<any>(`${this.url}/contaPagarSumFields`, { headers, params })
		  .toPromise()
		  .then(response => {
		    const result = response;
		    return result;
		  });
	}
	
	mountAndGetSearchParams(filter: ContaPagarListFilter): HttpParams {
	    let params = new HttpParams();
	    if (filter.pageNumber) {
	      params = params.set('page', filter.pageNumber.toString());
	    }
	
	    if (filter.pageSize) {
	      params = params.set('size', filter.pageSize.toString());
	    }
		
		// descricao
		if (filter.descricao) {
			const descricao = filter.descricao.map(item => item.descricao).join(',');
			params = params.set('descricao', descricao);
		}
		
		// dataVencimentoFrom
		if (filter.dataVencimentoFrom) {
		const value = this.dateToStr(filter.dataVencimentoFrom);
			params = params.set('dataVencimentoFrom', value);
		}
		
		// dataVencimentoTo
		if (filter.dataVencimentoTo) {
		const value = this.dateToStr(filter.dataVencimentoTo);
			params = params.set('dataVencimentoTo', value);
		}
		
		// dataPagamentoIsNotNull
		if (filter.dataPagamentoIsNotNull) {
			const value = filter.dataPagamentoIsNotNull ? 'true' : 'false';
			params = params.set('dataPagamentoIsNotNull', value);
		}
		
		// dataPagamentoIsNull
		if (filter.dataPagamentoIsNull) {
			const value = filter.dataPagamentoIsNull ? 'true' : 'false';
			params = params.set('dataPagamentoIsNull', value);
		}
		
		// agrupador
		if (filter.agrupador) {
			const agrupador = filter.agrupador.map(item => item.agrupador).join(',');
			params = params.set('agrupador', agrupador);
		}
	
	    // Sort
	    if (filter.sortField) {
	      // search/nameStartsWith?name=K&sort=name,desc
	      const sortField = filter.sortField;
	      const sortValue = `${sortField.field},${sortField.order > 0 ? 'asc' : 'desc'}`;
	      params = params.set('sort', sortValue);
	    }
	
	    return params;
	  }
	
	dateToStr(data: Date): string {
	    return moment(data).format('YYYY-MM-DD');
	}
	
	/*** TODO: avaliar se vai ser feito isso.
	replicateContaPagar(id: string, groupId: string, quantity: number): Promise<boolean> {
	    const headers = this.getHeaders();
	
	    const payload = new ReplicateContaPagarPayload(id, quantity, groupId);
	    return this.http.post(`${this.url}/replicateContaPagar`, payload, { headers } )
	    .toPromise()
	    .then(response => {
	      return response === true;
	    });
	}
		
	getTotaisfilterContaPagar(filter: ContaPagarrListFilter): Promise<TotaisfilterContaPagar> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(filter);
	    return this.http.get<TotaisfilterContaPagar>(`${this.url}/getTotaisfilterContaPagar`, { headers, params })
	    .toPromise()
	    .then(response => {
	      const result = response as TotaisfilterContaPagar;
	      return result;
	    });
	}
	*/
}

