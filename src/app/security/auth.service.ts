/**********************************************************************************************
Code generated with MKL Plug-in version: 3.6.2
Code generated at time stamp: 2019-06-05T06:41:33.812
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const ANONYMOUS_USERNAME = 'anonymous@kerubin.com.br';
const VERGAMOTA = 'a2Itd2ViLWZlOlQ5OEBBbUsyMzc0';
const JAGUAR = 'Kerubin_Anonymous@!1'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = environment.apiUrl + '/oauth/token';
  jwtPayload: any;
  tenant: string = null;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    this.loadToken();
  }

  isAccessTokenInvalid() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  isLoginValid() {
    const result = !this.isAccessTokenInvalid() && this.getCurrentUser();

    return result;
  }

  refreshAccessToken(): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + VERGAMOTA);

    const body = 'grant_type=refresh_token';

    return this.http.post<any>(this.oauthTokenUrl, body, { headers, withCredentials: true /* for CORS */ })
      .toPromise()
      .then(response => {
        console.log('!!! Atualizou access token !!!');
        this.storeToken(response.access_token);
        return Promise.resolve(null);
      })
      .catch(response => {
        console.log('Erro ao renovar token:' + response);
        return Promise.resolve(null); // Não conseguiu, não tem o que fazer, vai ter que fazer login.
      });
  }

  login(username: string, password: string): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + VERGAMOTA);

    const body = `username=${username}&password=${password}&grant_type=password`;

    return this.http.post<any>(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.storeToken(response.access_token);
        this.tenant = response.tenant;
      })
      .catch(response => {
        return Promise.reject(response);
      });
  }

  cleanAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
    this.tenant = null;
    console.log('cleanAccessToken');
  }

  private storeToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private loadToken() {
    const token = localStorage.getItem('token');
    // console.log('loadToken:' + token);


    if (token) {
      this.jwtPayload = this.jwtHelper.decodeToken(token);
    } else {
      // this.jwtPayload = null;
    }
  }

  public doLoginAnonymous(): Promise<boolean> {
    const u = ANONYMOUS_USERNAME;
    const p = JAGUAR;
    return this.login(u, p)
      .then(() => {
        console.log('Anonymous login success!');
        return true;
      })
      .catch(e => {
        console.log('Anonymous login failed: ' + e);
        return false;
      });
  }

  public isLoggedIn(): boolean {
    const curUser = this.getCurrentUser();
    const result = curUser !== null && curUser !== ANONYMOUS_USERNAME && this.getCurrentUserTenant !== null;
    return result;
  }

  getCurrentUserName(): string {
    if (this.jwtPayload && this.jwtPayload.name) {
      return this.jwtPayload.name;
    } else {
      return null;
    }
  }

  getCurrentUser(): string {
    if (this.jwtPayload && this.jwtPayload.user_name) {
      return this.jwtPayload.user_name;
    } else {
      return null;
    }
  }

  isCurrentUserSuperAdmin(): boolean {
    let result = false;
    if (this.jwtPayload && this.jwtPayload.superAdmin) {
      result = this.jwtPayload.superAdmin;
    } else {
      result = false;
    }

    return result;
  }

  getCurrentUserTenantAccountType(): string {
    if (this.jwtPayload && this.jwtPayload.tenantAccountType) {
      return this.jwtPayload.tenantAccountType;
    }

    return null;
  }

  getCurrentUserTenant(): string {
    if (this.jwtPayload && this.jwtPayload.tenant) {
      return this.jwtPayload.tenant;
    }

    return null;
  }



}
