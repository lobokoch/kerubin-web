/**********************************************************************************************
Code generated with MKL Plug-in version: 7.18.7
Code generated at time stamp: 2019-08-15T06:20:44.459
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';

import { HttpClientWithToken } from '../../../../security/http-client-token';

import { CreditOrderAdmin } from './creditorderadmin.model';
import { CreditOrderAdminAutoComplete } from './creditorderadmin.model';
import { SysUser } from './../sysuser/sysuser.model';
import { CreditOrderAdminListFilter } from './creditorderadmin.model';
import { CreditOrderAdminOrderUserNameAutoComplete } from './creditorderadmin.model';
import { CreditOrderAdminOrderTenantNameAutoComplete } from './creditorderadmin.model';
import { CreditOrderAdminSumFields } from './creditorderadmin.model';
import { environment } from 'src/environments/environment';
import { SysUserAutoComplete } from './../sysuser/sysuser.model';

@Injectable()
export class CreditOrderAdminService {
	
	url = environment.apiUrl + '/security/authorization/entities/creditOrderAdmin';
	
	constructor(private http: HttpClientWithToken) { }
	
	// TODO: Provisório
	private getHeaders(): Headers {
		const headers = new Headers();
	    
	    headers.append('Content-Type', 'application/json');
	    return headers;
	}
	
	create(creditOrderAdmin: CreditOrderAdmin): Promise<CreditOrderAdmin> {
		const headers = this.getHeaders();    
	
	    return this.http.post(this.url, creditOrderAdmin, { headers })
	    .toPromise()
	    .then(response => {
	      const created = response as CreditOrderAdmin;
	      this.adjustNullEntitySlots([created]);
	      this.adjustEntityDates([created]);
	      return created;
	    });
	}
	
	update(creditOrderAdmin: CreditOrderAdmin): Promise<CreditOrderAdmin> {
	    const headers = this.getHeaders();
	
	    return this.http.put(`${this.url}/${creditOrderAdmin.id}`, creditOrderAdmin, { headers })
	    .toPromise()
	    .then(response => {
	      const updated = response as CreditOrderAdmin;
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
	
	retrieve(id: string): Promise<CreditOrderAdmin> {
	    const headers = this.getHeaders();
	    return this.http.get<CreditOrderAdmin>(`${this.url}/${id}`, { headers })
	    .toPromise()
	    .then(response => {
	      const creditOrderAdmin = response as CreditOrderAdmin;
	      this.adjustNullEntitySlots([creditOrderAdmin]);
	      this.adjustEntityDates([creditOrderAdmin]);
	      return creditOrderAdmin;
	    });
	}
	
	
	private adjustEntityDates(entityList: CreditOrderAdmin[]) {
		entityList.forEach(creditOrderAdmin => {
		      if (creditOrderAdmin.orderDate) {
		        creditOrderAdmin.orderDate = moment(creditOrderAdmin.orderDate, 'YYYY-MM-DD').toDate();
		      }
		      	
		      
		      if (creditOrderAdmin.orderPaidDate) {
		        creditOrderAdmin.orderPaidDate = moment(creditOrderAdmin.orderPaidDate, 'YYYY-MM-DD').toDate();
		      }
		      	
		      
		      if (creditOrderAdmin.orderCanceledDate) {
		        creditOrderAdmin.orderCanceledDate = moment(creditOrderAdmin.orderCanceledDate, 'YYYY-MM-DD').toDate();
		      }
		      	
		});
	}
	
	private adjustNullEntitySlots(entityList: CreditOrderAdmin[]) {
		/*entityList.forEach(creditOrderAdmin => {
		      if (!creditOrderAdmin.orderUser) {
		        creditOrderAdmin.orderUser = new SysUser();
		      }
		      	
		});*/
	}
	
	autoComplete(query: string): Promise<CreditOrderAdminAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<CreditOrderAdminAutoComplete[]>(`${this.url}/autoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as CreditOrderAdminAutoComplete[];
	        return result;
	      });
	
	}
	
							
	// Begin relationships autoComplete 
	
	sysUserOrderUserAutoComplete(query: string): Promise<SysUserAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<SysUserAutoComplete[]>(`${this.url}/sysUserOrderUserAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as SysUserAutoComplete[];
	        return result;
	      });
	
	}
	
	// End relationships autoComplete
	
				
	
	creditOrderAdminOrderUserNameAutoComplete(query: string): Promise<any> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<any>(`${this.url}/creditOrderAdminOrderUserNameAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as CreditOrderAdminOrderUserNameAutoComplete[];
	        return result;
	      });
	
	}
	
	creditOrderAdminOrderTenantNameAutoComplete(query: string): Promise<any> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<any>(`${this.url}/creditOrderAdminOrderTenantNameAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as CreditOrderAdminOrderTenantNameAutoComplete[];
	        return result;
	      });
	
	}
	
	creditOrderAdminList(creditOrderAdminListFilter: CreditOrderAdminListFilter): Promise<any> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(creditOrderAdminListFilter);
	
	    return this.http.get<any>(this.url, { headers, params })
	      .toPromise()
	      .then(response => {
	        const data = response;
	        const items = data.content; /* array of CreditOrderAdmin */
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
	
	
	getCreditOrderAdminSumFields(creditOrderAdminListFilter: CreditOrderAdminListFilter): Promise<CreditOrderAdminSumFields> {
	    const headers = this.getHeaders();
	    
		const params = this.mountAndGetSearchParams(creditOrderAdminListFilter);
		return this.http.get<any>(`${this.url}/creditOrderAdminSumFields`, { headers, params })
		  .toPromise()
		  .then(response => {
		    const result = response;
		    return result;
		  });
	}
	
	mountAndGetSearchParams(filter: CreditOrderAdminListFilter): HttpParams {
	    let params = new HttpParams();
	    if (filter.pageNumber) {
	      params = params.set('page', filter.pageNumber.toString());
	    }
	
	    if (filter.pageSize) {
	      params = params.set('size', filter.pageSize.toString());
	    }
		
		// id
		if (filter.id) {
			const value = filter.id;
			params = params.set('id', value);
		}
		
		// orderUserName
		if (filter.orderUserName) {
			const orderUserName = filter.orderUserName.map(item => item.orderUserName).join(',');
			params = params.set('orderUserName', orderUserName);
		}
		
		// orderTenantName
		if (filter.orderTenantName) {
			const orderTenantName = filter.orderTenantName.map(item => item.orderTenantName).join(',');
			params = params.set('orderTenantName', orderTenantName);
		}
		
		// orderDateFrom
		if (filter.orderDateFrom) {
		const value = this.dateToStr(filter.orderDateFrom);
			params = params.set('orderDateFrom', value);
		}
		
		// orderDateTo
		if (filter.orderDateTo) {
		const value = this.dateToStr(filter.orderDateTo);
			params = params.set('orderDateTo', value);
		}
		
		// orderValueFrom
		if (filter.orderValueFrom) {
		const value = filter.orderValueFrom.toString();
			params = params.set('orderValueFrom', value);
		}
		
		// orderValueTo
		if (filter.orderValueTo) {
		const value = filter.orderValueTo.toString();
			params = params.set('orderValueTo', value);
		}
		
		// orderStatus
		if (filter.orderStatus) {
			const value = String(filter.orderStatus);
			params = params.set('orderStatus', value);
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
	replicateCreditOrderAdmin(id: string, groupId: string, quantity: number): Promise<boolean> {
	    const headers = this.getHeaders();
	
	    const payload = new ReplicateCreditOrderAdminPayload(id, quantity, groupId);
	    return this.http.post(`${this.url}/replicateCreditOrderAdmin`, payload, { headers } )
	    .toPromise()
	    .then(response => {
	      return response === true;
	    });
	}
		
	getTotaisfilterCreditOrderAdmin(filter: CreditOrderAdminrListFilter): Promise<TotaisfilterCreditOrderAdmin> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(filter);
	    return this.http.get<TotaisfilterCreditOrderAdmin>(`${this.url}/getTotaisfilterCreditOrderAdmin`, { headers, params })
	    .toPromise()
	    .then(response => {
	      const result = response as TotaisfilterCreditOrderAdmin;
	      return result;
	    });
	}
	*/
}

