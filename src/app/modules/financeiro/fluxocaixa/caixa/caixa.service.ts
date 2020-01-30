/**********************************************************************************************
Code generated with MKL Plug-in version: 60.0.6
Copyright: Kerubin - kerubin.platform@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';

import { HttpClientWithToken } from '../../../../security/http-client-token';

import { Caixa } from './caixa.model';
import { CaixaAutoComplete } from './caixa.model';
import { CaixaListFilter } from './caixa.model';
import { AnalyticsService } from './../../../../analitycs/analytics.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class CaixaService {
	
	url = environment.apiUrl + '/financeiro/fluxo_caixa/entities/caixa';
	
	constructor(
		private analitycs: AnalyticsService,
		private http: HttpClientWithToken) { 
		// Generated code.
	}
	
	// TODO: Provisório
	private getHeaders(): Headers {
		const headers = new Headers();
	    
	    headers.append('Content-Type', 'application/json');
	    return headers;
	}
	
	create(caixa: Caixa): Promise<Caixa> {
		const headers = this.getHeaders();    
		this.analitycs.sendEvent('financeiro.fluxo_caixa.Caixa', 'create', 'create Caixa');
	    return this.http.post(this.url, caixa, { headers })
	    .toPromise()
	    .then(response => {
	      const created = response as Caixa;
	      this.adjustEntityDates([created]);
	      return created;
	    });
	}
	
	update(caixa: Caixa): Promise<Caixa> {
	    const headers = this.getHeaders();
		this.analitycs.sendEvent('financeiro.fluxo_caixa.Caixa', 'update', 'update Caixa');
	    return this.http.put(`${this.url}/${caixa.id}`, caixa, { headers })
	    .toPromise()
	    .then(response => {
	      const updated = response as Caixa;
	      this.adjustEntityDates([updated]);
	      return updated;
	    });
	}
	
	delete(id: string): Promise<void> {
		this.analitycs.sendEvent('financeiro.fluxo_caixa.Caixa', 'delete', 'delete Caixa');
	    return this.http.delete(`${this.url}/${id}`)
	    .toPromise()
	    .then(() => null);
	}
	
	retrieve(id: string): Promise<Caixa> {
		this.analitycs.sendEvent('financeiro.fluxo_caixa.Caixa', 'retrieve', 'retrieve Caixa');
	    const headers = this.getHeaders();
	    return this.http.get<Caixa>(`${this.url}/${id}`, { headers })
	    .toPromise()
	    .then(response => {
	      const caixa = response as Caixa;
	      this.adjustEntityDates([caixa]);
	      return caixa;
	    });
	}
	
	
	private adjustEntityDates(entityList: Caixa[]) {
		entityList.forEach(caixa => {
		});
	}
	
	
	autoComplete(query: string): Promise<CaixaAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
		this.analitycs.sendEvent('financeiro.fluxo_caixa.Caixa', 'autoComplete', JSON.stringify(params));
	    return this.http.get<CaixaAutoComplete[]>(`${this.url}/autoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as CaixaAutoComplete[];
	        return result;
	      });
	
	}
	
				
	
	caixaList(caixaListFilter: CaixaListFilter): Promise<any> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(caixaListFilter);
		this.analitycs.sendEvent('financeiro.fluxo_caixa.Caixa', 'caixaList', JSON.stringify(params));
	    return this.http.get<any>(this.url, { headers, params })
	      .toPromise()
	      .then(response => {
	        const data = response;
	        const items = data.content; /* array of Caixa */
	        const totalElements = data.totalElements;
	
	        this.adjustEntityDates(items);
	
	        const result = {
	          items,
	          totalElements
	        };
	
	        return result;
	      });
	}
	
	
	mountAndGetSearchParams(filter: CaixaListFilter): HttpParams {
	    let params = new HttpParams();
	    if (filter.pageNumber) {
	      params = params.set('page', filter.pageNumber.toString());
	    }
	
	    if (filter.pageSize) {
	      params = params.set('size', filter.pageSize.toString());
	    }
		
		
		// customParams
		if (filter.customParams && filter.customParams.size > 0) {
			const value = this.mapToJson(filter.customParams);
			params = params.set('customParams', value);
		}
	
	    // Sort
	    if (filter.sortFields) {
	      // search/nameStartsWith?name=K&sort=name,asc&sort=value,desc
	      
			filter.sortFields.forEach(sortField => {
				const sortValue = `${sortField.field},${sortField.order > 0 ? 'asc' : 'desc'}`;
				params = params.append('sort', sortValue);
			});
	    }
	
	    return params;
	}
	
 	mapToJson(someMap: Map<string, any>) {
      return JSON.stringify(this.mapToObj(someMap));
    }

    mapToObj(someMap: Map<string, any>) {
      const obj = Object.create(null);
      someMap.forEach((value, key) => {
        obj[key] = value;
      });
      return obj;
    }
	
	dateToStr(data: Date): string {
	    return moment(data).format('YYYY-MM-DD');
	}
	
	/*** TODO: avaliar se vai ser feito isso.
	replicateCaixa(id: string, groupId: string, quantity: number): Promise<boolean> {
	    const headers = this.getHeaders();
	
	    const payload = new ReplicateCaixaPayload(id, quantity, groupId);
	    return this.http.post(`${this.url}/replicateCaixa`, payload, { headers } )
	    .toPromise()
	    .then(response => {
	      return response === true;
	    });
	}
		
	getTotaisfilterCaixa(filter: CaixarListFilter): Promise<TotaisfilterCaixa> {
	    const headers = this.getHeaders();
		
	    const params = this.mountAndGetSearchParams(filter);
		this.analitycs.sendEvent('financeiro.fluxo_caixa.Caixa', 'getTotaisfilterCaixa', JSON.stringify(params));
	    return this.http.get<TotaisfilterCaixa>(`${this.url}/getTotaisfilterCaixa`, { headers, params })
	    .toPromise()
	    .then(response => {
	      const result = response as TotaisfilterCaixa;
	      return result;
	    });
	}
	*/
}

