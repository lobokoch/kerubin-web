import { CreditBalance } from './creditbalance.model';
import { HttpClientWithToken } from './../../../security/http-client-token';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class CreditBalanceService {

  url = environment.apiUrl + '/security/authorization/credit';

  constructor(private http: HttpClientWithToken) {

  }

  private getHeaders(): Headers {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return headers;
  }

  getCreditBalance(): Promise<CreditBalance> {
    const headers = this.getHeaders();

    return this.http.get<CreditBalance>(`${this.url}/getCreditBalance`, { headers })
      .toPromise()
      .then(response => {
        return response;
      });
  }


}
