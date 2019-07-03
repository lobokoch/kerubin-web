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
  email = '';
  userName = '';
  currentPassword = '';
  newPassword = '';
  confirmNewPassword = '';

  connected = true;
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
    this.email = this.auth.getCurrentUser();
    this.userName = this.auth.getCurrentUserName();
    this.connected = true;
    this.disabled = false;
    this.passwordChanged = false;
    this.passwordChangedError = false;

    if (!this.email || !this.userName) {
      this.connected = false;
      this.disabled = true;
      this.textResult = 'Não foi possível obter os dados da sua conexão. Por favor refaça o login.';
      return;
    }
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
    user.id = '8edac044-2884-4fd5-b8db-8aebcdfe88df'; // fake
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
          this.textResult = 'Ops :( ocorreu um erro ao mudar a senha.';
        }
      });
  }

  goBack() {
    this.router.navigate(['/mainmenu']);
  }

}

