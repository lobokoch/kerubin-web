/**********************************************************************************************
Code generated with MKL Plug-in version: 47.7.13
Code generated at time stamp: 2020-01-07T20:34:08.364
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { SysUser } from './../sysuser/sysuser.model';
import { PaymentMethod } from './../enums/security-authorization-enums.model';
import { OrderStatus } from './../enums/security-authorization-enums.model';

export class SortField {
  field: string;
  order: number;

  constructor(field: string, order: number) {
    this.field = field;
    this.order = order;
  }
}

export class PaginationFilter {
  pageNumber: number;
  pageSize: number;
  sortFields: SortField[];

  constructor() {
    this.pageNumber = 0;
    this.pageSize = 10;
  }
}

export class CreditOrderOrderUserNameAutoComplete {
	orderUserName: string;
}

export class CreditOrderListFilter extends PaginationFilter {
	
	id: string;
	
	orderUserName: CreditOrderOrderUserNameAutoComplete[];
	
	orderDateFrom: Date;
	orderDateTo: Date;
	
	orderValueFrom: number;
	orderValueTo: number;
	
	orderStatus: OrderStatus;
	
	// Map key=value for developer custom fields parameters. The final parameters map must be a JSON object.
	customParams = new Map<any, any>();
}

export class CreditOrder {
	id: string;
	orderUserName: string;
	orderTenantName: string;
	orderUser: SysUser;
	orderDate: Date;
	orderValue: number;
	orderBonusValue: number;
	orderTotalCredits: number;
	paymentMethod: PaymentMethod;
	paymentMethodDescription: string;
	orderStatus: OrderStatus;
	orderPaidDate: Date;
	orderCanceledDate: Date;
	orderHistory: string;
}

export class CreditOrderAutoComplete {
	id: string;
	orderUserName: string;
}

export class CreditOrderSumFields {
	sumOrderValue: number;
	sumOrderBonusValue: number;
	sumOrderTotalCredits: number;
}
