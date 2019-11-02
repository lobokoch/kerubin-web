import { FormGroup, FormControl } from '@angular/forms';
/**********************************************************************************************
Code generated with MKL Plug-in version: 3.6.2
Code generated at time stamp: 2019-06-05T06:41:33.812
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MessageHandlerService } from 'src/app/core/message-handler.service';

const DEFAULT_LOGIN_HEIGHT = 310;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  btnLabel = 'Entrar';
  username = '';
  password = '';
  autenticando = false;

  loginHeight = DEFAULT_LOGIN_HEIGHT;

  constructor(
    private auth: AuthService,
    private messageHandler: MessageHandlerService,
    private router: Router
    ) { }

  ngOnInit() {
    this.loginHeight = DEFAULT_LOGIN_HEIGHT;
  }

  // login(username: string, password: string) {
  login(form: FormGroup) {

    this.loginHeight = DEFAULT_LOGIN_HEIGHT;
    if (!form.valid) {
      this.validateAllFormFields(form);
      this.onFieldChange(null);
      return;
    }

    this.btnLabel = 'Autenticando...';
    this.autenticando = true;

    this.auth.login(this.username, this.password)
    .then(() => {
      const tenant = this.auth.tenant;
      if (tenant) {
        this.router.navigate(['/mainmenu']);
      } else {
        this.router.navigate(['/confignewaccount']);
      }
    })
    .catch (error => {
      this.password = '';
      this.btnLabel = 'Entrar';
      this.autenticando = false;
      console.log('login error:' + error);
      this.messageHandler.showError(error);
    });
  }

   validateAllFormFields(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);

      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
}

getLoginSize() {
  const size = {width: '360px', height:  this.loginHeight + 'px'};
  return size;
}

onFieldChange(event) {
  this.loginHeight = DEFAULT_LOGIN_HEIGHT;
  if (!this.username || this.username.length === 0) {
    this.loginHeight += 20;
  }

  if (!this.password || this.password.length === 0) {
    this.loginHeight += 20;
  }
}

}
