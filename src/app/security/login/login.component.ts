import { FormGroup, FormControl } from '@angular/forms';
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

  btnLabel = 'Entrar';
  username = '';
  password = '';
  autenticando = false;


  constructor(
    private auth: AuthService,
    private messageHandler: MessageHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login(form: FormGroup) {

    if (!form.valid) {
      this.validateAllFormFields(form);
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
      .catch(error => {
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

}
