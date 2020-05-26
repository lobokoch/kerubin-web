/**********************************************************************************************
Code generated by MKL Plug-in
Copyright: Kerubin - kerubin.platform@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';

import { HttpClientWithToken } from '../../../../security/http-client-token';

import { Compromisso } from './compromisso.model';
import { CompromissoAutoComplete } from './compromisso.model';
import { Cliente } from './../cliente/cliente.model';
import { Recurso } from './../recurso/recurso.model';
import { CompromissoListFilter } from './compromisso.model';
import { CompromissoTituloAutoComplete } from './compromisso.model';
import { AnalyticsService } from './../../../../analitycs/analytics.service';
import { environment } from 'src/environments/environment';
import { ClienteAutoComplete } from './../cliente/cliente.model';
import { RecursoAutoComplete } from './../recurso/recurso.model';

@Injectable()
export class CompromissoService {
	
	url = environment.apiUrl + '/cadastros/cliente/entities/compromisso';
	
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
	
	create(compromisso: Compromisso): Promise<Compromisso> {
		
		compromisso = {... compromisso}; // Make a clone.
		compromisso.horaIni = this.getTimeAsStr(compromisso.horaIni);
		compromisso.horaFim = this.getTimeAsStr(compromisso.horaFim);
		
		const headers = this.getHeaders();
		this.analitycs.sendEvent('cadastros.cliente.compromisso', 'create', 'create compromisso');
	    return this.http.post(this.url, compromisso, { headers })
	    .toPromise()
	    .then(response => {
	      const created = response as Compromisso;
	      this.adjustNullEntitySlots([created]);
	      this.adjustEntityDates([created]);
	      return created;
	    });
	}
	
	update(compromisso: Compromisso): Promise<Compromisso> {
		
		compromisso = {... compromisso}; // Make a clone.
		compromisso.horaIni = this.getTimeAsStr(compromisso.horaIni);
		compromisso.horaFim = this.getTimeAsStr(compromisso.horaFim);
		
	    const headers = this.getHeaders();
		this.analitycs.sendEvent('cadastros.cliente.compromisso', 'update', 'update compromisso');
	    return this.http.put(`${this.url}/${compromisso.id}`, compromisso, { headers })
	    .toPromise()
	    .then(response => {
	      const updated = response as Compromisso;
	      this.adjustNullEntitySlots([updated]);
	      this.adjustEntityDates([updated]);
	      return updated;
	    });
	}
	
	delete(id: string): Promise<void> {
		this.analitycs.sendEvent('cadastros.cliente.compromisso', 'delete', 'delete compromisso');
	    return this.http.delete(`${this.url}/${id}`)
	    .toPromise()
	    .then(() => null);
	}
	
	retrieve(id: string): Promise<Compromisso> {
		this.analitycs.sendEvent('cadastros.cliente.compromisso', 'retrieve', 'retrieve compromisso');
	    const headers = this.getHeaders();
	    return this.http.get<Compromisso>(`${this.url}/${id}`, { headers })
	    .toPromise()
	    .then(response => {
	      const compromisso = response as Compromisso;
	      this.adjustNullEntitySlots([compromisso]);
	      this.adjustEntityDates([compromisso]);
	      return compromisso;
	    });
	}
	
	
	private adjustEntityDates(entityList: Compromisso[]) {
		entityList.forEach(compromisso => {
		      if (compromisso.dataIni) {
		        compromisso.dataIni = moment(compromisso.dataIni, 'YYYY-MM-DD').toDate();
		      }
		      	
		      
		      if (compromisso.horaIni) {
		        compromisso.horaIni = moment(compromisso.horaIni, 'H:m:s').toDate();
		      }
		      	
		      
		      if (compromisso.dataFim) {
		        compromisso.dataFim = moment(compromisso.dataFim, 'YYYY-MM-DD').toDate();
		      }
		      	
		      
		      if (compromisso.horaFim) {
		        compromisso.horaFim = moment(compromisso.horaFim, 'H:m:s').toDate();
		      }
		      	
		});
	}
	
	
	getTimeAsStr(timeCandidate: any): string {
	    if (timeCandidate === null) {
	      return null;
	    }
	
	    if (typeof timeCandidate === 'string') {
	      return timeCandidate;
	    }
	    const result = moment(timeCandidate).format('HH:mm');
	    return result;
	
	}
	
	private adjustNullEntitySlots(entityList: Compromisso[]) {
		/*entityList.forEach(compromisso => {
		      if (!compromisso.cliente) {
		        compromisso.cliente = new Cliente();
		      }
		      	
		      
		      if (!compromisso.recursos) {
		        compromisso.recursos = new Recurso();
		      }
		      	
		});*/
	}
	
	autoComplete(query: string): Promise<CompromissoAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
		this.analitycs.sendEvent('cadastros.cliente.compromisso', 'autoComplete', JSON.stringify(params));
	    return this.http.get<CompromissoAutoComplete[]>(`${this.url}/autoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as CompromissoAutoComplete[];
	        return result;
	      });
	
	}
	
							
	// Begin relationships autoComplete 
	
	clienteClienteAutoComplete(query: string): Promise<ClienteAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
		this.analitycs.sendEvent('cadastros.cliente.Cliente', 'clienteClienteAutoComplete', JSON.stringify(params));
	    return this.http.get<ClienteAutoComplete[]>(`${this.url}/clienteClienteAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as ClienteAutoComplete[];
	        return result;
	      });
	
	}
	
	
	recursoRecursosAutoComplete(query: string): Promise<RecursoAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
		this.analitycs.sendEvent('cadastros.cliente.recurso', 'recursoRecursosAutoComplete', JSON.stringify(params));
	    return this.http.get<RecursoAutoComplete[]>(`${this.url}/recursoRecursosAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as RecursoAutoComplete[];
	        return result;
	      });
	
	}
	
	// End relationships autoComplete
	
				
	
	compromissoTituloAutoComplete(query: string): Promise<any> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
		this.analitycs.sendEvent('cadastros.cliente.compromisso', 'compromissoTituloAutoComplete', JSON.stringify(params));
	    return this.http.get<any>(`${this.url}/compromissoTituloAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as CompromissoTituloAutoComplete[];
	        return result;
	      });
	
	}
	
	compromissoList(compromissoListFilter: CompromissoListFilter): Promise<any> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(compromissoListFilter);
		this.analitycs.sendEvent('cadastros.cliente.compromisso', 'compromissoList', JSON.stringify(params));
	    return this.http.get<any>(this.url, { headers, params })
	      .toPromise()
	      .then(response => {
	        const data = response;
	        const items = data.content; /* array of Compromisso */
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
	
	
	mountAndGetSearchParams(filter: CompromissoListFilter): HttpParams {
	    let params = new HttpParams();
	    if (filter.pageNumber) {
	      params = params.set('page', filter.pageNumber.toString());
	    }
	
	    if (filter.pageSize) {
	      params = params.set('size', filter.pageSize.toString());
	    }
		
		// titulo
		if (filter.titulo) {
			const titulo = filter.titulo.map(item => item.titulo).join(',');
			params = params.set('titulo', titulo);
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
	replicateCompromisso(id: string, groupId: string, quantity: number): Promise<boolean> {
	    const headers = this.getHeaders();
	
	    const payload = new ReplicateCompromissoPayload(id, quantity, groupId);
	    return this.http.post(`${this.url}/replicateCompromisso`, payload, { headers } )
	    .toPromise()
	    .then(response => {
	      return response === true;
	    });
	}
		
	getTotaisfilterCompromisso(filter: CompromissorListFilter): Promise<TotaisfilterCompromisso> {
	    const headers = this.getHeaders();
		
	    const params = this.mountAndGetSearchParams(filter);
		this.analitycs.sendEvent('cadastros.cliente.compromisso', 'getTotaisfilterCompromisso', JSON.stringify(params));
	    return this.http.get<TotaisfilterCompromisso>(`${this.url}/getTotaisfilterCompromisso`, { headers, params })
	    .toPromise()
	    .then(response => {
	      const result = response as TotaisfilterCompromisso;
	      return result;
	    });
	}
	*/
}

