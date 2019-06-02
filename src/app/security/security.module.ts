import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { LogoutService } from './logout.service';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  imports: [

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: environment.tokenWhitelistedDomains,
        blacklistedRoutes: environment.tokenBlacklistedRoutes
      }
    }),

    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    CardModule

  ],

  declarations: [
    LoginComponent
  ],

  providers: [
    AuthGuard,
    LogoutService,
    AuthService
  ]
})

export class SecurityModule {

}
