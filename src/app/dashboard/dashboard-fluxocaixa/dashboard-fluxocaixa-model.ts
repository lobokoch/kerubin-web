
export class FluxoCaixaMonthItem {
	monthId: number;
	monthName: string;
	creditValue: number;
	debitValue: number;
	balanceValue: number;
	balanceAccumulated: number;
}


export class FluxoCaixaPlanoContasItem {
  value: number;
  planoContaCode: string;
  planoContaDescription: string;
  percent: number;
}

export class FluxoCaixaPlanoContasForMonth {
  monthId: number;
  monthName: string;

  items: FluxoCaixaPlanoContasItem[];
}
