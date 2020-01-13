/**********************************************************************************************
Code generated with MKL Plug-in version: 47.7.13
Code generated at time stamp: 2020-01-07T20:34:08.364
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';

import { HttpClientWithToken } from '../../../../security/http-client-token';

import { TenantOpCount } from './tenantopcount.model';
import { TenantOpCountAutoComplete } from './tenantopcount.model';
import { Tenant } from './../tenant/tenant.model';
import { TenantOpCountListFilter } from './tenantopcount.model';
import { environment } from 'src/environments/environment';
import { TenantAutoComplete } from './../tenant/tenant.model';

@Injectable()
export class TenantOpCountService {
	
	url = environment.apiUrl + '/security/authorization/entities/tenantOpCount';
	
	constructor(private http: HttpClientWithToken) { }
	
	// TODO: Provisório
	private getHeaders(): Headers {
		const headers = new Headers();
	    
	    headers.append('Content-Type', 'application/json');
	    return headers;
	}
	
	create(tenantOpCount: TenantOpCount): Promise<TenantOpCount> {
		const headers = this.getHeaders();    
	
	    return this.http.post(this.url, tenantOpCount, { headers })
	    .toPromise()
	    .then(response => {
	      const created = response as TenantOpCount;
	      this.adjustNullEntitySlots([created]);
	      return created;
	    });
	}
	
	update(tenantOpCount: TenantOpCount): Promise<TenantOpCount> {
	    const headers = this.getHeaders();
	
	    return this.http.put(`${this.url}/${tenantOpCount.id}`, tenantOpCount, { headers })
	    .toPromise()
	    .then(response => {
	      const updated = response as TenantOpCount;
	      this.adjustNullEntitySlots([updated]);
	      return updated;
	    });
	}
	
	delete(id: string): Promise<void> {
	    return this.http.delete(`${this.url}/${id}`)
	    .toPromise()
	    .then(() => null);
	}
	
	retrieve(id: string): Promise<TenantOpCount> {
	    const headers = this.getHeaders();
	    return this.http.get<TenantOpCount>(`${this.url}/${id}`, { headers })
	    .toPromise()
	    .then(response => {
	      const tenantOpCount = response as TenantOpCount;
	      this.adjustNullEntitySlots([tenantOpCount]);
	      return tenantOpCount;
	    });
	}
	
	
	
	private adjustNullEntitySlots(entityList: TenantOpCount[]) {
		/*entityList.forEach(tenantOpCount => {
		      if (!tenantOpCount.tenant) {
		        tenantOpCount.tenant = new Tenant();
		      }
		      	
		});*/
	}
	
	autoComplete(query: string): Promise<TenantOpCountAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<TenantOpCountAutoComplete[]>(`${this.url}/autoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as TenantOpCountAutoComplete[];
	        return result;
	      });
	
	}
	
							
	// Begin relationships autoComplete 
	
	tenantTenantAutoComplete(query: string): Promise<TenantAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<TenantAutoComplete[]>(`${this.url}/tenantTenantAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as TenantAutoComplete[];
	        return result;
	      });
	
	}
	
	// End relationships autoComplete
	
				
	
	tenantOpCountList(tenantOpCountListFilter: TenantOpCountListFilter): Promise<any> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(tenantOpCountListFilter);
	
	    return this.http.get<any>(this.url, { headers, params })
	      .toPromise()
	      .then(response => {
	        const data = response;
	        const items = data.content; /* array of TenantOpCount */
	        const totalElements = data.totalElements;
	
	        this.adjustNullEntitySlots(items);
	
	        const result = {
	          items,
	          totalElements
	        };
	
	        return result;
	      });
	}
	
	
	mountAndGetSearchParams(filter: TenantOpCountListFilter): HttpParams {
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
	replicateTenantOpCount(id: string, groupId: string, quantity: number): Promise<boolean> {
	    const headers = this.getHeaders();
	
	    const payload = new ReplicateTenantOpCountPayload(id, quantity, groupId);
	    return this.http.post(`${this.url}/replicateTenantOpCount`, payload, { headers } )
	    .toPromise()
	    .then(response => {
	      return response === true;
	    });
	}
		
	getTotaisfilterTenantOpCount(filter: TenantOpCountrListFilter): Promise<TotaisfilterTenantOpCount> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(filter);
	    return this.http.get<TotaisfilterTenantOpCount>(`${this.url}/getTotaisfilterTenantOpCount`, { headers, params })
	    .toPromise()
	    .then(response => {
	      const result = response as TotaisfilterTenantOpCount;
	      return result;
	    });
	}
	*/
}

