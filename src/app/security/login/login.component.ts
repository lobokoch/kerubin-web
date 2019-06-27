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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';

  constructor(
    private auth: AuthService,
    private messageHandler: MessageHandlerService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  // login(username: string, password: string) {
  login(form: FormGroup) {
    if (!form.valid) {
      this.validateAllFormFields(form);
      return;
    }

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

}
