import { environment } from 'src/environments/environment';
import { HttpClientWithToken } from './../security/http-client-token';
import { CreditOrder, ResponseText } from './payment.model';

import { Injectable } from '@angular/core';

@Injectable()
export class PaymentService {

  url = environment.apiUrl + '/security/authorization/payment';

  constructor(private http: HttpClientWithToken) {

  }

  private getHeaders(): Headers {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return headers;
  }

  createCreditOrder(creditOrder: CreditOrder): Promise<ResponseText> {
    const headers = this.getHeaders();

    return this.http.post<ResponseText>(`${this.url}/createCreditOrder`, creditOrder, { headers })
      .toPromise()
      .then(response => {
        return response;
      });
  }


}
