import { FluxoCaixaMonthItem, FluxoCaixaPlanoContasForMonth } from './dashboard-fluxocaixa-model';
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
  resumoMensalPorPlanoContasDebitosMesAtualChartData: any;
  resumoMensalPorPlanoContasDebitosMesAnteriorChartData: any;

  resumoMensalPorPlanoContasCreditosMesAtualChartData: any;
  resumoMensalPorPlanoContasCreditosMesAnteriorChartData: any;

  resumoPlanoContasOptions = {
      legend: {
        position: 'right'
      }
  };

  despesasMensaisPorPlanoContasMesAtualChartDataOptions: any;
  colors = ['#FF6384', '#36A2EB', '#FFCE56', '#ff9f40', '#00FF7F', '#4bc0c0',
            '#FF00000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF', '#C0C0C0', '#808080', '#800000', '#808000',
            '#008000',  '#800080', '#008080', '#000080', 'FF4500', '#FF8C00', '#DAA520', '#7FFF00', '#006400', '#4682B4',
            '#87CEEB',  '#8B008B', '#DA70D6', '#FF1493', '#EE82EE', '#800080', '#F5F5DC', '#D2691E', '#F4A460', '#FFF8DC',
            '#FFF0F5', '#B0C4DE', '#778899', '#F0FFFF', '#696969', '#FF1493', '#0000CD', '#6A5ACD', '#00CED1', '#ffcd56'
          ];

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
    this.loadCharts();
  }

  loadCharts() {
    this.getFluxoCaixaFromYear();
    this.getResumoMensalPorPlanoContasDebitos();
    this.getResumoMensalPorPlanoContasCreditos();
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

  private getResumoMensalPorPlanoContasDebitos() {
    this.dashboardService.getResumoMensalPorPlanoContasDebitos()
    .then(response => {
      const items = response;

      let monthIndex = -1;
      if (items) {
        monthIndex = items.length - 1; // Current month
      }
      let chartData = this.fillDespesasMensaisPorPlanoContasChartData(items, monthIndex);
      this.resumoMensalPorPlanoContasDebitosMesAtualChartData = chartData;

      monthIndex--; // Previous month
      chartData = this.fillDespesasMensaisPorPlanoContasChartData(items, monthIndex);
      this.resumoMensalPorPlanoContasDebitosMesAnteriorChartData = chartData;

    })
    .catch(error => {
      this.messageHandler.showError(error);
    });
  }

  private getResumoMensalPorPlanoContasCreditos() {
    this.dashboardService.getResumoMensalPorPlanoContasCreditos()
    .then(response => {
      const items = response;
      //
      let monthIndex = -1;
      if (items) {
        monthIndex = items.length - 1; // Current month
      }

      let chartData = this.fillDespesasMensaisPorPlanoContasChartData(items, monthIndex);
      this.resumoMensalPorPlanoContasCreditosMesAtualChartData = chartData;

      monthIndex--; // Previous month
      chartData = this.fillDespesasMensaisPorPlanoContasChartData(items, monthIndex);
      this.resumoMensalPorPlanoContasCreditosMesAnteriorChartData = chartData;
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

  fillDespesasMensaisPorPlanoContasChartData(items: FluxoCaixaPlanoContasForMonth[], monthIndex: number): any {
    if (monthIndex < 0) {
      console.log('monthIndex < 0:' + monthIndex);
      return null;
    }


    if (!items || !(items.length > monthIndex)) {
      console.log('!items || !(items.length > monthIndex:' + monthIndex + '), items:' + items);
      return null;
    }

    // const currentMonthItem = items[items.length - 1];
    const monthItem = items[monthIndex];
    if (!monthItem) {
      console.log('!monthItem: ' + monthItem);
      return null;
    }

    return this.fillDespesasMensaisPorPlanoContasMesAtualChartData(monthItem);
  }

  getDespesasMensaisPorPlanoContasTitle(monthIndex: number): string {
    const months = this.getMonthNames();
    monthIndex = moment().month() - monthIndex;
    const monthName = months[monthIndex];
    return `Créditos do mês ${monthName.toUpperCase()} por plano de contas`;
  }

  getReceitasMensaisPorPlanoContasTitle(monthIndex: number): string {
    const months = this.getMonthNames();
    monthIndex = moment().month() - monthIndex;
    const monthName = months[monthIndex];
    return `Débitos do mês ${monthName.toUpperCase()} por plano de contas`;
  }

  fillDespesasMensaisPorPlanoContasMesAtualChartData(item: FluxoCaixaPlanoContasForMonth): any {
    const monthNames = this.getMonthNames();
    const monthName = item.monthName;
    const chartLabels = item.items.map(it => it.planoContaCode + ' - ' + it.planoContaDescription);
    const chartData = item.items.map(it => it.value);
    const backgroundColor = this.colors.slice(0, item.items.length);
    console.log('backgroundColor:' + backgroundColor);

    const pieChart = {
      labels: chartLabels,
      datasets: [
        {
          //    'Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
          data: chartData,
          backgroundColor: backgroundColor
        }
      ]
    };

    return pieChart;
  }

  getColors(size: number): string[] {

    return null;
  }


  getRandomColor(): string {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 200);

    return `rgb(${r}, ${g}, ${b})`;
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
