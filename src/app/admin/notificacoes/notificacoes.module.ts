import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { NotificacoesService } from './notificacoes.service';
import { NotificacoesComponent } from './notificacoes.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificacoesRoutingModule } from './notificacoes-routing.module';

@NgModule({
  declarations: [
    NotificacoesComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    PanelModule,
    NotificacoesRoutingModule
  ],
  providers: [
    NotificacoesService
  ]
})
export class NotificacoesModule { }
