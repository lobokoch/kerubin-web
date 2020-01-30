/**********************************************************************************************
Code generated with MKL Plug-in version: 60.0.6
Copyright: Kerubin - kerubin.platform@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';

import { HttpClientWithToken } from '../../../../security/http-client-token';

import { CaixaDiario } from './caixadiario.model';
import { CaixaDiarioAutoComplete } from './caixadiario.model';
import { Caixa } from './../caixa/caixa.model';
import { CaixaDiarioListFilter } from './caixadiario.model';
import { AnalyticsService } from './../../../../analitycs/analytics.service';
import { environment } from 'src/environments/environment';
import { CaixaAutoComplete } from './../caixa/caixa.model';

@Injectable()
export class CaixaDiarioService {
	
	url = environment.apiUrl + '/financeiro/fluxo_caixa/entities/caixaDiario';
	
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
	
	create(caixaDiario: CaixaDiario): Promise<CaixaDiario> {
		const headers = this.getHeaders();    
		this.analitycs.sendEvent('financeiro.fluxo_caixa.CaixaDiario', 'create', 'create CaixaDiario');
	    return this.http.post(this.url, caixaDiario, { headers })
	    .toPromise()
	    .then(response => {
	      const created = response as CaixaDiario;
	      this.adjustNullEntitySlots([created]);
	      this.adjustEntityDates([created]);
	      return created;
	    });
	}
	
	update(caixaDiario: CaixaDiario): Promise<CaixaDiario> {
	    const headers = this.getHeaders();
		this.analitycs.sendEvent('financeiro.fluxo_caixa.CaixaDiario', 'update', 'update CaixaDiario');
	    return this.http.put(`${this.url}/${caixaDiario.id}`, caixaDiario, { headers })
	    .toPromise()
	    .then(response => {
	      const updated = response as CaixaDiario;
	      this.adjustNullEntitySlots([updated]);
	      this.adjustEntityDates([updated]);
	      return updated;
	    });
	}
	
	delete(id: string): Promise<void> {
		this.analitycs.sendEvent('financeiro.fluxo_caixa.CaixaDiario', 'delete', 'delete CaixaDiario');
	    return this.http.delete(`${this.url}/${id}`)
	    .toPromise()
	    .then(() => null);
	}
	
	retrieve(id: string): Promise<CaixaDiario> {
		this.analitycs.sendEvent('financeiro.fluxo_caixa.CaixaDiario', 'retrieve', 'retrieve CaixaDiario');
	    const headers = this.getHeaders();
	    return this.http.get<CaixaDiario>(`${this.url}/${id}`, { headers })
	    .toPromise()
	    .then(response => {
	      const caixaDiario = response as CaixaDiario;
	      this.adjustNullEntitySlots([caixaDiario]);
	      this.adjustEntityDates([caixaDiario]);
	      return caixaDiario;
	    });
	}
	
	caixaDiarioRuleFunctionAbrirCaixa(caixaDiario: CaixaDiario): Promise<CaixaDiario> {
	    const headers = this.getHeaders();
		this.analitycs.sendEvent('financeiro.fluxo_caixa.CaixaDiario', 'caixaDiarioRuleFunctionAbrirCaixa', 'caixaDiarioRuleFunctionAbrirCaixa CaixaDiario');
	    return this.http.put(`${this.url}/caixaDiarioRuleFunctionAbrirCaixa/${caixaDiario.id}`, caixaDiario, { headers })
	    .toPromise()
	    .then(response => {
	      const updated = response as CaixaDiario;
	      this.adjustNullEntitySlots([updated]);
	      this.adjustEntityDates([updated]);
	      return updated;
	    });
	}
	
	caixaDiarioRuleFunctionFecharCaixa(caixaDiario: CaixaDiario): Promise<CaixaDiario> {
	    const headers = this.getHeaders();
		this.analitycs.sendEvent('financeiro.fluxo_caixa.CaixaDiario', 'caixaDiarioRuleFunctionFecharCaixa', 'caixaDiarioRuleFunctionFecharCaixa CaixaDiario');
	    return this.http.put(`${this.url}/caixaDiarioRuleFunctionFecharCaixa/${caixaDiario.id}`, caixaDiario, { headers })
	    .toPromise()
	    .then(response => {
	      const updated = response as CaixaDiario;
	      this.adjustNullEntitySlots([updated]);
	      this.adjustEntityDates([updated]);
	      return updated;
	    });
	}
	
	
	private adjustEntityDates(entityList: CaixaDiario[]) {
		entityList.forEach(caixaDiario => {
		      if (caixaDiario.dataHoraAbertura) {
		        caixaDiario.dataHoraAbertura = moment(caixaDiario.dataHoraAbertura, 'YYYY-MM-DD H:m:s').toDate();
		      }
		      	
		      
		      if (caixaDiario.dataHoraFechamento) {
		        caixaDiario.dataHoraFechamento = moment(caixaDiario.dataHoraFechamento, 'YYYY-MM-DD H:m:s').toDate();
		      }
		      	
		});
	}
	
	private adjustNullEntitySlots(entityList: CaixaDiario[]) {
		/*entityList.forEach(caixaDiario => {
		      if (!caixaDiario.caixa) {
		        caixaDiario.caixa = new Caixa();
		      }
		      	
		});*/
	}
	
	autoComplete(query: string): Promise<CaixaDiarioAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
		this.analitycs.sendEvent('financeiro.fluxo_caixa.CaixaDiario', 'autoComplete', JSON.stringify(params));
	    return this.http.get<CaixaDiarioAutoComplete[]>(`${this.url}/autoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as CaixaDiarioAutoComplete[];
	        return result;
	      });
	
	}
	
							
	// Begin relationships autoComplete 
	
	caixaCaixaAutoComplete(query: string): Promise<CaixaAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
		this.analitycs.sendEvent('financeiro.fluxo_caixa.Caixa', 'caixaCaixaAutoComplete', JSON.stringify(params));
	    return this.http.get<CaixaAutoComplete[]>(`${this.url}/caixaCaixaAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as CaixaAutoComplete[];
	        return result;
	      });
	
	}
	
	// End relationships autoComplete
	
				
	
	caixaDiarioList(caixaDiarioListFilter: CaixaDiarioListFilter): Promise<any> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(caixaDiarioListFilter);
		this.analitycs.sendEvent('financeiro.fluxo_caixa.CaixaDiario', 'caixaDiarioList', JSON.stringify(params));
	    return this.http.get<any>(this.url, { headers, params })
	      .toPromise()
	      .then(response => {
	        const data = response;
	        const items = data.content; /* array of CaixaDiario */
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
	
	
	mountAndGetSearchParams(filter: CaixaDiarioListFilter): HttpParams {
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
	replicateCaixaDiario(id: string, groupId: string, quantity: number): Promise<boolean> {
	    const headers = this.getHeaders();
	
	    const payload = new ReplicateCaixaDiarioPayload(id, quantity, groupId);
	    return this.http.post(`${this.url}/replicateCaixaDiario`, payload, { headers } )
	    .toPromise()
	    .then(response => {
	      return response === true;
	    });
	}
		
	getTotaisfilterCaixaDiario(filter: CaixaDiariorListFilter): Promise<TotaisfilterCaixaDiario> {
	    const headers = this.getHeaders();
		
	    const params = this.mountAndGetSearchParams(filter);
		this.analitycs.sendEvent('financeiro.fluxo_caixa.CaixaDiario', 'getTotaisfilterCaixaDiario', JSON.stringify(params));
	    return this.http.get<TotaisfilterCaixaDiario>(`${this.url}/getTotaisfilterCaixaDiario`, { headers, params })
	    .toPromise()
	    .then(response => {
	      const result = response as TotaisfilterCaixaDiario;
	      return result;
	    });
	}
	*/
}

