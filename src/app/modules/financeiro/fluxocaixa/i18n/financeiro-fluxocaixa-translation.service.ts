/**********************************************************************************************
Code generated with MKL Plug-in version: 3.10.14
Code generated at time stamp: 2019-06-15T21:09:25.059
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { Injectable } from '@angular/core';
import * as localTranslations from 'src/app/modules/financeiro/fluxocaixa/i18n/pt-br.json';

@Injectable()
export class FinanceiroFluxoCaixaTranslationService {

  constructor() { }

  public getTranslation(key: string): string {
      if (localTranslations) {
        const translation = (<any>localTranslations).default[key];
        if (translation !== null) {
          return translation;
        }
      }
      return key;
  }

}
