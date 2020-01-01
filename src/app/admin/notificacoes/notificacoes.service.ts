import { NotifyUsersAboutTheBillsAsyncResult } from './notificacoes.model';
import { HttpClientWithToken } from './../../security/http-client-token';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class NotificacoesService {

  urlNotificador = environment.apiUrl + '/financeiro/contas_pagar/notificator';

  constructor(private http: HttpClientWithToken) {

  }

  private getHeaders(): Headers {
		const headers = new Headers();

	    headers.append('Content-Type', 'application/json');
	    return headers;
	}

  notifyUsersAboutTheBills(): Promise<string> {
    const headers = this.getHeaders();

    return this.http.post(`${this.urlNotificador}/notifyUsersAboutTheBills`, null, headers)
      .toPromise()
      .then(response => {
        return (response as NotifyUsersAboutTheBillsAsyncResult).ticket;
      });
  }

}
