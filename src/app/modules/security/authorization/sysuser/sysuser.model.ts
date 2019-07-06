/**********************************************************************************************
Code generated with MKL Plug-in version: 6.11.0
Code generated at time stamp: 2019-07-06T11:24:40.670
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { AccountType } from './../enums/security-authorization-enums.model';
import { Tenant } from './../tenant/tenant.model';

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

export class SysUserNameAutoComplete {
	name: string;
}

export class SysUserListFilter extends PaginationFilter {
	
	name: SysUserNameAutoComplete[];
}

export class SysUser {
	id: string;
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
	active: boolean = false;
	administrator: boolean = false;
	accountType: AccountType;
	tenant: Tenant;
	activationDate: Date;
	confirmed: boolean = false;
	confirmationDate: Date;
	confirmationId: string;
}

export class SysUserAutoComplete {
	id: string;
	name: string;
	email: string;
	accountType: AccountType;
}

export class SysUserSumFields {
}
