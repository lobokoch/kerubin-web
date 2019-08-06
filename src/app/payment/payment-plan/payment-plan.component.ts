import { PaymentService } from './../payment.service';
import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-payment-plan',
  templateUrl: './payment-plan.component.html',
  styleUrls: ['./payment-plan.component.css']
})
export class PaymentPlanComponent implements OnInit {

  activeIndex = 2;
  MAX_STEPS = 3;

  items: MenuItem[];
  selectedValue = 1000;

  banks: any[];
  bankBradesco = {name: 'Bradesco', bank: 'bradesco.png'};
  selectedBank: any = this.bankBradesco;


  constructor(
    private messageService: MessageService,
    private decimalPipe: DecimalPipe,
    private paymentService: PaymentService
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

  }

}


