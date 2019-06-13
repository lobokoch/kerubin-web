import { MonthlySumContasReceber, ContasReceberSituacaoDoAnoSum } from './dashboard-contareceber-model';
import { HttpClientWithToken } from './../../security/http-client-token';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardContaReceberService {

  url = environment.apiUrl + '/financeiro/contas_receber/dashboard';

  constructor(private http: HttpClientWithToken) {

  }

  getContasReceberSituacaoDoAno(): Promise<ContasReceberSituacaoDoAnoSum> {
    const headers = this.getHeaders();

    return this.http.get<any>(`${this.url}/getContasReceberSituacaoDoAno`, { headers })
      .toPromise()
      .then(response => {
        const result = response;
        return result;
      });
  }

  getMonthlySumContasReceber(): Promise<MonthlySumContasReceber> {
    const headers = this.getHeaders();

    return this.http.get<any>(`${this.url}/getMonthlySumContasReceber`, { headers })
      .toPromise()
      .then(response => {
        const result = response;
        return result;
      });
  }

  // TODO: Provisório
  private getHeaders(): Headers {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return headers;
  }
}
