/**********************************************************************************************
Code generated by MKL Plug-in
Copyright: Kerubin - kerubin.platform@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';

import { HttpClientWithToken } from '../../../../security/http-client-token';

import { CreditOrder } from './creditorder.model';
import { CreditOrderAutoComplete } from './creditorder.model';
import { SysUser } from './../sysuser/sysuser.model';
import { CreditOrderListFilter } from './creditorder.model';
import { CreditOrderOrderUserNameAutoComplete } from './creditorder.model';
import { CreditOrderSumFields } from './creditorder.model';
import { environment } from 'src/environments/environment';
import { SysUserAutoComplete } from './../sysuser/sysuser.model';

@Injectable()
export class CreditOrderService {
	
	url = environment.apiUrl + '/security/authorization/entities/creditOrder';
	
	constructor(
		private http: HttpClientWithToken) { 
		// Generated code.
	}
	
	// TODO: Provisório
	private getHeaders(): Headers {
		const headers = new Headers();
	    
	    headers.append('Content-Type', 'application/json');
	    return headers;
	}
	
	create(creditOrder: CreditOrder): Promise<CreditOrder> {
		const headers = this.getHeaders();    
	    return this.http.post(this.url, creditOrder, { headers })
	    .toPromise()
	    .then(response => {
	      const created = response as CreditOrder;
	      this.adjustNullEntitySlots([created]);
	      this.adjustEntityDates([created]);
	      return created;
	    });
	}
	
	update(creditOrder: CreditOrder): Promise<CreditOrder> {
	    const headers = this.getHeaders();
	    return this.http.put(`${this.url}/${creditOrder.id}`, creditOrder, { headers })
	    .toPromise()
	    .then(response => {
	      const updated = response as CreditOrder;
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
	
	retrieve(id: string): Promise<CreditOrder> {
	    const headers = this.getHeaders();
	    return this.http.get<CreditOrder>(`${this.url}/${id}`, { headers })
	    .toPromise()
	    .then(response => {
	      const creditOrder = response as CreditOrder;
	      this.adjustNullEntitySlots([creditOrder]);
	      this.adjustEntityDates([creditOrder]);
	      return creditOrder;
	    });
	}
	
	
	private adjustEntityDates(entityList: CreditOrder[]) {
		entityList.forEach(creditOrder => {
		      if (creditOrder.orderDate) {
		        creditOrder.orderDate = moment(creditOrder.orderDate, 'YYYY-MM-DD').toDate();
		      }
		      	
		      
		      if (creditOrder.orderPaidDate) {
		        creditOrder.orderPaidDate = moment(creditOrder.orderPaidDate, 'YYYY-MM-DD').toDate();
		      }
		      	
		      
		      if (creditOrder.orderCanceledDate) {
		        creditOrder.orderCanceledDate = moment(creditOrder.orderCanceledDate, 'YYYY-MM-DD').toDate();
		      }
		      	
		});
	}
	
	private adjustNullEntitySlots(entityList: CreditOrder[]) {
		/*entityList.forEach(creditOrder => {
		      if (!creditOrder.orderUser) {
		        creditOrder.orderUser = new SysUser();
		      }
		      	
		});*/
	}
	
	autoComplete(query: string): Promise<CreditOrderAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	    return this.http.get<CreditOrderAutoComplete[]>(`${this.url}/autoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as CreditOrderAutoComplete[];
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
	
				
	
	creditOrderOrderUserNameAutoComplete(query: string): Promise<any> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	    return this.http.get<any>(`${this.url}/creditOrderOrderUserNameAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as CreditOrderOrderUserNameAutoComplete[];
	        return result;
	      });
	
	}
	
	creditOrderList(creditOrderListFilter: CreditOrderListFilter): Promise<any> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(creditOrderListFilter);
	    return this.http.get<any>(this.url, { headers, params })
	      .toPromise()
	      .then(response => {
	        const data = response;
	        const items = data.content; /* array of CreditOrder */
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
	
	
	getCreditOrderSumFields(creditOrderListFilter: CreditOrderListFilter): Promise<CreditOrderSumFields> {
	    const headers = this.getHeaders();
		const params = this.mountAndGetSearchParams(creditOrderListFilter);
		return this.http.get<any>(`${this.url}/creditOrderSumFields`, { headers, params })
		  .toPromise()
		  .then(response => {
		    const result = response;
		    return result;
		  });
	}
	
	mountAndGetSearchParams(filter: CreditOrderListFilter): HttpParams {
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
	replicateCreditOrder(id: string, groupId: string, quantity: number): Promise<boolean> {
	    const headers = this.getHeaders();
	
	    const payload = new ReplicateCreditOrderPayload(id, quantity, groupId);
	    return this.http.post(`${this.url}/replicateCreditOrder`, payload, { headers } )
	    .toPromise()
	    .then(response => {
	      return response === true;
	    });
	}
		
	getTotaisfilterCreditOrder(filter: CreditOrderrListFilter): Promise<TotaisfilterCreditOrder> {
	    const headers = this.getHeaders();
		
	    const params = this.mountAndGetSearchParams(filter);
	    return this.http.get<TotaisfilterCreditOrder>(`${this.url}/getTotaisfilterCreditOrder`, { headers, params })
	    .toPromise()
	    .then(response => {
	      const result = response as TotaisfilterCreditOrder;
	      return result;
	    });
	}
	*/
}

