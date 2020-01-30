/**********************************************************************************************
Code generated with MKL Plug-in version: 60.0.6
Copyright: Kerubin - kerubin.platform@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';

import { HttpClientWithToken } from '../../../../security/http-client-token';

import { Fornecedor } from './fornecedor.model';
import { FornecedorAutoComplete } from './fornecedor.model';
import { FornecedorListFilter } from './fornecedor.model';
import { FornecedorNomeAutoComplete } from './fornecedor.model';
import { AnalyticsService } from './../../../../analitycs/analytics.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class FornecedorService {
	
	url = environment.apiUrl + '/cadastros/fornecedor/entities/fornecedor';
	
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
	
	create(fornecedor: Fornecedor): Promise<Fornecedor> {
		const headers = this.getHeaders();    
		this.analitycs.sendEvent('cadastros.fornecedor.Fornecedor', 'create', 'create Fornecedor');
	    return this.http.post(this.url, fornecedor, { headers })
	    .toPromise()
	    .then(response => {
	      const created = response as Fornecedor;
	      this.adjustEntityDates([created]);
	      return created;
	    });
	}
	
	update(fornecedor: Fornecedor): Promise<Fornecedor> {
	    const headers = this.getHeaders();
		this.analitycs.sendEvent('cadastros.fornecedor.Fornecedor', 'update', 'update Fornecedor');
	    return this.http.put(`${this.url}/${fornecedor.id}`, fornecedor, { headers })
	    .toPromise()
	    .then(response => {
	      const updated = response as Fornecedor;
	      this.adjustEntityDates([updated]);
	      return updated;
	    });
	}
	
	delete(id: string): Promise<void> {
		this.analitycs.sendEvent('cadastros.fornecedor.Fornecedor', 'delete', 'delete Fornecedor');
	    return this.http.delete(`${this.url}/${id}`)
	    .toPromise()
	    .then(() => null);
	}
	
	retrieve(id: string): Promise<Fornecedor> {
		this.analitycs.sendEvent('cadastros.fornecedor.Fornecedor', 'retrieve', 'retrieve Fornecedor');
	    const headers = this.getHeaders();
	    return this.http.get<Fornecedor>(`${this.url}/${id}`, { headers })
	    .toPromise()
	    .then(response => {
	      const fornecedor = response as Fornecedor;
	      this.adjustEntityDates([fornecedor]);
	      return fornecedor;
	    });
	}
	
	
	private adjustEntityDates(entityList: Fornecedor[]) {
		entityList.forEach(fornecedor => {
		      if (fornecedor.dataFundacaoNascimento) {
		        fornecedor.dataFundacaoNascimento = moment(fornecedor.dataFundacaoNascimento, 'YYYY-MM-DD').toDate();
		      }
		      	
		});
	}
	
	
	autoComplete(query: string): Promise<FornecedorAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
		this.analitycs.sendEvent('cadastros.fornecedor.Fornecedor', 'autoComplete', JSON.stringify(params));
	    return this.http.get<FornecedorAutoComplete[]>(`${this.url}/autoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as FornecedorAutoComplete[];
	        return result;
	      });
	
	}
	
				
	
	fornecedorNomeAutoComplete(query: string): Promise<any> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
		this.analitycs.sendEvent('cadastros.fornecedor.Fornecedor', 'fornecedorNomeAutoComplete', JSON.stringify(params));
	    return this.http.get<any>(`${this.url}/fornecedorNomeAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as FornecedorNomeAutoComplete[];
	        return result;
	      });
	
	}
	
	fornecedorList(fornecedorListFilter: FornecedorListFilter): Promise<any> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(fornecedorListFilter);
		this.analitycs.sendEvent('cadastros.fornecedor.Fornecedor', 'fornecedorList', JSON.stringify(params));
	    return this.http.get<any>(this.url, { headers, params })
	      .toPromise()
	      .then(response => {
	        const data = response;
	        const items = data.content; /* array of Fornecedor */
	        const totalElements = data.totalElements;
	
	        this.adjustEntityDates(items);
	
	        const result = {
	          items,
	          totalElements
	        };
	
	        return result;
	      });
	}
	
	
	mountAndGetSearchParams(filter: FornecedorListFilter): HttpParams {
	    let params = new HttpParams();
	    if (filter.pageNumber) {
	      params = params.set('page', filter.pageNumber.toString());
	    }
	
	    if (filter.pageSize) {
	      params = params.set('size', filter.pageSize.toString());
	    }
		
		// nome
		if (filter.nome) {
			const nome = filter.nome.map(item => item.nome).join(',');
			params = params.set('nome', nome);
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
	replicateFornecedor(id: string, groupId: string, quantity: number): Promise<boolean> {
	    const headers = this.getHeaders();
	
	    const payload = new ReplicateFornecedorPayload(id, quantity, groupId);
	    return this.http.post(`${this.url}/replicateFornecedor`, payload, { headers } )
	    .toPromise()
	    .then(response => {
	      return response === true;
	    });
	}
		
	getTotaisfilterFornecedor(filter: FornecedorrListFilter): Promise<TotaisfilterFornecedor> {
	    const headers = this.getHeaders();
		
	    const params = this.mountAndGetSearchParams(filter);
		this.analitycs.sendEvent('cadastros.fornecedor.Fornecedor', 'getTotaisfilterFornecedor', JSON.stringify(params));
	    return this.http.get<TotaisfilterFornecedor>(`${this.url}/getTotaisfilterFornecedor`, { headers, params })
	    .toPromise()
	    .then(response => {
	      const result = response as TotaisfilterFornecedor;
	      return result;
	    });
	}
	*/
}

