/**********************************************************************************************
Code generated with MKL Plug-in version: 30.0.4
Code generated at time stamp: 2019-11-20T06:17:24.247
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';

import { HttpClientWithToken } from '../../../../security/http-client-token';

import { ConciliacaoTransacaoTitulo } from './conciliacaotransacaotitulo.model';
import { ConciliacaoTransacaoTituloAutoComplete } from './conciliacaotransacaotitulo.model';
import { ConciliacaoTransacao } from './../conciliacaotransacao/conciliacaotransacao.model';
import { ConciliacaoTransacaoTituloListFilter } from './conciliacaotransacaotitulo.model';
import { environment } from 'src/environments/environment';
import { ConciliacaoTransacaoAutoComplete } from './../conciliacaotransacao/conciliacaotransacao.model';

@Injectable()
export class ConciliacaoTransacaoTituloService {
	
	url = environment.apiUrl + '/cadastros/banco/entities/conciliacaoTransacaoTitulo';
	
	constructor(private http: HttpClientWithToken) { }
	
	// TODO: Provisório
	private getHeaders(): Headers {
		const headers = new Headers();
	    
	    headers.append('Content-Type', 'application/json');
	    return headers;
	}
	
	create(conciliacaoTransacaoTitulo: ConciliacaoTransacaoTitulo): Promise<ConciliacaoTransacaoTitulo> {
		const headers = this.getHeaders();    
	
	    return this.http.post(this.url, conciliacaoTransacaoTitulo, { headers })
	    .toPromise()
	    .then(response => {
	      const created = response as ConciliacaoTransacaoTitulo;
	      this.adjustNullEntitySlots([created]);
	      this.adjustEntityDates([created]);
	      return created;
	    });
	}
	
	update(conciliacaoTransacaoTitulo: ConciliacaoTransacaoTitulo): Promise<ConciliacaoTransacaoTitulo> {
	    const headers = this.getHeaders();
	
	    return this.http.put(`${this.url}/${conciliacaoTransacaoTitulo.id}`, conciliacaoTransacaoTitulo, { headers })
	    .toPromise()
	    .then(response => {
	      const updated = response as ConciliacaoTransacaoTitulo;
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
	
	retrieve(id: string): Promise<ConciliacaoTransacaoTitulo> {
	    const headers = this.getHeaders();
	    return this.http.get<ConciliacaoTransacaoTitulo>(`${this.url}/${id}`, { headers })
	    .toPromise()
	    .then(response => {
	      const conciliacaoTransacaoTitulo = response as ConciliacaoTransacaoTitulo;
	      this.adjustNullEntitySlots([conciliacaoTransacaoTitulo]);
	      this.adjustEntityDates([conciliacaoTransacaoTitulo]);
	      return conciliacaoTransacaoTitulo;
	    });
	}
	
	
	private adjustEntityDates(entityList: ConciliacaoTransacaoTitulo[]) {
		entityList.forEach(conciliacaoTransacaoTitulo => {
		      if (conciliacaoTransacaoTitulo.tituloConciliadoDataVen) {
		        conciliacaoTransacaoTitulo.tituloConciliadoDataVen = moment(conciliacaoTransacaoTitulo.tituloConciliadoDataVen, 'YYYY-MM-DD').toDate();
		      }
		      	
		      
		      if (conciliacaoTransacaoTitulo.tituloConciliadoDataPag) {
		        conciliacaoTransacaoTitulo.tituloConciliadoDataPag = moment(conciliacaoTransacaoTitulo.tituloConciliadoDataPag, 'YYYY-MM-DD').toDate();
		      }
		      	
		      
		      if (conciliacaoTransacaoTitulo.dataConciliacao) {
		        conciliacaoTransacaoTitulo.dataConciliacao = moment(conciliacaoTransacaoTitulo.dataConciliacao, 'YYYY-MM-DD').toDate();
		      }
		      	
		});
	}
	
	private adjustNullEntitySlots(entityList: ConciliacaoTransacaoTitulo[]) {
		/*entityList.forEach(conciliacaoTransacaoTitulo => {
		      if (!conciliacaoTransacaoTitulo.conciliacaoTransacao) {
		        conciliacaoTransacaoTitulo.conciliacaoTransacao = new ConciliacaoTransacao();
		      }
		      	
		});*/
	}
	
	autoComplete(query: string): Promise<ConciliacaoTransacaoTituloAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<ConciliacaoTransacaoTituloAutoComplete[]>(`${this.url}/autoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as ConciliacaoTransacaoTituloAutoComplete[];
	        return result;
	      });
	
	}
	
							
	// Begin relationships autoComplete 
	
	conciliacaoTransacaoConciliacaoTransacaoAutoComplete(query: string): Promise<ConciliacaoTransacaoAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<ConciliacaoTransacaoAutoComplete[]>(`${this.url}/conciliacaoTransacaoConciliacaoTransacaoAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as ConciliacaoTransacaoAutoComplete[];
	        return result;
	      });
	
	}
	
	// End relationships autoComplete
	
				
	
	conciliacaoTransacaoTituloList(conciliacaoTransacaoTituloListFilter: ConciliacaoTransacaoTituloListFilter): Promise<any> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(conciliacaoTransacaoTituloListFilter);
	
	    return this.http.get<any>(this.url, { headers, params })
	      .toPromise()
	      .then(response => {
	        const data = response;
	        const items = data.content; /* array of ConciliacaoTransacaoTitulo */
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
	
	
	mountAndGetSearchParams(filter: ConciliacaoTransacaoTituloListFilter): HttpParams {
	    let params = new HttpParams();
	    if (filter.pageNumber) {
	      params = params.set('page', filter.pageNumber.toString());
	    }
	
	    if (filter.pageSize) {
	      params = params.set('size', filter.pageSize.toString());
	    }
		
		// situacaoConciliacaoTrn
		if (filter.situacaoConciliacaoTrn) {
			const value = String(filter.situacaoConciliacaoTrn);
			params = params.set('situacaoConciliacaoTrn', value);
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
	replicateConciliacaoTransacaoTitulo(id: string, groupId: string, quantity: number): Promise<boolean> {
	    const headers = this.getHeaders();
	
	    const payload = new ReplicateConciliacaoTransacaoTituloPayload(id, quantity, groupId);
	    return this.http.post(`${this.url}/replicateConciliacaoTransacaoTitulo`, payload, { headers } )
	    .toPromise()
	    .then(response => {
	      return response === true;
	    });
	}
		
	getTotaisfilterConciliacaoTransacaoTitulo(filter: ConciliacaoTransacaoTitulorListFilter): Promise<TotaisfilterConciliacaoTransacaoTitulo> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(filter);
	    return this.http.get<TotaisfilterConciliacaoTransacaoTitulo>(`${this.url}/getTotaisfilterConciliacaoTransacaoTitulo`, { headers, params })
	    .toPromise()
	    .then(response => {
	      const result = response as TotaisfilterConciliacaoTransacaoTitulo;
	      return result;
	    });
	}
	*/
}

