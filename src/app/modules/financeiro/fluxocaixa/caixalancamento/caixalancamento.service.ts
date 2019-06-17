/**********************************************************************************************
Code generated with MKL Plug-in version: 3.11.1
Code generated at time stamp: 2019-06-16T23:35:31.119
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';

import { HttpClientWithToken } from '../../../../security/http-client-token';

import { CaixaLancamento } from './caixalancamento.model';
import { CaixaLancamentoAutoComplete } from './caixalancamento.model';
import { CaixaDiario } from './../caixadiario/caixadiario.model';
import { PlanoConta } from './../planoconta/planoconta.model';
import { ContaBancaria } from './../contabancaria/contabancaria.model';
import { CartaoCredito } from './../cartaocredito/cartaocredito.model';
import { Cliente } from './../cliente/cliente.model';
import { Fornecedor } from './../fornecedor/fornecedor.model';
import { CaixaLancamentoListFilter } from './caixalancamento.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class CaixaLancamentoService {
	
	url = environment.apiUrl + '/financeiro/fluxo_caixa/entities/caixaLancamento';
	
	constructor(private http: HttpClientWithToken) { }
	
	// TODO: Provisório
	private getHeaders(): Headers {
		const headers = new Headers();
	    
	    headers.append('Content-Type', 'application/json');
	    return headers;
	}
	
	create(caixaLancamento: CaixaLancamento): Promise<CaixaLancamento> {
		const headers = this.getHeaders();    
	
	    return this.http.post(this.url, caixaLancamento, { headers })
	    .toPromise()
	    .then(response => {
	      const created = response as CaixaLancamento;
	      this.adjustNullEntitySlots([created]);
	      return created;
	    });
	}
	
	update(caixaLancamento: CaixaLancamento): Promise<CaixaLancamento> {
	    const headers = this.getHeaders();
	
	    return this.http.put(`${this.url}/${caixaLancamento.id}`, caixaLancamento, { headers })
	    .toPromise()
	    .then(response => {
	      const updated = response as CaixaLancamento;
	      this.adjustNullEntitySlots([updated]);
	      return updated;
	    });
	}
	
	delete(id: string): Promise<void> {
	    return this.http.delete(`${this.url}/${id}`)
	    .toPromise()
	    .then(() => null);
	}
	
	retrieve(id: string): Promise<CaixaLancamento> {
	    const headers = this.getHeaders();
	    return this.http.get<CaixaLancamento>(`${this.url}/${id}`, { headers })
	    .toPromise()
	    .then(response => {
	      const caixaLancamento = response as CaixaLancamento;
	      this.adjustNullEntitySlots([caixaLancamento]);
	      return caixaLancamento;
	    });
	}
	
	
	
	private adjustNullEntitySlots(entityList: CaixaLancamento[]) {
		/*entityList.forEach(caixaLancamento => {
		      if (!caixaLancamento.caixaDiario) {
		        caixaLancamento.caixaDiario = new CaixaDiario();
		      }
		      	
		      
		      if (!caixaLancamento.planoContas) {
		        caixaLancamento.planoContas = new PlanoConta();
		      }
		      	
		      
		      if (!caixaLancamento.contaBancaria) {
		        caixaLancamento.contaBancaria = new ContaBancaria();
		      }
		      	
		      
		      if (!caixaLancamento.cartaoCredito) {
		        caixaLancamento.cartaoCredito = new CartaoCredito();
		      }
		      	
		      
		      if (!caixaLancamento.cliente) {
		        caixaLancamento.cliente = new Cliente();
		      }
		      	
		      
		      if (!caixaLancamento.fornecedor) {
		        caixaLancamento.fornecedor = new Fornecedor();
		      }
		      	
		});*/
	}
	
	autoComplete(query: string): Promise<CaixaLancamentoAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<CaixaLancamentoAutoComplete[]>(`${this.url}/autoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as CaixaLancamentoAutoComplete[];
	        return result;
	      });
	
	}
	
	
	caixaLancamentoList(caixaLancamentoListFilter: CaixaLancamentoListFilter): Promise<any> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(caixaLancamentoListFilter);
	
	    return this.http.get<any>(this.url, { headers, params })
	      .toPromise()
	      .then(response => {
	        const data = response;
	        const items = data.content; /* array of CaixaLancamento */
	        const totalElements = data.totalElements;
	
	        this.adjustNullEntitySlots(items);
	
	        const result = {
	          items,
	          totalElements
	        };
	
	        return result;
	      });
	}
	
	
	mountAndGetSearchParams(filter: CaixaLancamentoListFilter): HttpParams {
	    let params = new HttpParams();
	    if (filter.pageNumber) {
	      params = params.set('page', filter.pageNumber.toString());
	    }
	
	    if (filter.pageSize) {
	      params = params.set('size', filter.pageSize.toString());
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
	replicateCaixaLancamento(id: string, groupId: string, quantity: number): Promise<boolean> {
	    const headers = this.getHeaders();
	
	    const payload = new ReplicateCaixaLancamentoPayload(id, quantity, groupId);
	    return this.http.post(`${this.url}/replicateCaixaLancamento`, payload, { headers } )
	    .toPromise()
	    .then(response => {
	      return response === true;
	    });
	}
		
	getTotaisfilterCaixaLancamento(filter: CaixaLancamentorListFilter): Promise<TotaisfilterCaixaLancamento> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(filter);
	    return this.http.get<TotaisfilterCaixaLancamento>(`${this.url}/getTotaisfilterCaixaLancamento`, { headers, params })
	    .toPromise()
	    .then(response => {
	      const result = response as TotaisfilterCaixaLancamento;
	      return result;
	    });
	}
	*/
}
