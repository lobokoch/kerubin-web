import { PlanoContaAutoComplete } from './conciliacaotransacao.model';
/**********************************************************************************************
Code generated with MKL Plug-in version: 27.0.10
Code generated at time stamp: 2019-11-03T07:57:18.876
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';

import { HttpClientWithToken } from '../../../../security/http-client-token';

import { ConciliacaoTransacao } from './conciliacaotransacao.model';
import { ConciliacaoTransacaoAutoComplete } from './conciliacaotransacao.model';
import { ConciliacaoBancaria } from './../conciliacaobancaria/conciliacaobancaria.model';
import { ConciliacaoTransacaoTitulo } from './../conciliacaotransacaotitulo/conciliacaotransacaotitulo.model';
import { ConciliacaoTransacaoListFilter } from './conciliacaotransacao.model';
import { ConciliacaoTransacaoTrnHistoricoAutoComplete } from './conciliacaotransacao.model';
import { ConciliacaoTransacaoTrnDocumentoAutoComplete } from './conciliacaotransacao.model';
import { environment } from 'src/environments/environment';
import { ConciliacaoBancariaAutoComplete } from './../conciliacaobancaria/conciliacaobancaria.model';
import { ConciliacaoTransacaoTituloAutoComplete } from './../conciliacaotransacaotitulo/conciliacaotransacaotitulo.model';

@Injectable()
export class ConciliacaoTransacaoService {

  url = environment.apiUrl + '/cadastros/banco/entities/conciliacaoTransacao';

  constructor(private http: HttpClientWithToken) { }

  planoContaPlanoContasAutoComplete(query: string, conciliacaoTransacao: ConciliacaoTransacao): Promise<PlanoContaAutoComplete[]> {
    const headers = this.getHeaders();

    let params = new HttpParams();
    params = params.set('query', query);

    return this.http.post<PlanoContaAutoComplete[]>(`${this.url}/planoContaTituloPlanoContasAutoComplete`, conciliacaoTransacao, { headers, params })
      .toPromise()
      .then(response => {
        const result = response as PlanoContaAutoComplete[];
        return result;
      });

  }

  // TODO: Provisório
  private getHeaders(): Headers {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return headers;
  }

  findByIdIn(ids: string[]): Promise<ConciliacaoTransacao[]> {
    let params = new HttpParams();
    const p = ids.map(it => it).join(',');
    params = params.set('ids', p);

    const headers = this.getHeaders();
    return this.http.get<ConciliacaoTransacao[]>(`${this.url}/findByIdIn`, { headers, params })
      .toPromise()
      .then(response => {
        const items = response as ConciliacaoTransacao[];
        this.adjustNullEntitySlots(items);
        this.adjustEntityDates(items);
        return items;
      });
  }

  create(conciliacaoTransacao: ConciliacaoTransacao): Promise<ConciliacaoTransacao> {
    const headers = this.getHeaders();

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
    return this.http.delete(`${this.url}/${id}`)
      .toPromise()
      .then(() => null);
  }

  retrieve(id: string): Promise<ConciliacaoTransacao> {
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


		      if (!conciliacaoTransacao.conciliacaoTransacaoTitulos) {
		        conciliacaoTransacao.conciliacaoTransacaoTitulos = new ConciliacaoTransacaoTitulo();
		      }

		});*/
  }

  autoComplete(query: string): Promise<ConciliacaoTransacaoAutoComplete[]> {
    const headers = this.getHeaders();

    let params = new HttpParams();
    params = params.set('query', query);

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

    return this.http.get<ConciliacaoBancariaAutoComplete[]>(`${this.url}/conciliacaoBancariaConciliacaoBancariaAutoComplete`, { headers, params })
      .toPromise()
      .then(response => {
        const result = response as ConciliacaoBancariaAutoComplete[];
        return result;
      });

  }


  conciliacaoTransacaoTituloConciliacaoTransacaoTitulosAutoComplete(query: string): Promise<ConciliacaoTransacaoTituloAutoComplete[]> {
    const headers = this.getHeaders();

    let params = new HttpParams();
    params = params.set('query', query);

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

    return this.http.get<any>(this.url, { headers, params })
      .toPromise()
      .then(response => {
        const data = response;
        const items = data.content; /* array of ConciliacaoTransacao */
        const totalElements = data.totalElements;
        const totalPages = data.totalPages;

        this.adjustNullEntitySlots(items);
        this.adjustEntityDates(items);

        const result = {
          items,
          totalElements,
          totalPages
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
	    return this.http.get<TotaisfilterConciliacaoTransacao>(`${this.url}/getTotaisfilterConciliacaoTransacao`, { headers, params })
	    .toPromise()
	    .then(response => {
	      const result = response as TotaisfilterConciliacaoTransacao;
	      return result;
	    });
	}
	*/
}

