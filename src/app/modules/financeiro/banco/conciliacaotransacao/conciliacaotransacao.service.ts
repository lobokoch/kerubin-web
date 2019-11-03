/**********************************************************************************************
Code generated with MKL Plug-in version: 27.0.10
Code generated at time stamp: 2019-11-03T07:57:18.876
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';

import { HttpClientWithToken } from '../../../../security/http-client-token';

import { ConciliacaoTransacao } from './conciliacaotransacao.model';
import { ConciliacaoTransacaoAutoComplete } from './conciliacaotransacao.model';
import { ConciliacaoBancaria } from './../conciliacaobancaria/conciliacaobancaria.model';
import { ConciliacaoTransacaoListFilter } from './conciliacaotransacao.model';
import { environment } from 'src/environments/environment';
import { ConciliacaoBancariaAutoComplete } from './../conciliacaobancaria/conciliacaobancaria.model';

@Injectable()
export class ConciliacaoTransacaoService {
	
	url = environment.apiUrl + '/cadastros/banco/entities/conciliacaoTransacao';
	
	constructor(private http: HttpClientWithToken) { }
	
	// TODO: Provisório
	private getHeaders(): Headers {
		const headers = new Headers();
	    
	    headers.append('Content-Type', 'application/json');
	    return headers;
	}
	
	create(conciliacaoTransacao: ConciliacaoTransacao): Promise<ConciliacaoTransacao> {
		const headers = this.getHeaders();    
	
	    return this.http.post(this.url, conciliacaoTransacao, { headers })
	    .toPromise()
	    .then(response => {
	      const created = response as ConciliacaoTransacao;
	      this.adjustNullEntitySlots([created]);
	      this.adjustEntityDates([created]);
	      return created;
	    });
	}
	
	update(conciliacaoTransacao: ConciliacaoTransacao): Promise<ConciliacaoTransacao> {
	    const headers = this.getHeaders();
	
	    return this.http.put(`${this.url}/${conciliacaoTransacao.id}`, conciliacaoTransacao, { headers })
	    .toPromise()
	    .then(response => {
	      const updated = response as ConciliacaoTransacao;
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
	
	retrieve(id: string): Promise<ConciliacaoTransacao> {
	    const headers = this.getHeaders();
	    return this.http.get<ConciliacaoTransacao>(`${this.url}/${id}`, { headers })
	    .toPromise()
	    .then(response => {
	      const conciliacaoTransacao = response as ConciliacaoTransacao;
	      this.adjustNullEntitySlots([conciliacaoTransacao]);
	      this.adjustEntityDates([conciliacaoTransacao]);
	      return conciliacaoTransacao;
	    });
	}
	
	
	private adjustEntityDates(entityList: ConciliacaoTransacao[]) {
		entityList.forEach(conciliacaoTransacao => {
		      if (conciliacaoTransacao.trnData) {
		        conciliacaoTransacao.trnData = moment(conciliacaoTransacao.trnData, 'YYYY-MM-DD').toDate();
		      }
		      	
		      
		      if (conciliacaoTransacao.dataConciliacao) {
		        conciliacaoTransacao.dataConciliacao = moment(conciliacaoTransacao.dataConciliacao, 'YYYY-MM-DD').toDate();
		      }
		      	
		});
	}
	
	private adjustNullEntitySlots(entityList: ConciliacaoTransacao[]) {
		/*entityList.forEach(conciliacaoTransacao => {
		      if (!conciliacaoTransacao.conciliacaoBancaria) {
		        conciliacaoTransacao.conciliacaoBancaria = new ConciliacaoBancaria();
		      }
		      	
		});*/
	}
	
	autoComplete(query: string): Promise<ConciliacaoTransacaoAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<ConciliacaoTransacaoAutoComplete[]>(`${this.url}/autoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as ConciliacaoTransacaoAutoComplete[];
	        return result;
	      });
	
	}
	
							
	// Begin relationships autoComplete 
	
	conciliacaoBancariaConciliacaoBancariaAutoComplete(query: string): Promise<ConciliacaoBancariaAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<ConciliacaoBancariaAutoComplete[]>(`${this.url}/conciliacaoBancariaConciliacaoBancariaAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as ConciliacaoBancariaAutoComplete[];
	        return result;
	      });
	
	}
	
	// End relationships autoComplete
	
				
	
	conciliacaoTransacaoList(conciliacaoTransacaoListFilter: ConciliacaoTransacaoListFilter): Promise<any> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(conciliacaoTransacaoListFilter);
	
	    return this.http.get<any>(this.url, { headers, params })
	      .toPromise()
	      .then(response => {
	        const data = response;
	        const items = data.content; /* array of ConciliacaoTransacao */
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
	
	
	mountAndGetSearchParams(filter: ConciliacaoTransacaoListFilter): HttpParams {
	    let params = new HttpParams();
	    if (filter.pageNumber) {
	      params = params.set('page', filter.pageNumber.toString());
	    }
	
	    if (filter.pageSize) {
	      params = params.set('size', filter.pageSize.toString());
	    }
		
		// conciliacaoBancariaId
		if (filter.conciliacaoBancariaId) {
			const value = filter.conciliacaoBancariaId;
			params = params.set('conciliacaoBancariaId', value);
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
	replicateConciliacaoTransacao(id: string, groupId: string, quantity: number): Promise<boolean> {
	    const headers = this.getHeaders();
	
	    const payload = new ReplicateConciliacaoTransacaoPayload(id, quantity, groupId);
	    return this.http.post(`${this.url}/replicateConciliacaoTransacao`, payload, { headers } )
	    .toPromise()
	    .then(response => {
	      return response === true;
	    });
	}
		
	getTotaisfilterConciliacaoTransacao(filter: ConciliacaoTransacaorListFilter): Promise<TotaisfilterConciliacaoTransacao> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(filter);
	    return this.http.get<TotaisfilterConciliacaoTransacao>(`${this.url}/getTotaisfilterConciliacaoTransacao`, { headers, params })
	    .toPromise()
	    .then(response => {
	      const result = response as TotaisfilterConciliacaoTransacao;
	      return result;
	    });
	}
	*/
}

