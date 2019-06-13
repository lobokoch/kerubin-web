import { HttpClientWithToken } from './../security/http-client-token';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  // url = environment.apiUrl;

  constructor(private http: HttpClientWithToken) {

  }

}
