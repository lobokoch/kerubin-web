/**********************************************************************************************
Code generated with MKL Plug-in version: 47.7.13
Code generated at time stamp: 2020-01-07T19:00:51.829
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';

import { HttpClientWithToken } from '../../../../security/http-client-token';

import { AgenciaBancaria } from './agenciabancaria.model';
import { AgenciaBancariaAutoComplete } from './agenciabancaria.model';
import { Banco } from './../banco/banco.model';
import { AgenciaBancariaListFilter } from './agenciabancaria.model';
import { environment } from 'src/environments/environment';
import { BancoAutoComplete } from './../banco/banco.model';

@Injectable()
export class AgenciaBancariaService {
	
	url = environment.apiUrl + '/cadastros/banco/entities/agenciaBancaria';
	
	constructor(private http: HttpClientWithToken) { }
	
	// TODO: Provisório
	private getHeaders(): Headers {
		const headers = new Headers();
	    
	    headers.append('Content-Type', 'application/json');
	    return headers;
	}
	
	create(agenciaBancaria: AgenciaBancaria): Promise<AgenciaBancaria> {
		const headers = this.getHeaders();    
	
	    return this.http.post(this.url, agenciaBancaria, { headers })
	    .toPromise()
	    .then(response => {
	      const created = response as AgenciaBancaria;
	      this.adjustNullEntitySlots([created]);
	      this.adjustEntityDates([created]);
	      return created;
	    });
	}
	
	update(agenciaBancaria: AgenciaBancaria): Promise<AgenciaBancaria> {
	    const headers = this.getHeaders();
	
	    return this.http.put(`${this.url}/${agenciaBancaria.id}`, agenciaBancaria, { headers })
	    .toPromise()
	    .then(response => {
	      const updated = response as AgenciaBancaria;
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
	
	retrieve(id: string): Promise<AgenciaBancaria> {
	    const headers = this.getHeaders();
	    return this.http.get<AgenciaBancaria>(`${this.url}/${id}`, { headers })
	    .toPromise()
	    .then(response => {
	      const agenciaBancaria = response as AgenciaBancaria;
	      this.adjustNullEntitySlots([agenciaBancaria]);
	      this.adjustEntityDates([agenciaBancaria]);
	      return agenciaBancaria;
	    });
	}
	
	
	private adjustEntityDates(entityList: AgenciaBancaria[]) {
		entityList.forEach(agenciaBancaria => {
		});
	}
	
	private adjustNullEntitySlots(entityList: AgenciaBancaria[]) {
		/*entityList.forEach(agenciaBancaria => {
		      if (!agenciaBancaria.banco) {
		        agenciaBancaria.banco = new Banco();
		      }
		      	
		});*/
	}
	
	autoComplete(query: string): Promise<AgenciaBancariaAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<AgenciaBancariaAutoComplete[]>(`${this.url}/autoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as AgenciaBancariaAutoComplete[];
	        return result;
	      });
	
	}
	
							
	// Begin relationships autoComplete 
	
	bancoBancoAutoComplete(query: string): Promise<BancoAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<BancoAutoComplete[]>(`${this.url}/bancoBancoAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as BancoAutoComplete[];
	        return result;
	      });
	
	}
	
	// End relationships autoComplete
	
				
	
	agenciaBancariaList(agenciaBancariaListFilter: AgenciaBancariaListFilter): Promise<any> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(agenciaBancariaListFilter);
	
	    return this.http.get<any>(this.url, { headers, params })
	      .toPromise()
	      .then(response => {
	        const data = response;
	        const items = data.content; /* array of AgenciaBancaria */
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
	
	
	mountAndGetSearchParams(filter: AgenciaBancariaListFilter): HttpParams {
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
	replicateAgenciaBancaria(id: string, groupId: string, quantity: number): Promise<boolean> {
	    const headers = this.getHeaders();
	
	    const payload = new ReplicateAgenciaBancariaPayload(id, quantity, groupId);
	    return this.http.post(`${this.url}/replicateAgenciaBancaria`, payload, { headers } )
	    .toPromise()
	    .then(response => {
	      return response === true;
	    });
	}
		
	getTotaisfilterAgenciaBancaria(filter: AgenciaBancariarListFilter): Promise<TotaisfilterAgenciaBancaria> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(filter);
	    return this.http.get<TotaisfilterAgenciaBancaria>(`${this.url}/getTotaisfilterAgenciaBancaria`, { headers, params })
	    .toPromise()
	    .then(response => {
	      const result = response as TotaisfilterAgenciaBancaria;
	      return result;
	    });
	}
	*/
}

