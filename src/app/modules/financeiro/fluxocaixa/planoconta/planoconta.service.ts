/**********************************************************************************************
Code generated with MKL Plug-in version: 3.17.1
Code generated at time stamp: 2019-06-20T23:36:05.586
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';

import { HttpClientWithToken } from '../../../../security/http-client-token';

import { PlanoConta } from './planoconta.model';
import { PlanoContaAutoComplete } from './planoconta.model';
import { PlanoContaListFilter } from './planoconta.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class PlanoContaService {
	
	url = environment.apiUrl + '/financeiro/fluxo_caixa/entities/planoConta';
	
	constructor(private http: HttpClientWithToken) { }
	
	// TODO: Provisório
	private getHeaders(): Headers {
		const headers = new Headers();
	    
	    headers.append('Content-Type', 'application/json');
	    return headers;
	}
	
	create(planoConta: PlanoConta): Promise<PlanoConta> {
		const headers = this.getHeaders();    
	
	    return this.http.post(this.url, planoConta, { headers })
	    .toPromise()
	    .then(response => {
	      const created = response as PlanoConta;
	      this.adjustNullEntitySlots([created]);
	      return created;
	    });
	}
	
	update(planoConta: PlanoConta): Promise<PlanoConta> {
	    const headers = this.getHeaders();
	
	    return this.http.put(`${this.url}/${planoConta.id}`, planoConta, { headers })
	    .toPromise()
	    .then(response => {
	      const updated = response as PlanoConta;
	      this.adjustNullEntitySlots([updated]);
	      return updated;
	    });
	}
	
	delete(id: string): Promise<void> {
	    return this.http.delete(`${this.url}/${id}`)
	    .toPromise()
	    .then(() => null);
	}
	
	retrieve(id: string): Promise<PlanoConta> {
	    const headers = this.getHeaders();
	    return this.http.get<PlanoConta>(`${this.url}/${id}`, { headers })
	    .toPromise()
	    .then(response => {
	      const planoConta = response as PlanoConta;
	      this.adjustNullEntitySlots([planoConta]);
	      return planoConta;
	    });
	}
	
	
	
	private adjustNullEntitySlots(entityList: PlanoConta[]) {
		/*entityList.forEach(planoConta => {
		      if (!planoConta.planoContaPai) {
		        planoConta.planoContaPai = new PlanoConta();
		      }
		      	
		});*/
	}
	
	autoComplete(query: string): Promise<PlanoContaAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<PlanoContaAutoComplete[]>(`${this.url}/autoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as PlanoContaAutoComplete[];
	        return result;
	      });
	
	}
	
							
	// Begin relationships autoComplete 
	
	planoContaPlanoContaPaiAutoComplete(query: string): Promise<PlanoContaAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<PlanoContaAutoComplete[]>(`${this.url}/planoContaPlanoContaPaiAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as PlanoContaAutoComplete[];
	        return result;
	      });
	
	}
	
	// End relationships autoComplete
	
				
	
	planoContaList(planoContaListFilter: PlanoContaListFilter): Promise<any> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(planoContaListFilter);
	
	    return this.http.get<any>(this.url, { headers, params })
	      .toPromise()
	      .then(response => {
	        const data = response;
	        const items = data.content; /* array of PlanoConta */
	        const totalElements = data.totalElements;
	
	        this.adjustNullEntitySlots(items);
	
	        const result = {
	          items,
	          totalElements
	        };
	
	        return result;
	      });
	}
	
	
	mountAndGetSearchParams(filter: PlanoContaListFilter): HttpParams {
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
	replicatePlanoConta(id: string, groupId: string, quantity: number): Promise<boolean> {
	    const headers = this.getHeaders();
	
	    const payload = new ReplicatePlanoContaPayload(id, quantity, groupId);
	    return this.http.post(`${this.url}/replicatePlanoConta`, payload, { headers } )
	    .toPromise()
	    .then(response => {
	      return response === true;
	    });
	}
		
	getTotaisfilterPlanoConta(filter: PlanoContarListFilter): Promise<TotaisfilterPlanoConta> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(filter);
	    return this.http.get<TotaisfilterPlanoConta>(`${this.url}/getTotaisfilterPlanoConta`, { headers, params })
	    .toPromise()
	    .then(response => {
	      const result = response as TotaisfilterPlanoConta;
	      return result;
	    });
	}
	*/
}

