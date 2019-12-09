import { CountConciliacaoTransacaoComMaisDeUmTituloDTO, CountDTO } from './conciliacaobancaria.model';
/**********************************************************************************************
Code generated with MKL Plug-in version: 26.0.4
Code generated at time stamp: 2019-10-18T05:55:37.138
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';

import { HttpClientWithToken } from '../../../../security/http-client-token';

import { ConciliacaoBancaria } from './conciliacaobancaria.model';
import { ConciliacaoBancariaAutoComplete } from './conciliacaobancaria.model';
import { ConciliacaoBancariaListFilter } from './conciliacaobancaria.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class ConciliacaoBancariaService {

	url = environment.apiUrl + '/cadastros/banco/entities/conciliacaoBancaria';

  constructor(private http: HttpClientWithToken) { }

  public getUrlUploadArquivoConciliacao() {
    return `${this.url}/uploadArquivoConciliacao`;
  }

	// TODO: Provisório
	private getHeaders(): Headers {
		const headers = new Headers();

	    headers.append('Content-Type', 'application/json');
	    return headers;
	}

	create(conciliacaoBancaria: ConciliacaoBancaria): Promise<ConciliacaoBancaria> {
		const headers = this.getHeaders();

	    return this.http.post(this.url, conciliacaoBancaria, { headers })
	    .toPromise()
	    .then(response => {
	      const created = response as ConciliacaoBancaria;
	      this.adjustEntityDates([created]);
	      return created;
	    });
	}

	update(conciliacaoBancaria: ConciliacaoBancaria): Promise<ConciliacaoBancaria> {
	    const headers = this.getHeaders();

	    return this.http.put(`${this.url}/${conciliacaoBancaria.id}`, conciliacaoBancaria, { headers })
	    .toPromise()
	    .then(response => {
	      const updated = response as ConciliacaoBancaria;
	      this.adjustEntityDates([updated]);
	      return updated;
	    });
	}

	delete(id: string): Promise<void> {
	    return this.http.delete(`${this.url}/${id}`)
	    .toPromise()
	    .then(() => null);
	}

	retrieve(id: string): Promise<ConciliacaoBancaria> {
	    const headers = this.getHeaders();
	    return this.http.get<ConciliacaoBancaria>(`${this.url}/${id}`, { headers })
	    .toPromise()
	    .then(response => {
	      const conciliacaoBancaria = response as ConciliacaoBancaria;
	      this.adjustEntityDates([conciliacaoBancaria]);
	      return conciliacaoBancaria;
	    });
  }

	getCountConciliacaoTransacaoComMaisDeUmTitulo(id: string): Promise<number> {
	    const headers = this.getHeaders();
	    return this.http.get<CountConciliacaoTransacaoComMaisDeUmTituloDTO>(`${this.url}/countConciliacaoTransacaoComMaisDeUmTitulo/${id}`, { headers })
	    .toPromise()
	    .then(response => {
	      const dto = response as CountConciliacaoTransacaoComMaisDeUmTituloDTO;
	      return dto.count;
	    });
  }

	getCountConciliacaoTransacaoComTitulosRepetidos(id: string): Promise<number> {
	    const headers = this.getHeaders();
	    return this.http.get<CountDTO>(`${this.url}/countConciliacaoTransacaoComTitulosRepetidos/${id}`, { headers })
	    .toPromise()
	    .then(response => {
	      const dto = response as CountDTO;
	      return dto.count;
	    });
	}

	conciliacaoBancariaRuleFunctionAplicarConciliacaoBancaria(conciliacaoBancaria: ConciliacaoBancaria): Promise<ConciliacaoBancaria> {
	    const headers = this.getHeaders();

	    return this.http.put(`${this.url}/conciliacaoBancariaRuleFunctionAplicarConciliacaoBancaria/${conciliacaoBancaria.id}`, conciliacaoBancaria, { headers })
	    .toPromise()
	    .then(response => {
	      const updated = response as ConciliacaoBancaria;
	      this.adjustEntityDates([updated]);
	      return updated;
	    });
	}


	private adjustEntityDates(entityList: ConciliacaoBancaria[]) {
		entityList.forEach(conciliacaoBancaria => {
		      if (conciliacaoBancaria.dataIni) {
		        conciliacaoBancaria.dataIni = moment(conciliacaoBancaria.dataIni, 'YYYY-MM-DD').toDate();
		      }


		      if (conciliacaoBancaria.dataFim) {
		        conciliacaoBancaria.dataFim = moment(conciliacaoBancaria.dataFim, 'YYYY-MM-DD').toDate();
		      }

		});
	}


	autoComplete(query: string): Promise<ConciliacaoBancariaAutoComplete[]> {
	    const headers = this.getHeaders();

	    let params = new HttpParams();
	    params = params.set('query', query);

	    return this.http.get<ConciliacaoBancariaAutoComplete[]>(`${this.url}/autoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as ConciliacaoBancariaAutoComplete[];
	        return result;
	      });

	}



	conciliacaoBancariaList(conciliacaoBancariaListFilter: ConciliacaoBancariaListFilter): Promise<any> {
	    const headers = this.getHeaders();

	    const params = this.mountAndGetSearchParams(conciliacaoBancariaListFilter);

	    return this.http.get<any>(this.url, { headers, params })
	      .toPromise()
	      .then(response => {
	        const data = response;
	        const items = data.content; /* array of ConciliacaoBancaria */
	        const totalElements = data.totalElements;

	        this.adjustEntityDates(items);

	        const result = {
	          items,
	          totalElements
	        };

	        return result;
	      });
	}


	mountAndGetSearchParams(filter: ConciliacaoBancariaListFilter): HttpParams {
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
	replicateConciliacaoBancaria(id: string, groupId: string, quantity: number): Promise<boolean> {
	    const headers = this.getHeaders();

	    const payload = new ReplicateConciliacaoBancariaPayload(id, quantity, groupId);
	    return this.http.post(`${this.url}/replicateConciliacaoBancaria`, payload, { headers } )
	    .toPromise()
	    .then(response => {
	      return response === true;
	    });
	}

	getTotaisfilterConciliacaoBancaria(filter: ConciliacaoBancariarListFilter): Promise<TotaisfilterConciliacaoBancaria> {
	    const headers = this.getHeaders();

	    const params = this.mountAndGetSearchParams(filter);
	    return this.http.get<TotaisfilterConciliacaoBancaria>(`${this.url}/getTotaisfilterConciliacaoBancaria`, { headers, params })
	    .toPromise()
	    .then(response => {
	      const result = response as TotaisfilterConciliacaoBancaria;
	      return result;
	    });
	}
	*/
}

