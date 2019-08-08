import { ChangePasswordComponent } from './account/changepassword/changepassword.component';
import { ChangePasswordForgottenComponent } from './account/changepasswordforgotten/changepasswordforgotten.component';
import { ForgotPasswordComponent } from './account/forgotpassword/forgotpassword.component';
/**********************************************************************************************
Code generated with MKL Plug-in version: 3.6.1
Code generated at time stamp: 2019-06-03T07:33:29.569
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

// Angular
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

// Kerubin - BEGIN
import { ConfirmAccountComponent } from './account/confirmaccount/confirmaccount.component';
import { NewAccountComponent } from './account/newaccount/newaccount.component';
import { ConfigNewAccountComponent } from './account/confignewaccount/confignewaccount.component';
import { LoginComponent } from './security/login/login.component';
// Kerubin - END

const routes: Routes = [
  // Main dashboard
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },

 // BEGIN ENTITIES FOR SERVICE: financeiro.fluxocaixa
  { path: 'caixa', loadChildren: './modules/financeiro/fluxocaixa/caixa/caixa.module#CaixaModule' },
  { path: 'caixadiario', loadChildren: './modules/financeiro/fluxocaixa/caixadiario/caixadiario.module#CaixaDiarioModule' },
  { path: 'caixalancamento', loadChildren: './modules/financeiro/fluxocaixa/caixalancamento/caixalancamento.module#CaixaLancamentoModule' },
  // END ENTITIES FOR SERVICE: financeiro.fluxo_caixa

  // BEGIN ENTITIES FOR SERVICE: financeiro.contasreceber
  { path: 'contareceber', loadChildren: './modules/financeiro/contasreceber/contareceber/contareceber.module#ContaReceberModule' },
  // END ENTITIES FOR SERVICE: financeiro.contas_receber

  // BEGIN ENTITIES FOR SERVICE: cadastros.cliente
  { path: 'cliente', loadChildren: './modules/cadastros/cliente/cliente/cliente.module#ClienteModule' },
  // END ENTITIES FOR SERVICE: cadastros.cliente

  // BEGIN ENTITIES FOR SERVICE: financeiro.plano_contas
  { path: 'planoconta', loadChildren: './modules/financeiro/planocontas/planocontas-tree/planocontas-tree.module#PlanoContasTreeModule' },
  // END ENTITIES FOR SERVICE: financeiro.plano_contas

  // BEGIN ENTITIES FOR SERVICE: financeiro.contas_pagar
  { path: 'contapagar', loadChildren: './modules/financeiro/contaspagar/contapagar/contapagar.module#ContaPagarModule' },
  // END ENTITIES FOR SERVICE: financeiro.contas_pagar

  // BEGIN ENTITIES FOR SERVICE: cadastros.banco
  { path: 'banco', loadChildren: './modules/cadastros/banco/banco/banco.module#BancoModule' },
  { path: 'agenciabancaria', loadChildren: './modules/cadastros/banco/agenciabancaria/agenciabancaria.module#AgenciaBancariaModule' },
  { path: 'bandeiracartao', loadChildren: './modules/cadastros/banco/bandeiracartao/bandeiracartao.module#BandeiraCartaoModule' },
  { path: 'contabancaria', loadChildren: './modules/cadastros/banco/contabancaria/contabancaria.module#ContaBancariaModule' },
  { path: 'cartaocredito', loadChildren: './modules/cadastros/banco/cartaocredito/cartaocredito.module#CartaoCreditoModule' },
  // END ENTITIES FOR SERVICE: cadastros.banco

  // BEGIN ENTITIES FOR SERVICE: cadastros.fornecedor
  { path: 'fornecedor', loadChildren: './modules/cadastros/fornecedor/fornecedor/fornecedor.module#FornecedorModule' },
  // END ENTITIES FOR SERVICE: cadastros.fornecedor

  // BEGIN ENTITIES FOR SERVICE: security.authorization
  { path: 'sysuser', loadChildren: './modules/security/authorization/sysuser/sysuser.module#SysUserModule' },
  // END ENTITIES FOR SERVICE: security.authorization

  // *****
  { path: 'mainmenu', loadChildren: './dashboard/dashboard.module#DashboardModule' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // BEGIN payment
  { path: 'paymentplan', loadChildren: './payment/payment.module#PaymentModule' },
  { path: 'paymentCreditOrder', loadChildren: './modules/security/authorization/creditorder/creditorder.module#CreditOrderModule' },
  // END payment

  { path: 'login', component: LoginComponent },
  { path: 'confignewaccount', component: ConfigNewAccountComponent },
  { path: 'newaccount', component: NewAccountComponent },
  { path: 'confirmaccount', component: ConfirmAccountComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'changepasswordforgotten', component: ChangePasswordForgottenComponent },
  { path: 'changepassword', component: ChangePasswordComponent }
];


@NgModule({

  imports: [
    RouterModule.forRoot(routes)
  ],

  exports: [
    RouterModule
  ]

})

export class AppRoutingModule { }

