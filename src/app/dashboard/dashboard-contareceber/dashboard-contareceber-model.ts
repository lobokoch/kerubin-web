
export class MonthlySum {
	january: number;
	february: number;
	march: number;
	april: number;
	may: number;
	june: number;
	july: number;
	august: number;
	september: number;
	october: number;
	november: number;
	december: number;
}

export class MonthlySumContasReceber {
  apagar: MonthlySum;
	pago: MonthlySum;
}

export class ContasReceberSituacaoDoAnoSum {
	valorVencido: number;
	valorVenceHoje: number;
	valorVenceAmanha: number;
	valorVenceProximos7Dias: number;
	valorVenceMesAtual: number;
  valorVenceProximoMes: number;
	valorPagoMesAtual: number;
	valorPagoMesAnterior: number;
}
