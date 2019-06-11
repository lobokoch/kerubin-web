import { MonthlySum, MonthlySumContasPagar } from './dashboard-model';
import { MessageHandlerService } from './../../core/message-handler.service';
import { DashboardService } from './../dashboard.service';
import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  monthlySumContasPagarData: any;

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
    private dashboardService: DashboardService,
    private messageHandler: MessageHandlerService,
    private decimalPipe: DecimalPipe
    ) {

    }

  ngOnInit() {
    this.loadMonthlySumContasPagar();
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
    result[month] = result[month] + ' (ATUAL)';

    return result;
  }

  private loadMonthlySumContasPagar() {
    this.dashboardService.getMonthlySumContasPagar()
    .then(response => {
      this.fillChartData(response as MonthlySumContasPagar);
    })
    .catch(error => {
      this.messageHandler.showError(error);
    });
  }

  fillChartData(monthlySumContasPagar: MonthlySumContasPagar) {
    const monthNames = this.getMonthNames();
    const dataApagar = this.monthlySumToChartData(monthlySumContasPagar.apagar);
    const dataPago = this.monthlySumToChartData(monthlySumContasPagar.pago);

    this.monthlySumContasPagarData = {
      labels: monthNames,
      datasets: [
        {
          label: 'A pagar',
          //    'Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
          data: dataApagar,
          backgroundColor: 'rgba(255, 0, 0, 0.4)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: '1'
        },
        {
          label: 'Pagas',
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
