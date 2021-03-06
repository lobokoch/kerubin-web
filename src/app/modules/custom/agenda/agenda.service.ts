import { ParametrosAgenda, CompromissoDTO, AgendaDTO, AgendaResumoDTO } from './agenda.model';
/**********************************************************************************************
Code generated by MKL Plug-in
Copyright: Kerubin - kerubin.platform@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';

import { environment } from 'src/environments/environment';

import { HttpClientWithToken } from './../../../security/http-client-token';
import { AnalyticsService } from './../../../analitycs/analytics.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AgendaService {

  url = environment.apiUrl + '/cadastros/cliente/agenda';

  subject = new BehaviorSubject<number>(0);
  // navItem$ = this._navItemSource; // .asObservable();

  constructor(
    private analitycs: AnalyticsService,
    private http: HttpClientWithToken) {
    // Generated code.
  }

  onChangeCompromissosCountDoRecursoCorrente(value: number) {
    this.subject.next(value);
  }

  // TODO: Provisório
  private getHeaders(): Headers {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return headers;
  }

  getAgendaDoMes(parametrosAgenda: ParametrosAgenda): Promise<AgendaDTO> {
    const headers = this.getHeaders();

    const params = this.mountAndGetSearchParams(parametrosAgenda);
    this.analitycs.sendEvent('cadastros.cliente.Agenda', 'agendaDoMes', JSON.stringify(params));
    return this.http.get<AgendaDTO>(`${this.url}/agendaDoMes`, { headers, params })
      .toPromise()
      .then(response => {
        return response;
      });
  }

  countCompromissosDoRecurso(parametrosAgenda: ParametrosAgenda): Promise<AgendaResumoDTO> {
    const headers = this.getHeaders();

    const params = this.mountAndGetSearchParams(parametrosAgenda);
    this.analitycs.sendEvent('cadastros.cliente.Agenda', 'countCompromissosDoRecurso', JSON.stringify(params));
    return this.http.get<AgendaResumoDTO>(`${this.url}/countCompromissosDoRecurso`, { headers, params })
      .toPromise()
      .then(response => {
        return response;
      });
  }

  mountAndGetSearchParams(filter: ParametrosAgenda): HttpParams {
    let params = new HttpParams();

    if (filter.ano) {
      params = params.set('ano', filter.ano.toString());
    }

    if (filter.mes) {
      params = params.set('mes', filter.mes.toString());
    }

    if (filter.data) {
      params = params.set('data', this.dateToStr(filter.data));
    }

    if (filter.recursoEmails) {
      const emails = filter.recursoEmails.map((it => it)).join(',');
      params = params.set('recursoEmails', emails);
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


}

