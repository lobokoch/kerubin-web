import { AuthService } from './../security/auth.service';
/**********************************************************************************************
Code generated with MKL Plug-in version: 3.6.2
Code generated at time stamp: 2019-06-05T06:41:33.812
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-kerubin-menu',
  templateUrl: './kerubin-menu.component.html',
  styleUrls: ['./kerubin-menu.component.css']
})
export class KerubinMenuComponent implements OnInit {

  items: MenuItem[];

  sidebarClass = 'menu-bar';

  @Input() menuBarVisible = true;
  constructor(
    private authService: AuthService
  ) { }

  goHome() {

  }

  doMenuBarEnter() {
    this.menuBarVisible = false;
    this.sidebarClass = 'kb-side-menu menu-full';

    // setTimeout(function() {
      this.menuBarVisible = true;
    // }.bind(this), 100);


  }

  doMenuFullLeave() {
    this.menuBarVisible = false;
    this.sidebarClass = 'kb-side-menu menu-bar';

    // setTimeout(function() {
      this.menuBarVisible = true;
    // }.bind(this), 100);

  }

  getMenuClass() {
    return this.sidebarClass;
  }

  ngOnInit() {
    this.loadMenu();
  }

  loadMenu() {
    const isSuperAdmin = this.authService.isCurrentUserSuperAdmin();

    this.items = [

      {
        label: 'Gráficos',
        icon: 'fas fa-chart-bar fa-lg',
        items: [

          {
            label: 'Financeiro',
            icon: 'fas fa-money-bill',
            items: [
              { label: 'Situação', icon: 'fas fa-chart-line', routerLink: '/dashboard' },
            ]
          }

        ]
      },

      {
        label: 'Cadastros',
        icon: 'fas fa-id-card fa-lg',
        items: [

          {
            label: 'Banco',
            icon: 'fas fa-hand-holding-usd',
            items: [
              { label: 'Banco', icon: 'fas fa-dollar-sign', routerLink: '/banco' },
              { label: 'Agência bancária', icon: 'fas fa-hotel', routerLink: '/agenciabancaria' },
              { label: 'Bandeira de cartão', icon: 'fab fa-cc-visa', routerLink: '/bandeiracartao' },
              { label: 'Conta bancária', icon: 'fas fa-credit-card', routerLink: '/contabancaria' },
              { label: 'Cartão de crédito', icon: 'fab fa-cc-mastercard', routerLink: '/cartaocredito' }
            ]
          },
          {
            label: 'Fornecedor',
            icon: 'fas fa-truck',
            items: [
              { label: 'Fornecedor', icon: 'fas fa-address-card', routerLink: '/fornecedor' }
            ]
          },
          {
            label: 'Cliente',
            icon: 'fas fa-handshake ',
            items: [
              { label: 'Cliente', icon: 'fas fa-address-book', routerLink: '/cliente' }
            ]
          }
        ]
      },
      {
        label: 'Agenda',
        icon: 'fas fa-calendar-alt fa-lg',
        items: [
          {
            label: 'Recurso',
            icon: 'fas fa-user-clock',
            routerLink: '/recurso'
          },
          {
            label: 'Compromisso',
            icon: 'fas fa-calendar-check',
            routerLink: '/compromisso'
          }
        ]
      },

      {
        label: 'Financeiro',
        icon: 'fas fa-money-bill fa-lg',
        items: [

          {
            label: 'Plano de contas',
            icon: 'fas fa-book ',
            items: [
              { label: 'Plano de contas', icon: 'fas fa-sitemap', routerLink: '/planoconta' }
            ]
          },

          {
            label: 'Fluxo de caixa',
            icon: 'fas fa-money-bill-wave',
            items: [
              { label: 'Cadastro de caixa', icon: 'fas fa-money-check-alt', routerLink: '/caixa' },
              { label: 'Caixa diário', icon: 'fas fa-calendar-alt', routerLink: '/caixadiario' },
              { label: 'Lançamentos', icon: 'fas fa-coins', routerLink: '/caixalancamento' }
            ]
          },

          {
            label: 'Contas a pagar',
            icon: 'fas fa-minus-circle',
            items: [
              { label: 'Contas a pagar', icon: 'pi pi-calendar-minus', routerLink: '/contapagar' }
            ]
          },
          {
            label: 'Contas a receber',
            icon: 'fas fa-plus-circle',
            items: [
              { label: 'Contas a receber', icon: 'pi pi-calendar-plus', routerLink: '/contareceber' }
            ]
          },
          {
            label: 'Banco',
            icon: 'fas fa-dollar-sign',
            items: [
              { label: 'Importar extrato', icon: 'fas fa-file-download', routerLink: '/conciliacaobancaria' }
            ]
          }

        ]
      },
      {
        label: 'Segurança',
        icon: 'fas fa-user-shield fa-lg',
        items: [

          {
            label: 'Autorização',
            icon: 'fas fa-key',
            items: [
              { label: 'Usuário', icon: 'fas fa-user', routerLink: '/sysuser' }
            ]
          }

        ]
      },
      {
        label: 'Administração',
        icon: 'fas fa-tools fa-lg',
        items: [

          {
            label: 'Créditos',
            icon: 'fas fa-money-check-alt',
            items: [
              { label: 'Pedido de créditos', icon: 'fas fa-cart-plus', routerLink: '/paymentplan' },
              { label: 'Consultar pedidos', icon: 'fas fa-search', routerLink: '/paymentCreditOrder' },
              { label: 'Consultar saldo', icon: 'fas fa-search-dollar', routerLink: '/creditBalance' }
            ]
          }

        ]
      },


	  {
      	label: 'Kerubin',
        icon: 'fab fa-korvue fa-lg',
        visible: isSuperAdmin,
      	items: [

      		{
      			label: 'Administração',
      			icon: 'fas fa-tools',
      			items: [
      				{ label: 'Pedido de créditos', icon: 'fas fa-shopping-cart', routerLink: '/creditorderadmin' },
      				{ label: 'Notificações', icon: 'fas fa-envelope', routerLink: '/notificacoesadmin' }
      			]
      		}

      	]
      }

    ];
  }

}
