/**********************************************************************************************
Code generated with MKL Plug-in version: 3.6.2
Code generated at time stamp: 2019-06-05T06:41:33.812
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { HttpClientWithToken } from '../security/http-client-token';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UserAccount, AccountCreatedDTO, SysUser } from './newaccount/useraccount.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserAccountService {

  url = environment.apiUrl + '/account';
  // TODO: ver isso melhor url = environment.apiUrl + '/security/authorization/account';

  constructor(
    private http: HttpClientWithToken
  ) { }

  changePassword(user: SysUser): Promise<any> {
    return this.http.post<String>(`${this.url}/changePassword`, user)
      .toPromise()
      .then(response => {
        return response;
      });
  }

  changePasswordForgotten(user: SysUser): Promise<any> {
    return this.http.post<String>(`${this.url}/changePasswordForgotten`, user)
      .toPromise()
      .then(response => {
        return response;
      });
  }

  createAccount(userAccount: UserAccount): Promise<AccountCreatedDTO> {
    return this.http.post<AccountCreatedDTO>(`${this.url}/createAccount`, userAccount)
      .toPromise()
      .then(response => {
        return response;
      });
  }

  sendChangePasswordLink(email: string): Promise<any> {
    return this.http.post<string>(`${this.url}/sendChangePasswordLink`, email)
      .toPromise()
      .then(response => {
        return response;
      });
  }

  confirmAccount(id: String): Promise<SysUser> {
    return this.http.put<SysUser>(`${this.url}/confirmAccount/${id}`, {})
      .toPromise()
      .then(response => {
        const confirmedUser = response as SysUser;
        return confirmedUser;
      });
  }
}

