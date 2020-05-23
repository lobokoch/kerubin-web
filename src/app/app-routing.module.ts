import { HomeComponent } from './home/home.component';
import { ChangePasswordComponent } from './account/changepassword/changepassword.component';
import { ChangePasswordForgottenComponent } from './account/changepasswordforgotten/changepasswordforgotten.component';
import { ForgotPasswordComponent } from './account/forgotpassword/forgotpassword.component';

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
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },

 // BEGIN ENTITIES FOR SERVICE: financeiro.fluxocaixa
  { path: 'caixa', loadChildren: () => import('./modules/financeiro/fluxocaixa/caixa/caixa.module').then(m => m.CaixaModule) },
  { path: 'caixadiario', loadChildren: () => import('./modules/financeiro/fluxocaixa/caixadiario/caixadiario.module').then(m => m.CaixaDiarioModule) },
  { path: 'caixalancamento', loadChildren: () => import('./modules/financeiro/fluxocaixa/caixalancamento/caixalancamento.module').then(m => m.CaixaLancamentoModule) },
  // END ENTITIES FOR SERVICE: financeiro.fluxo_caixa

  // BEGIN ENTITIES FOR SERVICE: financeiro.contasreceber
  { path: 'contareceber', loadChildren: () => import('./modules/financeiro/contasreceber/contareceber/contareceber.module').then(m => m.ContaReceberModule) },
  // END ENTITIES FOR SERVICE: financeiro.contas_receber

  // BEGIN ENTITIES FOR SERVICE: cadastros.cliente
  { path: 'cliente', loadChildren: () => import('./modules/cadastros/cliente/cliente/cliente.module').then(m => m.ClienteModule) },
  // END ENTITIES FOR SERVICE: cadastros.cliente

  // BEGIN ENTITIES FOR SERVICE: cadastros.cliente/AGENDA
  { path: 'recurso', loadChildren: () => import('./modules/cadastros/cliente/recurso/recurso.module').then(m => m.RecursoModule) },
  { path: 'compromisso', loadChildren: () => import('./modules/cadastros/cliente/compromisso/compromisso.module').then(m => m.CompromissoModule) },
  // END ENTITIES FOR SERVICE: cadastros.cliente/AGENDA

  // BEGIN ENTITIES FOR SERVICE: financeiro.plano_contas
  { path: 'planoconta', loadChildren: () => import('./modules/financeiro/planocontas/planocontas-tree/planocontas-tree.module').then(m => m.PlanoContasTreeModule) },
  // END ENTITIES FOR SERVICE: financeiro.plano_contas

  // BEGIN ENTITIES FOR SERVICE: financeiro.contas_pagar
  { path: 'contapagar', loadChildren: () => import('./modules/financeiro/contaspagar/contapagar/contapagar.module').then(m => m.ContaPagarModule) },
  // END ENTITIES FOR SERVICE: financeiro.contas_pagar

  // BEGIN ENTITIES FOR SERVICE: financeiro.bancos.conciliacaobancaria
  { path: 'conciliacaobancaria', loadChildren: () => import('./modules/financeiro/banco/conciliacaobancaria/conciliacaobancaria.module').then(m => m.ConciliacaoBancariaModule) },
  // { path: 'conciliacaobancaria', loadChildren: './modules/financeiro/banco/conciliacao/conciliacao.module#ConciliacaoModule' },
  // END ENTITIES FOR SERVICE: financeiro.bancos.conciliacaobancaria

  // BEGIN ENTITIES FOR SERVICE: cadastros.banco
  { path: 'banco', loadChildren: () => import('./modules/cadastros/banco/banco/banco.module').then(m => m.BancoModule) },
  { path: 'agenciabancaria', loadChildren: () => import('./modules/cadastros/banco/agenciabancaria/agenciabancaria.module').then(m => m.AgenciaBancariaModule) },
  { path: 'bandeiracartao', loadChildren: () => import('./modules/cadastros/banco/bandeiracartao/bandeiracartao.module').then(m => m.BandeiraCartaoModule) },
  { path: 'contabancaria', loadChildren: () => import('./modules/cadastros/banco/contabancaria/contabancaria.module').then(m => m.ContaBancariaModule) },
  { path: 'cartaocredito', loadChildren: () => import('./modules/cadastros/banco/cartaocredito/cartaocredito.module').then(m => m.CartaoCreditoModule) },
  // END ENTITIES FOR SERVICE: cadastros.banco

  // BEGIN ENTITIES FOR SERVICE: cadastros.fornecedor
  { path: 'fornecedor', loadChildren: () => import('./modules/cadastros/fornecedor/fornecedor/fornecedor.module').then(m => m.FornecedorModule) },
  // END ENTITIES FOR SERVICE: cadastros.fornecedor

  // BEGIN ENTITIES FOR SERVICE: security.authorization
  { path: 'sysuser', loadChildren: () => import('./modules/security/authorization/sysuser/sysuser.module').then(m => m.SysUserModule) },
  // END ENTITIES FOR SERVICE: security.authorization

  // *****
  { path: 'mainmenu', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  // { path: '', redirectTo: 'login', pathMatch: 'full' },

  // BEGIN Kerubin Admin
  { path: 'creditorderadmin', loadChildren: () => import('./modules/security/authorization/creditorderadmin/creditorderadmin.module').then(m => m.CreditOrderAdminModule) },
  { path: 'notificacoesadmin', loadChildren: () => import('./admin/notificacoes/notificacoes.module').then(m => m.NotificacoesModule) },
  // END Kerubin Admin

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'confignewaccount', component: ConfigNewAccountComponent },
  { path: 'newaccount', component: NewAccountComponent },
  { path: 'confirmaccount', component: ConfirmAccountComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'changepasswordforgotten', component: ChangePasswordForgottenComponent },
  { path: 'changepassword', component: ChangePasswordComponent },
  // BEGIN payment
  { path: 'paymentplan', loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule) },
  { path: 'paymentCreditOrder', loadChildren: () => import('./modules/security/authorization/creditorder/creditorder.module').then(m => m.CreditOrderModule) },
  { path: 'creditBalance', loadChildren: () => import('./modules/custom/creditbalance/creditbalance.module').then(m => m.CreditBalanceModule) },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
   // END payment
];


@NgModule({

  imports: [
    RouterModule.forRoot(routes
      // , { enableTracing: true } // <-- debugging purposes only
      )
  ],

  exports: [
    RouterModule
  ]

})

export class AppRoutingModule { }

