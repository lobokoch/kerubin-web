/**********************************************************************************************
Code generated with MKL Plug-in version: 22.1.1
Code generated at time stamp: 2019-09-10T21:40:50.823
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';

import { HttpClientWithToken } from '../../../../security/http-client-token';

import { CaixaLancamento } from './caixalancamento.model';
import { CaixaLancamentoAutoComplete } from './caixalancamento.model';
import { CaixaDiario } from './../caixadiario/caixadiario.model';
import { ContaBancaria } from './../contabancaria/contabancaria.model';
import { CartaoCredito } from './../cartaocredito/cartaocredito.model';
import { PlanoConta } from './../planoconta/planoconta.model';
import { Cliente } from './../cliente/cliente.model';
import { Fornecedor } from './../fornecedor/fornecedor.model';
import { CaixaLancamentoListFilter } from './caixalancamento.model';
import { CaixaLancamentoDescricaoAutoComplete } from './caixalancamento.model';
import { CaixaLancamentoSumFields } from './caixalancamento.model';
import { environment } from 'src/environments/environment';
import { CaixaDiarioAutoComplete } from './../caixadiario/caixadiario.model';
import { ContaBancariaAutoComplete } from './../contabancaria/contabancaria.model';
import { CartaoCreditoAutoComplete } from './../cartaocredito/cartaocredito.model';
import { PlanoContaAutoComplete } from './../planoconta/planoconta.model';
import { ClienteAutoComplete } from './../cliente/cliente.model';
import { FornecedorAutoComplete } from './../fornecedor/fornecedor.model';

@Injectable()
export class CaixaLancamentoService {
	
	url = environment.apiUrl + '/financeiro/fluxo_caixa/entities/caixaLancamento';
	
	constructor(private http: HttpClientWithToken) { }
	
	// TODO: Provisório
	private getHeaders(): Headers {
		const headers = new Headers();
	    
	    headers.append('Content-Type', 'application/json');
	    return headers;
	}
	
	create(caixaLancamento: CaixaLancamento): Promise<CaixaLancamento> {
		const headers = this.getHeaders();    
	
	    return this.http.post(this.url, caixaLancamento, { headers })
	    .toPromise()
	    .then(response => {
	      const created = response as CaixaLancamento;
	      this.adjustNullEntitySlots([created]);
	      this.adjustEntityDates([created]);
	      return created;
	    });
	}
	
	update(caixaLancamento: CaixaLancamento): Promise<CaixaLancamento> {
	    const headers = this.getHeaders();
	
	    return this.http.put(`${this.url}/${caixaLancamento.id}`, caixaLancamento, { headers })
	    .toPromise()
	    .then(response => {
	      const updated = response as CaixaLancamento;
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
	
	retrieve(id: string): Promise<CaixaLancamento> {
	    const headers = this.getHeaders();
	    return this.http.get<CaixaLancamento>(`${this.url}/${id}`, { headers })
	    .toPromise()
	    .then(response => {
	      const caixaLancamento = response as CaixaLancamento;
	      this.adjustNullEntitySlots([caixaLancamento]);
	      this.adjustEntityDates([caixaLancamento]);
	      return caixaLancamento;
	    });
	}
	
	
	private adjustEntityDates(entityList: CaixaLancamento[]) {
		entityList.forEach(caixaLancamento => {
		      if (caixaLancamento.dataLancamento) {
		        caixaLancamento.dataLancamento = moment(caixaLancamento.dataLancamento, 'YYYY-MM-DD').toDate();
		      }
		      	
		});
	}
	
	private adjustNullEntitySlots(entityList: CaixaLancamento[]) {
		/*entityList.forEach(caixaLancamento => {
		      if (!caixaLancamento.caixaDiario) {
		        caixaLancamento.caixaDiario = new CaixaDiario();
		      }
		      	
		      
		      if (!caixaLancamento.contaBancaria) {
		        caixaLancamento.contaBancaria = new ContaBancaria();
		      }
		      	
		      
		      if (!caixaLancamento.cartaoCredito) {
		        caixaLancamento.cartaoCredito = new CartaoCredito();
		      }
		      	
		      
		      if (!caixaLancamento.planoContas) {
		        caixaLancamento.planoContas = new PlanoConta();
		      }
		      	
		      
		      if (!caixaLancamento.cliente) {
		        caixaLancamento.cliente = new Cliente();
		      }
		      	
		      
		      if (!caixaLancamento.fornecedor) {
		        caixaLancamento.fornecedor = new Fornecedor();
		      }
		      	
		});*/
	}
	
	autoComplete(query: string): Promise<CaixaLancamentoAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<CaixaLancamentoAutoComplete[]>(`${this.url}/autoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as CaixaLancamentoAutoComplete[];
	        return result;
	      });
	
	}
	
							
	// Begin relationships autoComplete 
	
	caixaDiarioCaixaDiarioAutoComplete(query: string): Promise<CaixaDiarioAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<CaixaDiarioAutoComplete[]>(`${this.url}/caixaDiarioCaixaDiarioAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as CaixaDiarioAutoComplete[];
	        return result;
	      });
	
	}
	
	
	contaBancariaContaBancariaAutoComplete(query: string): Promise<ContaBancariaAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<ContaBancariaAutoComplete[]>(`${this.url}/contaBancariaContaBancariaAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as ContaBancariaAutoComplete[];
	        return result;
	      });
	
	}
	
	
	cartaoCreditoCartaoCreditoAutoComplete(query: string): Promise<CartaoCreditoAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<CartaoCreditoAutoComplete[]>(`${this.url}/cartaoCreditoCartaoCreditoAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as CartaoCreditoAutoComplete[];
	        return result;
	      });
	
	}
	
	
	planoContaPlanoContasAutoComplete(query: string, caixaLancamento: CaixaLancamento): Promise<PlanoContaAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.post<PlanoContaAutoComplete[]>(`${this.url}/planoContaPlanoContasAutoComplete`, caixaLancamento, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as PlanoContaAutoComplete[];
	        return result;
	      });
	
	}
	
	
	clienteClienteAutoComplete(query: string): Promise<ClienteAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<ClienteAutoComplete[]>(`${this.url}/clienteClienteAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as ClienteAutoComplete[];
	        return result;
	      });
	
	}
	
	
	fornecedorFornecedorAutoComplete(query: string): Promise<FornecedorAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<FornecedorAutoComplete[]>(`${this.url}/fornecedorFornecedorAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as FornecedorAutoComplete[];
	        return result;
	      });
	
	}
	
	// End relationships autoComplete
	
				
	
	caixaLancamentoDescricaoAutoComplete(query: string): Promise<any> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<any>(`${this.url}/caixaLancamentoDescricaoAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as CaixaLancamentoDescricaoAutoComplete[];
	        return result;
	      });
	
	}
	
	caixaLancamentoList(caixaLancamentoListFilter: CaixaLancamentoListFilter): Promise<any> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(caixaLancamentoListFilter);
	
	    return this.http.get<any>(this.url, { headers, params })
	      .toPromise()
	      .then(response => {
	        const data = response;
	        const items = data.content; /* array of CaixaLancamento */
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
	
	
	getCaixaLancamentoSumFields(caixaLancamentoListFilter: CaixaLancamentoListFilter): Promise<CaixaLancamentoSumFields> {
	    const headers = this.getHeaders();
	    
		const params = this.mountAndGetSearchParams(caixaLancamentoListFilter);
		return this.http.get<any>(`${this.url}/caixaLancamentoSumFields`, { headers, params })
		  .toPromise()
		  .then(response => {
		    const result = response;
		    return result;
		  });
	}
	
	mountAndGetSearchParams(filter: CaixaLancamentoListFilter): HttpParams {
	    let params = new HttpParams();
	    if (filter.pageNumber) {
	      params = params.set('page', filter.pageNumber.toString());
	    }
	
	    if (filter.pageSize) {
	      params = params.set('size', filter.pageSize.toString());
	    }
		
		// descricao
		if (filter.descricao) {
			const descricao = filter.descricao.map(item => item.descricao).join(',');
			params = params.set('descricao', descricao);
		}
		
		// dataLancamentoFrom
		if (filter.dataLancamentoFrom) {
		const value = this.dateToStr(filter.dataLancamentoFrom);
			params = params.set('dataLancamentoFrom', value);
		}
		
		// dataLancamentoTo
		if (filter.dataLancamentoTo) {
		const value = this.dateToStr(filter.dataLancamentoTo);
			params = params.set('dataLancamentoTo', value);
		}
		
		// tipoLancamentoFinanceiro
		if (filter.tipoLancamentoFinanceiro) {
			const value = String(filter.tipoLancamentoFinanceiro);
			params = params.set('tipoLancamentoFinanceiro', value);
		}
		
		// valorCreditoFrom
		if (filter.valorCreditoFrom) {
		const value = filter.valorCreditoFrom.toString();
			params = params.set('valorCreditoFrom', value);
		}
		
		// valorCreditoTo
		if (filter.valorCreditoTo) {
		const value = filter.valorCreditoTo.toString();
			params = params.set('valorCreditoTo', value);
		}
		
		// valorDebitoFrom
		if (filter.valorDebitoFrom) {
		const value = filter.valorDebitoFrom.toString();
			params = params.set('valorDebitoFrom', value);
		}
		
		// valorDebitoTo
		if (filter.valorDebitoTo) {
		const value = filter.valorDebitoTo.toString();
			params = params.set('valorDebitoTo', value);
		}
		
		// formaPagamento
		if (filter.formaPagamento) {
			const value = String(filter.formaPagamento);
			params = params.set('formaPagamento', value);
		}
		
		// tipoFonteMovimento
		if (filter.tipoFonteMovimento) {
			const value = String(filter.tipoFonteMovimento);
			params = params.set('tipoFonteMovimento', value);
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
	replicateCaixaLancamento(id: string, groupId: string, quantity: number): Promise<boolean> {
	    const headers = this.getHeaders();
	
	    const payload = new ReplicateCaixaLancamentoPayload(id, quantity, groupId);
	    return this.http.post(`${this.url}/replicateCaixaLancamento`, payload, { headers } )
	    .toPromise()
	    .then(response => {
	      return response === true;
	    });
	}
		
	getTotaisfilterCaixaLancamento(filter: CaixaLancamentorListFilter): Promise<TotaisfilterCaixaLancamento> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(filter);
	    return this.http.get<TotaisfilterCaixaLancamento>(`${this.url}/getTotaisfilterCaixaLancamento`, { headers, params })
	    .toPromise()
	    .then(response => {
	      const result = response as TotaisfilterCaixaLancamento;
	      return result;
	    });
	}
	*/
}

