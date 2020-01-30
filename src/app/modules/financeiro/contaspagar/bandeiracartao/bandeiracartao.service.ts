/**********************************************************************************************
Code generated with MKL Plug-in version: 60.0.6
Copyright: Kerubin - kerubin.platform@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';

import { HttpClientWithToken } from '../../../../security/http-client-token';

import { BandeiraCartao } from './bandeiracartao.model';
import { BandeiraCartaoAutoComplete } from './bandeiracartao.model';
import { BandeiraCartaoListFilter } from './bandeiracartao.model';
import { BandeiraCartaoNomeBandeiraAutoComplete } from './bandeiracartao.model';
import { AnalyticsService } from './../../../../analitycs/analytics.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class BandeiraCartaoService {
	
	url = environment.apiUrl + '/financeiro/contas_pagar/entities/bandeiraCartao';
	
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
	
	create(bandeiraCartao: BandeiraCartao): Promise<BandeiraCartao> {
		const headers = this.getHeaders();    
		this.analitycs.sendEvent('financeiro.contas_pagar.BandeiraCartao', 'create', 'create BandeiraCartao');
	    return this.http.post(this.url, bandeiraCartao, { headers })
	    .toPromise()
	    .then(response => {
	      const created = response as BandeiraCartao;
	      return created;
	    });
	}
	
	update(bandeiraCartao: BandeiraCartao): Promise<BandeiraCartao> {
	    const headers = this.getHeaders();
		this.analitycs.sendEvent('financeiro.contas_pagar.BandeiraCartao', 'update', 'update BandeiraCartao');
	    return this.http.put(`${this.url}/${bandeiraCartao.id}`, bandeiraCartao, { headers })
	    .toPromise()
	    .then(response => {
	      const updated = response as BandeiraCartao;
	      return updated;
	    });
	}
	
	delete(id: string): Promise<void> {
		this.analitycs.sendEvent('financeiro.contas_pagar.BandeiraCartao', 'delete', 'delete BandeiraCartao');
	    return this.http.delete(`${this.url}/${id}`)
	    .toPromise()
	    .then(() => null);
	}
	
	retrieve(id: string): Promise<BandeiraCartao> {
		this.analitycs.sendEvent('financeiro.contas_pagar.BandeiraCartao', 'retrieve', 'retrieve BandeiraCartao');
	    const headers = this.getHeaders();
	    return this.http.get<BandeiraCartao>(`${this.url}/${id}`, { headers })
	    .toPromise()
	    .then(response => {
	      const bandeiraCartao = response as BandeiraCartao;
	      return bandeiraCartao;
	    });
	}
	
	
	
	
	autoComplete(query: string): Promise<BandeiraCartaoAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
		this.analitycs.sendEvent('financeiro.contas_pagar.BandeiraCartao', 'autoComplete', JSON.stringify(params));
	    return this.http.get<BandeiraCartaoAutoComplete[]>(`${this.url}/autoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as BandeiraCartaoAutoComplete[];
	        return result;
	      });
	
	}
	
				
	
	bandeiraCartaoNomeBandeiraAutoComplete(query: string): Promise<any> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
		this.analitycs.sendEvent('financeiro.contas_pagar.BandeiraCartao', 'bandeiraCartaoNomeBandeiraAutoComplete', JSON.stringify(params));
	    return this.http.get<any>(`${this.url}/bandeiraCartaoNomeBandeiraAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as BandeiraCartaoNomeBandeiraAutoComplete[];
	        return result;
	      });
	
	}
	
	bandeiraCartaoList(bandeiraCartaoListFilter: BandeiraCartaoListFilter): Promise<any> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(bandeiraCartaoListFilter);
		this.analitycs.sendEvent('financeiro.contas_pagar.BandeiraCartao', 'bandeiraCartaoList', JSON.stringify(params));
	    return this.http.get<any>(this.url, { headers, params })
	      .toPromise()
	      .then(response => {
	        const data = response;
	        const items = data.content; /* array of BandeiraCartao */
	        const totalElements = data.totalElements;
	
	
	        const result = {
	          items,
	          totalElements
	        };
	
	        return result;
	      });
	}
	
	
	mountAndGetSearchParams(filter: BandeiraCartaoListFilter): HttpParams {
	    let params = new HttpParams();
	    if (filter.pageNumber) {
	      params = params.set('page', filter.pageNumber.toString());
	    }
	
	    if (filter.pageSize) {
	      params = params.set('size', filter.pageSize.toString());
	    }
		
		// nomeBandeira
		if (filter.nomeBandeira) {
			const nomeBandeira = filter.nomeBandeira.map(item => item.nomeBandeira).join(',');
			params = params.set('nomeBandeira', nomeBandeira);
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
	replicateBandeiraCartao(id: string, groupId: string, quantity: number): Promise<boolean> {
	    const headers = this.getHeaders();
	
	    const payload = new ReplicateBandeiraCartaoPayload(id, quantity, groupId);
	    return this.http.post(`${this.url}/replicateBandeiraCartao`, payload, { headers } )
	    .toPromise()
	    .then(response => {
	      return response === true;
	    });
	}
		
	getTotaisfilterBandeiraCartao(filter: BandeiraCartaorListFilter): Promise<TotaisfilterBandeiraCartao> {
	    const headers = this.getHeaders();
		
	    const params = this.mountAndGetSearchParams(filter);
		this.analitycs.sendEvent('financeiro.contas_pagar.BandeiraCartao', 'getTotaisfilterBandeiraCartao', JSON.stringify(params));
	    return this.http.get<TotaisfilterBandeiraCartao>(`${this.url}/getTotaisfilterBandeiraCartao`, { headers, params })
	    .toPromise()
	    .then(response => {
	      const result = response as TotaisfilterBandeiraCartao;
	      return result;
	    });
	}
	*/
}

