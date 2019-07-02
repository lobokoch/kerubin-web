import { AuthService } from './../../security/auth.service';
import { LogoutService } from 'src/app/security/logout.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserAccountService } from '../useraccount.service';
import { MessageHandlerService } from 'src/app/core/message-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email = '';
  connected = false;
  passwordLinkSent = false;
  btnLabel = 'Enviar link';
  disabled = false;
  touched = false;
  textResult = '';

  constructor(
    private userAccountService: UserAccountService,
    private messageHandler: MessageHandlerService,
    private auth: AuthService,
    private logout: LogoutService,
    private router: Router
  ) { }

  ngOnInit() {
    this.doLoginAnonymous();
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

  sendChangePasswordLink(form: FormGroup) {
    if (!form.valid) {
      this.validateAllFormFields(form);
      return;
    }

    this.disabled = true;
    this.btnLabel = 'Enviado link, aguarde...';
    this.userAccountService.sendChangePasswordLink(this.email)
      .then((response) => {
        this.disabled = false;
        this.btnLabel = 'Link enviado!';
        // this.createdAccountResult = response.text;
        this.passwordLinkSent = true;
        this.logout.logout();
      })
      .catch((e) => {
        console.log('Error: ' + e);
        this.disabled = false;
        this.btnLabel = 'Erro!';

        if (e.message && (e.message as string).toLowerCase().indexOf('http') === -1) {
          this.textResult = '<h3>Ocorreu um erro.</h3><p>' + e.message + '</p>';
        } else {
          this.textResult = '<h3>Ops :(</h3>' +
            '<p>Ocorreu um erro inesperado ao tentar enviar o link. Por favor tente novamente mais tarde.</p>';
        }
        this.passwordLinkSent = true;
        this.logout.logout();
      });
  }

  private doLoginAnonymous() {
    this.auth.doLoginAnonymous()
      .then((result) => {
        console.log('Anonymous connected!');
        this.connected = true;
      })
      .catch((e) => {
        this.connected = false;
        this.messageHandler.showError(e);
      });
  }

  goBack() {
    this.logout.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(() => {
        this.router.navigate(['/login']);
      });
  }

}

