/**********************************************************************************************
Code generated by MKL Plug-in
Copyright: Kerubin - kerubin.platform@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';

import { HttpClientWithToken } from '../../../../security/http-client-token';

import { ConciliacaoTransacao } from './conciliacaotransacao.model';
import { ConciliacaoTransacaoAutoComplete } from './conciliacaotransacao.model';
import { ConciliacaoBancaria } from './../conciliacaobancaria/conciliacaobancaria.model';
import { PlanoConta } from './../planoconta/planoconta.model';
import { ConciliacaoTransacaoTitulo } from './../conciliacaotransacaotitulo/conciliacaotransacaotitulo.model';
import { ConciliacaoTransacaoListFilter } from './conciliacaotransacao.model';
import { ConciliacaoTransacaoTrnHistoricoAutoComplete } from './conciliacaotransacao.model';
import { ConciliacaoTransacaoTrnDocumentoAutoComplete } from './conciliacaotransacao.model';
import { AnalyticsService } from './../../../../analitycs/analytics.service';
import { environment } from 'src/environments/environment';
import { ConciliacaoBancariaAutoComplete } from './../conciliacaobancaria/conciliacaobancaria.model';
import { PlanoContaAutoComplete } from './../planoconta/planoconta.model';
import { ConciliacaoTransacaoTituloAutoComplete } from './../conciliacaotransacaotitulo/conciliacaotransacaotitulo.model';

@Injectable()
export class ConciliacaoTransacaoService {
	
	url = environment.apiUrl + '/cadastros/banco/entities/conciliacaoTransacao';
	
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
	
	create(conciliacaoTransacao: ConciliacaoTransacao): Promise<ConciliacaoTransacao> {
		const headers = this.getHeaders();    
		this.analitycs.sendEvent('cadastros.banco.ConciliacaoTransacao', 'create', 'create ConciliacaoTransacao');
	    return this.http.post(this.url, conciliacaoTransacao, { headers })
	    .toPromise()
	    .then(response => {
	      const created = response as ConciliacaoTransacao;
	      this.adjustNullEntitySlots([created]);
	      this.adjustEntityDates([created]);
	      return created;
	    });
	}
	
	update(conciliacaoTransacao: ConciliacaoTransacao): Promise<ConciliacaoTransacao> {
	    const headers = this.getHeaders();
		this.analitycs.sendEvent('cadastros.banco.ConciliacaoTransacao', 'update', 'update ConciliacaoTransacao');
	    return this.http.put(`${this.url}/${conciliacaoTransacao.id}`, conciliacaoTransacao, { headers })
	    .toPromise()
	    .then(response => {
	      const updated = response as ConciliacaoTransacao;
	      this.adjustNullEntitySlots([updated]);
	      this.adjustEntityDates([updated]);
	      return updated;
	    });
	}
	
	delete(id: string): Promise<void> {
		this.analitycs.sendEvent('cadastros.banco.ConciliacaoTransacao', 'delete', 'delete ConciliacaoTransacao');
	    return this.http.delete(`${this.url}/${id}`)
	    .toPromise()
	    .then(() => null);
	}
	
	retrieve(id: string): Promise<ConciliacaoTransacao> {
		this.analitycs.sendEvent('cadastros.banco.ConciliacaoTransacao', 'retrieve', 'retrieve ConciliacaoTransacao');
	    const headers = this.getHeaders();
	    return this.http.get<ConciliacaoTransacao>(`${this.url}/${id}`, { headers })
	    .toPromise()
	    .then(response => {
	      const conciliacaoTransacao = response as ConciliacaoTransacao;
	      this.adjustNullEntitySlots([conciliacaoTransacao]);
	      this.adjustEntityDates([conciliacaoTransacao]);
	      return conciliacaoTransacao;
	    });
	}
	
	
	private adjustEntityDates(entityList: ConciliacaoTransacao[]) {
		entityList.forEach(conciliacaoTransacao => {
		      if (conciliacaoTransacao.trnData) {
		        conciliacaoTransacao.trnData = moment(conciliacaoTransacao.trnData, 'YYYY-MM-DD').toDate();
		      }
		      	
		      
		      if (conciliacaoTransacao.tituloConciliadoDataVen) {
		        conciliacaoTransacao.tituloConciliadoDataVen = moment(conciliacaoTransacao.tituloConciliadoDataVen, 'YYYY-MM-DD').toDate();
		      }
		      	
		      
		      if (conciliacaoTransacao.tituloConciliadoDataPag) {
		        conciliacaoTransacao.tituloConciliadoDataPag = moment(conciliacaoTransacao.tituloConciliadoDataPag, 'YYYY-MM-DD').toDate();
		      }
		      	
		      
		      if (conciliacaoTransacao.dataConciliacao) {
		        conciliacaoTransacao.dataConciliacao = moment(conciliacaoTransacao.dataConciliacao, 'YYYY-MM-DD').toDate();
		      }
		      	
		});
	}
	
	private adjustNullEntitySlots(entityList: ConciliacaoTransacao[]) {
		/*entityList.forEach(conciliacaoTransacao => {
		      if (!conciliacaoTransacao.conciliacaoBancaria) {
		        conciliacaoTransacao.conciliacaoBancaria = new ConciliacaoBancaria();
		      }
		      	
		      
		      if (!conciliacaoTransacao.tituloPlanoContas) {
		        conciliacaoTransacao.tituloPlanoContas = new PlanoConta();
		      }
		      	
		      
		      if (!conciliacaoTransacao.conciliacaoTransacaoTitulos) {
		        conciliacaoTransacao.conciliacaoTransacaoTitulos = new ConciliacaoTransacaoTitulo();
		      }
		      	
		});*/
	}
	
	autoComplete(query: string): Promise<ConciliacaoTransacaoAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
		this.analitycs.sendEvent('cadastros.banco.ConciliacaoTransacao', 'autoComplete', JSON.stringify(params));
	    return this.http.get<ConciliacaoTransacaoAutoComplete[]>(`${this.url}/autoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as ConciliacaoTransacaoAutoComplete[];
	        return result;
	      });
	
	}
	
							
	// Begin relationships autoComplete 
	
	conciliacaoBancariaConciliacaoBancariaAutoComplete(query: string): Promise<ConciliacaoBancariaAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
		this.analitycs.sendEvent('cadastros.banco.ConciliacaoBancaria', 'conciliacaoBancariaConciliacaoBancariaAutoComplete', JSON.stringify(params));
	    return this.http.get<ConciliacaoBancariaAutoComplete[]>(`${this.url}/conciliacaoBancariaConciliacaoBancariaAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as ConciliacaoBancariaAutoComplete[];
	        return result;
	      });
	
	}
	
	
	planoContaTituloPlanoContasAutoComplete(query: string, conciliacaoTransacao: ConciliacaoTransacao): Promise<PlanoContaAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
		this.analitycs.sendEvent('cadastros.banco.PlanoConta', 'planoContaTituloPlanoContasAutoComplete', JSON.stringify(params));
	    return this.http.post<PlanoContaAutoComplete[]>(`${this.url}/planoContaTituloPlanoContasAutoComplete`, conciliacaoTransacao, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as PlanoContaAutoComplete[];
	        return result;
	      });
	
	}
	
	
	conciliacaoTransacaoTituloConciliacaoTransacaoTitulosAutoComplete(query: string): Promise<ConciliacaoTransacaoTituloAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
		this.analitycs.sendEvent('cadastros.banco.ConciliacaoTransacaoTitulo', 'conciliacaoTransacaoTituloConciliacaoTransacaoTitulosAutoComplete', JSON.stringify(params));
	    return this.http.get<ConciliacaoTransacaoTituloAutoComplete[]>(`${this.url}/conciliacaoTransacaoTituloConciliacaoTransacaoTitulosAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as ConciliacaoTransacaoTituloAutoComplete[];
	        return result;
	      });
	
	}
	
	// End relationships autoComplete
	
				
	
	conciliacaoTransacaoTrnHistoricoAutoComplete(query: string): Promise<any> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
		this.analitycs.sendEvent('cadastros.banco.ConciliacaoTransacao', 'conciliacaoTransacaoTrnHistoricoAutoComplete', JSON.stringify(params));
	    return this.http.get<any>(`${this.url}/conciliacaoTransacaoTrnHistoricoAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as ConciliacaoTransacaoTrnHistoricoAutoComplete[];
	        return result;
	      });
	
	}
	
	conciliacaoTransacaoTrnDocumentoAutoComplete(query: string): Promise<any> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
		this.analitycs.sendEvent('cadastros.banco.ConciliacaoTransacao', 'conciliacaoTransacaoTrnDocumentoAutoComplete', JSON.stringify(params));
	    return this.http.get<any>(`${this.url}/conciliacaoTransacaoTrnDocumentoAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as ConciliacaoTransacaoTrnDocumentoAutoComplete[];
	        return result;
	      });
	
	}
	
	conciliacaoTransacaoList(conciliacaoTransacaoListFilter: ConciliacaoTransacaoListFilter): Promise<any> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(conciliacaoTransacaoListFilter);
		this.analitycs.sendEvent('cadastros.banco.ConciliacaoTransacao', 'conciliacaoTransacaoList', JSON.stringify(params));
	    return this.http.get<any>(this.url, { headers, params })
	      .toPromise()
	      .then(response => {
	        const data = response;
	        const items = data.content; /* array of ConciliacaoTransacao */
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
	
	
	mountAndGetSearchParams(filter: ConciliacaoTransacaoListFilter): HttpParams {
	    let params = new HttpParams();
	    if (filter.pageNumber) {
	      params = params.set('page', filter.pageNumber.toString());
	    }
	
	    if (filter.pageSize) {
	      params = params.set('size', filter.pageSize.toString());
	    }
		
		// trnDataFrom
		if (filter.trnDataFrom) {
		const value = this.dateToStr(filter.trnDataFrom);
			params = params.set('trnDataFrom', value);
		}
		
		// trnDataTo
		if (filter.trnDataTo) {
		const value = this.dateToStr(filter.trnDataTo);
			params = params.set('trnDataTo', value);
		}
		
		// trnHistorico
		if (filter.trnHistorico) {
			const trnHistorico = filter.trnHistorico.map(item => item.trnHistorico).join(',');
			params = params.set('trnHistorico', trnHistorico);
		}
		
		// trnDocumento
		if (filter.trnDocumento) {
			const trnDocumento = filter.trnDocumento.map(item => item.trnDocumento).join(',');
			params = params.set('trnDocumento', trnDocumento);
		}
		
		// trnTipo
		if (filter.trnTipo) {
			const value = String(filter.trnTipo);
			params = params.set('trnTipo', value);
		}
		
		// trnValorFrom
		if (filter.trnValorFrom) {
		const value = filter.trnValorFrom.toString();
			params = params.set('trnValorFrom', value);
		}
		
		// trnValorTo
		if (filter.trnValorTo) {
		const value = filter.trnValorTo.toString();
			params = params.set('trnValorTo', value);
		}
		
		// conciliacaoBancariaId
		if (filter.conciliacaoBancariaId) {
			const value = filter.conciliacaoBancariaId;
			params = params.set('conciliacaoBancariaId', value);
		}
		
		// situacaoConciliacaoTrn
		if (filter.situacaoConciliacaoTrn) {
			const value = String(filter.situacaoConciliacaoTrn);
			params = params.set('situacaoConciliacaoTrn', value);
		}
		
		// conciliadoComErroIsNotNull
		if (filter.conciliadoComErroIsNotNull) {
			const value = filter.conciliadoComErroIsNotNull ? 'true' : 'false';
			params = params.set('conciliadoComErroIsNotNull', value);
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
	replicateConciliacaoTransacao(id: string, groupId: string, quantity: number): Promise<boolean> {
	    const headers = this.getHeaders();
	
	    const payload = new ReplicateConciliacaoTransacaoPayload(id, quantity, groupId);
	    return this.http.post(`${this.url}/replicateConciliacaoTransacao`, payload, { headers } )
	    .toPromise()
	    .then(response => {
	      return response === true;
	    });
	}
		
	getTotaisfilterConciliacaoTransacao(filter: ConciliacaoTransacaorListFilter): Promise<TotaisfilterConciliacaoTransacao> {
	    const headers = this.getHeaders();
		
	    const params = this.mountAndGetSearchParams(filter);
		this.analitycs.sendEvent('cadastros.banco.ConciliacaoTransacao', 'getTotaisfilterConciliacaoTransacao', JSON.stringify(params));
	    return this.http.get<TotaisfilterConciliacaoTransacao>(`${this.url}/getTotaisfilterConciliacaoTransacao`, { headers, params })
	    .toPromise()
	    .then(response => {
	      const result = response as TotaisfilterConciliacaoTransacao;
	      return result;
	    });
	}
	*/
}

