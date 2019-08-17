import { CreditBalanceService } from './creditbalance.service';
import { MessageHandlerService } from 'src/app/core/message-handler.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-creditbalance',
  templateUrl: './creditbalance.component.html',
  styleUrls: ['./creditbalance.component.css']
})
export class CreditBalanceComponent implements OnInit {

  SALDO_MINIMO = 10;
  balance = 0.0;

  loading = false;

  constructor(
    private messageHandler: MessageHandlerService,
    private creditBalanceService: CreditBalanceService
  ) { }

  ngOnInit() {
    this.loadCreditBalance();
  }

  loadCreditBalance() {
    this.loading = true;
    this.creditBalanceService.getCreditBalance()
    .then(response => {
      this.balance = response.balanceValue;
      this.loading = false;
    })
    .catch(error => {
      this.balance = 0.0;
      this.loading = false;
      this.messageHandler.showError(error);
    });
  }

  getSaldoTitle() {
    let result = 'Saldo atual (';
    if (this.balance >= 100) {
      result += 'Ideal';
    } else if (this.balance >= 50) {
      result += 'Normal';
    } else if (this.balance >= 10) {
      result += 'Atenção';
    } else if (this.balance >= 0) {
      result += 'Crítico';
    }

    return result + ')';
  }

  getSaldoClass() {
    let result = 'div-card';
    if (this.balance >= 100) {
      result += ' ' + 'saldo-alto';
    } else if (this.balance >= 50) {
      result += ' ' + 'saldo-normal';
    } else if (this.balance >= 10) {
      result += ' ' + 'saldo-baixo';
    } else if (this.balance >= 0) {
      result += ' ' + 'saldo-critico';
    }

    return result;
  }

  isSaldoCritico() {
    return this.balance < this.SALDO_MINIMO;
  }

}
