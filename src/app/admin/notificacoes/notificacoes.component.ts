import { MessageHandlerService } from './../../core/message-handler.service';
import { NotificacoesService } from './notificacoes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.component.html',
  styleUrls: ['./notificacoes.component.css']
})
export class NotificacoesComponent implements OnInit {

  enviarSituacaoFinanceiraDisabled = false;

  constructor(
    private messageHandler: MessageHandlerService,
    private notificacoesService: NotificacoesService
    ) { }

  ngOnInit() {
  }

  enviarSituacaoFinanceira() {
    this.enviarSituacaoFinanceiraDisabled = true;
    this.notificacoesService
    .notifyUsersAboutTheBills()
    .then((ticket) => {
      this.messageHandler.showSuccess('A notificação está sendo processada sob o ticket:' + ticket);
      this.enviarSituacaoFinanceiraDisabled = false;
    })
    .catch(error => {
      this.enviarSituacaoFinanceiraDisabled = false;
      this.messageHandler.showError(error);
    });
  }

}
