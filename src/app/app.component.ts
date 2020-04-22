/**********************************************************************************************
 Code generated with MKL Plug-in version: 60.0.1
 Copyright: Kerubin - kerubin.platform@gmail.com

 WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
 ***********************************************************************************************/

import { Router, NavigationEnd, NavigationStart, NavigationCancel } from '@angular/router';
import { Component, AfterViewInit } from '@angular/core';
import { AnalyticsService } from './analitycs/analytics.service';
import { AuthService } from './security/auth.service';
import { CreditBalanceService } from './modules/custom/creditbalance/creditbalance.service';

const MAX_COUNT = 10; // Max calls to wait to call again.

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {
  mostrarAvisoReporCreditos = false;
  mostrarAvisoReporCreditosCount = MAX_COUNT + 1;

  loading = true;
  title = 'Kerubin';
  urls = ['/home', '/login', '/newaccount', '/confirmaccount', '/forgotpassword', '/changepasswordforgotten'];
  constructor(
    private router: Router,
    private analitycs: AnalyticsService,
    private auth: AuthService,
    private creditBalanceService: CreditBalanceService
    ) {
      this.loading = true;
		// For Google Analitycs
		this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        analitycs.sendGTag(event.urlAfterRedirects);
        this.verificarSaldoCreditos();
			}
		});
  }

  canShowMenu() {
    const isAnonymousUrl = this.isAnonymousUrl();
    return !isAnonymousUrl && this.auth.isLoggedIn();
  }

  getRouterOutletCssClass(): string {
    let result = 'ui-g-12 ui-fluid ui-md-10';
    if (!this.canShowMenu()) {
      result = 'ui-g-12 ui-fluid ui-md-12';
    }

    return result;
  }

  ngAfterViewInit() {
    this.router.events
        .subscribe((event) => {
            if (event instanceof NavigationStart) {
                this.loading = true;
            } else if (
                event instanceof NavigationEnd ||
                event instanceof NavigationCancel
                ) {
                this.loading = false;
            }
        });

      this.verificarSaldoCreditos();
  }

  isAnonymousUrl(): boolean {
    const url = this.router.url.toLowerCase();
    const result = this.urls.some(it => url.includes(it)) || url.endsWith('/'); // also home.
    return result;
  }

  verificarSaldoCreditos() {
    const isAnonymousUrl = this.isAnonymousUrl();
    if (isAnonymousUrl) {
      this.mostrarAvisoReporCreditos = false;
      this.mostrarAvisoReporCreditosCount = MAX_COUNT + 1;
      return;
    }

    if (this.mostrarAvisoReporCreditosCount <= MAX_COUNT) {
      this.mostrarAvisoReporCreditosCount++;
      return;
    } else if (this.mostrarAvisoReporCreditosCount > MAX_COUNT) {
      this.mostrarAvisoReporCreditosCount = 1;
    }

    this.creditBalanceService.getCreditBalance().then(creditBalance => {
      const saldo = creditBalance?.balanceValue ?? 0;
      this.mostrarAvisoReporCreditos = saldo < 3; // Mostra aviso com saldo menor que R$ 3,00.
    })
    .catch(error => {
      console.log('Erro verificarSaldoCreditos:' + error);
    });
  }


}

