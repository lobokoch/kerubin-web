import { SysUser } from './../newaccount/useraccount.model';
import { FormGroup, FormControl } from '@angular/forms';
import { LogoutService } from './../../security/logout.service';
import { AuthService } from './../../security/auth.service';
import { MessageHandlerService } from 'src/app/core/message-handler.service';
import { Component, OnInit } from '@angular/core';
import { UserAccountService } from '../useraccount.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangePasswordComponent implements OnInit {
  id = '';
  email = '';

  currentPassword = '';
  newPassword = '';
  confirmNewPassword = '';

  connected = false;
  passwordChanged = false;
  passwordChangedError = false;
  btnLabel = 'Alterar senha';
  disabled = false;
  touched = false;
  textResult = '';

  constructor(
    private userAccountService: UserAccountService,
    private messageHandler: MessageHandlerService,
    private auth: AuthService,
    private logout: LogoutService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

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

  changePassword(form: FormGroup) {
    if (!form.valid) {
      this.validateAllFormFields(form);
      return;
    }

    if (this.newPassword !== this.confirmNewPassword) {
      this.messageHandler.showError('A nova senha e a confirmação da nova senha devem ser iguais.');
      return;
    }

    this.disabled = true;
    this.btnLabel = 'Mudando a senha, aguarde...';
    this.passwordChangedError = false;
    this.passwordChanged = false;
    this.textResult = '';

    const user = new SysUser();
    user.id = this.id;
    user.name = this.currentPassword;
    user.email = this.email;
    user.password = this.newPassword;

    this.userAccountService.changePassword(user)
      .then((response) => {
        this.btnLabel = 'Alterar senha';
        this.textResult = response.text;
        this.passwordChanged = true;
        this.disabled = true;
        this.passwordChangedError = false;
        this.logout.logout();
      })
      .catch((e) => {
        this.passwordChangedError = true;
        this.passwordChanged = false;
        this.disabled = false;
        this.btnLabel = 'Alterar senha';
        this.messageHandler.showError(e);

        if (e.message && (e.message as string).toLowerCase().indexOf('http') === -1) {
          this.textResult = '<h3>Ocorreu um erro.</h3><p>' + e.message + '</p>';
        } else {
          this.textResult = 'Ops :( <p>Ocorreu um erro ao mudar a senha.</p>';
        }
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

