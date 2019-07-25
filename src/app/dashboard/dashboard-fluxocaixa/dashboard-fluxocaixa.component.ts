import { FluxoCaixaMonthItem } from './dashboard-fluxocaixa-model';
import { MessageHandlerService } from './../../core/message-handler.service';
import { DashboardFluxoCaixaService } from './dashboard-fluxocaixa.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import * as moment from 'moment';

@Component({
  selector: 'app-dashboard-fluxocaixa',
  templateUrl: './dashboard-fluxocaixa.component.html',
  styleUrls: ['./dashboard-fluxocaixa.component.css']
})
export class DashboardFluxoCaixaComponent implements OnInit {

  loadedItemsFluxo: FluxoCaixaMonthItem[];
  chartData: any;

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
    private dashboardService: DashboardFluxoCaixaService,
    private messageHandler: MessageHandlerService,
    private decimalPipe: DecimalPipe
    ) {

    }

  ngOnInit() {
    this.getFluxoCaixaFromYear();
  }

  private getFluxoCaixaFromYear() {
    this.dashboardService.getFluxoCaixaFromYear()
    .then(response => {
      this.loadedItemsFluxo = response;
      //
      this.fillChartData(this.loadedItemsFluxo);
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

  fillChartData(itemsFluxo: FluxoCaixaMonthItem[]) {
    const monthNames = this.getMonthNames();
    const creditos = itemsFluxo.map(it => it.creditValue);
    const debitos = itemsFluxo.map(it => it.debitValue);
    const saldo = itemsFluxo.map(it => it.balanceValue);
    const acumulado = itemsFluxo.map(it => it.balanceAccumulated);

    this.chartData = {
      labels: monthNames,
      datasets: [
        {
          label: 'Créditos',
          //    'Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
          data: creditos,
          backgroundColor: 'rgba(0, 191, 255, 0.4)',
          borderColor: 'rgba(0, 0, 255, 1)',
          borderWidth: '1'
        },
        {
          label: 'Débitos',
          backgroundColor: 'rgba(255, 0, 0, 0.4)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: '1',
          //    'Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
          data: debitos
        },
        {
          label: 'Saldo',
          backgroundColor: 'rgba(0, 206, 0, 0.4)',
          borderColor: 'rgba(0, 206, 0, 1)',
          borderWidth: '1',
          //    'Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
          data: saldo
        },
        {
          type: 'line',
          label: 'Saldo acumulado',
          backgroundColor: 'rgba(255, 255, 255, 0)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: '2',
          //    'Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
          data: acumulado
        }
      ]
    };
  }

  getPanelPrevistoXRealizadoTitle(): string {
    const currentYear = moment().year();
    return `Fluxo de caixa ${currentYear} (créditos X débitos)`;
  }
}
