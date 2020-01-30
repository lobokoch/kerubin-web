/**********************************************************************************************
Code generated with MKL Plug-in version: 55.0.3
Copyright: Kerubin - kerubin.platform@gmail.com

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
  sortFields: SortField[];

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
	
	// Map key=value for developer custom fields parameters. The final parameters map must be a JSON object.
	customParams = new Map<any, any>();
}

export class SysUser {
	id: string;
	name: string;
	cnpjCPF: string;
	email: string;
	password: string;
	confirmPassword: string;
	active: boolean = false;
	administrator: boolean = false;
	superAdministrator: boolean = false;
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
