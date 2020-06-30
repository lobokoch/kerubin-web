import { ParametrosAgenda } from './../modules/custom/agenda/agenda.model';
import { AgendaService } from './../modules/custom/agenda/agenda.service';
import { EventEmitter, Output, OnDestroy } from '@angular/core';
/**********************************************************************************************
Code generated with MKL Plug-in version: 3.6.2
Code generated at time stamp: 2019-06-05T06:41:33.812
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { AuthService } from './../security/auth.service';
import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../security/logout.service';
import { MessageHandlerService } from '../core/message-handler.service';
import { Router } from '@angular/router';
import {Md5} from 'md5-typescript';
import * as moment from 'moment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit, OnDestroy {

  /////////////////
  compromissosBadgeVisible = false;
  compromissosBadgeValue = 0;

  subscription: Subscription;
  /////////////////

  //////////////////////
  menuBarVisible = true;
  //////////////////////

  isMenuShowing = false;

  pollingRef: any;


  @Output() menuBarChangeVisibility = new EventEmitter();

  constructor(
    private authService: AuthService,
    private logoutService: LogoutService,
    private messageHandler: MessageHandlerService,
    private router: Router,
    private agendaService: AgendaService
  ) {
    // Nothing yet.
  }

  ngOnInit() {
    this.countCompromissosDoRecurso();

    this.pollingRef = setInterval(function() {
      this.countCompromissosDoRecurso();
    }.bind(this), 1000 * 60); // call each 1 minute

    this.subscription = this.agendaService.subject.subscribe((valor) => {
      this.compromissosBadgeValue = valor;
      this.compromissosBadgeVisible = this?.compromissosBadgeValue > 0 ?? false;
    });
  }

  stopPolling() {
    console.log('Parando countCompromissosDoRecurso...');
    clearInterval(this.pollingRef);
  }

  countCompromissosDoRecurso() {
    if (!this.authService.isLoggedIn()) {
      this.stopPolling();
      return;
    }

    const hoje = moment().toDate();
    const params = new ParametrosAgenda();
    params.data = hoje;

    let email = 'unknowuser@kerubin.com.br';
    if (this.authService.getCurrentUser()) {
      email = this.authService.getCurrentUser();
    }

    params.recursoEmails = [email];
    this.agendaService.countCompromissosDoRecurso(params)
      .then((agendaResumoDTO) => {
        this.compromissosBadgeValue = agendaResumoDTO?.compromissosCount ?? 0;
        this.compromissosBadgeVisible = this.compromissosBadgeValue > 0;
      }).catch((e) => {
        console.log('Erro em getAgendaDoMes:' + e);
      });

  }

  getAvatarURL() {
    let email = 'unknowuser@kerubin.com.br';
    if (this.authService.getCurrentUser()) {
      email = this.authService.getCurrentUser();
    }
    const hash = Md5.init(email);
    // 95807855049d8f2066d8c36b4951b3ea
    return `https://www.gravatar.com/avatar/${hash}?d=mp&s=30"`;
  }

  showMobileMenu() {
    this.menuBarVisible = !this.menuBarVisible;
    this.menuBarChangeVisibility.emit(this.menuBarVisible);
  }

  getCurrentUserName() {
      if (this.authService.getCurrentUserName()) {
        return this.authService.getCurrentUserName();
      } else {
        return 'Desconhecido';
      }
  }

  getCurrentUserNameFirstLetter(): string {
    const name: string = this.getCurrentUserName();
    if (name) {
      return name.substr(0, 1).toUpperCase();
    }
  }

  goToAgenda() {
    this.router.navigate(['/agenda']);
  }

  logout() {
      this.logoutService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => {
        this.messageHandler.showError(error);
      });
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  ngOnDestroy() {
    console.log('navbar ngOnDestroy');
    this.subscription.unsubscribe();
    this.stopPolling();
  }

}

