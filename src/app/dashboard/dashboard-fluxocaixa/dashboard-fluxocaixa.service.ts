import { FluxoCaixaMonthItem } from './dashboard-fluxocaixa-model';
import { HttpClientWithToken } from './../../security/http-client-token';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardFluxoCaixaService {

  url = environment.apiUrl + '/financeiro/fluxo_caixa/dashboard';

  constructor(private http: HttpClientWithToken) {

  }

  getFluxoCaixaFromYear(): Promise<FluxoCaixaMonthItem[]> {
    const headers = this.getHeaders();

    return this.http.get<FluxoCaixaMonthItem[]>(`${this.url}/getFluxoCaixaFromYear`, { headers })
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
