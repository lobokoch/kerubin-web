/**********************************************************************************************
Code generated with MKL Plug-in version: 3.9.0
Code generated at time stamp: 2019-06-14T00:00:25.670
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';

import { HttpClientWithToken } from '../../../../security/http-client-token';

import { MovimentoCaixa } from './movimentocaixa.model';
import { MovimentoCaixaAutoComplete } from './movimentocaixa.model';
import { Caixa } from './../caixa/caixa.model';
import { PlanoConta } from './../planoconta/planoconta.model';
import { ContaBancaria } from './../contabancaria/contabancaria.model';
import { CartaoCredito } from './../cartaocredito/cartaocredito.model';
import { Cliente } from './../cliente/cliente.model';
import { Fornecedor } from './../fornecedor/fornecedor.model';
import { MovimentoCaixaListFilter } from './movimentocaixa.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class MovimentoCaixaService {
	
	url = environment.apiUrl + '/financeiro/fluxo_caixa/entities/movimentoCaixa';
	
	constructor(private http: HttpClientWithToken) { }
	
	// TODO: Provisório
	private getHeaders(): Headers {
		const headers = new Headers();
	    
	    headers.append('Content-Type', 'application/json');
	    return headers;
	}
	
	create(movimentoCaixa: MovimentoCaixa): Promise<MovimentoCaixa> {
		const headers = this.getHeaders();    
	
	    return this.http.post(this.url, movimentoCaixa, { headers })
	    .toPromise()
	    .then(response => {
	      const created = response as MovimentoCaixa;
	      this.adjustNullEntitySlots([created]);
	      return created;
	    });
	}
	
	update(movimentoCaixa: MovimentoCaixa): Promise<MovimentoCaixa> {
	    const headers = this.getHeaders();
	
	    return this.http.put(`${this.url}/${movimentoCaixa.id}`, movimentoCaixa, { headers })
	    .toPromise()
	    .then(response => {
	      const updated = response as MovimentoCaixa;
	      this.adjustNullEntitySlots([updated]);
	      return updated;
	    });
	}
	
	delete(id: string): Promise<void> {
	    return this.http.delete(`${this.url}/${id}`)
	    .toPromise()
	    .then(() => null);
	}
	
	retrieve(id: string): Promise<MovimentoCaixa> {
	    const headers = this.getHeaders();
	    return this.http.get<MovimentoCaixa>(`${this.url}/${id}`, { headers })
	    .toPromise()
	    .then(response => {
	      const movimentoCaixa = response as MovimentoCaixa;
	      this.adjustNullEntitySlots([movimentoCaixa]);
	      return movimentoCaixa;
	    });
	}
	
	
	
	private adjustNullEntitySlots(entityList: MovimentoCaixa[]) {
		/*entityList.forEach(movimentoCaixa => {
		      if (!movimentoCaixa.caixa) {
		        movimentoCaixa.caixa = new Caixa();
		      }
		      	
		      
		      if (!movimentoCaixa.planoContas) {
		        movimentoCaixa.planoContas = new PlanoConta();
		      }
		      	
		      
		      if (!movimentoCaixa.contaBancaria) {
		        movimentoCaixa.contaBancaria = new ContaBancaria();
		      }
		      	
		      
		      if (!movimentoCaixa.cartaoCredito) {
		        movimentoCaixa.cartaoCredito = new CartaoCredito();
		      }
		      	
		      
		      if (!movimentoCaixa.cliente) {
		        movimentoCaixa.cliente = new Cliente();
		      }
		      	
		      
		      if (!movimentoCaixa.fornecedor) {
		        movimentoCaixa.fornecedor = new Fornecedor();
		      }
		      	
		});*/
	}
	
	autoComplete(query: string): Promise<MovimentoCaixaAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<MovimentoCaixaAutoComplete[]>(`${this.url}/autoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as MovimentoCaixaAutoComplete[];
	        return result;
	      });
	
	}
	
	
	movimentoCaixaList(movimentoCaixaListFilter: MovimentoCaixaListFilter): Promise<any> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(movimentoCaixaListFilter);
	
	    return this.http.get<any>(this.url, { headers, params })
	      .toPromise()
	      .then(response => {
	        const data = response;
	        const items = data.content; /* array of MovimentoCaixa */
	        const totalElements = data.totalElements;
	
	        this.adjustNullEntitySlots(items);
	
	        const result = {
	          items,
	          totalElements
	        };
	
	        return result;
	      });
	}
	
	
	mountAndGetSearchParams(filter: MovimentoCaixaListFilter): HttpParams {
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
	replicateMovimentoCaixa(id: string, groupId: string, quantity: number): Promise<boolean> {
	    const headers = this.getHeaders();
	
	    const payload = new ReplicateMovimentoCaixaPayload(id, quantity, groupId);
	    return this.http.post(`${this.url}/replicateMovimentoCaixa`, payload, { headers } )
	    .toPromise()
	    .then(response => {
	      return response === true;
	    });
	}
		
	getTotaisfilterMovimentoCaixa(filter: MovimentoCaixarListFilter): Promise<TotaisfilterMovimentoCaixa> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(filter);
	    return this.http.get<TotaisfilterMovimentoCaixa>(`${this.url}/getTotaisfilterMovimentoCaixa`, { headers, params })
	    .toPromise()
	    .then(response => {
	      const result = response as TotaisfilterMovimentoCaixa;
	      return result;
	    });
	}
	*/
}

