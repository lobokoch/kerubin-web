/**********************************************************************************************
Code generated by MKL Plug-in
Copyright: Kerubin - kerubin.platform@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';

import { HttpClientWithToken } from '../../../../security/http-client-token';

import { Foto } from './foto.model';
import { FotoAutoComplete } from './foto.model';
import { Produto } from './../produto/produto.model';
import { FotoListFilter } from './foto.model';
import { AnalyticsService } from './../../../../analitycs/analytics.service';
import { environment } from 'src/environments/environment';
import { ProdutoAutoComplete } from './../produto/produto.model';

@Injectable()
export class FotoService {
	
	url = environment.apiUrl + '/cadastros/fornecedor/entities/foto';
	
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
	
	create(foto: Foto): Promise<Foto> {
		const headers = this.getHeaders();
		this.analitycs.sendEvent('cadastros.fornecedor.Foto', 'create', 'create Foto');
	    return this.http.post(this.url, foto, { headers })
	    .toPromise()
	    .then(response => {
	      const created = response as Foto;
	      this.adjustNullEntitySlots([created]);
	      return created;
	    });
	}
	
	update(foto: Foto): Promise<Foto> {
	    const headers = this.getHeaders();
		this.analitycs.sendEvent('cadastros.fornecedor.Foto', 'update', 'update Foto');
	    return this.http.put(`${this.url}/${foto.id}`, foto, { headers })
	    .toPromise()
	    .then(response => {
	      const updated = response as Foto;
	      this.adjustNullEntitySlots([updated]);
	      return updated;
	    });
	}
	
	delete(id: string): Promise<void> {
		this.analitycs.sendEvent('cadastros.fornecedor.Foto', 'delete', 'delete Foto');
	    return this.http.delete(`${this.url}/${id}`)
	    .toPromise()
	    .then(() => null);
	}
	
	retrieve(id: string): Promise<Foto> {
		this.analitycs.sendEvent('cadastros.fornecedor.Foto', 'retrieve', 'retrieve Foto');
	    const headers = this.getHeaders();
	    return this.http.get<Foto>(`${this.url}/${id}`, { headers })
	    .toPromise()
	    .then(response => {
	      const foto = response as Foto;
	      this.adjustNullEntitySlots([foto]);
	      return foto;
	    });
	}
	
	
	
	
	private adjustNullEntitySlots(entityList: Foto[]) {
		/*entityList.forEach(foto => {
		      if (!foto.produto) {
		        foto.produto = new Produto();
		      }
		      	
		});*/
	}
	
	autoComplete(query: string): Promise<FotoAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
		this.analitycs.sendEvent('cadastros.fornecedor.Foto', 'autoComplete', JSON.stringify(params));
	    return this.http.get<FotoAutoComplete[]>(`${this.url}/autoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as FotoAutoComplete[];
	        return result;
	      });
	
	}
	
							
	// Begin relationships autoComplete 
	
	produtoProdutoAutoComplete(query: string): Promise<ProdutoAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
		this.analitycs.sendEvent('cadastros.fornecedor.Produto', 'produtoProdutoAutoComplete', JSON.stringify(params));
	    return this.http.get<ProdutoAutoComplete[]>(`${this.url}/produtoProdutoAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as ProdutoAutoComplete[];
	        return result;
	      });
	
	}
	
	// End relationships autoComplete
	
				
	
	fotoList(fotoListFilter: FotoListFilter): Promise<any> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(fotoListFilter);
		this.analitycs.sendEvent('cadastros.fornecedor.Foto', 'fotoList', JSON.stringify(params));
	    return this.http.get<any>(this.url, { headers, params })
	      .toPromise()
	      .then(response => {
	        const data = response;
	        const items = data.content; /* array of Foto */
	        const totalElements = data.totalElements;
	
	        this.adjustNullEntitySlots(items);
	
	        const result = {
	          items,
	          totalElements
	        };
	
	        return result;
	      });
	}
	
	
	mountAndGetSearchParams(filter: FotoListFilter): HttpParams {
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
	replicateFoto(id: string, groupId: string, quantity: number): Promise<boolean> {
	    const headers = this.getHeaders();
	
	    const payload = new ReplicateFotoPayload(id, quantity, groupId);
	    return this.http.post(`${this.url}/replicateFoto`, payload, { headers } )
	    .toPromise()
	    .then(response => {
	      return response === true;
	    });
	}
		
	getTotaisfilterFoto(filter: FotorListFilter): Promise<TotaisfilterFoto> {
	    const headers = this.getHeaders();
		
	    const params = this.mountAndGetSearchParams(filter);
		this.analitycs.sendEvent('cadastros.fornecedor.Foto', 'getTotaisfilterFoto', JSON.stringify(params));
	    return this.http.get<TotaisfilterFoto>(`${this.url}/getTotaisfilterFoto`, { headers, params })
	    .toPromise()
	    .then(response => {
	      const result = response as TotaisfilterFoto;
	      return result;
	    });
	}
	*/
}

