/**********************************************************************************************
Code generated with MKL Plug-in version: 3.6.2
Code generated at time stamp: 2019-06-05T06:41:33.812
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-kerubin-menu',
  templateUrl: './kerubin-menu.component.html',
  styleUrls: ['./kerubin-menu.component.css']
})
export class KerubinMenuComponent implements OnInit {

  items: MenuItem[];


  constructor() { }

  ngOnInit() {
    this.loadMenu();
  }

  loadMenu() {
    this.items = [

      {
        label: 'Dashboards',
        icon: 'pi pi-pw',
        items: [

          {
            label: 'Contas',
            icon: 'pi pi-fw ',
            items: [
              { label: 'Situação das contas', icon: 'pi pi-fw', routerLink: '/dashboard' },
            ]
          }

        ]
      },

      {
        label: 'Cadastros',
        icon: 'pi pi-pw',
        items: [

          {
            label: 'Banco',
            icon: 'pi pi-fw ',
            items: [
              { label: 'Banco', icon: 'pi pi-fw', routerLink: '/banco' },
              { label: 'Agência bancária', icon: 'pi pi-fw', routerLink: '/agenciabancaria' },
              { label: 'Bandeira de cartão', icon: 'pi pi-fw', routerLink: '/bandeiracartao' },
              { label: 'Conta bancária', icon: 'pi pi-fw', routerLink: '/contabancaria' },
              { label: 'Cartão de crédito', icon: 'pi pi-fw', routerLink: '/cartaocredito' }
            ]
          },
          {
            label: 'Fornecedor',
            icon: 'pi pi-fw ',
            items: [
              { label: 'Fornecedor', icon: 'pi pi-fw', routerLink: '/fornecedor' }
            ]
          },
          {
            label: 'Cliente',
            icon: 'pi pi-fw ',
            items: [
              { label: 'Cliente', icon: 'pi pi-fw', routerLink: '/cliente' }
            ]
          }		
        ]
      },

      {
        label: 'Financeiro',
        icon: 'pi pi-pw',
        items: [

          {
            label: 'Plano de contas',
            icon: 'pi pi-fw ',
            items: [
              { label: 'Plano de contas', icon: 'pi pi-fw', routerLink: '/planoconta' }
            ]
          },

          {
            label: 'Fluxo de caixa',
            icon: 'pi pi-fw ',
            items: [
              { label: 'Cadastro de caixa', icon: 'pi pi-fw', routerLink: '/caixa' },
              { label: 'Caixa diário', icon: 'pi pi-fw', routerLink: '/caixadiario' },
              { label: 'Lançamentos no caixa', icon: 'pi pi-fw', routerLink: '/caixalancamento' }
            ]
          },

          {
            label: 'Contas a pagar',
            icon: 'pi pi-fw ',
            items: [
              { label: 'Contas a pagar', icon: 'pi pi-fw', routerLink: '/contapagar' }
            ]
          },
          {
            label: 'Contas a receber',
            icon: 'pi pi-fw ',
            items: [
              { label: 'Contas a receber', icon: 'pi pi-fw', routerLink: '/contareceber' }
            ]
          }

        ]
      },
	  {
      	label: 'Segurança',
      	icon: 'pi pi-pw',
      	items: [
      		
      		{
      			label: 'Autorização',
      			icon: 'pi pi-fw ',
      			items: [
      				{ label: 'Usuário', icon: 'pi pi-fw', routerLink: '/sysuser' }
      			]
      		}
      		
      	]
      }


    ];
  }

}
