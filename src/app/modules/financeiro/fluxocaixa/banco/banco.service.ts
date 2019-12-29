/**********************************************************************************************
Code generated with MKL Plug-in version: 40.2.1
Code generated at time stamp: 2019-12-29T08:40:12.255
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';

import { HttpClientWithToken } from '../../../../security/http-client-token';

import { Banco } from './banco.model';
import { BancoAutoComplete } from './banco.model';
import { BancoListFilter } from './banco.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class BancoService {
	
	url = environment.apiUrl + '/financeiro/fluxo_caixa/entities/banco';
	
	constructor(private http: HttpClientWithToken) { }
	
	// TODO: Provisório
	private getHeaders(): Headers {
		const headers = new Headers();
	    
	    headers.append('Content-Type', 'application/json');
	    return headers;
	}
	
	create(banco: Banco): Promise<Banco> {
		const headers = this.getHeaders();    
	
	    return this.http.post(this.url, banco, { headers })
	    .toPromise()
	    .then(response => {
	      const created = response as Banco;
	      return created;
	    });
	}
	
	update(banco: Banco): Promise<Banco> {
	    const headers = this.getHeaders();
	
	    return this.http.put(`${this.url}/${banco.id}`, banco, { headers })
	    .toPromise()
	    .then(response => {
	      const updated = response as Banco;
	      return updated;
	    });
	}
	
	delete(id: string): Promise<void> {
	    return this.http.delete(`${this.url}/${id}`)
	    .toPromise()
	    .then(() => null);
	}
	
	retrieve(id: string): Promise<Banco> {
	    const headers = this.getHeaders();
	    return this.http.get<Banco>(`${this.url}/${id}`, { headers })
	    .toPromise()
	    .then(response => {
	      const banco = response as Banco;
	      return banco;
	    });
	}
	
	
	
	
	autoComplete(query: string): Promise<BancoAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<BancoAutoComplete[]>(`${this.url}/autoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as BancoAutoComplete[];
	        return result;
	      });
	
	}
	
				
	
	bancoList(bancoListFilter: BancoListFilter): Promise<any> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(bancoListFilter);
	
	    return this.http.get<any>(this.url, { headers, params })
	      .toPromise()
	      .then(response => {
	        const data = response;
	        const items = data.content; /* array of Banco */
	        const totalElements = data.totalElements;
	
	
	        const result = {
	          items,
	          totalElements
	        };
	
	        return result;
	      });
	}
	
	
	mountAndGetSearchParams(filter: BancoListFilter): HttpParams {
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
	    if (filter.sortField) {
	      // search/nameStartsWith?name=K&sort=name,desc
	      const sortField = filter.sortField;
	      const sortValue = `${sortField.field},${sortField.order > 0 ? 'asc' : 'desc'}`;
	      params = params.set('sort', sortValue);
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
	replicateBanco(id: string, groupId: string, quantity: number): Promise<boolean> {
	    const headers = this.getHeaders();
	
	    const payload = new ReplicateBancoPayload(id, quantity, groupId);
	    return this.http.post(`${this.url}/replicateBanco`, payload, { headers } )
	    .toPromise()
	    .then(response => {
	      return response === true;
	    });
	}
		
	getTotaisfilterBanco(filter: BancorListFilter): Promise<TotaisfilterBanco> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(filter);
	    return this.http.get<TotaisfilterBanco>(`${this.url}/getTotaisfilterBanco`, { headers, params })
	    .toPromise()
	    .then(response => {
	      const result = response as TotaisfilterBanco;
	      return result;
	    });
	}
	*/
}

