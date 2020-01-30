/**********************************************************************************************
Code generated with MKL Plug-in version: 60.0.6
Copyright: Kerubin - kerubin.platform@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';

import { HttpClientWithToken } from '../../../../security/http-client-token';

import { ContaBancaria } from './contabancaria.model';
import { ContaBancariaAutoComplete } from './contabancaria.model';
import { AgenciaBancaria } from './../agenciabancaria/agenciabancaria.model';
import { BandeiraCartao } from './../bandeiracartao/bandeiracartao.model';
import { ContaBancariaListFilter } from './contabancaria.model';
import { ContaBancariaNumeroContaAutoComplete } from './contabancaria.model';
import { AnalyticsService } from './../../../../analitycs/analytics.service';
import { environment } from 'src/environments/environment';
import { AgenciaBancariaAutoComplete } from './../agenciabancaria/agenciabancaria.model';
import { BandeiraCartaoAutoComplete } from './../bandeiracartao/bandeiracartao.model';

@Injectable()
export class ContaBancariaService {
	
	url = environment.apiUrl + '/cadastros/banco/entities/contaBancaria';
	
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
	
	create(contaBancaria: ContaBancaria): Promise<ContaBancaria> {
		const headers = this.getHeaders();    
		this.analitycs.sendEvent('cadastros.banco.ContaBancaria', 'create', 'create ContaBancaria');
	    return this.http.post(this.url, contaBancaria, { headers })
	    .toPromise()
	    .then(response => {
	      const created = response as ContaBancaria;
	      this.adjustNullEntitySlots([created]);
	      this.adjustEntityDates([created]);
	      return created;
	    });
	}
	
	update(contaBancaria: ContaBancaria): Promise<ContaBancaria> {
	    const headers = this.getHeaders();
		this.analitycs.sendEvent('cadastros.banco.ContaBancaria', 'update', 'update ContaBancaria');
	    return this.http.put(`${this.url}/${contaBancaria.id}`, contaBancaria, { headers })
	    .toPromise()
	    .then(response => {
	      const updated = response as ContaBancaria;
	      this.adjustNullEntitySlots([updated]);
	      this.adjustEntityDates([updated]);
	      return updated;
	    });
	}
	
	delete(id: string): Promise<void> {
		this.analitycs.sendEvent('cadastros.banco.ContaBancaria', 'delete', 'delete ContaBancaria');
	    return this.http.delete(`${this.url}/${id}`)
	    .toPromise()
	    .then(() => null);
	}
	
	retrieve(id: string): Promise<ContaBancaria> {
		this.analitycs.sendEvent('cadastros.banco.ContaBancaria', 'retrieve', 'retrieve ContaBancaria');
	    const headers = this.getHeaders();
	    return this.http.get<ContaBancaria>(`${this.url}/${id}`, { headers })
	    .toPromise()
	    .then(response => {
	      const contaBancaria = response as ContaBancaria;
	      this.adjustNullEntitySlots([contaBancaria]);
	      this.adjustEntityDates([contaBancaria]);
	      return contaBancaria;
	    });
	}
	
	
	private adjustEntityDates(entityList: ContaBancaria[]) {
		entityList.forEach(contaBancaria => {
		      if (contaBancaria.dataValidade) {
		        contaBancaria.dataValidade = moment(contaBancaria.dataValidade, 'YYYY-MM-DD').toDate();
		      }
		      	
		});
	}
	
	private adjustNullEntitySlots(entityList: ContaBancaria[]) {
		/*entityList.forEach(contaBancaria => {
		      if (!contaBancaria.agencia) {
		        contaBancaria.agencia = new AgenciaBancaria();
		      }
		      	
		      
		      if (!contaBancaria.bandeiraCartao) {
		        contaBancaria.bandeiraCartao = new BandeiraCartao();
		      }
		      	
		});*/
	}
	
	autoComplete(query: string): Promise<ContaBancariaAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
		this.analitycs.sendEvent('cadastros.banco.ContaBancaria', 'autoComplete', JSON.stringify(params));
	    return this.http.get<ContaBancariaAutoComplete[]>(`${this.url}/autoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as ContaBancariaAutoComplete[];
	        return result;
	      });
	
	}
	
							
	// Begin relationships autoComplete 
	
	agenciaBancariaAgenciaAutoComplete(query: string): Promise<AgenciaBancariaAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
		this.analitycs.sendEvent('cadastros.banco.AgenciaBancaria', 'agenciaBancariaAgenciaAutoComplete', JSON.stringify(params));
	    return this.http.get<AgenciaBancariaAutoComplete[]>(`${this.url}/agenciaBancariaAgenciaAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as AgenciaBancariaAutoComplete[];
	        return result;
	      });
	
	}
	
	
	bandeiraCartaoBandeiraCartaoAutoComplete(query: string): Promise<BandeiraCartaoAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
		this.analitycs.sendEvent('cadastros.banco.BandeiraCartao', 'bandeiraCartaoBandeiraCartaoAutoComplete', JSON.stringify(params));
	    return this.http.get<BandeiraCartaoAutoComplete[]>(`${this.url}/bandeiraCartaoBandeiraCartaoAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as BandeiraCartaoAutoComplete[];
	        return result;
	      });
	
	}
	
	// End relationships autoComplete
	
				
	
	contaBancariaNumeroContaAutoComplete(query: string): Promise<any> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
		this.analitycs.sendEvent('cadastros.banco.ContaBancaria', 'contaBancariaNumeroContaAutoComplete', JSON.stringify(params));
	    return this.http.get<any>(`${this.url}/contaBancariaNumeroContaAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as ContaBancariaNumeroContaAutoComplete[];
	        return result;
	      });
	
	}
	
	contaBancariaList(contaBancariaListFilter: ContaBancariaListFilter): Promise<any> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(contaBancariaListFilter);
		this.analitycs.sendEvent('cadastros.banco.ContaBancaria', 'contaBancariaList', JSON.stringify(params));
	    return this.http.get<any>(this.url, { headers, params })
	      .toPromise()
	      .then(response => {
	        const data = response;
	        const items = data.content; /* array of ContaBancaria */
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
	
	
	mountAndGetSearchParams(filter: ContaBancariaListFilter): HttpParams {
	    let params = new HttpParams();
	    if (filter.pageNumber) {
	      params = params.set('page', filter.pageNumber.toString());
	    }
	
	    if (filter.pageSize) {
	      params = params.set('size', filter.pageSize.toString());
	    }
		
		// numeroConta
		if (filter.numeroConta) {
			const numeroConta = filter.numeroConta.map(item => item.numeroConta).join(',');
			params = params.set('numeroConta', numeroConta);
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
	replicateContaBancaria(id: string, groupId: string, quantity: number): Promise<boolean> {
	    const headers = this.getHeaders();
	
	    const payload = new ReplicateContaBancariaPayload(id, quantity, groupId);
	    return this.http.post(`${this.url}/replicateContaBancaria`, payload, { headers } )
	    .toPromise()
	    .then(response => {
	      return response === true;
	    });
	}
		
	getTotaisfilterContaBancaria(filter: ContaBancariarListFilter): Promise<TotaisfilterContaBancaria> {
	    const headers = this.getHeaders();
		
	    const params = this.mountAndGetSearchParams(filter);
		this.analitycs.sendEvent('cadastros.banco.ContaBancaria', 'getTotaisfilterContaBancaria', JSON.stringify(params));
	    return this.http.get<TotaisfilterContaBancaria>(`${this.url}/getTotaisfilterContaBancaria`, { headers, params })
	    .toPromise()
	    .then(response => {
	      const result = response as TotaisfilterContaBancaria;
	      return result;
	    });
	}
	*/
}

