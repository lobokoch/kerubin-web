import { CreditOrder } from './../payment.model';
import { PaymentService } from './../payment.service';
import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { MessageHandlerService } from 'src/app/core/message-handler.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-payment-plan',
  templateUrl: './payment-plan.component.html',
  styleUrls: ['./payment-plan.component.css']
})
export class PaymentPlanComponent implements OnInit {

  activeIndex = 0;
  MAX_STEPS = 3;

  items: MenuItem[];
  selectedValue = 50;

  banks: any[];
  bankBradesco = {name: 'Bradesco', bank: 'bradesco.png'};
  selectedBank: any = this.bankBradesco;

  finalizing = false;
  finishedOrderSuccess = false;

  responseText = null;

  constructor(
    private decimalPipe: DecimalPipe,
    private paymentService: PaymentService,
    private messageHandler: MessageHandlerService,
    private sanitizer: DomSanitizer
    ) { }

  ngOnInit() {
    this.items = [
      { label: 'Valor do crédito' },
      { label: 'Forma de pagamento' },
      { label: 'Finalizar' }
    ];

    this.banks = [
      this.bankBradesco,
      {name: 'Caixa Econômica Federal', bank: 'cef.png'}
    ];

  }

  calculateValue(): string {
    return 'R$ ' + this.decimalPipe.transform(this.selectedValue, '1.2-2');

  }

  calculateTotalValue(): string {
    const value = (this.selectedValue * 1.1);
    return 'R$ ' + this.decimalPipe.transform(value, '1.2-2');
  }

  calculateBonusValue(): string {
    const value = (this.selectedValue * 0.1);
    return 'R$ ' + this.decimalPipe.transform(value, '1.2-2');
  }

  nextStep() {
    if (this.activeIndex + 1 < this.MAX_STEPS) {
      this.activeIndex++;
    }
  }

  previousStep() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

  finishOrder() {
    const creditOrder = new CreditOrder();
    creditOrder.orderValue = this.selectedValue;
    creditOrder.paymentMethod = 'BANK_ACCOUNT';
    creditOrder.paymentMethodDescription = 'Bradesco';

    this.finishedOrderSuccess = false;
    this.finalizing = true;
    this.paymentService.createCreditOrder(creditOrder)
    .then((response => {
      this.finishedOrderSuccess = true;
      this.finalizing = false;
      this.responseText = this.sanitizer.bypassSecurityTrustHtml(response.text);
    }))
    .catch(error => {
      this.finalizing = false;
      this.messageHandler.showError(error);
    });
  }

}


