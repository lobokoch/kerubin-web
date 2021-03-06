import { FluxoCaixaMonthItem, FluxoCaixaPlanoContasForMonth } from './dashboard-fluxocaixa-model';
import { MessageHandlerService } from './../../core/message-handler.service';
import { DashboardFluxoCaixaService } from './dashboard-fluxocaixa.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import * as moment from 'moment';
import { debug } from 'util';

@Component({
  selector: 'app-dashboard-fluxocaixa',
  templateUrl: './dashboard-fluxocaixa.component.html',
  styleUrls: ['./dashboard-fluxocaixa.component.css']
})
export class DashboardFluxoCaixaComponent implements OnInit {

  // *******************
  creditosDoMes = 0.0;
  debitosDoMes = 0.0;
  saldoDoMes = 0.0;
  saldoAtual = 0.0;
  // *******************

  colorMapCreditos = new Map<string, string>();
  colorMapDebitos = new Map<string, string>();

  loadedItemsFluxo: FluxoCaixaMonthItem[];
  chartData: any;
  resumoMensalPorPlanoContasDebitosMesAtualChartData: any;
  resumoMensalPorPlanoContasDebitosMesAnteriorChartData: any;

  resumoMensalPorPlanoContasCreditosMesAtualChartData: any;
  resumoMensalPorPlanoContasCreditosMesAnteriorChartData: any;

  resumoPlanoContasOptions = {
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const value = dataset.data[tooltipItem.index];
          let label = data.labels[tooltipItem.index];
          const percent = data.percents[tooltipItem.index];
          label = label ? (' ' + label + ': ') : ' ';
          // return label + this.decimalPipe.transform(value, '1.2-2');
          return label +
            value.toLocaleString('pt', { style: 'currency', currency: 'BRL' })
            + ' (' + percent.toFixed() + ' %)';
        }
      }
    },

    legend: {
      position: 'right'
    }
  };

  despesasMensaisPorPlanoContasMesAtualChartDataOptions: any;
  colors = ['#FF6384', '#36A2EB', '#FFCE56', '#ff9f40', '#00FF7F', '#4bc0c0',
    '#FF00000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF', '#C0C0C0', '#808080', '#800000', '#808000',
    '#008000', '#800080', '#008080', '#000080', 'FF4500', '#FF8C00', '#DAA520', '#7FFF00', '#006400', '#4682B4',
    '#87CEEB', '#8B008B', '#DA70D6', '#FF1493', '#EE82EE', '#800080', '#F5F5DC', '#D2691E', '#F4A460', '#FFF8DC',
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
          return label + value.toLocaleString('pt', { style: 'currency', currency: 'BRL' });
        }
      }
    },

    scales: {
      yAxes: [{
        ticks: {
          callback: function (value, index, values) {
            return value.toLocaleString('pt', { style: 'currency', currency: 'BRL' });
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
        this.pegarDadosDoMesAtual(this.loadedItemsFluxo);

      })
      .catch(error => {
        this.messageHandler.showError(error);
      });
  }

  private getResumoMensalPorPlanoContasDebitos() {
    this.dashboardService.getResumoMensalPorPlanoContasDebitos()
      .then(response => {
        const items = response;

        this.calcPercents(items);

        let monthIndex = -1;
        if (items) {
          monthIndex = items.length - 1; // Current month
        }
        let chartData = this.fillDespesasMensaisPorPlanoContasChartData(items, monthIndex, this.colorMapDebitos);
        this.resumoMensalPorPlanoContasDebitosMesAtualChartData = chartData;

        monthIndex--; // Previous month
        chartData = this.fillDespesasMensaisPorPlanoContasChartData(items, monthIndex, this.colorMapDebitos);
        this.resumoMensalPorPlanoContasDebitosMesAnteriorChartData = chartData;

      })
      .catch(error => {
        this.messageHandler.showError(error);
      });
  }

  calcPercents(monthItems: FluxoCaixaPlanoContasForMonth[]) {
    if (monthItems) {
      monthItems.forEach((monthItem) => {
        const total = monthItem.items.map((item) => item.value).reduce((a, b) => a + b, 0);
        monthItem.items.forEach((item) => {
          item.percent = item.value / total * 100;
        });
      });
    }
  }

  private getResumoMensalPorPlanoContasCreditos() {
    this.dashboardService.getResumoMensalPorPlanoContasCreditos()
      .then(response => {
        const items = response;

        this.calcPercents(items);

        //
        let monthIndex = -1;
        if (items) {
          monthIndex = items.length - 1; // Current month
        }

        let chartData = this.fillDespesasMensaisPorPlanoContasChartData(items, monthIndex, this.colorMapCreditos);
        this.resumoMensalPorPlanoContasCreditosMesAtualChartData = chartData;

        monthIndex--; // Previous month
        chartData = this.fillDespesasMensaisPorPlanoContasChartData(items, monthIndex, this.colorMapCreditos);
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

  fillDespesasMensaisPorPlanoContasChartData(items: FluxoCaixaPlanoContasForMonth[],
      monthIndex: number, colorMap: Map<string, string>): any {

    if (monthIndex < 0) {
      return null;
    }


    if (!items || !(items.length > monthIndex)) {
      return null;
    }

    // const currentMonthItem = items[items.length - 1];
    const monthItem = items[monthIndex];
    if (!monthItem) {
      return null;
    }

    return this.fillValoresMensaisPorPlanoContasMesAtualChartData(monthItem, colorMap);
  }

  getDespesasMensaisPorPlanoContasTitle(monthIndex: number): string {
    const months = this.getMonthNames();
    monthIndex = moment().month() - monthIndex;
    if (monthIndex < 0) {
      monthIndex = 11; // Dezembro.
    }
    const monthName = months[monthIndex];
    return `Débitos do mês ${monthName.toUpperCase()} por plano de contas`;
  }

  getReceitasMensaisPorPlanoContasTitle(monthIndex: number): string {
    const months = this.getMonthNames();
    monthIndex = moment().month() - monthIndex;
    if (monthIndex < 0) {
      monthIndex = 11; // Dezembro.
    }
    const monthName = months[monthIndex];
    return `Créditos do mês ${monthName.toUpperCase()} por plano de contas`;
  }

  fillValoresMensaisPorPlanoContasMesAtualChartData(item: FluxoCaixaPlanoContasForMonth, colorMap: Map<string, string>): any {
    // const monthNames = this.getMonthNames();
    // const monthName = item.monthName;
    const chartLabels = item.items.map(it => it.planoContaCode + ' - ' + it.planoContaDescription);
    const chartData = item.items.map(it => it.value);
    const percents = item.items.map(it => it.percent);


    const myColors = this.getMyColors(chartLabels, colorMap);

    // const backgroundColor = this.colors.slice(0, item.items.length);
    const backgroundColor = myColors;

    const pieChart = {
      percents: percents,
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

  getMyColors(labels: string[], colorMap: Map<string, string>): string[] {
    const myColors = labels.map(label => {
      let color = colorMap.get(label);
      if (!color) {
        let index = colorMap.size;
        if (index >= this.colors.length) {
          index = this.colors.length - 1;
        }
        color = this.colors[index];
        colorMap.set(label, color);
      }
      return color;
    });

    return myColors;
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

  pegarDadosDoMesAtual(itemsFluxo: FluxoCaixaMonthItem[]) {
    const month = moment().month() + 1;
    const item = itemsFluxo.find(it => it.monthId === month);
    if (item) {
      this.creditosDoMes = item.creditValue;
      this.debitosDoMes = item.debitValue;
      this.saldoDoMes = item.balanceValue;
      this.saldoAtual = item.balanceAccumulated;
    }
  }

  fillChartData(itemsFluxo: FluxoCaixaMonthItem[]) {
    // const monthNames = this.getMonthNames();
    const monthNames = itemsFluxo.map(it => it.monthName);
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
          backgroundColor: 'rgba(0, 191, 255, 0.4)', /* #00BFFF Azul */
          borderColor: 'rgba(0, 0, 255, 1)',
          borderWidth: '1'
        },
        {
          label: 'Débitos',
          backgroundColor: 'rgba(255, 0, 0, 0.4)', /* #FF0000 Vermelho*/
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: '1',
          //    'Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
          data: debitos
        },
        {
          label: 'Saldo',
          backgroundColor: 'rgba(0, 206, 0, 0.4)', /* #00CE00  Verde */
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
          borderWidth: '5',
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
