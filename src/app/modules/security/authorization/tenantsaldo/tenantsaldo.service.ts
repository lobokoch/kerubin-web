/**********************************************************************************************
Code generated with MKL Plug-in version: 7.0.4
Code generated at time stamp: 2019-08-06T07:20:02.873
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';

import { HttpClientWithToken } from '../../../../security/http-client-token';

import { TenantSaldo } from './tenantsaldo.model';
import { TenantSaldoAutoComplete } from './tenantsaldo.model';
import { Tenant } from './../tenant/tenant.model';
import { TenantSaldoListFilter } from './tenantsaldo.model';
import { TenantSaldoSumFields } from './tenantsaldo.model';
import { environment } from 'src/environments/environment';
import { TenantAutoComplete } from './../tenant/tenant.model';

@Injectable()
export class TenantSaldoService {

	url = environment.apiUrl + '/security/authorization/entities/tenantSaldo';

	constructor(private http: HttpClientWithToken) { }

	// TODO: Provisório
	private getHeaders(): Headers {
		const headers = new Headers();

	    headers.append('Content-Type', 'application/json');
	    return headers;
	}

	create(tenantSaldo: TenantSaldo): Promise<TenantSaldo> {
		const headers = this.getHeaders();

	    return this.http.post(this.url, tenantSaldo, { headers })
	    .toPromise()
	    .then(response => {
	      const created = response as TenantSaldo;
	      this.adjustNullEntitySlots([created]);
	      this.adjustEntityDates([created]);
	      return created;
	    });
	}

	update(tenantSaldo: TenantSaldo): Promise<TenantSaldo> {
	    const headers = this.getHeaders();

	    return this.http.put(`${this.url}/${tenantSaldo.id}`, tenantSaldo, { headers })
	    .toPromise()
	    .then(response => {
	      const updated = response as TenantSaldo;
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

	retrieve(id: string): Promise<TenantSaldo> {
	    const headers = this.getHeaders();
	    return this.http.get<TenantSaldo>(`${this.url}/${id}`, { headers })
	    .toPromise()
	    .then(response => {
	      const tenantSaldo = response as TenantSaldo;
	      this.adjustNullEntitySlots([tenantSaldo]);
	      this.adjustEntityDates([tenantSaldo]);
	      return tenantSaldo;
	    });
	}


	private adjustEntityDates(entityList: TenantSaldo[]) {
		entityList.forEach(tenantSaldo => {
		});
	}

	private adjustNullEntitySlots(entityList: TenantSaldo[]) {
		/*entityList.forEach(tenantSaldo => {
		      if (!tenantSaldo.tenant) {
		        tenantSaldo.tenant = new Tenant();
		      }

		});*/
	}

	autoComplete(query: string): Promise<TenantSaldoAutoComplete[]> {
	    const headers = this.getHeaders();

	    let params = new HttpParams();
	    params = params.set('query', query);

	    return this.http.get<TenantSaldoAutoComplete[]>(`${this.url}/autoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as TenantSaldoAutoComplete[];
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



	tenantSaldoList(tenantSaldoListFilter: TenantSaldoListFilter): Promise<any> {
	    const headers = this.getHeaders();

	    const params = this.mountAndGetSearchParams(tenantSaldoListFilter);

	    return this.http.get<any>(this.url, { headers, params })
	      .toPromise()
	      .then(response => {
	        const data = response;
	        const items = data.content; /* array of TenantSaldo */
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


	getTenantSaldoSumFields(tenantSaldoListFilter: TenantSaldoListFilter): Promise<TenantSaldoSumFields> {
	    const headers = this.getHeaders();

		const params = this.mountAndGetSearchParams(tenantSaldoListFilter);
		return this.http.get<any>(`${this.url}/tenantSaldoSumFields`, { headers, params })
		  .toPromise()
		  .then(response => {
		    const result = response;
		    return result;
		  });
	}

	mountAndGetSearchParams(filter: TenantSaldoListFilter): HttpParams {
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
	replicateTenantSaldo(id: string, groupId: string, quantity: number): Promise<boolean> {
	    const headers = this.getHeaders();

	    const payload = new ReplicateTenantSaldoPayload(id, quantity, groupId);
	    return this.http.post(`${this.url}/replicateTenantSaldo`, payload, { headers } )
	    .toPromise()
	    .then(response => {
	      return response === true;
	    });
	}

	getTotaisfilterTenantSaldo(filter: TenantSaldorListFilter): Promise<TotaisfilterTenantSaldo> {
	    const headers = this.getHeaders();

	    const params = this.mountAndGetSearchParams(filter);
	    return this.http.get<TotaisfilterTenantSaldo>(`${this.url}/getTotaisfilterTenantSaldo`, { headers, params })
	    .toPromise()
	    .then(response => {
	      const result = response as TotaisfilterTenantSaldo;
	      return result;
	    });
	}
	*/
}

