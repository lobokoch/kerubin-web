/**********************************************************************************************
Code generated with MKL Plug-in version: 7.18.7
Code generated at time stamp: 2019-08-15T06:20:44.459
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
  sortField: SortField;

  constructor() {
    this.pageNumber = 0;
    this.pageSize = 10;
  }
}

export class CreditOrderAdminOrderUserNameAutoComplete {
	orderUserName: string;
}

export class CreditOrderAdminOrderTenantNameAutoComplete {
	orderTenantName: string;
}

export class CreditOrderAdminListFilter extends PaginationFilter {
	
	id: string;
	
	orderUserName: CreditOrderAdminOrderUserNameAutoComplete[];
	
	orderTenantName: CreditOrderAdminOrderTenantNameAutoComplete[];
	
	orderDateFrom: Date;
	orderDateTo: Date;
	
	orderValueFrom: number;
	orderValueTo: number;
	
	orderStatus: OrderStatus;
}

export class CreditOrderAdmin {
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

export class CreditOrderAdminAutoComplete {
	id: string;
	orderUserName: string;
}

export class CreditOrderAdminSumFields {
	sumOrderValue: number;
	sumOrderBonusValue: number;
	sumOrderTotalCredits: number;
}