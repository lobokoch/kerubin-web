import { MonthlySum, MonthlySumContasReceber, ContasReceberSituacaoDoAnoSum } from './dashboard-contareceber-model';
import { MessageHandlerService } from './../../core/message-handler.service';
import { DashboardContaReceberService } from './dashboard-contareceber.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import * as moment from 'moment';

@Component({
  selector: 'app-dashboard-contareceber',
  templateUrl: './dashboard-contareceber.component.html',
  styleUrls: ['./dashboard-contareceber.component.css']
})
export class DashboardContaReceberComponent implements OnInit {

  monthlySumContasReceberData: any;
  contasReceberSituacaoDoAnoSum = new ContasReceberSituacaoDoAnoSum();
  currentMonthName = '';
  nextMonthName = '';
  previusMonthName = '';

  options = {
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const value = dataset.data[tooltipItem.index];
          const label = dataset.label ? (' ' + dataset.label + ': ') : ' ';
          // return label + this.decimalPipe.transform(value, '1.2-2');
          return label + value.toLocaleString('pt', {style: 'currency', currency: 'BRL'});
        }
      }
    },

    scales: {
      yAxes: [{
        ticks: {
          callback: function(value, index, values) {
            return value.toLocaleString('pt', {style: 'currency', currency: 'BRL'});
          }
        }
      }]
    }
  };

  constructor(
    private dashboardContaReceberService: DashboardContaReceberService,
    private messageHandler: MessageHandlerService,
    private decimalPipe: DecimalPipe
    ) {

    }

  ngOnInit() {
    this.loadMonthlySumContasReceber();
    this.loadContasReceberSituacaoDoAno();
  }

  private loadContasReceberSituacaoDoAno() {
    this.dashboardContaReceberService.getContasReceberSituacaoDoAno()
    .then(response => {
      this.contasReceberSituacaoDoAnoSum = response as ContasReceberSituacaoDoAnoSum;
    })
    .catch(error => {
      this.messageHandler.showError(error);
    });
  }

  private getMonthNames(): Array<string> {
    const result = new Array();

    result.push('Janeiro');
    result.push('Fevereiro');
    result.push('Março');
    result.push('Abril');
    result.push('Maio');
    result.push('Junho');
    result.push('Julho');
    result.push('Agosto');
    result.push('Setembro');
    result.push('Outubro');
    result.push('Novembro');
    result.push('Dezembro');

    const today = moment().startOf('month');
    const month = today.month();

    this.currentMonthName = result[month];
    let nextMonth = month + 1;
    if (nextMonth > 12) {
      nextMonth = 1;
    }
    this.nextMonthName = result[nextMonth];
    let previousMonth = month - 1;
    if (previousMonth < 1) {
      previousMonth = 1;
    }
    this.previusMonthName = result[previousMonth];
    result[month] = '(ATUAL) ' + result[month];


    return result;
  }

  private loadMonthlySumContasReceber() {
    this.dashboardContaReceberService.getMonthlySumContasReceber()
    .then(response => {
      this.fillChartData(response as MonthlySumContasReceber);
    })
    .catch(error => {
      this.messageHandler.showError(error);
    });
  }

  fillChartData(monthlySumContasReceber: MonthlySumContasReceber) {
    const monthNames = this.getMonthNames();
    const dataApagar = this.monthlySumToChartData(monthlySumContasReceber.apagar);
    const dataPago = this.monthlySumToChartData(monthlySumContasReceber.pago);

    this.monthlySumContasReceberData = {
      labels: monthNames,
      datasets: [
        {
          label: 'A receber',
          //    'Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
          data: dataApagar,
          backgroundColor: 'rgba(255, 0, 0, 0.4)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: '1'
        },
        {
          label: 'Recebido',
          backgroundColor: 'rgba(0, 206, 0, 0.4)',
          borderColor: 'rgba(0, 206, 0, 1)',
          borderWidth: '1',
          //    'Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
          data: dataPago
        }
      ]
    };
  }

  private monthlySumToChartData(monthlySum: MonthlySum): Array<number> {
    const result = new Array<number>();

    result.push(monthlySum.january);
    result.push(monthlySum.february);
    result.push(monthlySum.march);
    result.push(monthlySum.april);
    result.push(monthlySum.may);
    result.push(monthlySum.june);
    result.push(monthlySum.july);
    result.push(monthlySum.august);
    result.push(monthlySum.september);
    result.push(monthlySum.october);
    result.push(monthlySum.november);
    result.push(monthlySum.december);

    return result;
  }

}
