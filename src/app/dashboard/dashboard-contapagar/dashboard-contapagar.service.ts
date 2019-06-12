import { MonthlySumContasPagar, ContasPagarSituacaoDoAnoSum } from './dashboard-contapagar-model';
import { HttpClientWithToken } from './../../security/http-client-token';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardContaPagarService {

  url = environment.apiUrl + '/financeiro/contas_pagar/dashboard';

  constructor(private http: HttpClientWithToken) {

  }

  getContasPagarSituacaoDoAno(): Promise<ContasPagarSituacaoDoAnoSum> {
    const headers = this.getHeaders();

    return this.http.get<any>(`${this.url}/getContasPagarSituacaoDoAno`, { headers })
      .toPromise()
      .then(response => {
        const result = response;
        return result;
      });
  }

  getMonthlySumContasPagar(): Promise<MonthlySumContasPagar> {
    const headers = this.getHeaders();

    return this.http.get<any>(`${this.url}/getMonthlySumContasPagar`, { headers })
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
